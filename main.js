objects=[];
Status="";
song="";


function preload() {
    song=loadSound("alert.mp3")
}

function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    ObjectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects";
}

function modelloaded() {
    console.log("modelloaded");
    Status=true;
}

function draw() {
    image(video,0,0,380,380);

    if(Status!="") {
        ObjectDetector.detect(video,GotResult);
        for(i=0;i<objects.length;i++) {
         r=random(255);
         g=random(255);
         b=random(255);
         fill(r,g,b);
         textSize(25);
         percent=floor(objects[i].confidence*100);
         text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
         noFill();
         stroke(r,g,b);
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
         if(objects[i].label=="person"){
            document.getElementById("numberofobjects").innerHTML="Baby found :";
            song.stop();
         }
         else{
            document.getElementById("numberofobjects").innerHTML="Baby not found :";
            song.play();
         }
        }
         if(objects.length==0){
            document.getElementById("numberofobjects").innerHTML="Baby not found :";
            song.play();
         }
    }

}

function GotResult(error,results) {
    if(error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects=results;
    }
}

