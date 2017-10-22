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
			updateInterval: "",		// ResRobot Station ID (or a comma-separated string of IDs)
			animationSpeed: ""		// ResRobot Station ID of destination (or a comma-separated string of IDs)
        }
    },
```