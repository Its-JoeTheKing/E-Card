// Assuming you want to establish a socket.io connection
io = io("https://e-card-server-9gav.onrender.com");

const count = (sec) => {
    let i = sec;
    const intervalId = setInterval(() => {
        if (i > 0) {
            i--;
            $("#counter").text(i);
        } else {
            clearInterval(intervalId); // Stop the interval when i reaches 0
        }
    }, 1000);
};

const checkWinner = (player1, player2) => {
    const outcomes = {
        "citizen-emperor": "You Lost",
        "citizen-slave": "You Won",
        "emperor-citizen": "You Won",
        "emperor-slave": "You Lost",
        "slave-citizen": "You Lost",
        "slave-emperor": "You Won",
        "citizen-citizen": "tie"
    };
    const key = `${player1}-${player2}`;
    selected = ""
    return outcomes[key] || "time out";
};

let token = "";
let reacted = "";
let selected = "";
let res = "tie";
let citizens = 3;
let special = ""; // Initialize special variable
let saction = "p1-action";

token = window.location.href.split("?token=")[1];

if (token) {
    saction = "p2-action";
}

const t = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z"
];

$("#emperor").click(() => {
    io.emit(saction, "emperor", token);
    selected = "emperor";
    special = "";
});

$("#slave").click(() => {
    io.emit(saction, "slave", token);
    selected = "slave";
    special = "";
});

$("#citizen1, #citizen2, #citizen3").click(() => {
    if (citizens > 0 && selected === "") {
        io.emit(saction, "citizen", token);
        selected = "citizen";
        citizens--;
    }
});

const startGame = () => {
    io.on("p2-action", (react) => {
        reacted = react;
    });
    
    io.on("p1-action", (react) => {
        reacted = react;
    });
    count(10);
    // Assuming putCards, hideCards, and showWinner functions are defined elsewhere
    putCards(citizens, special);
    setTimeout(() => {
        hideCards();
        showWinner(selected, reacted);
        setTimeout(() => {
            putCards(citizens, special);
        }, 3000);
    }, 11000);
    return checkWinner(selected, reacted);
};

let timeoutId = null;

function stopLoop() {
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
}

const gameOver = (result) => {
    if (result === "You Lost") {
        $(".gameOverLost").css({ "display": "flex" });
    }
    if (result === "You Won") {
        $(".gameOverWin").css({ "display": "flex" });
    }
};

// Check if it is the second player
if (token) {
    special = "slave";
    $(".model").hide();
    io.emit("join-room", token);
    io.emit("player2", token);

    let i = 0;

    function checkAndStartGame() {
        if (i < 4) {
            timeoutId = setTimeout(() => {
                let res = startGame();
                console.log(reacted + "vs" + selected);
                if (res !== "tie" && res !== "time out") {
                    stopLoop();
                    gameOver(res);
                } else {
                    checkAndStartGame(); // Continue the loop
                    i++;
                }
            }, (i !== 0) * 13000);
        }
    }

    checkAndStartGame();
}
// First player
else {
    special = "emperor";
    token = "";
    for (let i = 0; i < 7; i++) {
        token += t[Math.floor(Math.random() * t.length)];
    }
    $("#room").val(window.location.href.split("?")[0] + "?token=" + token);
    io.emit("join-room", token);
    io.on("ready", () => {
        $(".model").hide();
        let i = 0;

        function checkAndStartGame() {
            if (i < 4) {
                timeoutId = setTimeout(() => {
                    let res = startGame();
                    console.log(reacted + "vs" + selected);
                    if (res !== "tie" && res !== "time out") {
                        stopLoop();
                        gameOver(res);
                    } else {
                        checkAndStartGame(); // Continue the loop
                        i++;
                    }
                }, (i !== 0) * 13000);
            }
        }

        checkAndStartGame();
    });
}
