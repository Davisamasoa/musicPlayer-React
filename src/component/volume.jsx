import { useRef } from "react";
import { useState } from "react";

export function Volume(props) {
	const [volume, setVolume] = useState(0.5);
	const volumeControl = useRef();
	const volumeProgress = useRef();
	const volumeIcon = useRef();
	const backgroundVolume = useRef();

	function changeVolume(e) {
		props.audioPlayer.volume = e.target.value / 100;

		volumeProgress.current.style.width = props.audioPlayer.volume * 100 + "%";

		if (volumeControl.current.value >= 66) {
			volumeIcon.current.src = "./assets/icon/volume3.png";
		}

		if (volumeControl.current.value >= 33 && volumeControl.current.value < 66) {
			volumeIcon.current.src = "./assets/icon/volume2.png";
		}

		if (volumeControl.current.value > 0 && volumeControl.current.value < 33) {
			volumeIcon.current.src = "./assets/icon/volume1.png";
		}

		if (volumeControl.current.value === 0) {
			volumeIcon.current.src = "./assets/icon/volumeMute.png";
		}
		setVolume(props.audioPlayer.volume);

		volumeControl.current.addEventListener("change", changeVolume);
	}

	function showVolumeBar() {
		if (backgroundVolume.current.style.display !== "block") {
			backgroundVolume.current.style.display = "block";
			backgroundVolume.current.style.animation = "addVolumeBar 0.3s  ease-in-out";
		} else {
			backgroundVolume.current.style.animation = "removeVolumeBar 0.3s  ease-in-out";
			backgroundVolume.current.style.display = "none";
		}
	}

	function setVolumeDefaultValue() {
		props.audioPlayer.volume = 0.5;
	}

	return (
		<div className="div-volume">
			<button className="btn-volume" onClick={showVolumeBar}>
				<img ref={volumeIcon} className="volume-icon" src="./assets/icon/volume3.png" alt="" />
			</button>
			<div ref={backgroundVolume} className="background-volume">
				<input
					type="range"
					className="volume-control"
					ref={volumeControl}
					value={volume * 100}
					min="0"
					max="100"
					step="1"
					onChange={changeVolume}
				/>
				<progress ref={volumeProgress} className="volume-progress" value="0"></progress>
			</div>
		</div>
	);
}
