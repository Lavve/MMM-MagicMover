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
    ignoredRegions: [],
    maxMove: 15,
  },

  // Define required styles.
  getStyles: function () {
    return ['MMM-MagicMover.css'];
  },

  // Define start sequence.
  start: function () {
    Log.info('Starting module: ' + this.name);
    this.timers = [];
    this.isMoving = true;
  },

  // Ranomize new position
  magicRandomizer: function () {
    const coords = {},
      min = ~(this.config.maxMove / 2) + 1,
      max = this.config.maxMove / 2;

    coords.x = Math.ceil(Math.random() * (max - min) + min);
    coords.y = Math.ceil(Math.random() * (max - min) + min);

    return coords;
  },

  // Move sections and start timer for each
  magicMover: function () {
    this.isMoving = true;
    const allRegions = [
      'top_bar',
      'top_left',
      'top_center',
      'top_right',
      'upper_third',
      'middle_center',
      'lower_third',
      'bottom_left',
      'bottom_center',
      'bottom_right',
      'bottom_bar',
      'fullscreen_above',
      'fullscreen_below',
    ];
    const allAlerts = ['.ns-box', '.ns-alert'];

    selectors = allRegions.map(
      (region) => '.region.' + region.split('_').join('.')
    );
    selectors.push(...allAlerts);

    const ignores = this.config.ignoredRegions.map((ignore) =>
      ignore.charAt(0) !== '.'
        ? '.region.' + ignore.split('_').join('.')
        : ignore
    );

    this.selectors = selectors.filter((r) => !ignores.includes(r));

    this.timers = [];

    document.querySelectorAll(this.selectors.join(', ')).forEach((el) => {
      // Fix for some regions
      let translate = '';
      if (
        el.matches('.region.top.center') ||
        el.matches('.region.bottom.center')
      ) {
        translate = ' translateX(-50%)';
      }
      if (
        el.matches('.region.upper.third') ||
        el.matches('.region.middle.center') ||
        el.matches('.region.lower.third')
      ) {
        translate = ' translateY(-50%)';
      }

      el.classList.add('magic-mover');
      // Let's move them independently
      const thisTimer =
        this.config.updateInterval + Math.ceil(Math.random() * (10000 - 1) + 1);

      this.timers.push(
        setInterval(() => {
          const coords = this.magicRandomizer();
          el.style.transform =
            'translate3d(0, 0, 0) translate(' +
            coords.x +
            'px,' +
            coords.y +
            'px)' +
            translate;
        }, thisTimer)
      );
    });
  },

  // Remove all movements and stopp the timers
  magicRemover: function () {
    this.isMoving = false;
    document.querySelectorAll('.magic-mover').forEach((el) => {
      el.classList.remove('magic-mover');
      el.removeAttribute('style');
    });

    for (let i of this.timers) {
      clearInterval(this.timers[i]);
    }
    this.timers = [];
  },

  // Toggle movements
  magicToggler: function () {
    this[this.isMoving ? 'magicRemover' : 'magicMover']();
  },

  // Remotely start or stop movements
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
      case 'MAGIC_MOVER_TOGGLE':
        this.magicToggler();
        break;
    }
  },

  getDom: function () {
    const wrapper = document.createElement('div');
    return wrapper;
  },
});
