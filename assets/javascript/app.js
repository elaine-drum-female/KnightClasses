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
var userHelmet = "";
var userArmor = "";
var userLegs = "";
var userWeapon = "";

$('#sign-up').click(() => {
    if ($('#password').val() === $('#confirm-password').val()) {
        firebase.auth().createUserWithEmailAndPassword($('#email').val(), $('#confirm-password').val()).then(() => {
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

$('#headSelect img').click(function () {
    if (userHelmet == "") {
        userHelmet = $(this).attr('data-name');
        $(this).css('box-shadow', '0px 0px 40px 5px blue');
        $(this).css('border-radius', '30px');
    }
})
$('#armorSelect img').click(function () {
    if (userArmor == "") {
        userArmor = $(this).attr('data-name');
        $(this).css('box-shadow', '0px 0px 40px 5px blue');
        $(this).css('border-radius', '30px');
    }
})
$('#feetSelect img').click(function () {
    if (userLegs == "") {
        userLegs = $(this).attr('data-name');
        $(this).css('box-shadow', '0px 0px 40px 5px blue');
        $(this).css('border-radius', '30px');
    }
})
$('#weaponSelect img').click(function () {
    if (userWeapon == "") {
        userWeapon = $(this).attr('data-name');
        $(this).css('box-shadow', '0px 0px 40px 5px blue');
        $(this).css('border-radius', '10px');
    }
})

$('#save-character').click(() => {
    let user = firebase.auth().currentUser;
    if (user != null) {
        database.collection('Users').doc().set({
            Helmet: {
                HelmetType: userHelmet,
                HelmetHP: 0
            },
            Armor: {
                ArmorType: userArmor,
                ArmorHP: 0
            },
            Legs: {
                LegsType: userLegs,
                LegsHP: 0
            },
            Weapon: {
                WeaponType: userWeapon,
                WeaponHP: 0
            },
            User: {
                UserID: user.uid,
                UserHP: 0
            }
        })
    }
    else $('#creationWarning').html("You are not currently logged in.");
})

$('#start-over').click(() => {

})

var trait;
var randomName;

function getTrait() {
    let word;
    switch (helmetType) {
        case "atkHelmet":
            word = "dangerous";
        case "defHelmet":
            word = "strong";
        default:
            word = "balanced";
    }

    if (word != null) {
        var traitURL = "https://words.bighugelabs.com/api/2/a85a4a45d7751f10b8e91fe7c7255798/" + word + "/json";
        $.ajax(traitURL).then(function (response) {
            let jsonData = JSON.parse(response);
            var synonym = jsonData.adjective.syn;
            var trait = synonym[Math.floor(Math.random() * synonym.length)];
        });
    };
}


var nameURL = "https://uinames.com/api/?region=germany&gender=male&minlen=6&maxlen=13&amount=250";
$.ajax(nameURL).then(function (response) {
    randomName = response[Math.floor(Math.random(), response.length)].surname;
    $('#charName').text(trait + "Knight" + randomName);
});