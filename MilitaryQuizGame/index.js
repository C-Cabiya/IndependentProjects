var enlistedTitles = [{imgsrc: "images/marines/PrivateFirstClass.png", answer: "Private First Class of the Marines"},
{imgsrc: "images/marines/LanceCorporal.png", answer: "Lance Corporal of the Marines"},
{imgsrc: "images/marines/Corporal.png", answer: "Corporal of the Marines"},
{imgsrc: "images/marines/Sergeant.png", answer: "Sergeant of the Maines"},
{imgsrc: "images/marines/StaffSergeant.png", answer: "Staff Sergeant of the Marines"},
{imgsrc: "images/marines/GunnerySergeant.png", answer: "Gunnery Sergeant of the Marines"},
{imgsrc: "images/marines/MasterSergeant.png", answer: "Master Sergeant of the Marines"},
{imgsrc: "images/marines/FirstSergeant.png", answer: "First Sergeant of the Marines"},
{imgsrc: "images/marines/MasterGunnerySergeant.png", answer: "Master Gunnery Sergeant of the Marines"},
{imgsrc: "images/marines/SergeantMajor.png", answer: "Sergeant Major of the Marines"},
{imgsrc: "images/marines/SergeantMajorOfTheMarineCorps.png", answer: "Sergeant Major of the Marine Corps"},
{imgsrc: "images/airforce/Airman.png", answer:"Airman"},
{imgsrc: "images/airforce/AirmanFirstClass.png", answer:"Airman First Class"},
{imgsrc: "images/airforce/SeniorAirman.png", answer:"Senior Airman"},
{imgsrc: "images/airforce/StaffSergeant.png", answer:"Staff Sergeant of the Air Force"},
{imgsrc: "images/airforce/TechnicalSergeant.png", answer:"Terchnical Sergeant of the Air Force"},
{imgsrc: "images/airforce/MasterSergeant.png", answer:"Master Sergeant of the Air Force"},
{imgsrc: "images/airforce/FirstSergeant.png", answer:"First Sergeant of the Air Force"},
{imgsrc: "images/airforce/SeniorMasterSergeant.png", answer:"Senior Master Sergeant of the Air Force"},
{imgsrc: "images/airforce/ChiefMasterSergeant.png", answer:"Chief Master Sergeant (Air Force)"},
{imgsrc: "images/airforce/CommandChiefMasterSergeant.png", answer:"Command Chief Master Sergeant of the Air Force"},
{imgsrc: "images/airforce/ChiefMasterSergeantOfTheAirForce.png", answer:"Chief Master Sergeant of the Air Force"}];

var quizzedInsignia;

var buttons = document.getElementById("option-buttons");

var buttonOne = document.getElementById("option-one");
var buttonTwo = document.getElementById("option-two");
var buttonThree = document.getElementById("option-three");
var buttonFour = document.getElementById("option-four");

var resetButton = document.getElementById("reset-button");



// Returns the button object that has the correct 
function getCorrectButton(){
    var allButtons = document.getElementById("option-buttons").children;
    var currentButton = allButtons[0];
    for(var i = 0; i<allButtons.length; i++){
        currentButton = allButtons[i];
        if(currentButton.innerText == quizzedInsignia.answer){
            break; 
        }
    }
    return currentButton;
}

// Any color changes made to buttons are reversed
function resetColors(){
    var allButtons = document.getElementById("option-buttons").children;
    var currentButton = allButtons[0];
    for(var i = 0; i<allButtons.length; i++){
        currentButton = allButtons[i];
        currentButton.style.backgroundColor = "rgb(145, 153, 58)";
    }
}

// Gets a correct answer and three incorrect answers to display to the user
function generateChoices(){

    buttonOne.disabled = false;
    buttonTwo.disabled = false;
    buttonThree.disabled = false;
    buttonFour.disabled = false;

    document.getElementById("result-container").style.display = "none";

    resetColors();

    // The insignia we'll be quizzing on; gets both the image and it's accompanying title from the array
    quizzedInsignia = enlistedTitles[Math.floor(Math.random() * enlistedTitles.length)];
    
    // The choices that are going to be displayed in this iteration
    var choicesArray = [];

    // The correct image for the quizzed insignia is displayed
    var img = document.getElementById("insignia"); 
    img.src = quizzedInsignia.imgsrc;
    choicesArray.push(quizzedInsignia)

    // Incorrect Choice #1, Second Choice overall
    var randomSecondChoice = enlistedTitles[Math.floor(Math.random() * enlistedTitles.length)];
    while(isChoiceExclusive(choicesArray, randomSecondChoice) != true){
        randomSecondChoice = enlistedTitles[Math.floor(Math.random() * enlistedTitles.length)];
    }
    choicesArray.push(randomSecondChoice);

    // Incorrect Choice #2, Third Choice overall
    var randomThirdChoice = enlistedTitles[Math.floor(Math.random() * enlistedTitles.length)];
    while(isChoiceExclusive(choicesArray, randomThirdChoice) != true){
        randomThirdChoice = enlistedTitles[Math.floor(Math.random() * enlistedTitles.length)];
    }
    choicesArray.push(randomThirdChoice);

    // Incorrect Choice #3, Fouth and Final Choice overall
    var randomFourthChoice = enlistedTitles[Math.floor(Math.random() * enlistedTitles.length)];
    while(isChoiceExclusive(choicesArray, randomFourthChoice) != true && loopControl<5){
        randomFourthChoice = enlistedTitles[Math.floor(Math.random() * enlistedTitles.length)];
    }
    choicesArray.push(randomFourthChoice);

    choicesArray = shuffleChoices(choicesArray);

    document.getElementById("option-one").innerText  = choicesArray[0].answer;
    document.getElementById("option-two").innerText  = choicesArray[1].answer;
    document.getElementById("option-three").innerText  = choicesArray[2].answer;
    document.getElementById("option-four").innerText  = choicesArray[3].answer;
}

