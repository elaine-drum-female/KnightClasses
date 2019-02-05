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
var trait = "";
var name = "";
var signedIn = false;

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
$('.sign-in').click(() => {
    if (signedIn) {
        firebase.auth().signOut().then(() => {
            location.reload();
        })
    }
})
$('#sign-in').click(() => {
    firebase.auth().signInWithEmailAndPassword($('#sign-in-email').val(), $('#sign-in-password').val()).then(() => {
        $('#sign-in-modal').modal('hide');
        retrieveCharacter();
        signInUser();
    }, (error) => {
        $('#sign-in-status').text(`ERROR: ${error.message}`)
    })
})

$('#headSelect img').click(function () {
    let child = $('#headSelect').children();
    for (let i = 0; i < child.length; i++) {
        $(child[i]).attr('selected', false);
        $(child[i]).removeAttr('style');
    }
    $(this).attr('selected', 'selected');
    $(this).css('box-shadow', '0px 0px 40px 5px blue');
    $(this).css('border-radius', '10px');
})
$('#armorSelect img').click(function () {
    let child = $('#armorSelect').children();
    for (let i = 0; i < child.length; i++) {
        $(child[i]).attr('selected', false);
        $(child[i]).removeAttr('style');
    }
    $(this).attr('selected', 'selected');
    $(this).css('box-shadow', '0px 0px 40px 5px blue');
    $(this).css('border-radius', '10px');
})
$('#feetSelect img').click(function () {
    let child = $('#feetSelect').children();
    for (let i = 0; i < child.length; i++) {
        $(child[i]).attr('selected', false);
        $(child[i]).removeAttr('style');
    }
    $(this).attr('selected', 'selected');
    $(this).css('box-shadow', '0px 0px 40px 5px blue');
    $(this).css('border-radius', '10px');
})
$('#weaponSelect img').click(function () {
    let child = $('#weaponSelect').children();
    for (let i = 0; i < child.length; i++) {
        $(child[i]).attr('selected', false);
        $(child[i]).removeAttr('style');
    }
    $(this).attr('selected', 'selected');
    $(this).css('box-shadow', '0px 0px 40px 5px blue');
    $(this).css('border-radius', '10px');
})

$('#save-character').click(() => {
    saveCharacter();
})

$('#start-over').click(() => {
    database.collection('Characters').doc($('.character-name').text()).delete().then(() => {
        location.reload();
    })
})

function signInUser() {
    if (firebase.auth().currentUser) {
        let user = firebase.auth().currentUser;
        $('.btn-sign-up').prop('disabled', true);
        $('.sign-in').text(`Sign Out (${user.email})`).css('color', 'red');
        signedIn = true;
    }
}

function loadSelectedParts() {
    let heads = $('#headSelect').children('img');
    let armors = $('#armorSelect').children('img');
    let feets = $('#feetSelect').children('img');
    let weapons = $('#weaponSelect').children('img');

    for (let i = 0; i < heads.length; i++) {
        if ($(heads[i]).attr('selected')) userHelmet = $(heads[i]).attr('data-name');
    }
    for (let i = 0; i < armors.length; i++) {
        if ($(armors[i]).attr('selected')) userArmor = $(armors[i]).attr('data-name');
    }
    for (let i = 0; i < feets.length; i++) {
        if ($(feets[i]).attr('selected')) userLegs = $(feets[i]).attr('data-name');
    }
    for (let i = 0; i < weapons.length; i++) {
        if ($(weapons[i]).attr('selected')) userWeapon = $(weapons[i]).attr('data-name');
    }
}

function setName() {
    $('.character-name').text(`${trait} ${name}`);
}

function retrieveCharacter() {
    let user = firebase.auth().currentUser;
    if (user) {
        database.collection('Characters').get().then(result => {
            for (let i = 0; i < result.docs.length; i++) {
                if (result.docs[i].data().User.UserID == user.uid) {
                    $('.character-name').text(result.docs[i].id);

                    let heads = $('#headSelect').children();
                    let armors = $('#armorSelect').children();
                    let feets = $('#feetSelect').children();
                    let weapons = $('#weaponSelect').children();

                    for (let j = 0; j < heads.length; j++) {
                        if ($(heads[j]).attr('data-name') == result.docs[i].data().Helmet.HelmetType) {
                            $(heads[j]).css('box-shadow', '0px 0px 40px 5px blue');
                            $(heads[j]).css('border-radius', '10px');
                            $(heads[j]).attr('selected', 'selected');
                        }
                    }
                    for (let j = 0; j < armors.length; j++) {
                        if ($(armors[j]).attr('data-name') == result.docs[i].data().Armor.ArmorType) {
                            $(armors[j]).css('box-shadow', '0px 0px 40px 5px blue');
                            $(armors[j]).css('border-radius', '10px');
                            $(armors[j]).attr('selected', 'selected');
                        }
                    }
                    for (let j = 0; j < feets.length; j++) {
                        if ($(feets[j]).attr('data-name') == result.docs[i].data().Legs.LegsType) {
                            $(feets[j]).css('box-shadow', '0px 0px 40px 5px blue');
                            $(feets[j]).css('border-radius', '10px');
                            $(feets[j]).attr('selected', 'selected');
                        }
                    }
                    for (let j = 0; j < weapons.length; j++) {
                        if ($(weapons[j]).attr('data-name') == result.docs[i].data().Weapon.WeaponType) {
                            $(weapons[j]).css('box-shadow', '0px 0px 40px 5px blue');
                            $(weapons[j]).css('border-radius', '10px');
                            $(weapons[j]).attr('selected', 'selected');
                        }
                    }
                    break;
                }
                return true;
            }
        })
    }
    return false;
}

function saveCharacter() {
    loadSelectedParts();

    let word;
    switch (userHelmet) {
        case 'atkHead':
            word = "dangerous";
            break;
        case 'defHead':
            word = "strong";
            break;
        default:
            word = "tied";
            break;
    }

    if (word) {
        let traitURL = `https://words.bighugelabs.com/api/2/a85a4a45d7751f10b8e91fe7c7255798/${word}/json`;
        let nameURL = `https://uinames.com/api/?region=germany&gender=male&minlen=6&maxlen=13&amount=250`;

        $.ajax(traitURL).then(response => {
            let json = JSON.parse(response);
            let syn = json.adjective.syn;
            if (trait == "") trait = syn[Math.floor(Math.random() * syn.length)].toUpperCase();
        })

        $.ajax(nameURL).then(response => {
            if (name == "") name = response[Math.floor(Math.random(), response.length)].surname.toUpperCase();

            let user = firebase.auth().currentUser;
            if (user != null) {
                database.collection('Characters').doc(`${trait.toUpperCase()} ${name.toUpperCase()}`).set({
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
                        BattleID: "",
                        LastMove: "",
                        UserHP: 0
                    }
                })
                setName();
            }
            else $('#creationWarning').html("You are not currently logged in.");
        })
    }
}

$(document).ready(() => {
    setTimeout(() => {
        retrieveCharacter();
    }, 500);
    setTimeout(() => {
        if ($('.character-name').text() != "CHARACTER NAME") {
            let result = $('.character-name').text();
            trait = result.split(' ')[0];
            name = result.split(' ')[1];
        }
        if (firebase.auth().currentUser) {
            signInUser();
        }
        else signedIn = false;
    }, 1000)
})
