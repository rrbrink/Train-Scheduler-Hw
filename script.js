


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAcJrJoSyJrsYxLGHfJ9X4Gb2pL1Jl2ay0",
    authDomain: "saturdayinclass.firebaseapp.com",
    databaseURL: "https://saturdayinclass.firebaseio.com",
    projectId: "saturdayinclass",
    storageBucket: "",
    messagingSenderId: "662507756778"
  };
  firebase.initializeApp(config);

  var db = firebase.database();

  $("#submit").on("click", function () {
      event.preventDefault();
      console.log("test");
      var name = $("#name").val().trim();
      var dest = $("#dest").val().trim();
      var firstAriv = $("#time").val().trim();
      var freq = $("#freq").val().trim();
      db.ref("/employees").push({
         name: name,
         dest: dest,
         firstAriv: firstAriv,
         freq: freq
     });
  });

  db.ref("/employees").on("child_added", function(snapshot){
    var data = snapshot.val();
    console.log(data);
    var tFreq = parseInt(data.freq);
    console.log("this is time freq", tFreq);
    var firstAriv = data.firstAriv;
    var convertedTime = moment(firstAriv, "hh:mm").subtract(1, "years");
    console.log(convertedTime);
    var currentTime = moment()
    console.log("this is our current time", currentTime);
    var diffTime = moment().diff(moment(convertedTime), "minutes");
    console.log("this is out diference in time between now and converted time", diffTime);
    var tRemander = diffTime % tFreq;
    console.log("train remander", tRemander);
    var minutesTillTrain = tFreq - tRemander
    console.log("minutes till train: ", minutesTillTrain );
    var nextTrain = moment().add(minutesTillTrain, "minutes")
    var arivalTime = moment(nextTrain).format("hh:mm")


    $("#table-body").append(`<tr><td>${data.name}</td><td>${data.dest}</td><td>${data.firstAriv}</td><td>${data.freq}</td><td>${arivalTime}</td><td>${minutesTillTrain}</td></tr>`);
  });
  // Assume the following situations.
  // (TEST 1)
  // First Train of the Day is 3:00 AM
  // Assume Train comes every 3 minutes.
  // Assume the current time is 3:16 AM....
  // What time would the next train be...? (Use your brain first)
  // It would be 3:18 -- 2 minutes away
  // (TEST 2)
  // First Train of the Day is 3:00 AM
  // Assume Train comes every 7 minutes.
  // Assume the current time is 3:16 AM....
  // What time would the next train be...? (Use your brain first)
  // It would be 3:21 -- 5 minutes away

  //solve this using hardcore math
  // Solved Mathematically
  // Test case 1:
  // 16 - 00 = 16
  // 16 % 3 = 1 (Modulus is the remainder)
  // 3 - 1 = 2 minutes away
  // 2 + 3:16 = 3:18
  // Solved Mathematically
  // Test case 2:
  // 16 - 00 = 16
  // 16 % 7 = 2 (Modulus is the remainder)
  // 7 - 2 = 5 minutes away
  // 5 + 3:16 = 3:21
