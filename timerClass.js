class Timer {
  constructor(durationInput, startButton, pauseButton, refreshButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    this.refreshButton = refreshButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
      this.onPause = callbacks.onPause;
      this.onRefresh = callbacks.onRefresh;
      this.onInputChange = callbacks.onInputChange;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
    this.refreshButton.addEventListener('click', this.refresh);
    this.durationInput.addEventListener('change', this.change);

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
    if (this.onStart) { //check if callbacks are given in timer
      this.onStart(this.timeRemaining); //getter, taking start value from input, and pass to onStart().
    }
    //  console.log(this); // solution 1. arrow function
    this.tick(); // first tick set manualy
    this.interval = setInterval(this.tick, 50); //because this is with delay
    //timer is 1, this is id of this interval, 50ms
    //this.interval => we can refer in other functions
  };
  /*start(){
    console.log(this); // solution 2. with bind
  }*/
  pause = () => {
    if (this.onPause) {
      this.onPause();
    }
    clearInterval(this.interval);
  };
  refresh = () => {
    if (this.onRefresh) {
      this.onRefresh();
    }
    clearInterval(this.interval);
    //this.start();
  };
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - .05; //setter and getter in one line
      if (this.onTick) {
        this.onTick(this.timeRemaining); // onTick gets changed value for input
      }
    }
    //  const timeRemaining = this.timeRemaining; // dont need(), because it is getter
    //  this.timeRemaining = timeRemaining -1;// value on rigth will be autmaticaly passed to setter
  };
  change = ()=>{
    if(this.onInputChange){
      this.onInputChange(this.timeRemaining);
    }
  }


  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  }
  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2); //round to 2 places after coma
  }
}

// TODO:
//1. disable play button when running DONE
//2. resume from place where stopped when pause clicked DONE
//3. add restart button to start from begining DONE
