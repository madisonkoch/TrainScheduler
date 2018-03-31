'use strict'

        //Initialize Firebase
        var config = {
            apiKey: "AIzaSyDjwYBrjYwM4GcdG9bs9zXpsucaD_CqoiI",
            authDomain: "employee-tracker-f9266.firebaseapp.com",
            databaseURL: "https://employee-tracker-f9266.firebaseio.com",
            projectId: "employee-tracker-f9266",
            storageBucket: "",
            messagingSenderId: "692129209953"
        };
        firebase.initializeApp(config);

    //create a variable to reference database
        var database = firebase.database();

    //
    $("#add-train-btn").on("click", function(event) {
        event.preventDefault();

        // Grabs user input
        var trainName = $("#train-name-input").val().trim();
        var trainDest = $("#dest-input").val().trim();
        const timeJoin = $("#hour")+':'+$("#min");
        var trainFirst = moment(timeJoin.val().trim(), "HH:mm").format("hh:mm A");
        var trainFreq = $("#freq").val().trim();

        // Creates local "temporary" object for holding employee data
        var newTrain = {
            name: trainName,
            destination: trainDest,
            first: trainFirst,
            frequency: trainFreq
        };

        // Uploads employee data to the database
        database.ref().push(newTrain);

        // Logs everything to console
        console.log(newTrain.name);
        console.log(newTrain.role);
        console.log(newTrain.start);
        console.log(newTrain.rate);


        // Clears all of the text-boxes
        $("#train-name-input").val("");
        $("#dest-input").val("");
        $("#hour").val("");
        $("#min").val("");
        $("#freq").val("");
    });

        // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
        database.ref().on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainFirst = childSnapshot.val().first;
        var trainFreq = childSnapshot.val().frequency;

        // Employee Info
        console.log(trainName);
        console.log(trainDest);
        console.log(trainFirst);
        console.log(trainFreq);

        // Prettify the employee start
        var trainFirstPretty = moment.unix(trainFirst).format("MM/DD/YY");

        // Calculate the months worked using hardcore math
        // To calculate the months worked
        var empMonths = moment().diff(moment.unix(trainFirst, "X"), "months");
        console.log(empMonths);

        // Calculate the total billed rate
        var empBilled = empMonths * trainFreq;
        console.log(empBilled);

        // Add each train's data into the table
        $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
        trainFirstPretty + "</td><td>" + empMonths + "</td><td>" + trainFreq + "</td><td>" + empBilled + "</td></tr>");
        });
