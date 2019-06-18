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
var imageSectionTag = document.getElementById('all_pictures');
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
}

//Rendering Global variables to collect total likes
function renderSummaryDisplay() {
  var ulId = document.getElementById('clicks-count');
  var liId = [];

  for (var i = 0; i < lengthOfObjects; i++) {
    liId[i] = document.createElement('li');
    liId[i].textContent = arrayOfPictures[i].name + ': ' + arrayOfPictures[i].clickCounter;
    ulId.appendChild(liId[i]);
  }
}

function generateRandomImageIndex(max) {
  //Generate left id that has not been used previously
  do {
    var left_id = Math.floor(Math.random() * Math.floor(max));
  } while(left_id === indexOfRecentPictues[0] || left_id === indexOfRecentPictues[1] || left_id === indexOfRecentPictues[2]);

  //Generate middle id that has not been used previously
  do {
    var middle_id = Math.floor(Math.random() * Math.floor(max));
  } while(middle_id === indexOfRecentPictues[0] || middle_id === indexOfRecentPictues[1] || middle_id === indexOfRecentPictues[2] || middle_id === left_id);

  //Generate right id that has not been used previously
  do {
    var right_id = Math.floor(Math.random() * Math.floor(max));
  } while(right_id === indexOfRecentPictues[0] || right_id === indexOfRecentPictues[1] || right_id === indexOfRecentPictues[2] || right_id === left_id || right_id === middle_id);

  //Delete the previous storage and maintain the recent copy of the used indices
  indexOfRecentPictues = [];
  indexOfRecentPictues.push(left_id);
  indexOfRecentPictues.push(middle_id);
  indexOfRecentPictues.push(right_id);

  return [left_id, middle_id, right_id];
}

function consoleClickCounts() {
  for (var i = 0; i < 20; i++) {
    console.log(arrayOfPictures[i].name + ' ' + arrayOfPictures[i].clickCounter);
  }
}

//Create default pictures and renderings before the click event
createPicturesObjects(); //Sets filenames, URLs and creates object with that information
var index_values = generateRandomImageIndex(lengthOfObjects-1);
renderDisplayImages(index_values[0], index_values[1], index_values[2]);



var handleClickOnImage = function(event){

  if (totalAllowedClicks < 25) {
    var index_values = generateRandomImageIndex(lengthOfObjects-1);
    renderDisplayImages(index_values[0], index_values[1], index_values[2]);
    var id = event.target.id;
    arrayOfPictures[id].clickCounter++;
    // console.log(event.target.id);
    totalAllowedClicks++;
  } else {
    leftImageTag.removeEventListener('click', handleClickOnImage);
    middleImageTag.removeEventListener('click', handleClickOnImage);
    rightImageTag.removeEventListener('click', handleClickOnImage);
    consoleClickCounts();
    renderSummaryDisplay();
  }
};

leftImageTag.addEventListener('click', handleClickOnImage);
middleImageTag.addEventListener('click', handleClickOnImage);
rightImageTag.addEventListener('click', handleClickOnImage);




