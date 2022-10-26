//bool for timer/stopwatch
var stopwatch = true;

//bool to check if timer is on
var on = false;

//time for display
var hours = 0;
var mins = 0;
var secs = 0;

//goal time for timer
var goalHr = 0;
var goalMin = 0;
var goalSec = 0;
var goal = 0;
var currentTime = 0;

//create variable for timer
var timer;

function toggleStopwatch() {
    if (stopwatch) {
        //toggle stopwatch
        stopwatch = false;

        //change button name
        document.getElementById("toggle").innerHTML = "Stopwatch";

        //change heading
        document.getElementById("header").innerHTML = "<h1>Timer</h1>";

        //change title
        document.getElementById("title").innerHTML = "Timer";


    }
    else {
        //toggle stopwatch
        stopwatch = true;

        //change button name
        document.getElementById("toggle").innerHTML = "Timer";

        //change heading
        document.getElementById("header").innerHTML = "<h1>Stopwatch</h1>";

        //change title
        document.getElementById("title").innerHTML = "Stopwatch";

        //hide input
        document.getElementById("timeInput").style.display = "none";

        //show display
        document.getElementById("timeDisplay").style.display = "block";
    }

}

function formatDisplay() {
    //format display
    if (hours < 10 && hours >= 0 && hours != 00) {
        displayTime = "0" + hours + ":";
    }
    else {
        displayTime = hours + ":";
    }
    if (mins < 10 && mins >= 0 && mins != 00) {
        displayTime += "0" + mins + ":";
    }
    else {
        displayTime += mins + ":";
    }
    if (secs < 10 && secs > 0) {
        displayTime += "0" + secs;
    }
    else {
        displayTime += secs;
    }
}

function displayTimer() {
    var diplayTime;

    //format display
    formatDisplay();
    document.getElementById("timeDisplay").innerHTML = displayTime;

    if (!stopwatch) {
        //count down and stop at 0
        if (goal > 0) {
            goal--;
            currentTime++;

            //countdown
            if (currentTime % 3600 == 1 && hours > 0) {
                hours--;
                mins = 59;
                secs = 59;
            }
            else if (currentTime % 60 == 1 && mins > 0) {
                mins--;
                secs = 59;
            }
            else {
                secs--;
            }
        }
        else {
            playSound();
        }

    }
    else {
        console.log(hours + ":" + mins + ":" + secs);
        //set seconds
        if (secs > 59) {
            if(mins == 00){
                mins = 0;
            }
            mins ++;
            secs -= 60;
        }
        //set hours
        if (mins > 59) {
            if(hours == 00){
                hours = 0;
            }
            hours ++;
            mins -= 60;
        }

        //format display
        formatDisplay();
        document.getElementById("timeDisplay").innerHTML = displayTime;
        secs++;
    }

}

function playSound() {
    var audio = new Audio('assets/stop-beep.mp3');
    audio.play();
}

function startTimer() {

    if (!on) {
        //change button name
        document.getElementById("startBtn").innerHTML = "Stop";
        //hide input
        document.getElementById("timeInput").style.display = "none";

        //show display
        document.getElementById("timeDisplay").style.display = "block";

        //set goal time
        goalHr = document.getElementById("goalH").value;
        goalMin = document.getElementById("goalM").value;
        goalSec = document.getElementById("goalS").value;

        goal = Number((goalHr * 3600)) + Number((goalMin * 60)) + Number(goalSec);

        hours = goalHr;
        mins = goalMin;
        secs = goalSec;

        //set start display
        formatDisplay();
        document.getElementById("timeDisplay").innerHTML = displayTime;

        //start timer
        timer = setInterval(displayTimer, 1000);
        on = true;

    } else {
        //change button name
        document.getElementById("startBtn").innerHTML = "Start";

        //stop timer        
        clearInterval(timer);
        on = false;

        clearTime();
    }
}

function clearTime(button) {
    if (!stopwatch) {
        //hide display
        document.getElementById("timeDisplay").style.display = "none";

        //show input
        document.getElementById("timeInput").style.display = "flex";

        //reset display
        document.getElementById("timeDisplay").innerHTML = "00:00:00";

        //reset inputs
        document.getElementById("goalH").value = "00";
        document.getElementById("goalM").value = "00";
        document.getElementById("goalS").value = "00";
    }
    else {
        //check if button pressed
        if (button) {
            //reset display
            document.getElementById("timeDisplay").innerHTML = "00:00:00";
        }

    }

    //change button name
    document.getElementById("startBtn").innerHTML = "Start";

    //stop timer
    clearInterval(timer);
    on = false;

}