/* MagicMover - Timetable for MagicMover Module */

/* Magic Mirror
 * Module: MMM-MagicMover
 *
 * By Magnus Claesson https://github.com/Lavve
 * MIT Licensed.
 */
 Module.register("MMM-MagicMover",{

	// Define module defaults
	defaults: {
		updateInterval: 60 * 1000,
		maxMove: 40,
		animationSpeed: 500
	},

	// Define required styles.
	getStyles: function() {
		return ["MMM-MagicMover.css"];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
	},

	mover: function() {
		var modules = document.getElementsByClassName('modules'),
		count = modules.length;

		while(count--) {
			var me = modules[count],
				thisTimer = this.config.updateInterval * count,
				coords = this.coords(),
				moduleTimer;

			if (moduleTimer[counter]) {
				clearTimeout(moduleTimer[counter]);
			}

			moduleTimer[counter] = setTimeout(function () {
				me.style.transform = 'translate(' + coords.x + 'px,' + coords.y + 'px)';
			}, thisTimer);
		}
	},

	randomizer: function () {
		var coords = [];

		coords.x = Math.floor(Math.random() * this.config.maxMove);
		coords.y = Math.floor(Math.random() * this.config.maxMove);

		return coords;
	},

	notificationReceived: function(notification, payload, sender) {
		switch(notification) {
			case 'DOM_OBJECTS_CREATED':
			this.mover();
			break;
		}
	}
});