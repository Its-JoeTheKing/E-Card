const unset = () => {
	$("#emperor").css({'transform': 'translate(0px, 0px)'})
	$("#citizen1").css({'transform': 'translate(0px, 0px)'})
	$("#citizen2").css({'transform': 'translate(0px, 0px)'})
	$("#citizen3").css({'transform': 'translate(0px, 0px)'})
	$("#slave").css({'transform': 'translate(0px, 0px)'})
}
const hideCards = () => {
	$("#emperor").animate({marginBottom: '-250px'}, 1000)
	$("#citizen1").animate({marginBottom: '-250px'}, 1200)
	$("#citizen2").animate({marginBottom: '-250px'}, 1400)
	$("#citizen3").animate({marginBottom: '-250px'}, 1600)
	$("#slave").animate({marginBottom: '-250px'}, 1000)
	$(".timer").animate({marginLeft: "-210%"}, 2000)
	setTimeout(()=>{
		$(".timer").hide()
		$(".result").css({'display': "flex"})
		$(".cards").hide()
	}, 2000)
}
const putCards = (citizens, special) => {
	$(".timer").animate({marginLeft: "-0%"}, 2000)
	setTimeout(()=>{
		$(".timer").css({'display': "flex"})
		$(".result").hide()
	}, 2000)
	while (citizens > 0) {
		$("#citizen"+citizens).show()
		citizens--;
	}
	if (special != "") {
		$("#"+special).show()
	}
	$("#emperor").animate({marginBottom: '0px'}, 1000)
	$("#citizen1").animate({marginBottom: '0px'}, 1200)
	$("#citizen2").animate({marginBottom: '0px'}, 1400)
	$("#citizen3").animate({marginBottom: '0px'}, 1600)
	$("#slave").animate({marginBottom: '0px'}, 1000)
}
const showWinner = (p1,p2) =>
{
	$(".res").show()
	console.log(p1+p2)
	document.getElementById("result").innerHTML += "<div class='res'><img src='./imgs/"+p1+".jpg'></div>"
	document.getElementById("result").innerHTML += "<div class='res'><img src='./imgs/"+p2+".jpg'></div>"
}
$("#emperor").click(()=>{
	unset()
	$("#emperor").css({'transform': 'translate(0px,-10px)'})
})
$("#slave").click(()=>{
	unset()
	$("#slave").css({'transform': 'translate(0px,-10px)'})
})
$("#citizen1").click(()=>{
	unset()
	$("#citizen1").css({'transform': 'translate(0px,-10px)'})
})
$("#citizen2").click(()=>{
	unset()
	$("#citizen2").css({'transform': 'translate(0px,-10px)'})
})
$("#citizen3").click(()=>{
	unset()
	$("#citizen3").css({'transform': 'translate(0px,-10px)'})
})
$(".m-cont").click(()=>{
	navigator.clipboard.writeText($("#room").val())
	$(".succ").css({'display': 'flex'})
})