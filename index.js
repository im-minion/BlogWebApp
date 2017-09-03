firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //user is siggned in
        $('.login-cover').hide();

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