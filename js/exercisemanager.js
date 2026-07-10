// ==========================================
// Exercise State Manager
// ==========================================
// The single source of truth for workout
// state (reps / state machine / form score)
// and the ONLY file that touches the
// dashboard DOM. Exercise files (bicep.js,
// squat.js, ...) only decide numbers/text -
// they call these setters instead of poking
// elements directly.
// ==========================================

let reps = 0;
let state = "READY";
let formScore = 100;

// ------------------------------------------
// Dashboard Elements
// ------------------------------------------

const statusElement = document.getElementById("status");
const repsElement = document.getElementById("reps");
const angleElement = document.getElementById("angle");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");

// ------------------------------------------
// Simple Setters
// ------------------------------------------

function setStatus(text) {

    statusElement.innerText = text;

}

function setReps(value) {

    repsElement.innerText = value;

}

function setAngle(value) {

    angleElement.innerText = Math.round(value) + "°";

}

function setScore(rawScore) {

    formScore = Math.max(0, Math.min(100, Math.round(rawScore)));

    scoreElement.innerText = formScore + "%";

    scoreElement.classList.remove("score-good", "score-warn", "score-bad");

    if (formScore >= 80) {

        scoreElement.classList.add("score-good");

    } else if (formScore >= 50) {

        scoreElement.classList.add("score-warn");

    } else {

        scoreElement.classList.add("score-bad");

    }

}

// ------------------------------------------
// Feedback Smoothing
// ------------------------------------------
// PoseNet is noisy frame-to-frame, which used
// to make the feedback text flicker between
// messages many times a second. A message only
// gets committed to the screen once it has
// been the "true" message for several frames
// in a row, so the coach reads like a steady
// stream of advice instead of a strobe light.
// ------------------------------------------

const FEEDBACK_STABILITY_FRAMES = 6;

let pendingFeedback = "";
let pendingFeedbackCount = 0;
let currentFeedback = "";

function setFeedback(text) {

    if (text === pendingFeedback) {

        pendingFeedbackCount++;

    } else {

        pendingFeedback = text;
        pendingFeedbackCount = 1;

    }

    if (
        pendingFeedbackCount >= FEEDBACK_STABILITY_FRAMES &&
        currentFeedback !== text
    ) {

        currentFeedback = text;
        feedbackElement.innerText = text;

    }

}

// ------------------------------------------
// Reset
// ------------------------------------------
// Called once when the workout page loads.
// ------------------------------------------

function resetExerciseState() {

    reps = 0;
    state = "READY";
    formScore = 100;

    pendingFeedback = "";
    pendingFeedbackCount = 0;
    currentFeedback = "";

    setStatus("READY");
    setReps(0);
    setAngle(0);
    setScore(100);

    feedbackElement.innerText = "Stand in front of the camera.";

}
