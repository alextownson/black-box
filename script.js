// access to gyroscope: https://www.youtube.com/watch?v=AbB9ayaffTc&t=820s

let permissionGranted = false;
let play = 0;
let cnv;
let reverb, delay, dryWetRev, dryWetDel;
let cube;
let dz, dx, dy;
// let record;
// let mic, recorder, soundFile;
let state = 0;


function preload() {
  soundFile = loadSound('assets/Kick.wav');
}

function setup() {
    cnv = createCanvas(window.innerWidth, window.innerHeight, WEBGL);
    frameRate(60);
    angleMode(DEGREES);

// taken from the p5 sound reference page

        // // create an audio in
        // mic = new p5.AudioIn();

        // // prompts user to enable their browser mic
        // mic.start();
    
        // // create a sound recorder
        // recorder = new p5.SoundRecorder();
    
        // // connect the mic to the recorder
        // recorder.setInput(mic);
    
        // // this sound file will be used to
        // // playback & save the recording
        // soundFile = new p5.SoundFile();
    
    
        // Record Samples
    
        // record = createButton('');
        // record.addClass("record");
        // record.mousePressed(() => {
        //     if(state === 0 && mic.enabled){
        //         recorder.record(soundFile);
        //         record.style('background-color', 'red');
        //         state++;
        //     }else if(state === 1){
        //         record.style('background-color', 'white');
        //         recorder.stop();
        //         state = 0;
        //     }
        // });

        reverb = new p5.Reverb();
        reverb.process(soundFile, 2, 1);
        delay = new p5.Delay();
        delay.process(soundFile, 0.12, .7, 2300);    

    // DeviceOrientationEvent, DeviceMotionEvent
    if(typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function'){
    
    //  ios 13 device

    cube = windowWidth/3;
    
    DeviceOrientationEvent.requestPermission()
        .catch(() => {
            let button1 = createButton("Click to allow access to sensors");
            button1.style("font-size", "24px")
            button1.mousePressed( requestAccess );
            button1.addClass('button1');
            throw error;
        })
        .then(() => {
            // on any subsequent visits
            permissionGranted = true;
        })
 
  } else {
    // if on a computer
    cube = windowWidth/5;
  }
}

function requestAccess(){
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if(response == 'granted') {
          permissionGranted = true;
      } else{
          permissionGranted = false;
      }
    })
  .catch(console.error);

  this.remove();
}


function draw() {

    // if on a computer
    if(cube == windowWidth/5 ){
        dy = (mouseX-windowWidth/2)/30;
        dx = (mouseY-windowHeight/2)/15;
        dz = 0;

        background(255); 
        fill(0);
        stroke(255);
        strokeWeight(3)
    
        push();
        rotateZ(dz * -1)
        rotateX(dx * -1)
        rotateY(dy)
        box(cube);
        pop();

        dryWetRev = (dx)/60;
        reverb.drywet(dryWetRev);

        dryWetDel = (dx)/-60;
        delay.drywet(dryWetDel);

        soundFile.pan(dy/37)
    }

    if (!permissionGranted) return;

    background(255); 
    fill(0);
    stroke(255);
    strokeWeight(3)

    dx = rotationX;
    dy = rotationY;

    push();
    rotateX(dx * -1)
    rotateY(dy)
    box(cube);
    pop();

    dryWetRev = (dx)/180;
    reverb.drywet(dryWetRev);

    dryWetDel = (dx)/-180;
    delay.drywet(dryWetDel);

    soundFile.pan(dy/90)


}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight, WEBGL);
    cube = windowWidth/5;
  };

function keyPressed (){
    {if ( play === 1 && keyCode === 32){
        soundFile.stop();
        play = 0;
      }else if ( play=== 0 && keyCode === 32)
      {soundFile.loop();
      play = 1;} 
    };
}

function touchStarted (){
  {if (play === 1 && cube == windowWidth/3){
      soundFile.stop();
      play = 0;
    }else if (play === 0 && cube == windowWidth/3)
    {soundFile.loop();
    play = 1;} 
  };
}

    
