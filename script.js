//CODE THAT LINKS EACH JAVASCRIPT CHART TO ITS CORRESPONDING HTML COUNTERPART
var topLeftctx = document.getElementById('topLeftChart').getContext('2d');
var topRightctx = document.getElementById('topRightChart').getContext('2d');
var bottomLeftctx = document.getElementById('bottomLeftChart').getContext('2d');
var bottomRightctx = document.getElementById('bottomRightChart').getContext('2d');

//CODE FOR TOP LEFT CHART
var chartTopLeft = new Chart(topLeftctx, {
    // The type of chart created
    type: 'bar',

    // Data for the dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Employee Labor',
            backgroundColor: 'rgb(165, 137, 193)',
            data: []
        },
        {
          label: 'Propane Gas',
          backgroundColor: 'rgb(255, 250, 129)',
          data: []
      },
      {
        label: 'American Food Meat Distributor',
        backgroundColor: 'rgb(117, 137, 191)',
        data: []
    },
    {
      label: 'Miscellaneous Expenses',
      backgroundColor: 'rgb(72, 181, 163)',
      data: []
  },
  {
    label: 'Rent',
    backgroundColor: 'rgb(133, 202, 93)',
    data: []
},
{
  label: 'Restaurant Store',
  backgroundColor: 'rgb(252, 169, 133)',
  data: []
}
  ]
    },

    // Configuration options go here
    options: {
      responsive: true, // Instruct chart js to respond nicely
      title: {
        display: true,
        text: 'Expenses Breakdown (by week)'
      },
      scales: {
        xAxes: [{
            stacked: false
        }],
        yAxes: [{
            stacked: true,
            ticks: {
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                  return '$' + value;
              }
          }
        }]
    }    }
});

//CODE FOR TOP RIGHT CHART
var chartTopRight = new Chart(topRightctx, {
    // The type of chart created
    type: 'bar',

    // Data for the dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Cash',
            backgroundColor: 'rgb(255, 0, 100)',
            data: []
        },
        {
          label: 'Credit',
          backgroundColor: 'rgb(30, 111, 255)',
          data: []
      },
      {
        label: 'Total',
        backgroundColor: 'rgb(150, 0, 255)',
        data: []
    }]
    },

    // Configuration options go here
    options: {
        responsive: true, // Instruct chart js to respond nicely
        title: {
          display: true,
          text: 'Gross Revenue Breakdown (by week)'
        },
        scales: {
          xAxes: [{
              stacked: false
          }],
          yAxes: [{
              stacked: false,
              ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return '$' + value;
                }
            }
          }]
      }
    }
});

//CODE FOR BOTTOM LEFT CHART
var chartBottomLeft = new Chart(bottomLeftctx, {
    // The type of chart created
    type: 'bar',
    // Data for our dataset
    data: {
        labels: [],
        datasets: [{
            label: 'Weekly Net Revenue',
            backgroundColor: 'hsl(110, 61%, 56%)',
            data: []
        }]
    },

    // Configuration options go here
    options: {
        responsive: true, // Instruct chart js to respond nicely
        title: {
          display: true,
          text: 'Net Revenue (by week)'
      },
      scales: {
        yAxes: [{
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return '$' + value;
                }
            }
        }]
    }
    }
});

//CODE FOR BOTTOM RIGHT CHART
var chartBottomRight = new Chart(bottomRightctx, {
    // The type of chart created
    type: 'line',

    // Data for our dataset
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: []
        },

    // Configuration options go here
    options: {
        responsive: true, // Instruct chart js to respond nicely
        title: {
          display: true,
          text: 'Daily Gross Revenue (by week)'
      },
      scales: {
        yAxes: [{
            ticks: {
                // Include a dollar sign in the ticks
                callback: function(value, index, values) {
                    return '$' + value;
                }
            }
        }]
    }
    }
});

//DATASTRUCTURES FOR QUICK STORAGE
//this is used to hold a the daily revenue of each week
weeks = [];
weeklyRevenue = {
  weekGrossCash: 0,
  weekGrossCredit: 0,
  weekGrossTotal: 0,
  weekStart: "",
  weekNetRevenue: 0
};

//A PREDEFINED LIST OF COLORS TO CHOOSE
colorArray = ['rgb(255, 0, 100','rgb(30, 111, 255','rgb(150, 0, 255','rgb(0, 99, 132',
'rgb(0, 0, 255','rgb(0, 255, 0', 'rgb(255, 0, 0'];

