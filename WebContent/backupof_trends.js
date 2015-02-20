//var chartData = generateChartData();
var chartData = loadData("trends.json");
//console.log(newData);
var chart = AmCharts.makeChart("chartdiv", {
    "type": "serial",
    "theme": "none",
    "pathToImages": "http://www.amcharts.com/lib/3/images/",
    "dataProvider": chartData,
    "valueAxes": [{
        "axisAlpha": 0.2,
        "dashLength": 1,
        "position": "left"
    }],
    "mouseWheelZoomEnabled":true,
	"valueAxes": [
	      		{
	      			"id": "ValueAxis-1",
	      			"title": "The number of Issues"
	      		}
	      	],
	    	"titles": [
	    	   		{
	    	   			"id": "Title-1",
	    	   			"size": 15,
	    	   			"text": "Trend of complaints with time"
	    	   		}
	    	   	],
    "graphs": [{
        "id":"g1",
        "balloonText": "[[category]]<br /><b><span style='font-size:14px;'>Issues: [[value]]</span></b>",
        "bullet": "round",
        "bulletBorderAlpha": 1,
		"bulletColor":"#FFFFFF",
        "hideBulletsCount": 50,
        "title": "red line",
        "valueField": "visits",
		"useLineColorForBulletBorder":true
    }],

    "chartScrollbar": {
        "autoGridCount": true,
        "graph": "g1",
        "scrollbarHeight": 40
    },
    "chartCursor": {
        "cursorPosition": "mouse"
    },
    "categoryField": "date",
    "categoryAxis": {
        "parseDates": true,
        "axisColor": "#DADADA",
        "dashLength": 1,
        "minorGridEnabled": true
    },
	"exportConfig":{
	  menuRight: '20px',
      menuBottom: '30px',
      menuItems: [{
      icon: 'http://www.amcharts.com/lib/3/images/export.png',
      format: 'png'	  
      }]  
	}
});

chart.addListener("rendered", zoomChart);
zoomChart();

// this method is called when chart is first inited as we listen for "dataUpdated" event
function zoomChart() {
    // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
    chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
}


// generate some random data, quite different range
function generateChartData() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 5);
    for (var i = 0; i < 20; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var visits = Math.round(Math.random() * (40 + i / 5)) + 20 + i;

        chartData.push({
            date: newDate,
            visits: visits
        });

    }
    
  //  var json = require('trends.json'); 
  //   	d3.json();
   // console.log(json);

    console.log(chartData)
    return chartData;
}


function loadCSV(file) {
    var request;
    if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari
        request = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        request = new ActiveXObject('Microsoft.XMLHTTP');
    }
    // load
    request.open('GET', file, false);
    request.send();
    parseCSV(request.responseText);
}

function parseCSV(data){
    console.log(data);
}


function loadData(file){
    var request;
    var chartData=[];
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
		// load
	    request.open('GET', file, false);
	    request.send();
	  /* JSON.parse(request.responseText,function(d,i){
		   console.log(d);
	   });
	   */
	    var d = JSON.parse(request.responseText);
	    //console.log(d.dates.length);
	    for (var i = 0; i < d.dates.length; i=i+3) {
	        var date_str = d.dates[i].date;
	        var visit_str = d.dates[i].value;
	        var visits = parseInt(visit_str);
	        var newDate = new Date(date_str);
	        //console.log(newDate);
	    	//console.log(d.dates[i].date);
	        chartData.push({
	            date: newDate,
	            visits: visits
	        });
	        
	    }
	    return chartData;
	   //setData(request.responseText);
    }
}

function setData(data){
	(JSON.parse(data));
	//map.validateNow();
}