// Accepts an array of choices that were already going to be displayed and the current choice
// Decides if the current choice is a duplicate; returns true if it's not a duplicate, false if it is
function isChoiceExclusive(choicesArray, currentChoice){
    if(choicesArray.includes(currentChoice)){
        return false;
    }
    return true;
}

// Accepts an array, and returns the array shuffled
function shuffleChoices(choicesArray){
    for (let i = choicesArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = choicesArray[i];
      choicesArray[i] = choicesArray[j];
      choicesArray[j] = temp;
    }
    return choicesArray;
}

buttonOne.addEventListener('click', function choicClicked() {
    // If the clicked button is the correct answer to the question
    if(this.innerText == quizzedInsignia.answer){
        this.style.backgroundColor = "#7CFC00";
        document.getElementById("reset-button").innerText = "Continue";
        document.getElementById("result-container").style.display = "block";
    }
    // If the clicked button is an incorrect answer to the question
    else{
        this.style.backgroundColor = "#E93008";
        var correctButton = getCorrectButton();
        correctButton.style.backgroundColor = "#7CFC00"; // Hilites the correct answer in green
        document.getElementById("reset-button").innerText = "Try Again";
        document.getElementById("result-container").style.display = "block";
    }
    buttonOne.disabled = true;
    buttonTwo.disabled = true;
    buttonThree.disabled = true;
    buttonFour.disabled = true;
});

buttonTwo.addEventListener('click', function choicClicked() {
    // If the clicked button is the correct answer to the question
    if(this.innerText == quizzedInsignia.answer){
        this.style.backgroundColor = "#7CFC00";
        document.getElementById("reset-button").innerText = "Continue";
        document.getElementById("result-container").style.display = "block";
    }
    // If the clicked button is an incorrect answer to the question
    else{
        this.style.backgroundColor = "#E93008";
        var correctButton = getCorrectButton();
        correctButton.style.backgroundColor = "#7CFC00"; // Hilites the correct answer in green
        document.getElementById("reset-button").innerText = "Try Again";
        document.getElementById("result-container").style.display = "block";
    }
    buttonOne.disabled = true;
    buttonTwo.disabled = true;
    buttonThree.disabled = true;
    buttonFour.disabled = true;
});

buttonThree.addEventListener('click', function choicClicked() {
    // If the clicked button is the correct answer to the question
    if(this.innerText == quizzedInsignia.answer){
        this.style.backgroundColor = "#7CFC00";
        document.getElementById("reset-button").innerText = "Continue";
        document.getElementById("result-container").style.display = "block";
    }
    // If the clicked button is an incorrect answer to the question
    else{
        this.style.backgroundColor = "#E93008";
        var correctButton = getCorrectButton();
        correctButton.style.backgroundColor = "#7CFC00"; // Hilites the correct answer in green
        document.getElementById("reset-button").innerText = "Try Again";
        document.getElementById("result-container").style.display = "block";
    }
    buttonOne.disabled = true;
    buttonTwo.disabled = true;
    buttonThree.disabled = true;
    buttonFour.disabled = true;
});

buttonFour.addEventListener('click', function choicClicked() {
    // If the clicked button is the correct answer to the question
    if(this.innerText == quizzedInsignia.answer){
        this.style.backgroundColor = "#7CFC00";
        document.getElementById("reset-button").innerText = "Continue";
        document.getElementById("result-container").style.display = "block";
    }
    // If the clicked button is an incorrect answer to the question
    else{
        this.style.backgroundColor = "#E93008";
        var correctButton = getCorrectButton();
        correctButton.style.backgroundColor = "#7CFC00"; // Hilites the correct answer in green
        document.getElementById("reset-button").innerText = "Try Again";
        document.getElementById("result-container").style.display = "block";
    }
    buttonOne.disabled = true;
    buttonTwo.disabled = true;
    buttonThree.disabled = true;
    buttonFour.disabled = true;
});