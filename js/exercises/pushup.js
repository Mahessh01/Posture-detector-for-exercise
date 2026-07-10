// ==========================================
// Push-Up Detector
// ==========================================

function detectPushup(bodyParts) {

    let leftElbow = bodyParts.leftElbowAngle;
    let rightElbow = bodyParts.rightElbowAngle;

    let leftHip = bodyParts.leftHipAngle;
    let rightHip = bodyParts.rightHipAngle;

    let elbowAngle = (leftElbow + rightElbow) / 2;
    let hipAngle = (leftHip + rightHip) / 2;

    setAngle(elbowAngle);

    // -----------------------------
    // Seed Starting State
    // -----------------------------

    if (state === "READY") {
        state = "UP";
    }

    // -----------------------------
    // Rep Detection
    // -----------------------------

    if (elbowAngle < 90 && state === "UP") {

        state = "DOWN";

    }

    if (elbowAngle > 160 && state === "DOWN") {

        state = "UP";
        reps++;

    }

    setStatus(state);
    setReps(reps);

    // -----------------------------
    // Feedback
    // -----------------------------

    if (Math.abs(leftElbow - rightElbow) > 15) {

        setFeedback("Keep both arms even.");

    } else if (elbowAngle > 160) {

        setFeedback("Lower your body.");

    } else if (elbowAngle > 100) {

        setFeedback("Go lower.");

    } else if (hipAngle < 155) {

        setFeedback("Keep your body straight.");

    } else {

        setFeedback("Great! Push back up.");

    }

    // -----------------------------
    // Form Score
    // -----------------------------

    let score = 100;

    if (elbowAngle > 110 && state === "DOWN") {
        score -= 20;
    }

    if (hipAngle < 155) {
        score -= 25;
    }

    if (Math.abs(leftElbow - rightElbow) > 15) {
        score -= 15;
    }

    setScore(score);

}
