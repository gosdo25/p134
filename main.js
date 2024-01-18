status="";
object=[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
     video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
   
}
function preload(){
    song1=loadSound("alarm.wav")
}
function start(){
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status:detecting objects";
}
function modelloaded(){
    console.log("modelloaded");
    status=true;
   
}
function gotResults(error,results){
if(error){
    console.log(error);
}
else{
    console.log(results);
    object=results;
}
}


function draw(){
    image(video,0,0,380,390);
    
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResults)
        document.getElementById("status").innerHTML="Status: Object detected";
        for(var i=0;i<object.length;i++){
            percent=floor(object[i].confidence*100);
            fill(r,g,b);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            
            if(object[i].label == "person"){
        document.getElementById("baby").innerHTML="Baby is detected"
        song.stop();
            }
            else{
                document.getElementById("baby").innerHTML="Baby is not detected"
        song.play();
            }
        }
        if(object.length<0){
            document.getElementById("baby").innerHTML="Baby is not detected"
            song.play();
        }
    }
   



}