import { compareDate, compareTime, loadSpeedruns } from "./save.js";

export function createHighscore() {
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

export function toggleHighscore() {
	const /** @type {HTMLElement} */ modal =
		document.querySelector("highscore-modal") ?? createHighscore();
	modal.classList.toggle("hidden");

	const playPage = document.querySelector("play-page > div");
	playPage.classList.toggle("hidden");

	if (!modal.classList.contains("hidden")) {
		populateHighscore();
	}
}

function populateHighscore() {
	const body = document.querySelector(
		"highscore-modal > div > div:nth-child(2) > div",
	);
	body.replaceChildren();
	const highscores = loadSpeedruns("Default");
	highscores.sort(compareTime);
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
