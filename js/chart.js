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
          'rgba(255, 99, 132, 255)',
          'rgba(54, 162, 235, 150)',
          'rgba(255, 206, 86, 200)',
          'rgba(75, 192, 192, 235)',
          'rgba(153, 102, 255, 150)',
          'rgba(255, 159, 64, 245)',
          'rgba(255, 255, 255, 250)',
          'rgba(54, 250, 235, 150)',
          'rgba(255, 126, 86, 200)',
          'rgba(75, 245, 192, 235)',
          'rgba(153, 145, 255, 150)',
          'rgba(255, 255, 164, 245)',
          'rgba(255, 255, 255, 250)',
          'rgba(15, 155, 255, 20)',
          'rgba(54, 250, 235, 150)',
          'rgba(255, 126, 86, 200)',
          'rgba(75, 245, 192, 235)',
          'rgba(153, 145, 255, 150)',
          'rgba(255, 255, 164, 245)',
          'rgba(255, 255, 255, 250)'
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
