import React, { useState, Fragment, useEffect, useRef } from "react";
import { musicList } from "../js/musicList";
import { MusicStats } from "./stats";

import { Volume } from "./volume";
let index = 0;

export function Music(props) {
	listener();
	const [url, setUrl] = useState(musicList[index].img);
	const [musicName, setMusicName] = useState(musicList[index].tittle);
	const [artist, setArtist] = useState(musicList[index].artist);
	const [audioSrc, setAudioSrc] = useState(musicList[index].mp3Archive);
	const [currentTime, setCurrentTime] = useState("0:00");
	const [totalTime, setTotalTime] = useState();
	const [totalTimeOR] = useState();
	const audioPlayer = useRef();
	const btnPlay = useRef();
	const btnPause = useRef();
	const musicTimeElement = useRef();
	const musicTimeTotalElement = useRef();

	useEffect(() => {
		audioPlayer.current.addEventListener("loadeddata", () => {
			setTotalTime(secToMinute(Math.floor(audioPlayer.current.duration)));
			setCurrentTime(Math.floor(audioPlayer.current.currentTime));
		});
	}, []);

	const handleClick = (e) => {
		if (btnPlay.current.style.display !== "none") {
			hiddenPlayButton();
			play();
		} else {
			hiddenPauseButton();
			pause();
		}
	};
	function changeMusic() {
		hiddenPlayButton();
		pause();
		play();
	}

	function play() {
		audioPlayer.current.play();
	}
	function pause() {
		audioPlayer.current.pause();
	}

	function listener() {
		window.addEventListener("keydown", (e) => {
			if (e.key === " ") {
				handleClick();
			}
		});
	}
	function hiddenPlayButton() {
		btnPlay.current.style.display = "none";
		btnPause.current.style.display = "block";
	}

	function hiddenPauseButton() {
		btnPause.current.style.display = "none";
		btnPlay.current.style.display = "block";
	}

	const nextWhenFinish = () => {
		if (secToMinute(Math.floor(currentTime)) === totalTime) {
			next();
		}
	};

	const next = () => {
		index++;
		verificateIndex();
		updateStats();
		changeMusic();
	};

	const back = () => {
		index--;
		verificateIndex();
		updateStats();
		changeMusic();
	};

	const updateStats = () => {
		setUrl(musicList[index].img);
		setMusicName(musicList[index].tittle);
		setArtist(musicList[index].artist);
		setAudioSrc(musicList[index].mp3Archive);
	};

	const verificateIndex = () => {
		if (index === musicList.length) {
			index = 0;
		}
		if (index < 0) {
			index = musicList.length - 1;
		}
	};

	return (
		<Fragment>
			<MusicStats
				url={url}
				musicName={musicName}
				artist={artist}
				currentTime={secToMinute(Math.floor(currentTime))}
				totalTime={totalTime}
				maxValue={totalTimeOR}
				progressValue={currentTime}
				audioPlayer={audioPlayer.current}
				musicTimeElement={musicTimeElement.current}
				musicTimeTotalElement={musicTimeTotalElement.current}
			/>
			<Volume audioPlayer={audioPlayer.current} />
			<div className="buttons">
				<button className="btn-back" onClick={back}>
					<img src="./assets/icon/goBack.png" className="goBack" alt="" />
				</button>
				<button className="btn-play" ref={btnPlay} onClick={handleClick}>
					<img src="./assets/icon/play-button.png" className="play" alt="" />
				</button>
				<button className="btn-pause" ref={btnPause} onClick={handleClick}>
					<img src="./assets/icon/pause.png" className="pause" alt="" />
				</button>
				<button className="btn-next" onClick={next}>
					<div>
						<img src="./assets/icon/next.png" className="next" alt="" />
					</div>
				</button>
			</div>

			<audio
				ref={audioPlayer}
				onTimeUpdate={(e) => {
					updateLineProgress();
					setCurrentTime(e.currentTarget.currentTime);
					nextWhenFinish();
				}}
				src={audioSrc}
			></audio>
		</Fragment>
	);
}

export function secToMinute(sec) {
	let minute = Math.floor(sec / 60);
	let seconds = sec % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	return minute + ":" + seconds;
}
let defaultVolume = true;

const updateLineProgress = () => {
	const audio = document.querySelector("audio");

	if (defaultVolume) {
		audio.volume = 0.5;
		defaultVolume = false;
	}
	const lineProgress = document.querySelector(".timeLine");
	const progress = document.querySelector(".progress-tl");
	lineProgress.setAttribute("max", audio.duration);

	progress.style.width = ((audio.currentTime / audio.duration) * 100).toFixed(2) + "%";
	lineProgress.addEventListener("change", () => {
		audio.currentTime = lineProgress.value;
	});
};
