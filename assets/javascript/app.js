var config = {
    apiKey: "AIzaSyAZZB3ru2zE9BZixtVaqFZqKHb8SC5U1x4",
    authDomain: "knight-classes.firebaseapp.com",
    databaseURL: "https://knight-classes.firebaseio.com",
    projectId: "knight-classes",
    storageBucket: "",
    messagingSenderId: "31214320287"
};
firebase.initializeApp(config);

var database = firebase.firestore();

$('#sign-up').click(() => {
    if ($('#password').val() === $('#confirm-password').val()) {
        firebase.auth().createUserWithEmailAndPassword($('#email').val(), $('#confirm-password').val()).then(()=> {
            $('#sign-up-modal').modal('hide');
        }, (error) => {
            $('#sign-up-status').text(`ERROR: ${error.message}`);
        })
    }
    else {
        $('#sign-up-status').text("ERROR: Passwords do not match.");
    }
})

$('#sign-in').click(() => {
    firebase.auth().signInWithEmailAndPassword($('#sign-in-email').val(), $('#sign-in-password').val()).then(() => {
        $('#sign-in-modal').modal('hide');
        // Load character
    }, (error) => {
        $('#sign-in-status').text(`ERROR: ${error.message}`)
    })
})