//AJAX REQUEST CODE TO GET INFO FROM THE GOOGLE SHEET
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.response);
    console.log(json);

  // Map JSON values back to values array
  var values = json.feed.entry.map(function (e) {

    //CAPTURE ALL THE DATA FROM THE GOOGLE SHEET
    date = e.gsx$date.$t;
    weekday = e.gsx$weekday.$t;
    daysRevenue = parseFloat(e.gsx$total.$t.replaceAll(/\$|\,/g,''));
    daysCreditRevenue = parseFloat(e.gsx$credit.$t.replaceAll(/\$|\,/g,''));
    daysCashRevenue = parseFloat(e.gsx$cash.$t.replaceAll(/\$|\,/g,''));
    weeksEmployeeLabor = parseFloat(e.gsx$employeelabor.$t.replaceAll(/\$|\,/g,''));
    weeksNonWorkerExpenses = parseFloat(e.gsx$nonworkerexpenses.$t.replaceAll(/\$|\,/g,''));
    weeksPropaneExpenses = parseFloat(e.gsx$propane.$t.replaceAll(/\$|\,/g,''));
    weeksAmericanFoodExpenses = parseFloat(e.gsx$americanfood.$t.replaceAll(/\$|\,/g,''));
    weeksMiscellaneousExpenses = parseFloat(e.gsx$misc.$t.replaceAll(/\$|\,/g,''));
    weeksTotalExpenses = parseFloat(e.gsx$totalweeklyexpenses.$t.replaceAll(/\$|\,/g,''));
    weeksRentExpenses = parseFloat(e.gsx$rent.$t.replaceAll(/\$|\,/g,''));
    weeksResturantStoreExpenses = parseFloat(e.gsx$restaurantstore.$t.replaceAll(/\$|\,/g,''));

    //ADDS NEW EMPTY WEEK TO THE WEEKS DATASTRUCTURE
    if(weekday == "Monday"){
        weeks.push([]);
        weeklyRevenue.weekStart = date;
        weeklyRevenue.weekNetRevenue -= weeksTotalExpenses;

        //UPDATES TOP LEFT CHART WITH DATA OF WEEKLY EXPENSE BREAKDOWN
        chartTopLeft.data.labels.push('Week: '+weeklyRevenue.weekStart);
        chartTopLeft.data.datasets[0].data.push(weeksEmployeeLabor);
        chartTopLeft.data.datasets[1].data.push(weeksPropaneExpenses);
        chartTopLeft.data.datasets[2].data.push(weeksAmericanFoodExpenses);
        chartTopLeft.data.datasets[3].data.push(weeksMiscellaneousExpenses);
        chartTopLeft.data.datasets[4].data.push(weeksRentExpenses);
        chartTopLeft.data.datasets[5].data.push(weeksResturantStoreExpenses);
        chartTopLeft.update();
    }

    //ADDS DAILY REVENUE TO WEEKS DATASTRUCTURE
    weeks[weeks.length-1].push(daysRevenue);
    weeklyRevenue.weekNetRevenue += daysRevenue;
    weeklyRevenue.weekGrossCash += daysCashRevenue;
    weeklyRevenue.weekGrossCredit += daysCreditRevenue;
    weeklyRevenue.weekGrossTotal += daysRevenue;

    if(weekday == "Saturday"){
      //UPDATES TOP RIGHT CHART WITH DATA OF WEEKLY CREDIT, CASH, AND TOTAL REVENUE
      chartTopRight.data.labels.push('Week: '+weeklyRevenue.weekStart);
      chartTopRight.data.datasets[0].data.push(weeklyRevenue.weekGrossCash);
      chartTopRight.data.datasets[1].data.push(weeklyRevenue.weekGrossCredit);
      chartTopRight.data.datasets[2].data.push(weeklyRevenue.weekGrossTotal);
      chartTopRight.update();
      color = colorArray.pop();

        //UPDATES BOTTOM RIGHT CHART WITH DATA OF THE CURRENT WEEK
        chartBottomRight.data.datasets.push({
            fill: false,
            label: 'Week: '+weeklyRevenue.weekStart,
            backgroundColor: color+')',
            borderColor: color+')',
            data: weeks[weeks.length-1]
        });
        chartBottomRight.update();

        //UPDATES BOTTOM LEFT CHART WITH DATA OF WEEKLY NET REVENUE
        chartBottomLeft.data.labels.push("Week:"+weeklyRevenue.weekStart);
        chartBottomLeft.data.datasets[0].data.push(weeklyRevenue.weekNetRevenue);
        chartBottomLeft.update();

        //RESET WEEKLY REVENUE
        weeklyRevenue = {
          weekGrossCash: 0,
          weekGrossCredit: 0,
          weekGrossTotal: 0,
          weekStart: "",
          weekNetRevenue: 0
        };
    }
  });
 }
};

xhttp.open("GET", "https://spreadsheets.google.com/feeds/list/1QrK5cvCCV6_VAQTx1u6ZT4Mn2_SOzi3al6aPiaHuKIM/od6/public/full?alt=json", false);
xhttp.send();
