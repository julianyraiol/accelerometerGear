
var client = new Paho.MQTT.Client("broker.hivemq.com", 8000, "testeGear");
var status = document.querySelector('#status');

client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

client.connect({
    onSuccess: onConnect,
    onFailure: onFailure
});


status.innerHTML = "tentando";

function onConnect() {
  sendMessage("Hello", false, getTopico()+"/World", 2);
  document.getElementById("status").style.color = "green";
  document.getElementById("status").innerHTML = "Ok";
}

function onFailure(invocation, error, message) {
    console.log('Conexão com o broker falhou: ERRO ' + error +  '==>'  + message);
    document.getElementById('status').style.color = 'red';
    document.getElementById('status').innerHTML = 'Conexão com o broker falhou : ' + error + '==>' + message;
}
	
function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
        document.getElementById("status").style.color = "red";
        document.getElementById("status").innerHTML = "Conexao Perdida :  " + responseObject.errorMessage;
    }
}

function onMessageArrived(message) {
  console.log("onMessageArrived:"+message.payloadString);
}

function getTopico() {
    return "/ocean/gear";
}

function sendMessage(msg, json, topic, qos) {
	var retain = true;
	if(topic === null || topic === 'undefined' || topic === undefined){
		topic = getTopico();
	}
	if(qos === null || qos === 'undefined' || qos === undefined){
		qos = 0;
		retain = false;
	}
    if (json === true) {
        msg = JSON.stringify(msg);
    }else{
    	msg = msg.toString();
    }
    var message = new Paho.MQTT.Message(msg);
    message.destinationName = topic;
    message.qos = qos;
    client.send(message);
    console.log(msg);
}
