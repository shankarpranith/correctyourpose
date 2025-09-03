
let video;

let poseNet;

let poses = [];



function setup() {

  createCanvas(640, 480);

  video = createCapture(VIDEO);

  video.size(width, height);

  video.hide();



  poseNet = ml5.poseNet(video, modelLoaded);

  poseNet.on('pose', function (results) {

    poses = results;

  });

}



function modelLoaded() {

  console.log('PoseNet model loaded');

}



function draw() {

  image(video, 0, 0, width, height);



  // Draw keypoints

  drawKeypoints();

  drawSkeleton();

}



function drawKeypoints() {

  for (let i = 0; i < poses.length; i++) {

    let pose = poses[i].pose;

    for (let j = 0; j < pose.keypoints.length; j++) {

      let keypoint = pose.keypoints[j];

      if (keypoint.score > 0.2) {

        fill(255, 0, 0);

        noStroke();

        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);

      }

    }

  }

}



function drawSkeleton() {

  for (let i = 0; i < poses.length; i++) {

    let skeleton = poses[i].skeleton;

    for (let j = 0; j < skeleton.length; j++) {

      let partA = skeleton[j][0];

      let partB = skeleton[j][1];

      stroke(0, 255, 0);

      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);

    }

  }

}