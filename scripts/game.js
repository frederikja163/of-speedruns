import { speedrunConfig } from "./config.js";
import { saveSpeedrun } from "./save.js";

/**
 * @param {Event} ev 
 */
export function initGame(ev){
	const config = ev?.detail?.gameStartInfo?.config;
	if (!config) {
		return;
	}
	for (const key in speedrunConfig) {
		if (JSON.stringify(config[key]) != JSON.stringify(speedrunConfig[key])) {
			return;
		}
	}
	console.log("Entering speedrun 'Default'");
	requestAnimationFrame(checkVictory);
}

/**
 * @returns {number | undefined}
 */
function getTime() {
	const containerEle = document.querySelector(
		"game-right-sidebar > aside > div:first-child",
	);
	if (!containerEle) {
		return undefined;
	}
	const time = containerEle.textContent;
	return time;
}

/**
 * @returns {string}
 */
function getGameId() {
	const path = location.pathname;
	const parts = path.split("/");
	return parts[parts.length - 1];
}


function checkVictory() {
	const winEle = document.querySelector("win-modal > div");
	if (winEle.classList.contains("hidden")) {
		requestAnimationFrame(checkVictory);
		return;
	}

	const titleEle = winEle.querySelector(":scope > h2");
	if (!titleEle.textContent.toLowerCase().includes("won")) {
		return;
	}
	saveSpeedrun("Default", getGameId(), getTime());
}
