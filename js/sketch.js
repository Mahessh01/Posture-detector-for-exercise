// ==========================================
// Main Sketch — Camera + Pose Detection Loop
// ==========================================
// This file used to be an empty stub. It is
// now the piece that actually:
//   1. opens the webcam
//   2. loads ml5's PoseNet model
//   3. draws the mirrored camera + skeleton
//   4. turns keypoints into body angles
//   5. hands those angles to the selected
//      exercise detector, every frame
// ==========================================

let video;
let poseNet;
let poses = [];
let modelReady = false;

// ------------------------------------------
// p5 Setup
// ------------------------------------------

function setup() {

    const canvas = createCanvas(640, 480);
    canvas.parent("canvas-container");

    video = createCapture(VIDEO);
    video.size(640, 480);
    video.hide();

    resetExerciseState();

    setStatus("LOADING MODEL");
    feedbackElement.innerText = "Loading AI model, please wait...";

    poseNet = ml5.poseNet(video, modelLoaded);

    poseNet.on("pose", results => {
        poses = results;
    });

}

function modelLoaded() {

    modelReady = true;

    setStatus("READY");
    feedbackElement.innerText = "Stand in front of the camera.";

}

// ------------------------------------------
// p5 Draw Loop
// ------------------------------------------

function draw() {

    // Mirror the camera + overlay so it feels
    // like looking in a mirror. Angle math is
    // unaffected since it only cares about the
    // angle between joints, not left/right.
    push();
    translate(width, 0);
    scale(-1, 1);

    image(video, 0, 0, width, height);

    if (modelReady && poses.length > 0) {

        drawSkeleton(poses[0].skeleton);
        drawKeypoints(poses[0].pose);

    }

    pop();

    if (!modelReady) {
        return;
    }

    if (poses.length === 0) {

        setStatus("NO BODY");
        setFeedback("No person detected. Step into frame.");
        return;

    }

    const bodyParts = extractBodyParts(poses[0].pose);

    if (!bodyParts) {

        setStatus("ADJUST POSITION");
        setFeedback("Move back so your full body is visible.");
        return;

    }

    detectExercise(bodyParts);

}
