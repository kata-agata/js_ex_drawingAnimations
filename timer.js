const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const refreshButton = document.querySelector('#refresh');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let remainingDuration =0; //time remaining in actual moment
let startDuration = 0;//value set at start of counting time, when counter equals 0
let counter = 0;// counter of hown many times play button was clicked, refresh()and input change resets the counter
const timer = new Timer(durationInput, startButton, pauseButton, refreshButton, {
  onStart(totalDuration) { // way to communicate to outside world
    if(counter === 0){ // for first press of play button setting startDuration
      startDuration = totalDuration;
    }
    remainingDuration = totalDuration;// time left to 0
    counter++;
    //console.log(counter);
  },
  onRefresh() {
    counter = 0;//reset counter
    durationInput.value = startDuration; // starts counting from value set before
    drawCircle(startDuration,startDuration, perimeter);//draw full circle on refresh
  //  console.log('refresh', counter);
  },
  onTick(timeRemaining) {
    if(counter <= 1){
      drawCircle(timeRemaining,remainingDuration,perimeter); // drawing circle from the top
    } else{
      drawCircle(timeRemaining,startDuration, perimeter); // drawing circle where stopped when pause was clicked
    }
    startButton.disabled = true; //disable play button when running
    durationInput.disabled = true;// disable input when running
  },
  onPause() {
    console.log('paused');
    startButton.disabled = false; //enable start button when pause clicked
    durationInput.disabled = false;//enable input when pause clicked
  },
  onComplete() {
    console.log('timer completed');
  },
  onInputChange(timeRemaining){
    console.log('input change occurs');
    counter = 0; //reset counter
    startDuration = timeRemaining; // setting new startDuration

    drawCircle(timeRemaining,startDuration, perimeter);// circle starts from top
  }
});

function drawCircle(timeRemaining, totalTime, perimeter) {
  circle.setAttribute('stroke-dashoffset',
    perimeter * timeRemaining / totalTime - perimeter
  );
}
