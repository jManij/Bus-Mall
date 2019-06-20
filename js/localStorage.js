/* eslint-disable no-undef */
'use strict';

/*
  Runs through to see if all the objects have been created.
  If not created, make a fresh storage for them.
*/
// eslint-disable-next-line no-undef
for (var i = 0; i < lengthOfObjects; i++) {
  //Check to see if there are items (click data) stored under that name already
  if(JSON.parse(localStorage.getItem(arrayOfPictures[i].name)) === null) {
    console.log('local');
    //Put the items in the storage
    // eslint-disable-next-line no-undef
    var key = arrayOfPictures[i].name;
    var value = JSON.stringify(arrayOfPictures[i]); //The object to be holded by the storage
    localStorage.setItem(key, value);
  }

}
