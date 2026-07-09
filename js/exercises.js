// ==========================================
// Exercise Router
// ==========================================

let selectedExercise = null;

// ------------------------------------------
// Get Selected Exercise
// ------------------------------------------

const params = new URLSearchParams(window.location.search);

selectedExercise = params.get("exercise");

if (!selectedExercise) {

    selectedExercise = "bicep";

}

// ------------------------------------------
// Update Title
// ------------------------------------------

const title = document.getElementById("exercise-name");

if (title) {

    switch (selectedExercise) {

        case "bicep":
            title.innerText = "💪 Bicep Curl";
            break;

        case "squat":
            title.innerText = "🏋️ Squat";
            break;

        case "pushup":
            title.innerText = "🔥 Push Up";
            break;

        case "plank":
            title.innerText = "🧘 Plank";
            break;

        case "shoulderpress":
            title.innerText = "🏆 Shoulder Press";
            break;

        default:
            title.innerText = "Workout";

    }

}

// ------------------------------------------
// Exercise Dispatcher
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