import React, { useState, Fragment, useEffect } from "react";
import { musicList } from "../js/musicList";
import { handleClick } from "../js/handleClick";
import { MusicStats, updateLineProgress } from "./Components/musicStats";
import { changeMusic } from "../js/handleClick";
import { listener } from "../js/handleClick";
import { Volume } from "./Components/volume";
let index = 0;

listener();
export function Music(props) {
	const [url, setUrl] = useState(musicList[index].img);
	const [musicName, setMusicName] = useState(musicList[index].tittle);
	const [artist, setArtist] = useState(musicList[index].artist);
	const [audio, setAudio] = useState(musicList[index].mp3Archive);
	const [currentTime, setCurrentTime] = useState("0:00");
	const [totalTime, setTotalTime] = useState();
	const [totalTimeOR, setTotalTimeOR] = useState();

	useEffect(() => {
		document.querySelector("audio").addEventListener("loadeddata", () => {
			setTotalTime(
				secToMinute(Math.floor(document.querySelector("audio").duration))
			);

			setCurrentTime(Math.floor(document.querySelector("audio").currentTime));
		});
	}, []);

	const nextWhenFinish = () => {
		if (
			document.querySelector(".musicTime").textContent ===
			document.querySelector(".musicTimeTotal").textContent
		) {
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
		setAudio(musicList[index].mp3Archive);
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
			/>
			<Volume />
			<div className="buttons">
				<button className="btn-back" onClick={back}>
					<img src="./assets/icon/goBack.png" className="goBack" alt="" />
				</button>
				<button className="btn-play" onClick={handleClick}>
					<img src="./assets/icon/play-button.png" className="play" alt="" />
				</button>
				<button className="btn-pause" onClick={handleClick}>
					<img src="./assets/icon/pause.png" className="pause" alt="" />
				</button>
				<button className="btn-next" onClick={next}>
					<div>
						<img src="./assets/icon/next.png" className="next" alt="" />
					</div>
				</button>
			</div>

			<audio
				onTimeUpdate={(e) => {
					updateLineProgress();
					setCurrentTime(e.currentTarget.currentTime);
					nextWhenFinish();
				}}
				src={audio}
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
