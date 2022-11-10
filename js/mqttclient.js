/*################################################################################################*/
/*####################################### CLIENTE MQTT ###########################################*/
/*################################################################################################*/

let wsbroker = "broker.hivemq.com";
let wsport = 8000; // port for above

let client = new Paho.MQTT.Client(
	wsbroker,
	wsport,
	"/ws",
	"myclientid_" + parseInt(Math.random() * 100)
);

client.onConnectionLost = function (responseObject) {
	console.log("connection lost: " + responseObject.errorMessage);
};

/*################################################################################################*/
/*####################################### LLEGADA DEL MENSAJE########################################*/
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

	let contenedorUnoUbicacionLat ="";
	let contenedorUnoUbicacionLong ="";
	let contenedorDosUbicacionLat ="";
	let contenedorDosUbicacionLong ="";

	/*################################################################################################*/
	/*####################################### VALIADAR SI ESTA LLENO EL CONTENEDOR####################*/
	/*################################################################################################*/

	if(json.contenedores[0].state=="lleno"){
		contenedorUnoUbicacionLat=json.contenedores[0].ubicacion.lat;
		contenedorUnoUbicacionLong=json.contenedores[0].ubicacion.long;
	}
	if(json.contenedores[1].state=="lleno"){
		contenedorDosUbicacionLat=json.contenedores[1].ubicacion.lat;
		contenedorDosUbicacionLong=json.contenedores[1].ubicacion.long;
	}

	let location = [
		[
			"Contenedor 1",
			contenedorUnoUbicacionLat,
			contenedorUnoUbicacionLong,
			1,
		],
		[
			"Contenedor 2",
			contenedorDosUbicacionLat,
			contenedorDosUbicacionLong,
			2,
		],
	];

	/*################################################################################################*/
	/*####################################### DIBUJAR POSICIONES EN EL MAPA ##########################*/
	/*################################################################################################*/
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
