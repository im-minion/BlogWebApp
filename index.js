firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //user is siggned in
        $('.login-cover').hide();

        /*Blog Displaying things*/

        var rootRef = firebase.database().ref();
        var BlogRef = rootRef.child("Blog");
        BlogRef.on('value', function (datasnapshot) {
            var newPost = datasnapshot.val();
            var totalNoOfObjects = 0;
            totalNoOfObjects = Object.keys(newPost).length;
            //console.log(totalNoOfObjects);
            for (var i = 0; i < totalNoOfObjects; i++) {
                //retrive temp.title,temp.description,temp.image,temp.username

                var temp = newPost[Object.keys(newPost)[i]];
                var title = temp.title;
                var description = temp.description;
                var image = temp.image;
                var username = temp.username;

                $("#contentDiv").append("<div id=\"cardDiv\" class=\"demo-card-wide mdl-card mdl-shadow--2dp\">" +
                    "<div id=\"imageDiv\" class=tp style=\"align-self: center\">" +
                    "<img id=\"imageView\" src=" + image + " style=\"max-height: 250px ; max-width: 300px ; height: auto ; width: auto ; padding: 0 ; margin: 0 ; \">\n" +
                    "</div>" +
                    "<div id=\"titleDiv\" class=\"mdl-card__title\">" +
                    "<h2 id=\"title\" style=\"color: black\" class=\"mdl-card__title-text\">" + title + "</h2>" +
                    "</div>" +
                    " <div id=\"descriptionDiv\" class=\"mdl-card__supporting-text\">" +
                    "<h5 id=\"description\" style=\"padding: 0 ; margin: 0; font-family: SansSerif,serif\">" + description + "</h5>" +
                    "</div>" +
                    "<div id=\"byUsernameDiv\" class=\"mdl-card__supporting-text\">" +
                    "<h5 id=\"byUsername\" style=\"padding: 0 ; margin: 0; font-family: SansSerif,serif\">" + username + "</h5>" +
                    "</div>" +
                    "</div>"
                );

            }

        });


        /*Blog Displaying things*/

        var dialog = document.querySelector('#loginDialog');
        if (!dialog.showModal) {
            dialogPlyfill.registerDialog(dialog);
        }
        dialog.close();

    }
    else {
        //user not exist
        $('.login-cover').show();
        $("#loginProgress").hide();
        var dialog = document.querySelector('#loginDialog');
        if (!dialog.showModal) {
            dialogPlyfill.registerDialog(dialog);
        }
        dialog.showModal();
    }
});

// Login process
$("#loginButton").click(
    function () {
        var errorClear = document.getElementById("loginError");
        errorClear.innerText = "";
        var email = $("#loginEmail").val();
        var password = $("#loginPassword").val();
        console.log(email, password);
        if (email !== "" && password !== "") {

            $("#loginProgress").show();
            $("#loginButton").hide();

            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                $("#loginError").show().text(error.message);
                $("#loginProgress").hide();
                $("#loginButton").show();
            });
        }
    }
);

//logout process
$("#signoutButton").click(
    function () {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.

        }).catch(function (error) {
            // An error happened.
            alert(error.message)
        });
    }
);

//signupbutton

$("#signupButton").click(function () {
    $("#onlyForSignup").show();
    $("#signupButton").hide();
    $("#onlyForSignupButton").show();
    $("#loginButton").hide();
    $("#onlyForSignupBackButton").show();
    $("#confirmPasswordDiv").show();
    var x = document.getElementById("titleSignIn");
    x.innerText = "Sign Up";
});

//onlySignupProcess
$("#onlyForSignupButton").click(function () {
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    var cPassword = $("#confirmPassword").val();
    console.log("srt", email, password, cPassword);
    //TODO:signup user with email and password
    if (password !== cPassword) {
        //alert("Password Didnt match");
    }
    else {
        $("#loginProgress").show();
        $("#onlyForSignupButton").hide();
        //alert("Password match !!");
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.

            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            // ...
            $("#loginProgress").hide();
            $("#onlyForSignupButton").show();
        });
    }
});

$("#onlyForSignupBackButton").click(function () {
    console.log("back presesd");
    var x = document.getElementById("titleSignIn");
    x.innerText = "Sign In";

    $("#onlyForSignupBackButton").hide();
    $("#onlyForSignupButton").hide();
    $("#signupButton").show();
    $("#loginButton").show();
    $("#confirmPasswordDiv").hide();

});