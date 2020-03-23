console.log("Hello");
getAstronauts();
var lat = 0;
var lng = 0;
var mymap = L.map('mapid').setView([lat, lng], 2);
window.onload = function(){ 
	this.getData();
	this.setInterval(this.getData, 5000);
	
	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1Ijoiam9obndpZDkyIiwiYSI6ImNrODN1Ymd1MTAzN28zbHBqaGx1MnV6M3UifQ.lKGGGN514FvC70fncNHbMg'
	}).addTo(mymap);
}

var pass_time_submit = document.getElementById("pass-time-submit");
pass_time_submit.addEventListener("click", getPassTimes);

function getData() {
	fetch("http://api.open-notify.org/iss-now.json")
		.then(
			function(response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + response.status);
					return;
				}

				// Examine text in the response
				response.json().then(function(data) {
						console.log("Updated!");
						lat = data['iss_position']['latitude'];
						lng = data['iss_position']['longitude'];
						document.getElementById('latitude').innerHTML=lat;
						document.getElementById('longitude').innerHTML=lng;
						mymap.panTo([lat,lng]);
				});
			}
		)
		.catch(function(err) {
			console.log('Fetch Error :-S', err);
		});
}

function getPassTimes() {
	var lat = document.getElementById('lat-input').value;
	var long = document.getElementById('long-input').value;
	var url = '/_get_pass_times/'+lat+'/'+long
	fetch(url)
		.then(
			function(response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + response.status);
					return;
				}

				response.json().then(function(data) {
					var ul = document.getElementById('time-list');
					while (ul.firstChild) {
						ul.firstChild.remove();
					}
					for (var i=0; i<data['response'].length; i++){
						var li = document.createElement("LI");
						ul.appendChild(li);

						var risetime = new Date(data['response'][i]['risetime'] * 1000);
						
						data['response'][i]['risetime'] = risetime.getHours() +":"
							+ risetime.getMinutes() +" on "
							+ risetime.getMonth() +'/'+ risetime.getDate()

						var display = "Duration: " + data['response'][i]['duration'] + " - " +
									  "Risetime: " + data['response'][i]['risetime'];

						li.innerHTML = display;
					}
				});
			}
		)
		.catch(function(err) {
			console.log('Fetch Error :-S', err);
		});
}

function getAstronauts() {
	fetch("/_get_astronauts")
		.then(
			function(response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' + response.status);
					return;
				}

				response.json().then(function(data) {
					document.getElementById("num-astros").innerHTML=data['number']
					var ul = document.getElementById('astros-list');
					for (var i=0; i<data['number']; i++) {
						var li = document.createElement("LI");
						ul.appendChild(li);
						li.innerHTML = data["people"][i]["name"]
					}
				});
			}
		)
		.catch(function(err) {
			console.log('Fetch Error :-S', err);
	});
}