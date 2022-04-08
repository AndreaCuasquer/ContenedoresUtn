/*################################################################################################*/
/*####################################### CLIENTE MQTT ###########################################*/
/*################################################################################################*/

let wsbroker = "broker.hivemq.com";
let wsport = 8000; // port for above

let client = new Paho.MQTT.Client(
	wsbroker,
	wsport,
	"myclientid_" + parseInt(Math.random() * 100, 10)
);

client.onConnectionLost = function (responseObject) {
	console.log("connection lost: " + responseObject.errorMessage);
};

/*################################################################################################*/
/*####################################### LLEGA EL MENSAJE########################################*/
/*################################################################################################*/

client.onMessageArrived = function (message) {
	console.log(message.payloadString);
	let json = JSON.parse(message.payloadString);
	/* Contenedor 1 */
	document.getElementById("contenedorUnoVolumen").innerHTML =
		json.contenedores[0].volumen + " m3";
	document.getElementById("contenedorUnoCo").innerHTML =
		json.contenedores[0].co2 + " ..";
	document.getElementById("contenedorUnoPeso").innerHTML =
		json.contenedores[0].peso + " kg";
	0;

	/* Contenedor 2 */
	document.getElementById("contenedorDosVolumen").innerHTML =
		json.contenedores[1].volumen + " m3";
	document.getElementById("contenedorDosCo").innerHTML =
		json.contenedores[1].co2 + " ..";
	document.getElementById("contenedorDosPeso").innerHTML =
		json.contenedores[1].peso + " kg";
	console.log(json.contenedores[0].ubicacion.lat);

	let location = [
		[
			"Contenedor 1",
			json.contenedores[0].ubicacion.lat,
			json.contenedores[0].ubicacion.long,
			1,
		],
		[
			"Contenedor 2",
			json.contenedores[1].ubicacion.lat,
			json.contenedores[1].ubicacion.long,
			2,
		],
	];

	draw(location);
};

let options = {
	timeout: 3,
	onSuccess: function () {
		console.log("mqtt connected");
		client.subscribe("testEc2021", { qos: 1 });
	},
	onFailure: function (message) {
		console.log("Connection failed: " + message.errorMessage);
	},
};

function init() {
	client.connect(options);
}
