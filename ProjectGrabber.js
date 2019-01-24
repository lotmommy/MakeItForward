<div id="FormBox">

<div id="InputCraft"> 
<span>שם הפרויקט </span>
<input type="text" id="CraftTitle">
</div>
<div  id="InputDescription">
<span>תיאור הפרויקט </span>
<input type="text" id="CraftDescription">
</div>
<div class="InputFinalImage">
<span>תמונת הפרויקט המוגמר</span>
<div>
  <label for="files" id="FinalPicture" class="btn" style="font-size: x-large; margin-right: 2%; color: #86b4e8;"><i class="fa fa-upload"></i> בחר תמונה</label>
  <input id="files" class="FinalPicture" style="visibility:hidden;" type="file" onchange="encodeImageFinalPicture(this,base64Images)" >
</div>
</div>
<div class="dropdown">
<p>Choose Category</p>
  <select class="dropbtn" id="myDropdown">
    <option>טכנולוגיה</option>
    <option>רהיטים</option>
    <option>הישרדות</option>
    <option>כלי נגינה</option>
    <option>בישול</option>
    <option>אחר</option>

 </select>
</div>
<div id="buttons">
<button onclick="ShowStep2()" class="button nextbutton" id="NextButton">לשלב הבא</button>
<button onclick="gotohome()" class="backbutton"><i class="fa fa-home" style="font-size: 2.5em;"></i></button>

</div>
</div>

<div id="FormBox2">
<div  id="InputTool" onload="drawTool()">

</div>
<div id="AddToolButton">
		<button id="AddToolText" onclick="drawTool()">+</button>
</div>
<div id="buttons">
<button onclick="ShowStep3()" class="nextbutton">הוספת צעדים</button>
<button onclick="ShowStep1()" class="backbutton"><i class="fa fa-angle-double-right" style="font-size: 2.5em;"></i></button>
</div>
</div>

<div id="FormBox3">
<div id="BenIsHere" >
</div>
<div class="AddInputButton">
	<button class="AddStepText" onclick="drawStep()" >+</button>
</div>
<div id="UploadCraft">
</div>
<div class="twoToneCenter">
<button class="twoToneButton button nextbutton" id="UploadCraftButton" onclick="generateJSON()">סיום</button>
<button onclick="ShowStep2()" class="backbutton GoBack"><i class="fa fa-angle-double-right" style="font-size: 2.5em;"></i></button>

</div>
</div>
<script>
function init(){
	drawStep();
	drawTool();
}
// $(function(){
    
//     var twoToneButton = document.querySelector('.twoToneButton');
    
//     twoToneButton.addEventListener("click", function() {
//         twoToneButton.innerHTML = "טוען";
//         twoToneButton.classList.add('spinning');
        
//       setTimeout( 
//             function  (){  
//                 twoToneButton.classList.remove('spinning');
//                 twoToneButton.innerHTML = "הוסף";
                
//             }, 60000);
//     }, false);
    
