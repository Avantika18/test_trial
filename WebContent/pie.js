var data = loadData();

var chart = AmCharts.makeChart("chartdiv", {
    "type": "pie",
    "theme": "none",
    "dataProvider": data,
    "titleField": "title",
    "valueField": "value",
    "labelRadius": 5,
    "startDuration": 0,
    "radius": "35%",
    "colors" : ["#F5A9A9","#FE2E2E","#01DF74"],
    "fontFamily" : "Open Sans",
    "marginLeft":0,
    "fontSize" : 14,
    "innerRadius": "60%",
    "labelText": "[[title]]",
    
	"legend": {
		"align": "center",
		"markerType": "circle",
			"fontSize" :14,
			 "fontFamily" : "Open Sans"
	},
	"titles": [
	   		{
	   			"id": "Title-1",
	   			"text": " "
	   		}
	   	],
});


function loadData(){
    var request;
    var chartData=[];
    if (window.XMLHttpRequest) {
    	  request = new XMLHttpRequest();
			// load
	        var cat = "crime";
			if(sessionStorage.getItem("category"))
				cat = sessionStorage.getItem("category");
			var url = "http://23.253.71.50:8080/cityZenServer/rest/statistics/getEventStatusCount/"+cat;
		    //request.open('GET', "trends2.json", false);
			//url = "scatter.json";
			  request.open('GET',url, false);
			    request.send();
			    var d = JSON.parse(request.responseText);
			    
	    for (var i = 0; i < d.length; i++) {
	    	var title_str="";
	    	if(d[i][0] == "open")
	    		title_str = "unresolved";
	    	else if(d[i][0]=="resolved")
	    		title_str = "resolved";
	    	else
	    		title_str = "forwarded";
	        //var visit_str = d.data[i].value;
	        var value_str = d[i][1];
	        if(value_str==0) value_str = 50;
	        console.log(title_str);
	        //console.log(newDate);
	    	//console.log(d.dates[i].date);
	        chartData.push({
	            title: title_str,
	            value : value_str
	        });
	        
	    }
	    console.log(chartData);
	    return chartData;
	   //setData(request.responseText);
    }
}
