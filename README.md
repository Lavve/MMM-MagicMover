# MMM-MagicMover

A module for MagicMirror² (https://github.com/MichMich/MagicMirror) to prevent screen burn

# Install

1. Clone repository into `../modules/` inside your MagicMirror folder.
4. Add the module to the MagicMirror config
```
	{
		module: "MMM-MagicMover",
		position: "left",
		config: {
			updateInterval: "",		// Set time for updates in ms  [default: one minute (60 * 1000)]
			maxMove: "",			// Set max movements in pixels [default: 40]
			animationSpeed: ""		// Set animation speed in ms   [default: 500]
        }
    },
```