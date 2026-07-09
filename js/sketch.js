// ======================================================
// AI FITNESS TRAINER
// Main Pose Engine
// ======================================================

// -------------------------
// Global Variables
// -------------------------

let capture;
let poseNet;
let poses = [];

// Workout State
let state = "READY";
let reps = 0;
let formScore = 100;

// Dashboard Elements
let statusElement;
let repsElement;
let feedbackElement;
let scoreElement;
let angleElement;

// -------------------------
// Setup
// -------------------------

function setup() {

    let canvas = createCanvas(760, 570);
    canvas.parent("canvas-container");

    capture = createCapture(VIDEO);
    capture.size(760,570);
    capture.hide();

    statusElement = document.getElementById("status");
    repsElement = document.getElementById("reps");
    feedbackElement = document.getElementById("feedback");
    scoreElement = document.getElementById("score");
    angleElement = document.getElementById("angle");

    poseNet = ml5.poseNet(capture, modelLoaded);

    poseNet.on("pose", function(results){

        poses = results;

    });

}

// -------------------------
// PoseNet Loaded
// -------------------------

function modelLoaded(){

    console.log("PoseNet Loaded");

}

// -------------------------
// Draw Loop
// -------------------------

function draw(){

    background(0);

    image(capture,0,0,width,height);

    drawSkeleton();

    drawKeypoints();

    getBodyParts();

}

// -------------------------
// Draw Skeleton
// -------------------------

function drawSkeleton(){

    for(let i=0;i<poses.length;i++){

        let skeleton = poses[i].skeleton;

        stroke(255,0,255);
        strokeWeight(6);
        strokeCap(ROUND);

        for(let j=0;j<skeleton.length;j++){

            let partA = skeleton[j][0];

            let partB = skeleton[j][1];

            line(

                partA.position.x,
                partA.position.y,

                partB.position.x,
                partB.position.y

            );

        }

    }

}

// -------------------------
// Draw Keypoints
// -------------------------

function drawKeypoints(){

    for(let i=0;i<poses.length;i++){

        let pose = poses[i].pose;

        for(let j=0;j<pose.keypoints.length;j++){

            let keypoint = pose.keypoints[j];

            if(keypoint.score > 0.2){

                fill(255,0,255);

                noStroke();

                circle(

                    keypoint.position.x,
                    keypoint.position.y,
                    10

                );

            }

        }

    }

}

// -------------------------
// Angle Calculator
// -------------------------

function calculateAngle(pointA, pointB, pointC){

    let vector1 = {

        x: pointA.x - pointB.x,
        y: pointA.y - pointB.y

    };

    let vector2 = {

        x: pointC.x - pointB.x,
        y: pointC.y - pointB.y

    };

    let dotProduct =

        (vector1.x * vector2.x) +

        (vector1.y * vector2.y);

    let length1 = Math.sqrt(

        vector1.x * vector1.x +

        vector1.y * vector1.y

    );

    let length2 = Math.sqrt(

        vector2.x * vector2.x +

        vector2.y * vector2.y

    );

    if(length1 === 0 || length2 === 0){

        return 0;

    }

    let cosine = dotProduct / (length1 * length2);

    cosine = constrain(cosine,-1,1);

    let angle = Math.acos(cosine);

    angle = angle * 180 / Math.PI;

    return angle;

}
// ======================================================
// Read Body Parts
// ======================================================

function getBodyParts() {

    if (poses.length === 0) {

        statusElement.innerText = "NO PERSON";
        feedbackElement.innerText = "Stand in front of the camera";
        return;

    }

    let pose = poses[0].pose;

    // -------------------------
    // Body Parts
    // -------------------------

    let leftShoulder = pose.leftShoulder;
    let rightShoulder = pose.rightShoulder;

    let leftElbow = pose.leftElbow;
    let rightElbow = pose.rightElbow;

    let leftWrist = pose.leftWrist;
    let rightWrist = pose.rightWrist;

    let leftHip = pose.leftHip;
    let rightHip = pose.rightHip;

    let leftKnee = pose.leftKnee;
    let rightKnee = pose.rightKnee;

    let leftAnkle = pose.leftAnkle;
    let rightAnkle = pose.rightAnkle;

    // -------------------------
    // Angles
    // -------------------------

    let leftElbowAngle = calculateAngle(
        leftShoulder,
        leftElbow,
        leftWrist
    );

    let rightElbowAngle = calculateAngle(
        rightShoulder,
        rightElbow,
        rightWrist
    );

    let leftKneeAngle = calculateAngle(
        leftHip,
        leftKnee,
        leftAnkle
    );

    let rightKneeAngle = calculateAngle(
        rightHip,
        rightKnee,
        rightAnkle
    );

    let leftHipAngle = calculateAngle(
        leftShoulder,
        leftHip,
        leftKnee
    );

    let rightHipAngle = calculateAngle(
        rightShoulder,
        rightHip,
        rightKnee
    );

    // -------------------------
    // Round Angles
    // -------------------------

    leftElbowAngle = Number(leftElbowAngle.toFixed(1));
    rightElbowAngle = Number(rightElbowAngle.toFixed(1));

    leftKneeAngle = Number(leftKneeAngle.toFixed(1));
    rightKneeAngle = Number(rightKneeAngle.toFixed(1));

    leftHipAngle = Number(leftHipAngle.toFixed(1));
    rightHipAngle = Number(rightHipAngle.toFixed(1));

    // -------------------------
    // Dashboard
    // -------------------------

    if (angleElement) {

        angleElement.innerText =
            leftElbowAngle + "°";

    }

    // -------------------------
    // Create Body Object
    // -------------------------

    const bodyParts = {

        leftShoulder,
        rightShoulder,

        leftElbow,
        rightElbow,

        leftWrist,
        rightWrist,

        leftHip,
        rightHip,

        leftKnee,
        rightKnee,

        leftAnkle,
        rightAnkle,

        leftElbowAngle,
        rightElbowAngle,

        leftKneeAngle,
        rightKneeAngle,

        leftHipAngle,
        rightHipAngle

    };

    // -------------------------
    // Exercise Router
    // -------------------------

    detectExercise(bodyParts);

}