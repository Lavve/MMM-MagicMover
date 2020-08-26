/* MagicMover - Timetable for MagicMover Module */

/* Magic Mirror
 * Module: MMM-MagicMover
 *
 * By Magnus Claesson https://github.com/Lavve
 * MIT Licensed.
 */
Module.register('MMM-MagicMover', {
  // Define module defaults
  defaults: {
    updateInterval: 60 * 1000,
    maxMove: 20,
  },

  // Define required styles.
  getStyles: function () {
    return ['MMM-MagicMover.css'];
  },

  // Define start sequence.
  start: function () {
    Log.info('Starting module: ' + this.name);
  },

  mover: function () {
    var that = this,
      selecors =
        '.region.top.bar,' +
        '.region.upper.third, .region.middle.center, .region.lower.third,' +
        '.region.bottom.bar';

    document.querySelectorAll(selecors).forEach((element) => {
      element.classList.add('magic-mover');

      var thisTimer = that.config.updateInterval + Math.ceil(Math.random() * (10000 - 1) + 1);

      setInterval(function () {
        var coords = that.randomizer();
        element.style.transform = 'translate(' + coords.x + 'px,' + coords.y + 'px)';
      }, thisTimer);
    });
  },

  remover: function () {
    const el = document.querySelector('.magic-mover');
    el.classList.remove('magic-mover');
  },

  randomizer: function () {
    var coords = [],
      min = ~(this.config.maxMove / 2) + 1,
      max = this.config.maxMove / 2;

    coords.x = Math.ceil(Math.random() * (max - min) + min);
    coords.y = Math.ceil(Math.random() * (max - min) + min);

    return coords;
  },

  notificationReceived: function (notification, payload, sender) {
    switch (notification) {
      case 'DOM_OBJECTS_CREATED':
        this.mover();
        break;
      case 'MAGIC_MOVER_ON':
        this.mover();
        break;
      case 'MAGIC_MOVER_OFF':
        this.remover();
        break;
    }
  },

  getDom: function () {
    var wrapper = document.createElement('div');
    return wrapper;
  },
});
