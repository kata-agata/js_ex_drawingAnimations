class Timer {
  constructor(durationInput,startButton,pauseButton) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  //  this.startButton.addEventListener('click', this.start.bind(this));

  /*  console.log(this);//first valid line before arrow start function
    _defineProperty(this, "start", ()=> {
      console.log(this);
    }) */

  }
/*  start(){
    console.log(this);//this is a buttonElement, not what we expect
  } */

  start = () => {
  //  console.log(this); // solution 1. arrow function
  this.tick(); // first tick set manualy
  this.interval = setInterval(this.tick, 1000);//because this is with delay
  //timer is 1, this is id of this interval
  //this.interval => we can refer in other functions
  }
  /*start(){
    console.log(this); // solution 2. with bind
  }*/
  pause = () => {
    clearInterval(this.interval);
  }
  onDurationChange(){

  }
  tick(){
    console.log('tick');
  }
}

const durationInput = document.querySelector('#duration');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');

const timer = new Timer(durationInput, startButton, pauseButton);
//timer.start();//instance of timer class
