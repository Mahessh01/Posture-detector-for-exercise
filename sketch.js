let capture;
let poseNet;
let poses = [];

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

    image(capture, 0, 0, width, height);

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