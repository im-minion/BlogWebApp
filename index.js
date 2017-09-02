firebase.auth().onAuthStateChanged(function(user){
    if (user){
     //user is siggned in
      $('.login-cover').hide();
    }
    else{
        //user not exist
        var dialog = document.querySelector('#loginDialog');
        if (!dialog.showModal){
            dialogPlyfill.registerDialog(dialog);
        }
        dialog.close();


    }
});

$("#loginButton").click(
  function () {
      var email =$("#loginEmail").val();
      var password = $("#loginPassword").val();
      console.log(email,password);
      if(email !== "" && password !==""){

          $("#loginProgress").show();
          $("#loginButton").hide();

          firebase.auth().signInWithEmailAndPassword(email,password).catch(function (error) {
              $("#loginError").show().text(error.message);
              $("#loginProgress").hide();
              $("#loginButton").show();
          });
      }
  }
);