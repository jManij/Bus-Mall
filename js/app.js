/* eslint-disable no-undef: This is to ensure that the methods and properties from other classes could be called */
/* Bus Mall Project
   Manish KC
*/
'use strict';

//Global variables
var arrayOfFileNames = []; //Array containing the file names
var arrayOfURLs = []; //Array containing the URLs of the images
var arrayOfPictures = []; //Array containing the Pictures Objects
var indexOfRecentPictues = []; //Array containing the ids of three most recent pictures
var lengthOfObjects = 20; //Update this variable with new images added into the project
var totalAllowedClicks = 0;

//Rendering Global variables to collect elements & tags
var leftImageTag = document.getElementById('left_pic');
var leftPTag = document.getElementById('left_pic_h2');

var middleImageTag = document.getElementById('middle_pic');
var middlePTag = document.getElementById('middle_pic_h2');

var rightImageTag = document.getElementById('right_pic');
var rightPTag = document.getElementById('right_pic_h2');

/***************************** CONSTRUCTOR *****************************************/
function Pictures(name, id, URL) {
  this.name = name;
  this.id = id;
  this.URL = URL;
  this.clickCounter = 0;
  this.timeShown = 0;
}
/*********************** HELPER FUNCTIONS *******************************************/

function setFileNames() {
  arrayOfFileNames = ['Bag', 'Banana-cutter','iPad Holder', 'Boots', 'Breakfast Maker','Bubblegum', 'Chair', 'Cthulhu', 'Dog-duck', 'Dragon', 'Pen','Pet-Sweep', 'Scissors', 'Shark', 'Baby-Sweep', 'Tauntaun', 'Unicorn', 'USB', 'Water-can', 'Wine-glass'];
}

function setURLs() {
  arrayOfURLs = ['./img/bag.jpg', './img/banana.jpg', './img/bathroom.jpg', './img/boots.jpg', './img/breakfast.jpg', './img/bubblegum.jpg', './img/chair.jpg', './img/cthulhu.jpg', './img/dog-duck.jpg', './img/dragon.jpg', './img/pen.jpg', './img/pet-sweep.jpg', './img/scissors.jpg', './img/shark.jpg', './img/sweep.png', './img/tauntaun.jpg', './img/unicorn.jpg', './img/usb.gif', './img/water-can.jpg', './img/wine-glass.jpg'];
}

function createPicturesObjects() {
  setFileNames();
  setURLs();
  for (var i = 0; i < lengthOfObjects; i++) {
    var name = arrayOfFileNames[i];
    var URL = arrayOfURLs[i];
    arrayOfPictures.push(new Pictures(name, i, URL));
  }
}

function renderDisplayImages(left_id, middle_id, right_id) {
  leftImageTag.id = arrayOfPictures[left_id].id;
  leftImageTag.src = arrayOfPictures[left_id].URL;
  leftPTag.textContent = arrayOfPictures[left_id].name;

  middleImageTag.id = arrayOfPictures[middle_id].id;
  middleImageTag.src = arrayOfPictures[middle_id].URL;
  middlePTag.textContent = arrayOfPictures[middle_id].name;

  rightImageTag.id = arrayOfPictures[right_id].id;
  rightImageTag.src = arrayOfPictures[right_id].URL;
  rightPTag.textContent = arrayOfPictures[right_id].name;

  updateTimeShown(left_id);
  updateTimeShown(middle_id);
  updateTimeShown(right_id);
}

