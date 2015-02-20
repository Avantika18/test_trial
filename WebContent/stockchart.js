//var chartData = generateChartData("trends.json");
var chartData = generateChartData2();
function generateChartData2(){

	var request;
    var chartData=[];
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
		// load
        var cat = "crime";
		if(sessionStorage.getItem("category"))
			cat = sessionStorage.getItem("category");
		var url = "http://23.253.71.50:8080/cityZenServer/rest/statistics/getReportCountPerDate/"+cat;
	    //request.open('GET', "trends2.json", false);
		//url = "trends2.json";
	    request.open('GET',url, false);
	    request.send();
	    var d = JSON.parse(request.responseText);
	    console.log(d.length);
	    //console.log(d[1][1]);
	    for (var i = 0; i < d.length; i=i+1) {
	        var date_str = d[i][1];
	        var visit_str = d[i][0];
	        var visits = parseInt(visit_str);
	        var newDate = new Date(date_str);
	        chartData.push({
	            date: newDate,
	            value: visits
	        });
	        
	    }
	    console.log(chartData);
	    return chartData;
	   //setData(request.responseText);
    }
}

function generateChartData(file) {
	  var request;
	    var chartData=[];
	    if (window.XMLHttpRequest) {
	        request = new XMLHttpRequest();
			// load
		    request.open('GET', file, false);
		    request.send();
	 var d = JSON.parse(request.responseText);
		    console.log(d.dates.length);
		    for (var i = 0; i < d.dates.length; i=i+3) {
		        var date_str = d.dates[i].date;
		        var visit_str = d.dates[i].value;
		        var visits = parseInt(visit_str);
		        var newDate = new Date(date_str);
		        //console.log(newDate);
		    	//console.log(d.dates[i].date);
		        chartData.push({
		            date: newDate,
		            value: visits
		        });
		        
		    }
		    console.log(chartData);
		    return chartData;
		   //setData(request.responseText);
	    }
}


var chart = AmCharts.makeChart("chartdiv", {

	type: "stock",

    //theme: "none",
    pathToImages: "http://www.amcharts.com/lib/3/images/",

	dataSets: [{
		color: "#b0de09",
		fieldMappings: [{
			fromField: "value",
			toField: "value"
		}],
		dataProvider: chartData,
		categoryField: "date"
	}],

	panels: [{
		showCategoryAxis: true,
		title: "Reports",
		eraseAll: false,
		fontFamily : "Open Sans",
		fontSize : 14,
		allLabels: [{
			x: 0,
			y: 115,
			text: "",
			align: "center",
			size: 16
		}],

		stockGraphs: [{
			id: "g1",
			valueField: "value",
		    balloonText: "[[category]]<br /><b><span style='font-size:14px;'>Issues: [[value]]</span></b>",
			useDataSetColors: false,
			bullet : "round",
			bulletBorderAlpha: 1,
			bulletColor : "#FFFFFF",
			//fillAlphas: 1,
		    valueField: "value",
		    bulletBorderColor : "#0080FF"
		}],


		stockLegend: {
			valueTextRegular: " ",
			markerType: "none"
		},

		drawingIconsEnabled: true
	}],

	chartScrollbarSettings: {
		graph: "g1",
		height : 20
	},
	
	chartCursorSettings: {
		valueBalloonsEnabled: true
	},
	
	periodSelector: {
		position: "bottom",
		periods: [{
			period: "DD",
			count: 7,
			label: "1 week"
		}, {
			period: "MM",
			count: 1,
			label: "1 month",
			selected : true
		}, {
			period: "YYYY",
			count: 1,
			label: "1 year"
		}, 
		 {
			period: "MAX",
			label: "MAX"
		}]
	}
});