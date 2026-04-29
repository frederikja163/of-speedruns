import { BASE_KEY } from "./config.js";

/**
 * @typedef {Object} Speedrun
 * @property {string} gameId
 * @property {number} time
 * @property {number} date
 */

/** 
 * @param {string} confKey 
 * @returns {Speedrun[]}
 */
export function loadSpeedruns(confKey) {
	return JSON.parse(localStorage.getItem(BASE_KEY + confKey)) ?? [];
}

/**
 * @param {string} confKey 
 * @param {number} gameId 
 * @param {number} time 
 */
export function saveSpeedrun(confKey, gameId, time) {
	const rank = loadSpeedruns(confKey);
	const speedrun = { date: Date.now(), gameId, time };
	rank.push(speedrun);
	console.log(`New speedrun for ${confKey}: ${speedrun}`);
	localStorage.setItem(BASE_KEY + confKey, JSON.stringify(rank));
}

/**
 * @param {Speedrun} a 
 * @param {Speedrun} b 
 */
export function compareDate(a, b){
	return a.date - b.date;
}

/**
 * @param {Speedrun} a 
 * @param {Speedrun} b 
 * @returns {number}
 */
export function compareTime(a, b){
	return parseTime(a.time) - parseTime(b.time);
}

/**
 * @param {number} time 
 */
export function parseTime(time){
	const parts = time.split(":");
	return parseInt(parts[0]) * 60 + parseInt(parts[1]) +
		(parts.length === 2 ? 0 : parseInt(parts[2]));
}
