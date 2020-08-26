# MMM-MagicMover
A module for MagicMirror² (https://github.com/MichMich/MagicMirror) to prevent screen burn-in.

## Install
1. Clone repository into `../modules/` inside your MagicMirror folder.
    * `git clone https://github.com/Lavve/MMM-MagicMover`
2. Add the module to the MagicMirror config.js
```javascript
{
    module: "MMM-MagicMover",
    config: {
        updateInterval: 60 * 1000,
        maxMove: 20,
    }
},
```
Note that `position` isn't used, and is obsolete even if added to config
## Configuration options
| Configuration | Default | Description |
| ------------- |-------------|-----|
| updateInterval | `60*1000` | (int) Time in milliseconds before next movement |
| maxMove | `20` | (int) Amount of pixels the container is moved based on default position |
## Enable/disable module
To enable/disable MMM-MagicMover from other modules user following code:
```javascript
this.sendNotification('MAGIC_MOVER_ON', {});
this.sendNotification('MAGIC_MOVER_OFF', {});
```
## Collaborate
Pull requests are welcome.