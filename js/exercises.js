// ==========================================
// Exercise Router + Angle Math
// ==========================================

// ------------------------------------------
// Get Selected Exercise
// ------------------------------------------
// BUG FIX: this used to read from a URL query
// string (?exercise=...), but the home page
// actually saves the choice to localStorage.
// That mismatch meant the wrong exercise (or
// the "bicep" fallback) loaded every time.
// ------------------------------------------

let selectedExercise = localStorage.getItem("selectedExercise") || "bicep";

// ------------------------------------------
// Angle Calculation
// ------------------------------------------
// Returns the angle (0-180°) at vertex B,
// formed by points A-B-C. Used for every
// joint angle (elbow, knee, hip).
// ------------------------------------------

function calculateAngle(A, B, C) {

    const AB = { x: A.x - B.x, y: A.y - B.y };
    const CB = { x: C.x - B.x, y: C.y - B.y };

    const dot = AB.x * CB.x + AB.y * CB.y;

    const magAB = Math.hypot(AB.x, AB.y);
    const magCB = Math.hypot(CB.x, CB.y);

    if (magAB === 0 || magCB === 0) return 0;

    let cosine = dot / (magAB * magCB);

    // Guard against floating point drift pushing
    // the value slightly outside [-1, 1], which
    // would make Math.acos return NaN.
    cosine = Math.max(-1, Math.min(1, cosine));

    return Math.acos(cosine) * (180 / Math.PI);

}

// ------------------------------------------
// Extract Body Parts
// ------------------------------------------
// Turns a raw ml5 pose into the joint angles
// and keypoints each exercise detector needs.
// Returns null if the person isn't fully
// visible yet, so callers can show a helpful
// "step into frame" message instead of
// crashing on missing keypoints.
// ------------------------------------------

function extractBodyParts(pose) {

    const required = [
        pose.leftShoulder, pose.rightShoulder,
        pose.leftElbow, pose.rightElbow,
        pose.leftWrist, pose.rightWrist,
        pose.leftHip, pose.rightHip,
        pose.leftKnee, pose.rightKnee,
        pose.leftAnkle, pose.rightAnkle,
    ];

    for (const point of required) {

        if (!validPoint(point)) {
            return null;
        }

    }

    return {

        leftShoulder: pose.leftShoulder,
        rightShoulder: pose.rightShoulder,
        leftElbow: pose.leftElbow,
        rightElbow: pose.rightElbow,
        leftWrist: pose.leftWrist,
        rightWrist: pose.rightWrist,
        leftHip: pose.leftHip,
        rightHip: pose.rightHip,
        leftKnee: pose.leftKnee,
        rightKnee: pose.rightKnee,
        leftAnkle: pose.leftAnkle,
        rightAnkle: pose.rightAnkle,

        leftElbowAngle: calculateAngle(pose.leftShoulder, pose.leftElbow, pose.leftWrist),
        rightElbowAngle: calculateAngle(pose.rightShoulder, pose.rightElbow, pose.rightWrist),

        leftKneeAngle: calculateAngle(pose.leftHip, pose.leftKnee, pose.leftAnkle),
        rightKneeAngle: calculateAngle(pose.rightHip, pose.rightKnee, pose.rightAnkle),

        leftHipAngle: calculateAngle(pose.leftShoulder, pose.leftHip, pose.leftKnee),
        rightHipAngle: calculateAngle(pose.rightShoulder, pose.rightHip, pose.rightKnee),

    };

}

// ------------------------------------------
// Exercise Dispatcher
// ------------------------------------------
// Called once per frame from sketch.js with
// the current body angles.
// ------------------------------------------

function detectExercise(bodyParts) {

    switch (selectedExercise) {

        case "bicep":
            detectBicep(bodyParts);
            break;

        case "squat":
            detectSquat(bodyParts);
            break;

        case "pushup":
            detectPushup(bodyParts);
            break;

        case "plank":
            detectPlank(bodyParts);
            break;

        case "shoulderpress":
            detectShoulderPress(bodyParts);
            break;

    }

}
