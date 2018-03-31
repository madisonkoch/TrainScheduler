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
        const timeJoin = $("#hour").val().trim()+':'+$("#min").val().trim();
        var trainFirst = moment(timeJoin, "HH:mm").format("hh:mm");
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

        // Firebase event for adding trains
        database.ref().on("child_added", function(childSnapshot, prevChildKey) {
            //console.log(childSnapshot.val());

        // Store everything into a variable.
        var trainName = childSnapshot.val().name;
        var trainDest = childSnapshot.val().destination;
        var trainFirst = childSnapshot.val().first;
        var trainFreq = childSnapshot.val().frequency;

        // Check Train Info
            // console.log(trainName);
            // console.log(trainDest);
            // console.log(trainFirst);
            // console.log(trainFreq);

        // Calculate what time the nextTrain is & how many minutes away it is
        var trainFirst2 = moment(trainFirst, "hh:mm").subtract(1, "years");
        var timeCurrent = moment();
        var timeDiff = moment().diff(moment(trainFirst2),"minutes");
        var timeRemainder = timeDiff % trainFreq;
            //console.log("first" + trainFirst2);
            //console.log("current" + moment(timeCurrent).format("hh:mm"));
            //console.log("difference" + timediff);
            //console.log("remainder" + timeRemainder)

        var untilTrain = trainFreq - timeRemainder;
            // console.log("until next: " + untilTrain);
        
        var nextTrain = moment().add(untilTrain, "minutes");
        nextTrain = moment(nextTrain).format("h:mm A");
            // console.log("next arrival: " + nextTrain);
   
        // Add each train's data into the table
            $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td class='right'>" + 
            trainFreq + " min</td><td class='right'>" + nextTrain + "</td><td class='right'>" +untilTrain + " min</td></tr>");
            });
