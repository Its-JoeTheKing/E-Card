io = io("https://ecard-server.adaptable.app")

const count = (sec) => {
    var i = sec;
    setInterval(()=>{
        if (i>0) {
            i--;
            $("#counter").text(i)
        }
    },1000)
}

const checkWinner = (player1, player2) => {
    if (player1 === player2) return "tie";
    
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
    return outcomes[key] || "time out";
};

var token = ""
var reacted = ""
var selected = ""
var res = "tie"
var citizens = 3

token = window.location.href.split("?token=")[1]
const t = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
$("#emperor").click(()=>{
    io.emit("action", "emperor" ,token)
    selected = "emperor"
    special = ""
})
$("#slave").click(()=>{
    io.emit("action", "slave" ,token)
    selected = "slave"
    special = ""
})
$("#citizen1").click(()=>{
    io.emit("action", "citizen" ,token)
    selected = "citizen"
    citizens--;
})
$("#citizen2").click(()=>{
    io.emit("action", "citizen" ,token)
    selected = "citizen"
    citizens--;
})
$("#citizen3").click(()=>{
    io.emit("action", "citizen" ,token)
    selected = "citizen"
    citizens--;
})

const startGame = () => {
    count(10)
    putCards(citizens, special)
    setTimeout(()=>{
        hideCards()
        showWinner(selected, reacted)
        setTimeout(()=>{
            putCards(citizens, special)
        },3000)
    }, 11000)
    return checkWinner(selected, reacted)
}

// check if he is the second player
if (token)
{
    special = "slave"
    $(".model").hide()
    io.on("action", (react)=>{
        reacted = react
    })
    io.emit("join-room", token)
    io.emit("player2", token)
    for (let i = 0; i < 3; i++) {
        setTimeout(()=>{
            res = startGame()
            console.log(res)
            if (res !== "tie") {
                alert(res)
            }
        },i * 13000)
    }
}
// first player
else {
	special = "emperor"
    token = ""
	for (let i = 0; i < 7; i++) {
		token+=t[Math.floor(Math.random()*t.length)]
    }
    io.on("action", (react)=>{
        reacted = react
    })
	$("#room").val(window.location.origin+"?token="+token)
    io.emit("join-room", token)
    io.on("ready", ()=>{
        $(".model").hide()
        for (let i = 0; i < 3; i++) {
            setTimeout(()=>{
                res = startGame()
                console.log(res)
                if (res !== "tie") {
                    alert(res)
                }
            },i * 13000)
        }
    })
}


