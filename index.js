firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //user is siggned in
        $('.login-cover').hide();
        $(".fab").show();


        var rootRef = firebase.database().ref();


        /*USER DATA IN REAL-TIMEDB*/
        var cUser = firebase.auth().currentUser;
        var uid = "";
        var email = "";
        if (cUser !== null) {
            uid = cUser.uid;
            email = cUser.email;
        }
        var userRef = rootRef.child("Users");
        userRef.once('value', function (snapshot) {
            if (snapshot.hasChild(uid)) {
                window.alert("Welcome Back!!")
            }
            else {
                //window.alert("NOT EXISTS")
                userRef.child(uid).child("name").set(email);
                userRef.child(uid).child("image").set("https://www.atomix.com.au/media/2015/06/atomix_user31.png");
            }
        });



        /*Blog Displaying things*/
        var BlogRef = rootRef.child("Blog");
        BlogRef.on("value", function (datasnapshot) {
            var newPost = datasnapshot.val();
            var totalNoOfObjects = 0;
            totalNoOfObjects = Object.keys(newPost).length;
            //console.log(totalNoOfObjects);


            //to clear the previous loaded blogs
            document.getElementById("contentDiv").innerHTML = " ";

            for (var i = 0; i < totalNoOfObjects; i++) {
                //retrive temp.title,temp.description,temp.image,temp.username

                var temp = newPost[Object.keys(newPost)[i]];
                var title = temp.title;
                var description = temp.description;
                var image = temp.image;
                var username = temp.username;

                $("#contentDiv").prepend("<div id=\"cardDiv\" class=\"demo-card-wide mdl-card mdl-shadow--2dp\">" +
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
                    "<h5 id=\"byUsername\" style=\"padding: 0 ; margin: 0; font-family: 'Roboto', sans-serif\">By " + username + "</h5>" +
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
        $("#loginButton").show();
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
            $(".fab").hide();
        }).catch(function (error) {
            // An error happened.
            alert(error.message)
        });
    }
);

//signupbutton

$("#signupButton").click(function () {
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
    //console.log("srt", email, password, cPassword);
    if (password !== cPassword) {
        window.alert("Password Didn't match");
        return 0;
    }
    else {
        $("#loginProgress").show();
        $("#onlyForSignupButton").hide();
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert(errorMessage);
            // ...
            $("#loginProgress").hide();
            $("#onlyForSignupButton").show();
        });
        console.log("WTF2");
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

//addBlogButton - getting the addBlogDialog
$("#addButton").click(function () {

    //TODO:CLEAR ALL FIELDS :) -- ids=> fileButton,titleBlogDialog,descriptionBlogDialog
    // var fileButton = $("#fileButton");
    // fileButton.replaceWith(fileButton.val('').clone(true));
    // document.getElementById("titleBlogDialog").value = "";
    // document.getElementById("descriptionBlogDialog").value = "";

    $("#contentDiv").hide();
    $("#addBlogDialog").show();
});

//backpressed in addBlogDialog
$("#backBlogDialogButton").click(function () {

    $("#contentDiv").show();
    $("#addBlogDialog").hide();

});

//clear button
// var control = $("#imageSelectButton");
// $("#clear").click(function () {
//     control.replaceWith(control.val('').clone(true));
// });

//imagechange function
// var imageData;
// function imgchange(f) {
//     var filePath = $('#file').val();
//     var reader = new FileReader();
//     //console.log($('#file').val());
//     reader.onload = function (e) {
//         $('#imgs').attr('src', e.target.result);
//         imageData = e.target.result;
//     };
//     //console.log(f.files[0]);
//     reader.readAsDataURL(f.files[0]);
// }


//new Firecast Try For Image
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
var file = "";
fileButton.addEventListener('change', function (e) {
    file = e.target.files[0];
});


//postBlogDialogButton in addBlogDialog
$("#postBlogDialogButton").click(function () {

    //progrees on Post button if possible
    //get data in the imageView and inside the Title & Description TextFields

    //description
    var descriptionToPost = $("#descriptionBlogDialog").val();

    //title
    var titleToPost = $("#titleBlogDialog").val();

    //user
    var usernameToPost = "NA";
    var user = firebase.auth().currentUser;
    if (user !== null) {
        usernameToPost = user.email;
    }

    //image
    var imageToPost = "NA";
    //console.log(file);
    var storageRef = firebase.storage().ref('Blog_Image/' + file.name + new Date());
    var task = storageRef.put(file);
    var tempo = task.then(function (snap) {
        imageToPost = snap.downloadURL;
        //console.log(imageToPost);
        // console.log(descriptionToPost,titleToPost,usernameToPost,imageToPost);

        var rootRef = firebase.database().ref();
        var BlogRef = rootRef.child("Blog");

        //TODO:-Exception Handling

        BlogRef.push().set({
            description: descriptionToPost,
            image: imageToPost,
            title: titleToPost,
            username: usernameToPost
        });

    });

    //after that show the Blogs again and hide the BlogDialog
    $("#contentDiv").show();
    $("#addBlogDialog").hide();
});



