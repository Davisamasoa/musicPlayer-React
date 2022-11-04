import { useState } from "react";

export function Volume() {
	const [volume, setVolume] = useState(0.5);

	return (
		<div className="div-volume">
			<button className="btn-volume" onClick={showVolumeBar}>
				<img className="volume-icon" src="./assets/icon/volume3.png" alt="" />
			</button>
			<div className="background-volume">
				<input
					type="range"
					className="volume-control"
					value={volume * 100}
					min="0"
					max="100"
					step="1"
					onChange={changeVolume}
				/>
				<progress className="volume-progress" value="0"></progress>
			</div>
		</div>
	);
	function changeVolume(e) {
		const volume = document.querySelector(".volume-control");
		const audio = document.querySelector("audio");
		audio.volume = e.target.value / 100;
		const volumeBar = document.querySelector(".volume-progress");
		volumeBar.style.width = audio.volume * 100 + "%";
		const volumeIcon = document.querySelector(".volume-icon");
		if (volume.value >= 66) {
			volumeIcon.src = "./assets/icon/volume3.png";
		}

		if (volume.value >= 33 && volume.value < 66) {
			volumeIcon.src = "./assets/icon/volume2.png";
		}

		if (volume.value > 0 && volume.value < 33) {
			volumeIcon.src = "./assets/icon/volume1.png";
		}

		if (volume.value === 0) {
			volumeIcon.src = "./assets/icon/volumeMute.png";
		}
		setVolume(document.querySelector("audio").volume);

		volume.addEventListener("change", changeVolume);
	}
}

function showVolumeBar() {
	const backgroundVolume = document.querySelector(".background-volume");
	if (backgroundVolume.style.display !== "block") {
		backgroundVolume.style.display = "block";
		backgroundVolume.style.animation = "addVolumeBar 0.3s  ease-in-out";
	} else {
		backgroundVolume.style.animation = "removeVolumeBar 0.3s  ease-in-out";
		backgroundVolume.style.display = "none";
	}
}

export function setVolumeDefaultValue() {
	document.querySelector("audio").volume = 0.5;
}
