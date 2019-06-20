/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
'use strict';

//Creates Chart with the data found in the Picture Object
function createChart() {
  var percentages = [];
  for (var i =0; i < lengthOfObjects; i++) {
    percentages.push(Math.round((arrayOfPictures[i].clickCounter / arrayOfPictures[i].timeShown) * 100));
  }
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrayOfFileNames,
      datasets: [{
        label: '# of Votes',
        data: percentages,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 255, 255, 0.5)',
          'rgba(0, 0, 0, 0.2)',
          'rgba(255, 255, 255, 0.7)',
          'rgba(0, 0, 0, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}
