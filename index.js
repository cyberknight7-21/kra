firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
	  
	  
	  

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}



  var tblUsers = document.getElementById('tbl_users_list');
  var databaseRef = firebase.database().ref('users2/');
  var rowIndex = 1;
  
  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
   var childKey = childSnapshot.key;
   var childData = childSnapshot.val();
   
   var row = tblUsers.insertRow(rowIndex);
   var cellId = row.insertCell(0);
   var cellName = row.insertCell(1);
   var cell = row.insertCell(2);
   cellId.appendChild(document.createTextNode(childKey));
   cellName.appendChild(document.createTextNode(childData.col1t));
   cell.appendChild(document.createTextNode(childData.col1t2));
   
   rowIndex = rowIndex + 1;
    });
  });
 
  
  function update_user(){
   var col1t = document.getElementById('col1t').value;
   var col1 = document.getElementById('col1').value;
   var col1t2 = document.getElementById('col1t2').value;

   var data = {
    col1: col1,
    col1t: col1t,
	col1t2: col1t2
   }
   
   
   //update data
   var updates = {};
   updates['/users2/' + col1] = data;
   firebase.database().ref().update(updates);
   
   alert('The user is updated successfully!');
   
   reload_page();
  }
  //delete user
  function delete_user(){
   var col1 = document.getElementById('col1').value;
  
   firebase.database().ref().child('/users2/' + col1).remove();
   alert('The user is deleted successfully!');
   reload_page();
  }
  
  function reload_page(){
   window.location.reload();
  }
  