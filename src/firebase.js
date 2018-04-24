
import * as firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBAT4OQjAWJPvjn7RlmVLo0xWvaCy66Rbg",
    authDomain: "kevinyehprofile.firebaseapp.com",
    databaseURL: "https://kevinyehprofile.firebaseio.com",
    projectId: "kevinyehprofile",
    storageBucket: "",
    messagingSenderId: "324140635221"
  };
  firebase.initializeApp(config);

export const database = firebase.database().ref('/notes');