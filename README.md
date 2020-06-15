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
			updateInterval: 60 * 1000,	// Set time for updates in ms
			maxMove: 20,			// Set max movements in pixels
        }
    },
```
