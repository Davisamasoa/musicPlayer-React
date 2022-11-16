import { Fragment, useRef } from "react";

export function MusicStats(props) {
	const timeLine = useRef();
	const progressTl = useRef();

	const changeMusicTime = (e) => {
		props.audioPlayer.currentTime = e.currentTarget.value;
	};

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
							ref={timeLine}
							onChange={changeMusicTime}
						/>
						<progress ref={progressTl} className="progress-tl" value=""></progress>
					</div>
					<div className="div-musicTime">
						<p ref={props.musicTimeElement} className="musicTime">
							{props.currentTime}
						</p>
						<p ref={props.musicTimeTotalElement} className="musicTimeTotal">
							{props.totalTime}
						</p>
					</div>
				</div>
			</div>
		</Fragment>
	);
}
