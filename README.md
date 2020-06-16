# MMM-MagicMover
A module for MagicMirror² (https://github.com/MichMich/MagicMirror) to prevent screen burn-in.

## Install
1. Clone repository into `../modules/` inside your MagicMirror folder.
    * `git clone https://github.com/Lavve/MMM-MagicMover`
3. Add the module to the MagicMirror config
```javascript
	{
		module: "MMM-MagicMover",
		position: "left",
		config: {
			updateInterval: 60 * 1000,
			maxMove: 20,
        }
    },
```
## Configuration options
| Configuration | Default | Description |
| ------------- |-------------|-----|
| updateInterval | `60*1000` | (int) Time in milliseconds for new movement |
| maxMove | `20` | (int) Amount of pixels the container is moved based on default position |
## Collaborate
Pull requests are welcome.
