$(document).ready(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var lat = position.coords.latitude;
			var long = position.coords.longitude;
			getWeather(lat, long);
		});
	}

	var celsius;
	var fahrenheit;
	var location;
	var weatherType;
	var description;
	var compare = false;

	//function to Title Case things to make it neater.
	function titleCase(str) {
		var strSplit = str.toLowerCase().split(' ');
		var capitalStr = strSplit.map(function(val) {
			return val.replace(val.charAt(0), val.charAt(0).toUpperCase());
		});
		return capitalStr.join(' ');
	}

	function getWeather(lat, long) {
		$.ajax({
			url:
				'https://api.darksky.net/forecast/ad742839704b9afd77a5ffa2a9775db8/' +
				lat +
				',' +
				long +
				'?units=si',
			dataType: 'jsonp',

			success: function(data) {
				location = data.timezone
					.split('/')
					.slice(1)
					.join('')
					.replace(/_/g, ' ');
				celsius = Math.round(data.currently.temperature) + '°C';
				fahrenheit =
					Math.round(data.currently.temperature * (9 / 5) + 32) + '°F';
				weatherType = data.currently.icon;
				description = weatherType.replace(/-/g, ' ');

				$('#location').html(titleCase(location));
				$('#weather-description').html(titleCase(description));
				$('#weather').html(celsius);

				// Assigns Skycon icon to canvas element based on weather type.
				var skycons = new Skycons({ color: 'orange' });
				skycons.add('icon', weatherType);
				skycons.play();
			} //closes out data function
		}); // closes out ajax call
	} // closes out getWeather function

	//Toggles between celsius and fahrenheit
	$('#weather').click(function(data) {
		data.preventDefault();
		compare = !compare;

		if (compare) {
			$('#weather').html(fahrenheit);
		} else {
			$('#weather').html(celsius);
		}
	});
	//Toggles between celsius and fahrenheit
});