//Generates three random indices (left_index, middle_index, & right_index) used torender the display
function generateRandomImageIndex(max) {
  //Generate left id that has not been used previously
  do {
    var left_id = Math.round(Math.random() * Math.floor(max));
  } while(left_id === indexOfRecentPictues[0] || left_id === indexOfRecentPictues[1] || left_id === indexOfRecentPictues[2]);

  //Generate middle id that has not been used previously
  do {
    var middle_id = Math.round(Math.random() * Math.floor(max));
  } while(middle_id === indexOfRecentPictues[0] || middle_id === indexOfRecentPictues[1] || middle_id === indexOfRecentPictues[2] || middle_id === left_id);

  //Generate right id that has not been used previously
  do {
    var right_id = Math.round(Math.random() * Math.floor(max));
  } while(right_id === indexOfRecentPictues[0] || right_id === indexOfRecentPictues[1] || right_id === indexOfRecentPictues[2] || right_id === left_id || right_id === middle_id);

  //Delete the previous storage and maintain the recent copy of the used indices
  indexOfRecentPictues = [];
  indexOfRecentPictues.push(left_id);
  indexOfRecentPictues.push(middle_id);
  indexOfRecentPictues.push(right_id);

  return [left_id, middle_id, right_id];
}

//To display and verify from console
function consoleClickCounts() {
  for (var i = 0; i < 20; i++) {
    console.log(arrayOfPictures[i].name + ' ' + arrayOfPictures[i].clickCounter + ' Times Shown: '+ arrayOfPictures[i].timeShown);
  }
}


/* Function to be called when the picture object is clicked.
   Updates clickCounter and timeshown for the object, whose id is passed
   @arg: id of the object
*/
function updateClicksInStorage(id) {
  var key = arrayOfPictures[id].name; //name of the object

  //Ensure that the object has already been created
  var objectKey = JSON.parse(localStorage.getItem(key));

  objectKey.clickCounter = objectKey.clickCounter + 1;
  localStorage.setItem(key, JSON.stringify(objectKey));
}

/* Function to update the object's timeShown.
   @arg:id of the object
 */
function updateTimeShown(id) {
  var key = arrayOfPictures[id].name; //name of the object

  if(JSON.parse(localStorage.getItem(arrayOfPictures[id].name)) === null) {
    console.log('updateTImeShown');
    var value = JSON.stringify(arrayOfPictures[id]); //The object to be holded by the storage
    localStorage.setItem(key, value);
  } else {
    var objectKey = JSON.parse(localStorage.getItem(key));
    objectKey.timeShown += 1;
    localStorage.setItem(key, JSON.stringify(objectKey));
  }
}

/*********************** HELPER FUNCTIONS ENDLINE *******************************************/

/*********************** DEFAULT *******************************************/

//Create default pictures and renderings before the click event
createPicturesObjects(); //Sets filenames, URLs and creates object with that information
var index_values = generateRandomImageIndex(lengthOfObjects-1);
arrayOfPictures[index_values[0]].timeShown++;
arrayOfPictures[index_values[1]].timeShown++;
arrayOfPictures[index_values[2]].timeShown++;
renderDisplayImages(index_values[0], index_values[1], index_values[2]);

/*********************** DRIVER *******************************************/

var handleClickOnImage = function(event){

  if (totalAllowedClicks < 25) {
    var id = event.target.id;
    updateClicksInStorage(id); //Update the total clicks for the clicked item in storage
    var index_values = generateRandomImageIndex(lengthOfObjects-1);
    arrayOfPictures[index_values[0]].timeShown++;
    arrayOfPictures[index_values[1]].timeShown++;
    arrayOfPictures[index_values[2]].timeShown++;
    renderDisplayImages(index_values[0], index_values[1], index_values[2]);
    arrayOfPictures[id].clickCounter++;
    totalAllowedClicks++;
  } else {
    leftImageTag.removeEventListener('click', handleClickOnImage);
    middleImageTag.removeEventListener('click', handleClickOnImage);
    rightImageTag.removeEventListener('click', handleClickOnImage);
    consoleClickCounts();
    // eslint-disable-next-line no-undef
    createChart();
  }
};

leftImageTag.addEventListener('click', handleClickOnImage);
middleImageTag.addEventListener('click', handleClickOnImage);
rightImageTag.addEventListener('click', handleClickOnImage);

/*********************** DRIVER ENLDLINE *******************************************/
