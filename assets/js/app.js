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

var database = firebase.database();

console.log(database);


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