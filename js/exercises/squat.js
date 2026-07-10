// ==========================================
// Squat Detector
// ==========================================

function detectSquat(bodyParts) {

    let leftKnee = bodyParts.leftKneeAngle;
    let rightKnee = bodyParts.rightKneeAngle;

    let leftHip = bodyParts.leftHipAngle;
    let rightHip = bodyParts.rightHipAngle;

    let kneeAngle = (leftKnee + rightKnee) / 2;
    let hipAngle = (leftHip + rightHip) / 2;

    setAngle(kneeAngle);

    // -----------------------------
    // Seed Starting State
    // -----------------------------

    if (state === "READY") {
        state = "UP";
    }

    // -----------------------------
    // Rep Detection
    // -----------------------------

    if (kneeAngle < 90 && state === "UP") {

        state = "DOWN";

    }

    if (kneeAngle > 165 && state === "DOWN") {

        state = "UP";
        reps++;

    }

    setStatus(state);
    setReps(reps);

    // -----------------------------
    // Feedback
    // -----------------------------

    if (Math.abs(leftKnee - rightKnee) > 18) {

        setFeedback("Keep both knees moving evenly.");

    } else if (kneeAngle > 165) {

        setFeedback("Lower your hips for a full squat.");

    } else if (kneeAngle > 120) {

        setFeedback("Go deeper.");

    } else if (hipAngle < 70) {

        setFeedback("Keep your chest up.");

    } else {

        setFeedback("Excellent squat. Push back up.");

    }

    // -----------------------------
    // Form Score
    // -----------------------------

    let score = 100;

    if (kneeAngle > 110 && state === "DOWN") {
        score -= 25;
    }

    if (hipAngle < 60) {
        score -= 15;
    }

    if (Math.abs(leftKnee - rightKnee) > 18) {
        score -= 20;
    }

    setScore(score);

}
