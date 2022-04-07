/*################################################################################################*/
/*####################################### CLIENTE MQTT ###########################################*/
/*################################################################################################*/

var wsbroker = "broker.hivemq.com";
var wsport = 8000; // port for above

var client = new Paho.MQTT.Client(
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

  var json = JSON.parse(message.payloadString);

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

var options = {
  timeout: 3,
  /* userName: "0kb6Z80B60ke22b",
  password: "HXqp1yNvMOgULm7", */
  onSuccess: function () {
    console.log("mqtt connected");
    // Connection succeeded; subscribe to our topic, you can add multile lines of these
    client.subscribe("testEc2021", { qos: 1 });
    //use the below if you want to publish to a topic on connect
    var me = '{"msg": "0" }';
    message = new Paho.MQTT.Message(me);
    message.destinationName = "vnrHurPu3Wvoayq";
    client.send(message);
  },
  onFailure: function (message) {
    console.log("Connection failed: " + message.errorMessage);
  },
};

function init() {
  client.connect(options);
}
