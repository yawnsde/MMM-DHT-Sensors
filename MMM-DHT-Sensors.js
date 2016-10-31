/* global Module */

/* Magic Mirror
 * Module: MMM-DHT-Sensors
 *
 * By Stefan Krause http://yawns.de
 * MIT Licensed.
 */

Module.register('MMM-DHT-Sensors',{
	
	defaults: {
		sensorPIN: 18,
		sensorType: "11", //DHT11 = 11, DHT22/AM2302 = 22
		units: config.units,
		animationSpeed: 1000,
		refreshInterval: 50000,
	},
	
	start: function() {
		Log.info('Starting module: ' + this.name);

		this.loaded = false;
		this.temperature = null;
		this.humidity = null;

		this.sendSocketNotification('CONFIG', this.config);

	},

	getDom: function() {


		var wrapper = document.createElement("div");

		if (!this.loaded) {
			wrapper.innerHTML = this.translate('LOADING');
			wrapper.className = "dimmed light small";
			return wrapper;
		}

		wrapper.className = "small";

		var spacer = document.createElement("span");
		spacer.innerHTML = "&nbsp;";

		if (this.temperature != null) {
			var temperature_symbol =  document.createElement("span");
			if (this.temperature >= 30) {
				temperature_symbol.className = "fa fa-thermometer-full";
			} else if (this.temperature >= 20) {
				temperature_symbol.className = "fa fa-thermometer-three-quarters";
			} else if (this.temperature >= 10) {
				temperature_symbol.className = "fa fa-thermometer-half";
			} else if (this.temperature >= 0) {
				temperature_symbol.className = "fa fa-thermometer-quarter";
			} else {
				temperature_symbol.className = "fa fa-thermometer-empty";
			}
			wrapper.appendChild(temperature_symbol);
			var temperature_text = document.createElement("span");
			temperature_text.innerHTML = " " + this.temperature + "&deg;";
			wrapper.appendChild(temperature_text);
		}

		wrapper.appendChild(spacer);

		if (this.humidity != null) {
			var humidity_symbol =  document.createElement("span");
			humidity_symbol.className = "fa fa-tint";			
			wrapper.appendChild(humidity_symbol);
			var humidity_text = document.createElement("span");
			humidity_text.innerHTML = " " + this.humidity + "%";
			wrapper.appendChild(humidity_text);
		}		

		return wrapper;
	},
	
  	socketNotificationReceived: function(notification, payload) {
    		if (notification === "STARTED") {
				this.loaded = true;
				this.updateDom();
			}
			else if (notification === "DATA") {
      			this.temperature = payload.temperature;
      			this.humidity = payload.humidity;
      			this.updateDom();
    		}
  	}	
});
