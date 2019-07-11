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

// FUNCTIONS
//========================

// Function to get Next Arrival Time based on first train and frequency
function nextArrivalTime(firstTime, tFrequency) {
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    return moment(nextTrain).format("hh:mm");
}

// Function to get  minutes to train arrival based first train and frequency
function nextArrivalMinutes(firstTime, tFrequency) {
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    return tMinutesTillTrain;
}

// EVENT FUNCTIONS
//========================
$("#submit").on("click", function (event) {
    event.preventDefault();
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

    // Values from Firebase database
    var trainDB = snapshot.val().train;
    var destinationDB = snapshot.val().destination;
    var firstTimeDB = snapshot.val().firstTrainTime;
    var frequencyDB = snapshot.val().frequency;

    // Generate table data
    var tableRow = $("<tr>");
    tableRow.append(
        "<td>"
        + trainDB + "</td><td>"
        + destinationDB + "</td><td>"
        + frequencyDB + "</td><td>"
        // Run function to get next arrival time
        + nextArrivalTime(firstTimeDB, frequencyDB)
        // Run function to get minutes to arrival
        + "</td><td>" + nextArrivalMinutes(firstTimeDB, frequencyDB)
        + "</td>");
    // Append table data to table
    $("#trainsDisplay").append(tableRow);
});

