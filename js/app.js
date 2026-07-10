// ==========================================
// App Glue — Home Page + Workout Page
// ==========================================
// Single shared file for both pages so the
// exercise-selection logic only exists once.
// (Previously this same logic was duplicated
// inline in index.html AND here in app.js,
// using two different sets of element IDs
// that didn't match either page.)
// ==========================================

// ------------------------------------------
// HOME PAGE — Exercise Selection
// ------------------------------------------

const cards = document.querySelectorAll(".exercise-card");
const startButton = document.getElementById("startWorkout");

let selectedExerciseChoice = "";

if (cards.length) {

    cards.forEach(card => {

        card.addEventListener("click", () => {

            cards.forEach(c => c.classList.remove("selected"));
            card.classList.add("selected");

            selectedExerciseChoice = card.dataset.exercise;

            startButton.disabled = false;

            startButton.innerText =
                "Start " + card.querySelector("h2").innerText;

        });

    });

    startButton.addEventListener("click", () => {

        localStorage.setItem("selectedExercise", selectedExerciseChoice);

        window.location.href = "workout.html";

    });

}

// ------------------------------------------
// WORKOUT PAGE — Title + End Button
// ------------------------------------------

const exerciseNameEl = document.getElementById("exercise-name");

if (exerciseNameEl) {

    const exercise = localStorage.getItem("selectedExercise") || "bicep";

    const names = {
        bicep: "💪 Bicep Curl",
        squat: "🏋️ Squat",
        pushup: "🤸 Push Up",
        shoulderpress: "🏋️‍♂️ Shoulder Press",
        plank: "🧘 Plank",
    };

    exerciseNameEl.innerText = names[exercise] || "Workout";

}

const endButton = document.getElementById("endWorkout");

if (endButton) {

    endButton.addEventListener("click", () => {

        localStorage.removeItem("selectedExercise");

        window.location.href = "index.html";

    });

}
