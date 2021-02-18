/* MagicMover - Prevent screen burn-in for MagicMirror */

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
    ignoredRegions: ['.region.lower.third', '.region.bottom.bar'],
    maxMove: 20,
  },

  // Define required styles.
  getStyles: function () {
    return ['MMM-MagicMover.css'];
  },

  // Define start sequence.
  start: function () {
    Log.info('Starting module: ' + this.name);
    this.timers = [];
  },

  magicRandomizer: function () {
    const coords = {},
      min = ~(this.config.maxMove / 2) + 1,
      max = this.config.maxMove / 2;

    coords.x = Math.ceil(Math.random() * (max - min) + min);
    coords.y = Math.ceil(Math.random() * (max - min) + min);

    return coords;
  },

  magicMover: function () {
    const that = this;
    let selectors = [
      '.region.top.bar',
      '.region.upper.third',
      '.region.middle.center',
      '.region.lower.third',
      '.region.bottom.bar',
    ];
    // selecors =
    //   '.region.top.bar, .region.upper.third, ' +
    //   '.region.middle.center, ' +
    //   '.region.lower.third, .region.bottom.bar';

    selectors = selectors.filter((item) => !this.config.ignoredRegions.includes(item));

    that.timers = [];

    document.querySelectorAll(selectors.join(', ')).forEach((el) => {
      el.classList.add('magic-mover');

      const thisTimer = that.config.updateInterval + Math.ceil(Math.random() * (10000 - 1) + 1);

      that.timers.push(
        setInterval(function () {
          const coords = that.magicRandomizer();
          el.style.transform = 'translate(' + coords.x + 'px,' + coords.y + 'px)';
        }, thisTimer)
      );
    });
  },

  magicRemover: function () {
    document.querySelectorAll('.magic-mover').forEach((el) => {
      el.classList.remove('magic-mover');
    });

    for (let i of this.timers) {
      clearInterval(i);
    }
  },

  notificationReceived: function (notification, payload, sender) {
    switch (notification) {
      case 'DOM_OBJECTS_CREATED':
        this.magicMover();
        break;
      case 'MAGIC_MOVER_ON':
        this.magicMover();
        break;
      case 'MAGIC_MOVER_OFF':
        this.magicRemover();
        break;
    }
  },

  getDom: function () {
    const wrapper = document.createElement('div');
    return wrapper;
  },
});
