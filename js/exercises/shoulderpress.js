// ==========================================
// Shoulder Press Detector
// ==========================================

function detectShoulderPress(bodyParts) {

    let leftElbow = bodyParts.leftElbowAngle;
    let rightElbow = bodyParts.rightElbowAngle;

    let elbowAngle = (leftElbow + rightElbow) / 2;

    let leftWrist = bodyParts.leftWrist;
    let rightWrist = bodyParts.rightWrist;

    let leftShoulder = bodyParts.leftShoulder;
    let rightShoulder = bodyParts.rightShoulder;

    setAngle(elbowAngle);

    const wristsAboveShoulders =
        leftWrist.y < leftShoulder.y &&
        rightWrist.y < rightShoulder.y;

    // -----------------------------
    // Seed Starting State
    // -----------------------------

    if (state === "READY") {
        state = "DOWN";
    }

    // -----------------------------
    // Rep Detection
    // -----------------------------

    if (
        wristsAboveShoulders &&
        elbowAngle > 155 &&
        state === "DOWN"
    ) {

        state = "UP";

    }

    if (
        !wristsAboveShoulders &&
        elbowAngle < 95 &&
        state === "UP"
    ) {

        state = "DOWN";
        reps++;

    }

    setStatus(state);
    setReps(reps);

    // -----------------------------
    // Feedback
    // -----------------------------

    if (Math.abs(leftElbow - rightElbow) > 18) {

        setFeedback("Keep both arms moving together.");

    } else if (!wristsAboveShoulders && elbowAngle < 95) {

        setFeedback("Press the weights overhead.");

    } else if (wristsAboveShoulders && elbowAngle < 165) {

        setFeedback("Lock your arms at the top.");

    } else {

        setFeedback("Excellent repetition.");

    }

    // -----------------------------
    // Form Score
    // -----------------------------

    let score = 100;

    if (Math.abs(leftElbow - rightElbow) > 18) {
        score -= 20;
    }

    if (wristsAboveShoulders && elbowAngle < 165) {
        score -= 20;
    }

    if (!wristsAboveShoulders && elbowAngle > 110) {
        score -= 20;
    }

    setScore(score);

}