// });
function ShowStep2() {
	if($("#CraftTitle").val()!== "" && $("#CraftDescription").val()!== "" && $(".FinalPicture").val() !== ""){
		$("#FormBox").hide();
		$("#FormBox2").show();
		$("#FormBox3").hide();
		$("#Step2Icon").addClass("active");
		$("#Step1Icon").addClass("active");
		$("#Step3Icon").removeClass("active");
	}else{
		alert("Please fill in all fields");
	}
	
}
function ShowStep3() {
	if($("#Tool_1").val()!== ""){
		$("#FormBox").hide();
		$("#FormBox2").hide();
		$("#FormBox3").show();
		$("#Step3Icon").addClass("active");
		$("#Step1Icon").addClass("active");
		$("#Step2Icon").addClass("active");
	}else{
		alert("Please add at least one material");
	}
	
	
}
function ShowStep1() {
	$("#FormBox").show();
	$("#FormBox2").hide();
	$("#FormBox3").hide();
	$("#Step1Icon").addClass("active");
	$("#Step2Icon").removeClass("active");
	$("#Step3Icon").removeClass("active");
	
}
function gotohome(){
	window.location.href='index.html';
}
let currentNumberOfSteps = 1;
let currentNumberOfTools = 1;
function drawStep(){
	//defining constants for later use as ID's
	//InputStepImage_1
	const imageStepId = "InputStepImage _"+currentNumberOfSteps;
	const imageUploadId= "InputUploadImage_"+currentNumberOfSteps;
	const inputStepInstructions = "InputStepInstructions_"+currentNumberOfSteps;
	const inputStepInstructionsText = "inputStepInstructionsText_"+currentNumberOfSteps;
	var d = new Date();
	//Defining the reusable parts for later
	let inputImageTemplate = '<div style="border: 1px solid #86b4e8;padding-right:.5em;margin-left:1em;margin-right:1em;margin-top:1em;border-bottom:none;" class="InputStepImage" id="'+imageStepId+'" ><span>תמונת שלב '+currentNumberOfSteps+'</span><label for="img-'+d.getTime()+'" for="files" class="btn" style="font-size: x-large; margin-right: 2%; color:#86b4e8;"><i class="fa fa-upload"></i> בחר תמונה</label><input id="img-'+d.getTime()+'" class="StepImage" style="visibility:hidden;" type="file" onchange="encodeImageFileAsURL(this,base64Images)"></div>';
	let inputTextTemplate = '<div style="border: 1px solid #86b4e8;margin-left:1em;margin-right:1em;margin-bottom:2em;border-top:none;" id="'+inputStepInstructions+'" class="InputStepInstructions borderedItem"><span>הוראות לשלב '+currentNumberOfSteps+'</span><textarea style="height:60%;width:20em;margin:auto;margin-bottom:5%;border:none;border-bottom:3px solid #92db8e" id="'+inputStepInstructionsText+'" class="StepText"></textarea></div>';
	let inputAddStepButtonTemplate = '<div id="AddInputButton"><span id="AddStepText">הוסף שלב</span><i id="AddStepSquare" class="fa fa-plus-square" onclick="drawStep()"></i></div>';
	//Adding 1 to current step
	currentNumberOfSteps++;
	//appending the item to the page
	$("#BenIsHere").append(inputImageTemplate+inputTextTemplate);
	//updating the values on the upload inputAddStepButtonTemplate
}
function drawTool(){
	let inputToolTemplate = '<div style="margin:1em;border:1px solid #86b4e8;"><span>'+currentNumberOfTools+' כלים הדרושים</span><input type="text" style="margin:auto;text-align:right;border:none;border-bottom:3px solid #92db8e;margin-bottom: 5%;" id="Tool_'+currentNumberOfTools+'"" class="tooltext"></div>';
	$("#InputTool").append(inputToolTemplate);
	currentNumberOfTools++;
}
function deleteTool(){
	$("#InputTool").remove();
	
}
function uploadAllImages(stepNum){
	let storage = firebase.storage();
	
	for (var i = 1; i < stepNum+1; i++) {
		file = $("#InputUploadImage_"+i).prop('files')[0];
		console.log(file);
		let storageRef = storage.ref("USER_ID_GOES_HERE/PROJECT_ID_GOES_HERE/Images/Step"+i+"Image");
		storageRef.put(file);
	}
	file = $("#FinalPicture").prop('files')[0];
	let storageRef = storage.ref("USER_ID_GOES_HERE/PROJECT_ID_GOES_HERE/Images/FinalPicture");
	storageRef.put(file);
	
}
	
	function generateJSON(){
		if(currentNumberOfSteps != Object.keys(base64Images).length){
			alert("Please upload an image for each step");
		}else if(currentNumberOfSteps<=3){
			alert("Please write at least three steps");
		}else{
			$(function(){
    
    			var twoToneButton = document.querySelector('.twoToneButton');
    
   				twoToneButton.addEventListener("click", function() {
        			twoToneButton.innerHTML = "טוען";
        			twoToneButton.classList.add('spinning');
        
      				setTimeout( 
            		function  (){  
                		twoToneButton.classList.remove('spinning');
                		twoToneButton.innerHTML = "הוסף";
                
            		}, 60000);
    			}, false);
    
			});
			//object lists for Steps, Tools, and Meta
			let Steps = {};
			let Tools = {};
			let Meta = {};
			let Images = {};
			//grabbing nessicary data from 
			$(".StepImage").each(function(index){
				Images = base64ImagesGetter(base64Images);
			})
			$(".StepText").each(function(index){
				console.log($(this).val());
				Steps["Step"+(index+1)]=$(this).val();
			})
			$('input[id^="Tool"]').each(function(index){
				console.log($(this).val());
				Tools["Tool"+(index+1)]=$(this).val();
			})
			auth = firebase.auth();
			//setting the gathered data
			Meta.CraftTitle = $("#CraftTitle").val();
			Meta.CraftDescription = $("#CraftDescription").val();
			Meta.stepNum = Object.keys(Steps).length;
			Meta.toolNum = Object.keys(Tools).length;
			Meta.UserOwner = auth.currentUser.uid;
			Meta.FinishImage = base64ImagesGetter(base64Images).FinishImage;
			Meta.Category = $("#myDropdown option:selected").text();
			console.log(Steps,Tools);
			//putting the data into the JSON tree properly formatted
			currentItem.PROJECTID.STEPS = JSON.parse(JSON.stringify(Steps));
			currentItem.PROJECTID.STEP_IMAGES = JSON.parse(JSON.stringify(Steps));
			currentItem.PROJECTID.TOOLS = JSON.parse(JSON.stringify(Tools));
			currentItem.PROJECTID.METADATA = JSON.parse(JSON.stringify(Meta));
			currentItem.PROJECTID.STEP_IMAGES = JSON.parse(JSON.stringify(Images));
			//uploads the data
			db = firebase.database();
			dbref = db.ref('Users/');
			dbref.push(currentItem.PROJECTID).then(function(e){
				window.location.href='index.html';
		
			});
		}
	}
	//visual tree
	let currentItem = {
		PROJECTID:{
			METADATA:{
				UserOwner: "",
				CraftTitle:"Place holder Title",
				CraftDescription:"Place holder Description",
				StepNum: 5,
				FinalImage:"placeholderURL"
			},
			STEP_IMAGES:{
			},
			STEPS:{
			},
			TOOLS:{
			}
		}
	}
</script>
</body>
</html>
