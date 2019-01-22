  var config = {
    apiKey: "AIzaSyBj34sidpPNHaIu-VTZnuiiJ0dtSwSvnh8",
    authDomain: "makeitforward-fb720.firebaseapp.com",
    databaseURL: "https://makeitforward-fb720.firebaseio.com",
    projectId: "makeitforward-fb720",
    storageBucket: "makeitforward-fb720.appspot.com",
    messagingSenderId: "668998987480"
  };
  firebase.initializeApp(config);
  let globalDb = firebase.database();
  let dbRef = globalDb.ref("Users/");
   //Array to store all user IDS
  let usrRef = [];



  function getUserIdsWithProjects(){
  	//gets a list of all projects in the database
  	dbRef.once('value',snap =>{
  		snap.forEach(val =>{
  			console.log(val.key);
  			usrRef.push(val.key);
  		})
  	}).then(e=>{
  		console.log(usrRef);
  		for (var i = 0; i < usrRef.length; i++) {
  			//sequentially calling getUserProjects on each project
  			getUserProjects(usrRef[i]);
  		}
  	})
  }




  //This retrieves all user projects for given <userId>
  function getUserProjects(userId){
  	let usrRef = dbRef.child(userId);
	let usrProj = [];
  	usrRef.on('value', function(snap){
  		//Appends the projects to a list for later use
  		snap.forEach(function(val){
  			console.log(val.val());
  			usrProj.push(val);
  		})
  		console.log("project: " ,snap, "projectList: ",usrProj);
  		//Return usrProj list in [projObj, projObj2, ...]
  		return usrProj;
  	});
  }

	let base64Images = {};
	listLength = 1;
	function encodeImageFileAsURL(element) {
	  var file = element.files[0];
	  var reader = new FileReader();
	  reader.onloadend = function() {
	    console.log('RESULT', reader.result);
	    base64Images['Step' + listLength] = reader.result;
	    listLength++;
	  }
	  reader.readAsDataURL(file);
	  console.log(base64Images);
	}

	function base64ImagesGetter(){
		return base64Images;
	}

	function encodeImageFinalPicture(element) {
	  var file = element.files[0];
	  var reader = new FileReader();
	  reader.onloadend = function() {
	    console.log('RESULT', reader.result);
	    base64Images["FinishImage"] = reader.result;
	  }
	  reader.readAsDataURL(file);
	  console.log(base64Images);
	}