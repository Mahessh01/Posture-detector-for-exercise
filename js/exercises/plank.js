// ==========================================
// Plank Detector
// ==========================================

let plankStartTime = null;
let plankSeconds = 0;

function detectPlank(bodyParts) {

    let leftHip = bodyParts.leftHipAngle;
    let rightHip = bodyParts.rightHipAngle;

    let hipAngle = (leftHip + rightHip) / 2;

    setAngle(hipAngle);

    // -----------------------------
    // Plank Hold Timer
    // -----------------------------

    const correctPlank = hipAngle >= 160 && hipAngle <= 185;

    if (correctPlank) {

        setStatus("HOLD");

        if (!plankStartTime) {
            plankStartTime = millis();
        }

        plankSeconds = Math.floor((millis() - plankStartTime) / 1000);
        reps = plankSeconds;

        setReps(plankSeconds + "s");

    } else {

        setStatus("ADJUST");

        plankStartTime = null;

        setReps(plankSeconds + "s");

    }

    // -----------------------------
    // Feedback
    // -----------------------------

    if (hipAngle < 160) {

        setFeedback("Lift your hips.");

    } else if (hipAngle > 185) {

        setFeedback("Lower your hips slightly.");

    } else {

        setFeedback("Excellent! Hold your plank.");

    }

    // -----------------------------
    // Form Score
    // -----------------------------

    let score = 100;

    if (hipAngle < 160) {
        score -= 30;
    }

    if (hipAngle > 185) {
        score -= 20;
    }

    setScore(score);

}
