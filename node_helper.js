'use strict';

/* Magic Mirror
 * Module: MMM-DHT-Sensors
 *
 * By Stefan Krause http://yawns.de
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var sensor = require('node-dht-sensor');

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
	},

	readSensor: function() {
		var self = this;
		
		var values = sensor.read(this.config.sensorType, this.config.sensorPIN);
		
		if (values.isValid) {
			self.sendSocketNotification("DATA", values);
		}

		setTimeout(function() { self.readSensor(); }, this.config.refreshInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		var self = this;
		if (notification === 'CONFIG' && self.started == false) {
			self.config = payload;
			self.sendSocketNotification("STARTED", true);
			self.readSensor();
			self.started = true;
		}
	}
});
