import { Fragment } from "react";
let defaultVolume = true;

export function MusicStats(props) {
	return (
		<Fragment>
			<figure className="figure-album">
				<img className="musicAlbum" src={props.url} alt="" />
			</figure>
			<div className="musicStats">
				<h1 className="musicName">{props.musicName} </h1>
				<h3 className="artist">{props.artist}</h3>

				<div className="div-timeLine">
					<div className="background-timeLine">
						<input
							value={props.progressValue}
							type="range"
							min="0"
							max={props.totalTime}
							className="timeLine"
							onChange={changeMusicTime}
						/>
						<progress className="progress-tl" value=""></progress>
					</div>
					<div className="div-musicTime">
						<p className="musicTime">{props.currentTime}</p>
						<p className="musicTimeTotal">{props.totalTime}</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export const updateLineProgress = () => {
	const audio = document.querySelector("audio");

	if (defaultVolume) {
		audio.volume = 0.5;
		defaultVolume = false;
	}
	const lineProgress = document.querySelector(".timeLine");
	const progress = document.querySelector(".progress-tl");
	lineProgress.setAttribute("max", audio.duration);

	progress.style.width =
		((audio.currentTime / audio.duration) * 100).toFixed(2) + "%";
	lineProgress.addEventListener("change", () => {
		audio.currentTime = lineProgress.value;
	});
};

export const changeMusicTime = (e) => {
	const audio = document.querySelector("audio");
	audio.currentTime = e.currentTarget.value;
};
