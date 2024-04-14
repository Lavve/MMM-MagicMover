# MMM-MagicMover

A module for [MagicMirror²](https://github.com/MagicMirrorOrg/MagicMirror) to prevent screen burn-in.

![Screen Burn-In Symbolization](/img/screen-burn-in.png)

## Install

1. Clone repository into the `MagicMirror/modules/` folder.

```bash
cd ~/MagicMirror/modules
git clone https://github.com/Lavve/MMM-MagicMover
```

2. Add the module to the MagicMirror config.js, preferabley before the other modules. If you want to use the default settings you can skip adding the config node.

```js
{
  module: "MMM-MagicMover",
  config: {
    updateInterval: 10 * 60 * 1000,
    ignoredRegions: [],
    maxMove: 15,
    moveWholescreen: false,
  }
},
```

*(Note that the `'position'` and `'header'` nodes are not used, and is obsolete even if added to config)*

## Configuration options

| Configuration | Default | Type | Description |
| --- | --- | --- | --- |
| updateInterval | `10 * 60 * 1000` | int  | Time in milliseconds before next movement |
| ignoredRegions | `[]` | array | An array with regions that will *not* be affected by MMM-MagicMover. Possible values are the same used in [config.js](https://docs.magicmirror.builders/modules/configuration.html#module-configuration):<br /><br />`'top_bar'`, `'top_left'`, `'top_center'`, `'top_right'`, `'upper_third'`, `'middle_center'`, `'lower_third'`, `'bottom_left'`, `'bottom_center'`, `'bottom_right'`, `'bottom_bar'`, `'fullscreen_above'` and `'fullscreen_below'`.<br /><br />You can still use the class names for each region, like `'.region.top.center'`.<br /><br />Also the alert module modals are available for exluding:<br />`'.ns-box'` and `'.ns-alert'`. |
| maxMove | `15` | int | Amount of pixels the container is moved based on default position |
| moveWholescreen | 'false' | boolean | Move the whole display instead of moving each module independantly |

## Enable/disable/toggle MMM-MagicMover module

To enable/disable/toggle MMM-MagicMover from other modules use the following codes:

```js
this.sendNotification('MAGIC_MOVER_ON', {});
this.sendNotification('MAGIC_MOVER_OFF', {});
this.sendNotification('MAGIC_MOVER_TOGGLE', {});
```

## History

- 3 March 2022: Major optimizations and clean up
- 1 February 2022: Changed to same names for regions as used in config.js. Also reduced default movement from 20px to 15px.
- 6 December 2021: Bug fixes and imporovements. Added notification settings

## TODO

- [x] Use same names for regions as in config.js

## Collaborate

Pull requests, translations and suggestions for improvements are more than welcome.

### Developer commands

- `npm ci` - Install devDependencies like ESLint.
- `npm run lint` - Run linting and formatter checks.
- `npm run lint:fix` - Fix linting and formatter issues.

## Donations

[🍻 Buy me a beer](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SM9XRXUPPJM84&item_name=%40lavve+MagicMiror+Modules) if you like my modules! ❤️
