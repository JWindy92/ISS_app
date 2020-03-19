console.log("Hello");

window.onload = function(){ 
	this.getData();
	this.setInterval(this.getData, 5000);
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
						document.getElementById('latitude').innerHTML=data['iss_position']['latitude'];
						document.getElementById('longitude').innerHTML=data['iss_position']['longitude'];
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
	var url = '/_test'
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

