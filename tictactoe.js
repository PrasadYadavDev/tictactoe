var clickCount = 0;
var timerValue = 10;
var hasStarted = false;
var interval;
var winning = ["0,1,2", "0,3,6", "0,4,8", "3,4,5", "6,7,8", "2,4,6", "1,4,7", "2,5,8"];


function tileClick(index) {
    if (hasStarted) {

        const tiles = document.getElementsByClassName("tile");
        if (tiles[index].innerHTML.length == 0) {

            tiles[index].innerHTML = clickCount % 2 == 0 ? "X" : "O";
            if (clickCount % 2 == 0) {
                tiles[index].classList.add("orange");
                tiles[index].classList.remove("blue");

            } else {
                tiles[index].classList.add("blue");
                tiles[index].classList.remove("orange");

            }

            clickCount = clickCount + 1;
            resetTime();
            disablePlayer();
            let playerWin = checkWinning(clickCount % 2 == 0 ? "O" : "X");
            if (playerWin) {
                if (clickCount % 2 == 0) {
                    document.getElementsByClassName("name")[1].innerHTML = "Winner !";
                } else {
                    document.getElementsByClassName("name")[0].innerHTML = "Winner !";

                }
                reset(false);
            }
            if (clickCount == 9 && !playerWin) {
                console.log("tie");
                document.getElementsByClassName("name")[0].innerHTML = "TIE !";
                document.getElementsByClassName("name")[1].innerHTML = "TIE !";
                reset(false);
                clearInterval(interval);
                timerValue = 10;
            }

        }
        // console.log(clickCount + " , " + index);
    }
}

function startClicked() {
    clickCount = 0;
    hasStarted = true;


    if (document.getElementById("start").innerHTML == "START") {
        disablePlayer();
        resetTime();
        document.getElementById("start").innerHTML = "STOP";
        const name = Array.from(document.getElementsByClassName("name"));
        for (let index = 0; index < 9; index++) {
            document.getElementsByClassName("tile")[index].innerHTML = "";
        }
        for (let index = 0; index < name.length; index++) {
            document.getElementsByClassName("name")[index].innerHTML = "";
        }
    } else {
        reset();

    }

}

function startTimer() {
    interval = setInterval(() => {
        if (timerValue == 0) {
            clearInterval(interval);
            console.log(clickCount);
            if (clickCount % 2 == 0) {
                document.getElementsByClassName("name")[1].innerHTML = "Winner !";

            } else {
                document.getElementsByClassName("name")[0].innerHTML = "Winner !";
            }
            reset();
            return;
        }
        timerValue = timerValue - 1;
        document.getElementById("time").value = timerValue;

    }, 1000)
}


function resetTime() {
    timerValue = 10;
    clearInterval(interval);
    startTimer();
}

function disablePlayer() {
    const players = document.getElementsByClassName("player");

    if (clickCount % 2 == 0) {
        players[1].classList.add("disabled");
        players[0].classList.remove("disabled");
    }
    else {
        players[0].classList.add("disabled");
        players[1].classList.remove("disabled");
    }
}

function reset(shouldReset = true) {
    const players = document.getElementsByClassName("player");

    players[1].classList.remove("disabled");
    players[0].classList.remove("disabled");
    const tiles = document.getElementsByClassName("tile");
    if (shouldReset) {
        for (let index = 0; index < tiles.length; index++) {
            document.getElementsByClassName("tile")[index].innerHTML = "";
        }

    }
    document.getElementById("start").innerHTML = "START";
    clearInterval(interval);
    timerValue = 10;
    document.getElementById("time").value = timerValue;
    hasStarted = false;

}

function checkWinning(player) {

    const tiles = Array.from(document.getElementsByClassName("tile"));
    let comb = [];
    let winningValue = false;
    tiles.forEach((element, index) => {
        if (element.innerHTML == player) {

            // comb += (index != 0 ? "," : "" )+ index;
            comb.push(index);
        }
    });
    winning.forEach(el => {
        // if (comb.includes(el)) {
        //     winningValue = true;
        // }
        let correctCount = 0;


        winningComb = el.split(",");
        winningComb.forEach(ele => {
            comb.forEach(c => {
                if (ele == c) {
                    correctCount += 1;
                }
            })
        })

        if (correctCount >= 3) {
            winningValue = true;
        }
        // return winningValue;
    })
    return winningValue;
}