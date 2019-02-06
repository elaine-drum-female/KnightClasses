// === JOSHUA BEVERLY JAVASCRIPT ===

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

// === ALEX BIHM JAVASCRIPT ===

var timeOfDay = 'dusk';

// ======= Battle Page =======
//I know this looks like a mess

var headVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkHead.gif').attr('id', 'head');
var bodyVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkBody.gif').attr('id', 'body');
var weaponVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/sword.gif').attr('id', 'legs');
var legsVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkFeet.gif').attr('id', 'legs');
$('#playerChar').append(headVar).append(bodyVar).append(weaponVar).append(legsVar);
$('#battle-background').addClass(timeOfDay);

var headEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defHead.gif').attr('id', 'head').addClass('enemyImg');
var bodyEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defBody.gif').attr('id', 'body').addClass('enemyImg');
var weaponEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/mace.gif').attr('id', 'legs').addClass('enemyImg');
var legsEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defFeet.gif').attr('id', 'legs').addClass('enemyImg');
$('#enemyChar').append(headEnemy).append(bodyEnemy).append(weaponEnemy).append(legsEnemy);


// ====== MVP/Presentation Code ======
//Where moment would be used. Also it's ugly here.

$(document).ready(function () {
    //when I press 1 it does this
    $('body').on('keydown', function (e) {
        var pressed = e.type == "keydown";
        if (e.which == 49) {
            $('#playerChar').addClass('move');
            $('#boom2').removeClass('hiddenImg');
            $('#enemyHP').html(' <div class="progress-bar" role="progressbar" style="width: 46%;" aria-valuenow="85"aria-valuemin="0" aria-valuemax="100">46%</div>')
        }

        // when I press 2 it does this
        if (e.which == 50) {
            $('#playerChar').removeClass('move');
            $('#boom2').addClass('hiddenImg');
        }
    });
});



$(document).ready(function () {
    //when I press Z it does this
    $('body').on('keydown', function (e) {
        var pressed = e.type == "keydown";
        if (e.which == 90) {
            $('#battle-background').removeClass('morning').removeClass('afternoon').removeClass('dusk').removeClass('night').addClass('dawn');
            timeOfDay = 'dawn';
            var headVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkHead.gif').attr('id', 'head');
            var bodyVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkBody.gif').attr('id', 'body');
            var weaponVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/sword.gif').attr('id', 'legs');
            var legsVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkFeet.gif').attr('id', 'legs');
            $('#playerChar').empty().append(headVar).append(bodyVar).append(weaponVar).append(legsVar);
            $('#battle-background').addClass(timeOfDay);

            var headEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defHead.gif').attr('id', 'head').addClass('enemyImg');
            var bodyEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defBody.gif').attr('id', 'body').addClass('enemyImg');
            var weaponEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/mace.gif').attr('id', 'legs').addClass('enemyImg');
            var legsEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defFeet.gif').attr('id', 'legs').addClass('enemyImg');
            $('#enemyChar').empty().append(headEnemy).append(bodyEnemy).append(weaponEnemy).append(legsEnemy);
        }
        if (e.which == 88) {
            $('#battle-background').removeClass('morning').removeClass('afternoon').removeClass('dusk').removeClass('night').addClass('morning');
            timeOfDay = 'morning';
            var headVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkHead.gif').attr('id', 'head');
            var bodyVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkBody.gif').attr('id', 'body');
            var weaponVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/sword.gif').attr('id', 'legs');
            var legsVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkFeet.gif').attr('id', 'legs');
            $('#playerChar').empty().append(headVar).append(bodyVar).append(weaponVar).append(legsVar);
            $('#battle-background').addClass(timeOfDay);

            var headEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defHead.gif').attr('id', 'head').addClass('enemyImg');
            var bodyEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defBody.gif').attr('id', 'body').addClass('enemyImg');
            var weaponEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/mace.gif').attr('id', 'legs').addClass('enemyImg');
            var legsEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defFeet.gif').attr('id', 'legs').addClass('enemyImg');
            $('#enemyChar').empty().append(headEnemy).append(bodyEnemy).append(weaponEnemy).append(legsEnemy);
        }
        if (e.which == 67) {
            $('#battle-background').removeClass('morning').removeClass('afternoon').removeClass('dusk').removeClass('night').addClass('afternoon');
            timeOfDay = 'afternoon';
            var headVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkHead.gif').attr('id', 'head');
            var bodyVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkBody.gif').attr('id', 'body');
            var weaponVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/sword.gif').attr('id', 'legs');
            var legsVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkFeet.gif').attr('id', 'legs');
            $('#playerChar').empty().append(headVar).append(bodyVar).append(weaponVar).append(legsVar);
            $('#battle-background').addClass(timeOfDay);

            var headEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defHead.gif').attr('id', 'head').addClass('enemyImg');
            var bodyEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defBody.gif').attr('id', 'body').addClass('enemyImg');
            var weaponEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/mace.gif').attr('id', 'legs').addClass('enemyImg');
            var legsEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defFeet.gif').attr('id', 'legs').addClass('enemyImg');
            $('#enemyChar').empty().append(headEnemy).append(bodyEnemy).append(weaponEnemy).append(legsEnemy);
        }
        if (e.which == 86) {
            $('#battle-background').removeClass('morning').removeClass('afternoon').removeClass('dusk').removeClass('night').addClass('dusk');
            timeOfDay = 'dusk';
            var headVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkHead.gif').attr('id', 'head');
            var bodyVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkBody.gif').attr('id', 'body');
            var weaponVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/sword.gif').attr('id', 'legs');
            var legsVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkFeet.gif').attr('id', 'legs');
            $('#playerChar').empty().append(headVar).append(bodyVar).append(weaponVar).append(legsVar);
            $('#battle-background').addClass(timeOfDay);

            var headEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defHead.gif').attr('id', 'head').addClass('enemyImg');
            var bodyEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defBody.gif').attr('id', 'body').addClass('enemyImg');
            var weaponEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/mace.gif').attr('id', 'legs').addClass('enemyImg');
            var legsEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defFeet.gif').attr('id', 'legs').addClass('enemyImg');
            $('#enemyChar').empty().append(headEnemy).append(bodyEnemy).append(weaponEnemy).append(legsEnemy);
        }
        if (e.which == 66) {
            $('#battle-background').removeClass('morning').removeClass('afternoon').removeClass('dusk').removeClass('night').addClass('night');
            timeOfDay = 'night';
            var headVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkHead.gif').attr('id', 'head');
            var bodyVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkBody.gif').attr('id', 'body');
            var weaponVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/sword.gif').attr('id', 'legs');
            var legsVar = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/atkFeet.gif').attr('id', 'legs');
            $('#playerChar').empty().append(headVar).append(bodyVar).append(weaponVar).append(legsVar);
            $('#battle-background').addClass(timeOfDay);

            var headEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defHead.gif').attr('id', 'head').addClass('enemyImg');
            var bodyEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defBody.gif').attr('id', 'body').addClass('enemyImg');
            var weaponEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/mace.gif').attr('id', 'legs').addClass('enemyImg');
            var legsEnemy = $('<img>').attr('src', 'assets/images/' + timeOfDay + '/defFeet.gif').attr('id', 'legs').addClass('enemyImg');
            $('#enemyChar').empty().append(headEnemy).append(bodyEnemy).append(weaponEnemy).append(legsEnemy);
        }
    });
});
