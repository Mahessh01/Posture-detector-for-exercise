// ==========================================
// PoseNet Utilities
// ==========================================
// Low-level helpers for reading and drawing
// the keypoints returned by ml5's PoseNet.
// Nothing exercise-specific lives here.
// ==========================================

const MIN_CONFIDENCE = 0.1;

// ------------------------------------------
// Confidence Check
// ------------------------------------------
// Named convenience keypoints from ml5
// (e.g. pose.leftShoulder) use `.confidence`.
// ------------------------------------------

function validPoint(point, minConfidence = MIN_CONFIDENCE) {

    return !!point && point.confidence >= minConfidence;

}

// ------------------------------------------
// Draw Keypoints
// ------------------------------------------
// The raw pose.keypoints array uses `.score`
// (not `.confidence`) and nests coordinates
// under `.position`.
// ------------------------------------------

function drawKeypoints(pose) {

    for (const kp of pose.keypoints) {

        if (kp.score < MIN_CONFIDENCE) continue;

        noStroke();
        fill(139, 92, 246);
        circle(kp.position.x, kp.position.y, 10);

    }

}

// ------------------------------------------
// Draw Skeleton
// ------------------------------------------

function drawSkeleton(skeleton) {

    stroke(124, 58, 237);
    strokeWeight(3);

    for (const bone of skeleton) {

        const [a, b] = bone;

        line(a.position.x, a.position.y, b.position.x, b.position.y);

    }

}
