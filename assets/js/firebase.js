// Initialize Firebase
var config = {
  apiKey: "AIzaSyBLR3g3kBP0YIPnEQbj5AV8aVjAasyQl9I",
  authDomain: "train-schedule-5884b.firebaseapp.com",
  databaseURL: "https://train-schedule-5884b.firebaseio.com",
  projectId: "train-schedule-5884b",
  storageBucket: "train-schedule-5884b.appspot.com",
  messagingSenderId: "408592090367"
};

firebase.initializeApp(config);

var database = firebase.database();