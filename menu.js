/// <reference lib="dom"/>
addEventListener("load", () => {
	initSpeedrun();
});

function initSpeedrun() {
	for (const ele of document.querySelectorAll("game-mode-selector button")) {
		if (ele.textContent.trim() === "Solo") {
			createButton(ele);
		}
	}
}

function createButton(/** @type {HTMLElement} */ soloEle) {
	const /** @type {HTMLElement} */ parentEle = soloEle.parentElement;
	parentEle.classList.add("sm:grid-cols-3");
	soloEle.classList.add("lg:col-span-2");
	parentEle.classList.add("sm:grid");
	parentEle.classList.add("gap-4");
	parentEle.classList.remove("sm:block");

	const /** @type {HTMLElement} */ containerEle = parentEle.cloneNode();
	soloEle.after(containerEle);

	const /** @type {HTMLElement} */ speedrunEle = soloEle.cloneNode();
	speedrunEle.textContent = "Speed Run";
	speedrunEle.classList.add("bg-slate-600");
	speedrunEle.classList.remove("bg-sky-600");
	speedrunEle.addEventListener("click", startGame);
	containerEle.appendChild(speedrunEle);

	const /** @type {HTMLElement} */ highscoreEle = speedrunEle.cloneNode();
	highscoreEle.textContent = "🏆";
	highscoreEle.classList.remove("lg:col-span-2");
	highscoreEle.addEventListener("click", toggleHighscore);
	containerEle.appendChild(highscoreEle);

	document.addEventListener("join-lobby", interceptEvent, true);
}

isSpeedrun = false;
function startGame() {
	const /** @type {HTMLButtonElement} */ startEle = document.querySelector(
		"single-player-modal > div > div:last-child > button",
	);
	startEle.click();
	isSpeedrun = true;
}

function interceptEvent(/** @type {Event} */ ev) {
	if (!isSpeedrun) {
		return;
	}
	isSpeedrun = false;
	ev.stopPropagation();
	const detail = ev.detail;
	detail.gameStartInfo.config = speedrunConfig;
	document.dispatchEvent(
		new CustomEvent("join-lobby", {
			detail,
			source: "singleplayer",
			bubbles: true,
			composed: true,
		}),
	);
}

function toggleHighscore() {
	const /** @type {HTMLElement} */ modal =
		document.querySelector("highscore-modal") ?? createHighscore();
	modal.classList.toggle("hidden");

	const playPage = document.querySelector("play-page > div");
	playPage.classList.toggle("hidden");

	if (!modal.classList.contains("hidden")) {
		populateHighscore();
	}
}

function createHighscore() {
	const existingModal = document.querySelector("user-setting");
	const modal = document.createElement("highscore-modal");
	modal.appendChild(existingModal.cloneNode(true).querySelector("div"));
	modal.classList.add(
		"hidden",
		"w-full",
		"h-full",
		"page-content",
		"relative",
		"z-50",
	);
	existingModal.after(modal);
	modal.nodeType = "highscore-modal";

	const modalDiv = modal.querySelector(":scope > div:nth-child(1)");

	const headerDiv = modalDiv.querySelector(":scope > div:nth-child(1)");
	headerDiv.removeChild(headerDiv.querySelector(":scope > div:nth-child(2)"));
	headerDiv.querySelector("span").textContent = "Highscores";
	headerDiv.querySelector("button").addEventListener("click", toggleHighscore);

	const body = modalDiv.querySelector(":scope > div:nth-child(2) > div");
	body.replaceChildren();
	return modal;
}

function populateHighscore() {
	const body = document.querySelector(
		"highscore-modal > div > div:nth-child(2) > div",
	);
	body.replaceChildren();
	const /** @type {Object[]} */ highscores =
		JSON.parse(localStorage.getItem(SPEEDRUN_KEY)) ?? [];
	for (const hs of highscores) {
		const ele = document.createElement("div");
		ele.classList.add(
			"bg-white/5",
			"roundex-x1",
			"border",
			"border-white/10",
			"p-6",
			"flex",
			"flex-col",
			"sm:flex-row",
			"sm:items-center",
			"justify-between",
			"px-4",
			"py-3",
			"gap-3",
		);
		body.appendChild(ele);

		dateEle = document.createElement("div");
		dateEle.classList.add(
			"text-white",
			"font-bold",
			"text-base",
			"block",
			"mb-1",
		);
		dateEle.textContent = new Date(hs.date).toLocaleDateString();
		ele.appendChild(dateEle);


		idEle = document.createElement("div");
		idEle.classList.add(
			"text-white",
			"font-medium",
			"text-base",
			"block",
			"mb-1",
		);
		idEle.textContent = hs.gameId;
		ele.appendChild(idEle);

		timeEle = document.createElement("div");
		timeEle.classList.add(
			"text-white",
			"font-medium",
			"text-base",
			"block",
			"mb-1",
		);
		timeEle.textContent = hs.time;
		ele.appendChild(timeEle);
	}
}
