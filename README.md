# OpenFront Speedrun Extension

A Chrome extension that adds speedrun support to OpenFront, making it faster and easier to start runs and track your performance.

## Features

* 🚀 One-click Australia speedrun start directly from the home screen
* ⏱️ Automatic high score tracking (stored locally)
* 🧩 Seamless integration into the OpenFront UI
* ⚡ Lightweight and fast, no setup required

## Installation

### From Source

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/openfront-speedrun-extension.git
   ```
2. Open Chrome and go to `chrome://extensions/`
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the project folder

## Usage

* Open OpenFront in your browser
* Use the new buttons on the home screen to instantly start an Australia speedrun
* Your best times will be automatically saved and updated locally

## Privacy

This extension does **not** collect or transmit any personal data.

* All data (such as high scores) is stored locally using browser storage
* No external servers are used by the extension
* Any network activity is part of normal OpenFront gameplay

See the full Privacy Policy above or in the extension listing for more details.

## Permissions Justification

This extension uses content scripts to modify the OpenFront interface in order to:

* Add speedrun buttons to the home screen
* Detect when the user is on the correct page
* Track and update high scores

These permissions are required for the core functionality and are limited strictly to the OpenFront website.

## Contributing

Contributions, issues, and suggestions are welcome.
Feel free to open a pull request or issue to improve the extension.

## License

This project is licensed under the GPL License – see the `LICENSE` file for details.
