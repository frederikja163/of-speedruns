import { createButton } from './menu.js';
import { createHighscore } from './highscore.js';
import { initGame } from './game.js';

addEventListener("load", () => {
	for (const ele of document.querySelectorAll("game-mode-selector button")) {
		if (ele.textContent.trim() === "Solo") {
			createButton(ele);
		}
	}
	createHighscore();
	document.addEventListener("join-lobby", initGame);
});
