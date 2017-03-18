$(document).ready(function(){
  pushTrain();
})


var config = {
   apiKey: "AIzaSyAkBltIYfoCAFEuUzu26xfhPjvDSkNjY5A",
   authDomain: "train-app-eb817.firebaseapp.com",
   databaseURL: "https://train-app-eb817.firebaseio.com",
   storageBucket: "train-app-eb817.appspot.com",
   messagingSenderId: "332286021587"
 };

 firebase.initializeApp(config);
 var database = firebase.database();
 var newTrain = {};


  $("#trains").find("tr:gt(0)").remove();

 database.ref().on("child_added", function(childSnapshot){
 	pushTrain(childSnapshot.val());



});

$('#addTrain').on('click', function(){
    newTrain.name = $('#trainName').val();
    console.log(newTrain.name);
    newTrain.destination =$('#destination').val();
    console.log(newTrain.destination);
    newTrain.firstTime = $('#firstTime').val();
    console.log(newTrain.firstTime);
    newTrain.frequency = $('#frequency').val();
    console.log(newTrain.frequency);
    database.ref().push(newTrain);
});





function pushTrain(train){
	var tBody = $("<tbody>");
	var newRow=$("<tr>");
	tBody.append(newRow);

  var tFrequency = train.frequency;
  var name =train.name;
  var destination = train.destination;
  var now = moment();
  var firstTimeConverted = moment(train.firstTime, "hh:mm").subtract(1, "years");

  var diffTime = moment().diff(moment(firstTimeConverted), "hours");
  console.log (firstTimeConverted);
  console.log(diffTime);

  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log(tMinutesTillTrain);

  var nextTrain = moment().add(tMinutesTillTrain, "hours");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

	$("#trains").append(tBody);
	  newRow.append("<td>"+
		name+"</td><td>"+
		destination+"</td><td>"+
		tFrequency+"</td><td>"+
    nextTrain + "</td><td> "+
    tMinutesTillTrain + '</td>'
	)
}
