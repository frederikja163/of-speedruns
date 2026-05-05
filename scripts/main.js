import { createButton } from './menu.js';
import { createHighscore } from './highscore.js';
import { initGame } from './game.js';

addEventListener("load", () => {
	createButton();
	createHighscore();
	document.addEventListener("join-lobby", initGame);
});
