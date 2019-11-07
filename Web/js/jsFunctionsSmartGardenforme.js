      var channelID = 647935;
      var readKey = "ZACA691B4F3VC19B"; 
      var writeKey = "WQ2OV6P18T3F4ZET"; 

      var dataField1; /* Thinkspeak data: Temperature DHT */
      var dataField2; /* Thinkspeak data: Humidity DHT */
      var dataField3; /* Thinkspeak data: Soil Humidity */
      var dataField4; /* Thinkspeak data: Fire */
      var dataField5; /* Thinkspeak data: Echo from Device 1 commanded by Field 7 */
      var dataField6; /* Thinkspeak data: Echo from Device 2 commanded by Field 8 */
      var dataField7; /* Thinkspeak data: Command to device 1*/
      var dataField8; /* Thinkspeak data: Command to device 2*/

      function drawChart() {

        var data = google.visualization.arrayToDataTable([
          ['Label', 'Value'],
          ['TempDHT', 0],
          ['HumDHT', 0],
		  ['SoilHum', 0],
          ['Fire', 0]
        ]);


        var optionsT = {
          width: 600, height: 300,
          redFrom: 90, redTo: 100,
          yellowFrom:71, yellowTo: 90,
          greenFrom:59, greenTo: 71,
          min: 0, max: 100,
          minorTicks: 5
        };
  

        var chart = new google.visualization.Gauge(document.getElementById('chart_div'));

        chart.draw(data, optionsT);

        // Update of Gauges 
        setInterval(function() {
          data.setValue(0, 1, getDataField1());
          chart.draw(data, optionsT);
        }, 1000);
        setInterval(function() {
          data.setValue(1, 1, getDataField2());
          chart.draw(data, optionsT);
        }, 1000);
        setInterval(function() {
          data.setValue(2, 1, getDataField3());          
          chart.draw(data, optionsT);
        }, 1000);
        setInterval(function() {
          data.setValue(3, 1, getDataField4());      
          chart.draw(data, optionsT);
        }, 1000);
        
       // Update of digital sensors/actuators
         setInterval(function() {
          displayDigInfo1(getDataField7());      
        }, 1000);
        setInterval(function() {
          displayDigInfo2(getDataField5());      
        }, 1000);

        setInterval(function() {
          displayDigInfo3(getDataField8());      
        }, 1000);
        setInterval(function() {
          displayDigInfo4(getDataField6());      
        }, 1000);    
      }   

   /* Functions to change data at ThingSpeak fields */      
      
      function changeField7(data) {
        $(document).ready(function(){
            $.get("https://api.thingspeak.com/update?api_key=WQ2OV6P18T3F4ZET",
            {
              field7: data,
			  status: "Field 7 = " + data
            },
            function(data1,status){
				if(data1 != 0){
				alert("Data: " + data1 + "\nStatus: " + status);
				console.log(`${status}`)
				
				}
				else
				{
					changeField7(data);
				}
				
          });
      });
	  }
	  
	    function changeField8(data) {
        $(document).ready(function(){
            $.get("https://api.thingspeak.com/update?api_key=WQ2OV6P18T3F4ZET",
            {
              field8: data,
			  status: "Field 8 = " + data
            },
            function(data2,status){
				if( data2 != 0) {
				alert("Data: " + data2 + "\nStatus: " + status);
				console.log(`${status}`)
				}
				else
				{
					changeField8(data);
				}
				
				
          });
      });
	  }
	  

	


    /* Functions to change color of Digital sensors */      
      
      function displayDigInfo1(msg){
          x=document.getElementById("act1");
          if (msg == 1) {x.className="on";}
          else {x.className="off";}
      }
      
      function displayDigInfo2(msg){
          x=document.getElementById("echoAct1");
          if (msg == 1) {x.className="on";}
          else {x.className="off";}
      }
      
      function displayDigInfo3(msg){
          x=document.getElementById("act2");
          if (msg == 1) {x.className="on";}
          else {x.className="off";}
      }

      function displayDigInfo4(msg){
          x=document.getElementById("echoAct2");
          if (msg == 1) {x.className="on";}
          else {x.className="off";}
      }
      


    
    /* Functions to get data from ThingSpeak fields */
      
      function getAllChannelDataTS(){
        getDataField1();
        getDataField2();
        getDataField3();
        getDataField4();
        getDataField5();
        getDataField6();
        getDataField7();
        getDataField8();
      }

      function getDataField1() {           
            $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/1/last.json?apikey='+readKey+'&callback=?', function(data) {          
                dataField1 = data.field1;
                if (dataField1) {
                    dataField1 = (dataField1/1);
                }          
            });
            return dataField1;
      }

      function getDataField2() {
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/2/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField2 = data.field2;
            if (dataField2) {
                dataField2 = (dataField2/1);
            }          
        });
        return dataField2;
      }

      function getDataField3() {
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/3/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField3 = data.field3;
            if (dataField3) {
                dataField3 = (dataField3/1);
            }          
        });
        return dataField3;
      }

      function getDataField4() {        
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/4/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField4 = (data.field4);
            if (dataField4) {
                dataField4 = (dataField4/1);
            }          
        });
        return dataField4;
      }

      function getDataField5() {  
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/5/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField5 = data.field5;
            if (dataField5) {
                ddataField5 = (dataField5/1);
            }          
        });
        return dataField5;
      }

      function getDataField6() {        
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/6/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField6 = data.field6;
            if (dataField6) {
                ddataField6 = (dataField6/1);
            }          
        });
        return dataField6;
      }

      function getDataField7() {      
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/7/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField7 = data.field7;
            if (dataField7) {
                ddataField7 = (dataField7/1);
            }          
        });
        return dataField7;
      }

      function getDataField8() {       
        $.getJSON('https://api.thingspeak.com/channels/'+channelID+'/field/8/last.json?apikey='+readKey+'&callback=?', function(data) {          
            dataField8 = data.field8;
            if (dataField8) {
                ddataField8 = (dataField8/1);
            }          
        });
        return dataField8;
      }
