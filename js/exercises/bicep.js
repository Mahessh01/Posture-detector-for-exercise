// ==========================================
// Bicep Curl Detector
// ==========================================

function detectBicep(bodyParts) {

    let leftElbow = bodyParts.leftElbowAngle;
    let rightElbow = bodyParts.rightElbowAngle;

    let angle = (leftElbow + rightElbow) / 2;

    setAngle(angle);

    // -----------------------------
    // Seed Starting State
    // -----------------------------
    // BUG FIX: without this, state stays stuck
    // on "READY" forever because neither the
    // "UP" nor "DOWN" branch below ever matches
    // it, so reps never start counting.
    // -----------------------------

    if (state === "READY") {
        state = "DOWN";
    }

    // -----------------------------
    // Rep Detection
    // -----------------------------

    if (angle < 50 && state === "DOWN") {

        state = "UP";

    }

    if (angle > 160 && state === "UP") {

        state = "DOWN";
        reps++;

    }

    setStatus(state);
    setReps(reps);

    // -----------------------------
    // Feedback
    // -----------------------------

    if (Math.abs(leftElbow - rightElbow) > 25) {

        setFeedback("Curl both arms evenly.");

    } else if (angle > 160) {

        setFeedback("Curl your arm upward.");

    } else if (angle > 70) {

        setFeedback("Keep curling...");

    } else {

        setFeedback("Excellent! Now lower slowly.");

    }

    // -----------------------------
    // Form Score
    // -----------------------------

    let score = 100;

    // Elbow not fully extending at the bottom
    if (angle < 150 && state === "DOWN") {
        score -= 20;
    }

    // Not curling high enough at the top
    if (angle > 60 && state === "UP") {
        score -= 20;
    }

    // Arms curling unevenly
    if (Math.abs(leftElbow - rightElbow) > 25) {
        score -= 15;
    }

    setScore(score);

}
