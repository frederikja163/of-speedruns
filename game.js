/// <reference lib="dom"/>
document.addEventListener("join-lobby", (ev) => {
	const config = ev?.detail?.gameStartInfo?.config;
	if (!config) {
		return;
	}

	for (const key in speedrunConfig) {
		if (JSON.stringify(config[key]) != JSON.stringify(speedrunConfig[key])) {
			return;
		}
	}
	requestAnimationFrame(checkVictory);
});

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
	saveSpeedrun();
}

function saveSpeedrun() {
	const /** @type {Object[]} */ rank =
		JSON.parse(localStorage.getItem(SPEEDRUN_KEY)) ?? [];
	const time = getTime();
	const gameId = getGameId();
	let index = 0;
	for (const game of rank) {
		if (game.order > time.order) {
			break;
		}
		if (game.gameId === gameId) {
			return;
		}
		index += 1;
	}
	const speedrun = { date: Date.now(), gameId, ...time };
	rank.splice(index, 0, speedrun);
	console.log("Saved speedrun at ", index, ":", speedrun);
	localStorage.setItem(SPEEDRUN_KEY, JSON.stringify(rank));
}

function getTime() {
	const containerEle = document.querySelector(
		"game-right-sidebar > aside > div:first-child",
	);
	if (!containerEle) {
		return undefined;
	}
	const time = containerEle.textContent;
	const parts = time.split(":");
	const order = parseInt(parts[0]) * 60 + parseInt(parts[1]) +
		(parts.length === 2 ? 0 : parseInt(parts[2]));
	return { time, order };
}

function getGameId() {
	const path = location.pathname;
	const parts = path.split("/");
	return parts[parts.length - 1];
}
