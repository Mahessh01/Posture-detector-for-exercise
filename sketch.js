let capture;
let poseNet;
let poses = [];

let printed = false;

function setup() {

    let canvas = createCanvas(760,570);
    canvas.parent("canvas-container");

    capture = createCapture(VIDEO);
    capture.size(760,570);
    capture.hide();

    poseNet = ml5.poseNet(capture, modelLoaded);

    poseNet.on("pose", function(results){
        poses = results;
    });

}

function modelLoaded(){
    console.log("PoseNet Loaded");
}

function draw() {

    background(0);

    image(capture,0,0,width,height);


    getBodyParts();

    drawSkeleton();
    drawKeypoints();
}
function drawSkeleton() {

    for (let i = 0; i < poses.length; i++) {

        let skeleton = poses[i].skeleton;

        stroke(255, 0, 255);    // Purple
        strokeWeight(6);
        strokeCap(ROUND);


        for (let j = 0; j < skeleton.length; j++) {

            let partA = skeleton[j][0];
            let partB = skeleton[j][1];

            line(
                partA.position.x,
                partA.position.y,
                partB.position.x,
                partB.position.y
            );
        }
    }
}

function drawKeypoints(){

    for(let i=0;i<poses.length;i++){

        let pose = poses[i].pose;

        for(let j=0;j<pose.keypoints.length;j++){

            let keypoint = pose.keypoints[j];

            if(keypoint.score>0.2){

                fill(255,0,255);
                noStroke();
                circle(
                    keypoint.position.x,
                    keypoint.position.y,
                    10
                );

            }

        }

    }

}
function getBodyParts() {

    if (poses.length === 0) return;

    let pose = poses[0].pose;

    let leftShoulder = pose.leftShoulder;
    let rightShoulder = pose.rightShoulder;
    let leftElbow = pose.leftElbow;
    let rightElbow = pose.rightElbow;
    let leftHip = pose.leftHip;
    let rightHip = pose.rightHip;
    let leftWrist = pose.leftWrist;
    let rightWrist = pose.rightWrist;

    if (!printed) {

        console.log(leftShoulder);
        console.log(rightShoulder);
        console.log(leftElbow);
        console.log(rightElbow);
        console.log(leftHip);
        console.log(rightHip);
        console.log(leftWrist);
        printed = true;
         let vector1 = {
        x: leftShoulder.x - leftElbow.x,
        y: leftShoulder.y - leftElbow.y
        }
        let vector2 = {
        x: leftWrist.x - leftElbow.x,
        y: leftWrist.y - leftElbow.y
        };
        let length1 = Math.sqrt(
            vector1.x * vector1.x +
            vector1.y * vector1.y
        );

        let length2 = Math.sqrt(
            vector2.x * vector2.x +
            vector2.y * vector2.y
        );
        let dotProduct =(vector1.x * vector2.x) + (vector1.y * vector2.y);
        console.log("Dot Product:", dotProduct);
    }
}
