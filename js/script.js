var fixed = 2;
var limit = 4;
var textbox = document.querySelector('#textbox');
var textstatus = document.querySelector('#statusBT');
var value = 0;
var clear;

function startCount(){
	
	if(value === limit){
		window.removeEventListener('devicemotion', onDeviceMotion);
		textbox.innerHTML = "Start";
		stopCount();
	}	
	
	else{
		textbox.innerHTML = value;
		value+=1;
		window.addEventListener('devicemotion', onDeviceMotion);
		clear = setTimeout(function(){ startCount() }, 1000);
	}	
}

function stopCount(){
	clearTimeout(clear);
	value = 0;
}

function onDeviceMotion(event){
	
    var x = event.acceleration.x;
	sendMessage(x);
	textstatus.innerHTML = x;
	//textbox.innerHTML = event.acceleration.x;
}

textbox.addEventListener("click", function(){
	startCount();
	
});


