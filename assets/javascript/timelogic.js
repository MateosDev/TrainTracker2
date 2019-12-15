var config = {
    apiKey: "AIzaSyBsEbL2f2H5Pt44AZthZLJ4tHpAQy4qxko",
    authDomain: "traintimersmuhw.firebaseapp.com",
    databaseURL: "https://traintimersmuhw.firebaseio.com",
    projectId: "traintimersmuhw",
    storageBucket: "traintimersmuhw.appspot.com",
    messagingSenderId: "608709981538",
    appId: "1:608709981538:web:5c21557069710bd49ee83b"
  };


// Initialize Database
firebase.initializeApp(config);

var trainInfo = firebase.database();
// Testing connection
console.log(trainInfo);