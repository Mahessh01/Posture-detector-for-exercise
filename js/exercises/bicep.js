// ==========================================
// Bicep Curl Detector
// ==========================================

function detectBicep(bodyParts) {

    let angle = bodyParts.leftElbowAngle;

    // -----------------------------
    // Update Angle Card
    // -----------------------------

    angleElement.innerText = angle.toFixed(0) + "°";

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

    // -----------------------------
    // Dashboard
    // -----------------------------

    statusElement.innerText = state;

    repsElement.innerText = reps;

    // -----------------------------
    // Feedback
    // -----------------------------

    if (angle > 160) {

        feedbackElement.innerText =
        "Curl your arm upward.";

    }

    else if (angle > 70) {

        feedbackElement.innerText =
        "Keep curling...";

    }

    else {

        feedbackElement.innerText =
        "Excellent! Now lower slowly.";

    }

    // -----------------------------
    // Form Score
    // -----------------------------

    formScore = 100;

    // Elbow not fully extending

    if (angle < 150 && state === "DOWN") {

        formScore -= 20;

    }

    // Not curling enough

    if (angle > 60 && state === "UP") {

        formScore -= 20;

    }

    if (formScore < 0) {

        formScore = 0;

    }

    scoreElement.innerText = formScore + "%";

}