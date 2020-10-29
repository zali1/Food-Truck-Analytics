menuNetProfits = {
    ChickenOR: 5.75,
    LambOR: 4.25,
    FalafelOR: 6.50,
    FishOR: 5.25,
    Mix: 7.00,
    LambGyro: 5.8,
    ChickenGyro: 5.8,
    FalafelWrap: 5.00,
    Salad: 6,
    Hamburger: 3.5,
    Cheeseburger: 3.25,
    FishSandwich: 3.75
}
//window.alert(indexOfMax([3, 100, 4, 5, 6]));

var ctx = document.getElementById('pieChart').getContext('2d');


var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        datasets: [{
            data: [1.5, 2, 3],
            backgroundColor: [
                '#50B432',
                '#ED561B',
                '#DDDF00',
                '#24CBE5',
                '#64E572',
                '#FF9655',
                '#8b6056',
                '#a22735',
                '#354436',
                '#e9da92',
                '#747181',
                '#665547']
        }],

        //Labels appear in the legend and in the tooltips when hovering different wedges
        labels: []
    },
});

function process(inputdate){

//AJAX REQUEST CODE TO GET INFO FROM THE GOOGLE SHEET
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var json = JSON.parse(this.response);
    console.log(json);
    found = false;
    netrevenue = 0;

  // Map JSON values back to values array
  var values = json.feed.entry.map(function (e) {

    //CAPTURE ALL THE DATA FROM THE GOOGLE SHEET
    date = e.gsx$date.$t;
    ChickenORSold = parseInt(e.gsx$chickenor.$t);
    LambORSold = parseInt(e.gsx$lambor.$t);
    FalafelORSold = parseInt(e.gsx$falafelor.$t);
    FishORSold = parseInt(e.gsx$fishor.$t);
    MixSold = parseInt(e.gsx$mix.$t);
    LambGyroSold = parseInt(e.gsx$lambgyro.$t);
    ChickenGyroSold = parseInt(e.gsx$chickengyro.$t);
    FalafelWrapSold = parseInt(e.gsx$falafelwrap.$t);
    SaladSold = parseInt(e.gsx$salad.$t);
    HamburgerSold = parseInt(e.gsx$hamburger.$t);
    CheeseburgerSold = parseInt(e.gsx$cheeseburger.$t);
    FishSandwichSold = parseInt(e.gsx$fishsandwich.$t);

    if(inputdate == date){
        found = true;

        myPieChart.data.labels = [ "Chicken Over Rice", "Lamb Over Rice","Falafel Over Rice", "Fish Over Rice", "Mix","Lamb Gyro", "Chicken Gyro", "Falafel Wrap","Salad", "Hamburger", "Cheeseburger", "Fish Sandwich"] ;
        myPieChart.data.datasets[0].data =[ChickenORSold, LambORSold,FalafelORSold,
        FishORSold, MixSold, LambGyroSold, ChickenGyroSold, FalafelWrapSold,
        SaladSold, HamburgerSold, CheeseburgerSold, FishSandwichSold];

        myPieChart.update();
        document.getElementById("pieChart").style.display = "block";

        netrevenue += (ChickenORSold * menuNetProfits.ChickenOR);
        netrevenue += (LambORSold * menuNetProfits.LambOR);
        netrevenue += (FalafelORSold * menuNetProfits.FalafelOR);
        netrevenue += (FishORSold * menuNetProfits.FishOR);
        netrevenue += (MixSold * menuNetProfits.Mix);
        netrevenue += (LambGyroSold * menuNetProfits.LambGyro);
        netrevenue += (ChickenGyroSold * menuNetProfits.ChickenGyro);
        netrevenue += (FalafelWrapSold * menuNetProfits.FalafelWrap);
        netrevenue += (SaladSold * menuNetProfits.Salad);
        netrevenue += (HamburgerSold * menuNetProfits.Hamburger);
        netrevenue += (CheeseburgerSold * menuNetProfits.Cheeseburger);
        netrevenue += (FishSandwichSold * menuNetProfits.FishSandwich);

        document.getElementById("net").innerHTML = "The net profit for this specific day is: $" + netrevenue;
        document.getElementById("net").style.display = "block";
        document.getElementById("mostsells").innerHTML = "The most popular item sold on this day is: " +  myPieChart.data.labels[indexOfMax(myPieChart.data.datasets[0].data)];
        document.getElementById("mostsells").style.display = "block";

        profitArr = [
              (ChickenORSold * menuNetProfits.ChickenOR),
              (LambORSold * menuNetProfits.LambOR),
              (FalafelORSold * menuNetProfits.FalafelOR),
              (FishORSold * menuNetProfits.FishOR),
              (MixSold * menuNetProfits.Mix),
              (LambGyroSold * menuNetProfits.LambGyro),
              (ChickenGyroSold * menuNetProfits.ChickenGyro),
              (FalafelWrapSold * menuNetProfits.FalafelWrap),
              (SaladSold * menuNetProfits.Salad),
             (HamburgerSold * menuNetProfits.Hamburger),
             (CheeseburgerSold * menuNetProfits.Cheeseburger),
             (FishSandwichSold * menuNetProfits.FishSandwich)
        ];

        document.getElementById("mostprofit").innerHTML = "The most profitable item is: " +  myPieChart.data.labels[indexOfMax(profitArr)];
        document.getElementById("mostprofit").style.display = "block";

    }

  });
  if(!found){
    window.alert("Date not found")
  }
 }
};

xhttp.open("GET", "https://spreadsheets.google.com/feeds/list/1QrK5cvCCV6_VAQTx1u6ZT4Mn2_SOzi3al6aPiaHuKIM/od6/public/full?alt=json", false);
xhttp.send();
}

function calculate() {

   var str = document.getElementById("date").value;
   var res = str.match(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
   isValidfDate = res != null;
    if(isValidfDate){
        process(str)
    }else{
        window.alert("Please enter a valid date");
    }
}

function indexOfMax(arr){
    var max = arr[0];
    var maxIndex = 0;
    for(var index = 0; index < arr.length; index++){
        if(arr[index] > max){
            max = arr[index];
            maxIndex = index;
        }
    }
    return maxIndex;
}
