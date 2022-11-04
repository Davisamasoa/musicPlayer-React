import { updateLineProgress } from "../component/Components/musicStats";
export const handleClick = (e) => {
	if (document.querySelector(".btn-play").style.display !== "none") {
		hiddenPlayButton();
		play();
	} else {
		hiddenPauseButton();
		pause();
	}
};
export function changeMusic() {
	document.querySelector("audio").addEventListener("loadeddata", () => {
		pause();
		play();
	});

	play();
}

function play() {
	document.querySelector("audio").play();
	hiddenPlayButton();
}

function pause() {
	document.querySelector("audio").pause();
}

export function listener() {
	window.addEventListener("keydown", (e) => {
		if (e.key === " ") {
			handleClick();
		}
	});
}

function hiddenPlayButton() {
	document.querySelector(".btn-play").style.display = "none";
	document.querySelector(".btn-pause").style.display = "block";
}

function hiddenPauseButton() {
	document.querySelector(".btn-pause").style.display = "none";
	document.querySelector(".btn-play").style.display = "block";
}

export function audioListener() {
	document
		.querySelector("audio")
		.addEventListener("timeupdate", updateLineProgress);
}
