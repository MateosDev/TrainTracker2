var config = {
    apiKey: "AIzaSyBsEbL2f2H5Pt44AZthZLJ4tHpAQy4qxko",
    authDomain: "traintimersmuhw.firebaseapp.com",
    databaseURL: "https://traintimersmuhw.firebaseio.com",
    projectId: "traintimersmuhw",
    storageBucket: "traintimersmuhw.appspot.com",
    messagingSenderId: "608709981538",
    appId: "1:608709981538:web:5c21557069710bd49ee83b"
  };


  firebase.initializeApp(config);
  var database = firebase.database();
  
  var train;
  var destination;
  var firstTime;
  var frequency;
  
  $("#submit").on("click", function () {
      event.preventDefault();
  
      var train = $("#train-name").val().trim();
      var destination = $("#destination").val().trim();
      var firstTime = $("#first-time").val().trim();
      var frequency = $("#frequency").val().trim();
  
      database.ref().push({
          train: train,
          destination: destination,
          firstTime: firstTime,
          frequency: frequency,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
  
  });
  
  function makeTable() {
      database.ref().on("child_added", function (snapshot) {
          var sv = snapshot.val();
  
          //first time adjusted to be in the past
          var firstTimeConverted = moment(sv.firstTime, "hh:mm").subtract(1, "day");
  
          //difference between times
          var timeDiff = moment().diff(firstTimeConverted, "minutes");
  
          //time until next train
          var tMinutesTillTrain = sv.frequency - timeDiff % sv.frequency;
  
          //time of arrival of the next train
          var nextTrain = moment().add(tMinutesTillTrain, "minutes");
          var nextTrainTime = moment(nextTrain).format("hh:mm");
  
          var newRow = $("<tr>");
  
          newRow.append($("<td>").text(sv.train));
          newRow.append($("<td>").text(sv.destination));
          newRow.append($("<td>").text(sv.frequency));
          newRow.append($("<td>").text(nextTrainTime));
          newRow.append($("<td>").text(tMinutesTillTrain));
  
          $("#table-body").append(newRow);
  
      }, function (errorObject) {
          console.log("Errors handled: " + errorObject.code);
      });
  }
  
  makeTable();
  
  //update the table every minute
  setInterval(updateTime, 60000);
  
  function updateTime() {
      $("#table-body").html("");
      makeTable();
  }