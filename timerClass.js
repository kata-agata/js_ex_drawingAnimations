class Timer {
  constructor(durationInput,startButton,pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks){
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

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
    if(this.onStart){ //check if callbacks are given in timer
      this.onStart(this.timeRemaining);
    }
    //  console.log(this); // solution 1. arrow function
    this.tick(); // first tick set manualy
    this.interval = setInterval(this.tick, 50);//because this is with delay
    //timer is 1, this is id of this interval
    //this.interval => we can refer in other functions
  };
  /*start(){
    console.log(this); // solution 2. with bind
  }*/
  pause = () => {
    clearInterval(this.interval);
  };
  onDurationChange(){

  }
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if(this.onComplete){
        this.onComplete();
      }
    } else {
        this.timeRemaining = this.timeRemaining - .05; //setter and getter in one line
        if(this.onTick){
          this.onTick(this.timeRemaining);
        }
    }
  //  const timeRemaining = this.timeRemaining; // dont need(), because it is getter
  //  this.timeRemaining = timeRemaining -1;// value on rigth will be autmaticaly passed to setter
  };

  get timeRemaining(){ // getter
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time){
    this.durationInput.value = time.toFixed(2); //round to 2 places after coma
  }
}
