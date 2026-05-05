import { getSoloButton, getStartButton } from "./get-elements.js";
import { speedrunConfig } from "./config.js";
import { toggleHighscore } from "./highscore.js";

export function createButton() {
	const soloEle = getSoloButton();
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
	const startEle = getStartButton();
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

