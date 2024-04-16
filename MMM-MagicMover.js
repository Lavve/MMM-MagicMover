/*
 * MagicMirror²
 * Module: MMM-MagicMover
 *
 * Prevent screen burn-in for MagicMirror².
 *
 * By Magnus Claesson https://github.com/Lavve
 * MIT Licensed.
 */
Module.register('MMM-MagicMover', {
  defaults: {
    updateInterval: 20 * 60 * 1000,
    ignoredRegions: [],
    maxMove: 15,
    moveWholescreen: false,
  },

  getStyles () {
    return [`${this.name}.css`];
  },

  start () {
    Log.info(`Starting module: ${this.name}`);
  },

  // Randomized coordinates
  magicRandomizer () {
    const min = ~(this.config.maxMove / 2) + 1;
    const max = this.config.maxMove / 2;
    return {
      x: `${Math.ceil(Math.random() * (max - min) + min)}px`,
      y: `${Math.ceil(Math.random() * (max - min) + min)}px`,
    };
  },

  // Check if extra translate style is needed
  magicTranslate (el) {
    return el.matches('.region.top.center') || el.matches('.region.bottom.center')
      ? 'translateX(-50%)'
      : el.matches('.region.upper.third') ||
      el.matches('.region.middle.center') ||
      el.matches('.region.lower.third')
        ? 'translateY(-50%)'
        : '';
  },

  // Get all movable regions
  magicRegions () {
    if (this.config.moveWholescreen) return ['body'];

    const ignores = [
      ...['.region.top.bar', '.region.bottom.bar'],
      ...this.config.ignoredRegions.map(
        (ignore) => (ignore.slice(0, 1) === '.'
          ? ignore
          : `.region.${ignore.split('_').join('.')}`)
      )
    ];

    return [...document.querySelectorAll('.region', '.ns-box', '.ns-alert')]
      .map((r) => `.${r.className.replaceAll(' ', '.')}`)
      .filter((r) => !ignores.includes(r));
  },

  // Move regions and start timer for each
  magicMover () {
    document.querySelectorAll(this.magicRegions().join(', ')).forEach((el) => {
      el.classList.add('magic-mover');
      this.timers.push(
        setInterval(() => {
          const c = this.magicRandomizer();
          el.style.transform = `translate(${c.x}, ${
            c.y
          }) translate3d(0, 0, 0) ${this.magicTranslate(el)}`;
        }, `${this.config.updateInterval + Math.ceil(Math.random() * (10000 - 1) + 1)}`)
      );
    });
    this.isMoving = !0;
  },

  // Remove all movements and stop all timers
  magicRemover () {
    document.querySelectorAll('.magic-mover').forEach((el) => {
      el.removeAttribute('style');
      el.classList.remove('magic-mover');
    });
    this.timers.forEach((t) => {
      clearInterval(t);
    });
    this.timers = [];
    this.isMoving = !1;
  },

  // Remotely start or stop movements
  notificationReceived (notification) {
    switch (notification) {
      case 'DOM_OBJECTS_CREATED':
        this.timers = [];
        this.magicMover();
        break;
      case 'MAGIC_MOVER_ON':
        this.magicMover();
        break;
      case 'MAGIC_MOVER_OFF':
        this.magicRemover();
        break;
      case 'MAGIC_MOVER_TOGGLE':
        this[this.isMoving
          ? 'magicRemover'
          : 'magicMover']();
        break;
    }
  },
});
