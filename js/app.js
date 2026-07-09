// ==========================
// HOME PAGE
// ==========================

const cards = document.querySelectorAll(".exercise-card");

let selectedExercise = "bicep";

if(cards.length){

    cards.forEach(card=>{

        card.addEventListener("click",()=>{

            cards.forEach(c=>c.classList.remove("selected"));

            card.classList.add("selected");

            selectedExercise = card.dataset.exercise;

        });

    });

    document
        .getElementById("startBtn")
        .addEventListener("click",()=>{

            localStorage.setItem(
                "selectedExercise",
                selectedExercise
            );

            window.location.href="workout.html";

        });

}

// ==========================
// WORKOUT PAGE
// ==========================

const exerciseName=document.getElementById("exerciseName");

if(exerciseName){

    const exercise=
        localStorage.getItem("selectedExercise");

    const names={

        bicep:"💪 Bicep Curl",

        squat:"🏋 Squat",

        pushup:"🤸 Push-up",

        shoulderpress:"🏋‍♂ Shoulder Press",

        plank:"🧘 Plank"

    };

    exerciseName.innerText=
        names[exercise] || "Workout";

}

const endButton=
document.getElementById("endWorkout");

if(endButton){

    endButton.addEventListener("click",()=>{

        localStorage.removeItem("selectedExercise");

        window.location.href="index.html";

    });

}