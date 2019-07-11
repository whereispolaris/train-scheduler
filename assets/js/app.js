// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCVzWLExJ0yRXkbt5LV9eWJLn6UJNtFTrk",
    authDomain: "train-scheduler-1e525.firebaseapp.com",
    databaseURL: "https://train-scheduler-1e525.firebaseio.com",
    projectId: "train-scheduler-1e525",
    storageBucket: "",
    messagingSenderId: "682902303998",
    appId: "1:682902303998:web:25b12ad9c31dc2dc"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// SETUP VARIALBLES
//========================
var database = firebase.database();
var nextArrival;
var minutesAway;
// FUNCTIONS
//========================



// EVENT FUNCTIONS
//========================
$("#submit").on("click", function (event) {
    event.preventDefault();
    console.log("form submitted");
    var train = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrainTime = $("#firstTrainTime").val().trim();
    var frequency = $("#frequency").val().trim();

    database.ref().push({
        train: train,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency
    });
});

database.ref().on("child_added", function (snapshot) {
    console.log();

    //Values from Firebase database
    var trainDB = snapshot.val().train;
    var destinationDB = snapshot.val().destination;
    var firstTimeDB = snapshot.val().firstTrainTime;
    var frequencyDB = snapshot.val().frequency;

    console.log("Name: " + trainDB + " ,First Time: " + firstTimeDB + ", Frequency: " + frequencyDB);



    var tableRow = $("<tr>");
    tableRow.append(
        "<td>" + trainDB + "</td><td>"
        + destinationDB + "</td><td>"
        + frequencyDB + "</td><td>"
        + nextArrival + "</td><td>" + minutesAway + "</td>");
    $("#trainsDisplay").append(tableRow);
});

