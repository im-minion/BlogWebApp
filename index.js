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
                $("#loginProgress").hide()
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