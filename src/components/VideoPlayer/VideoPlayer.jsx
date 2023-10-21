import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import ReactCrop from "react-image-crop";
import { PlayCircle } from "@styled-icons/bootstrap/PlayCircle";
import { PauseCircle } from "@styled-icons/bootstrap/PauseCircle";
import wildlifeBear from "../../assets/wildlife_bear.mp4";
import "react-image-crop/dist/ReactCrop.css";
import "./VideoPlayer.css";

const Video = () => {
	const [playing, setPlaying] = useState(false);
	const [readyToPlay, setReadyToPlay] = useState(false);
	const [duration, setDuration] = useState(0);
	const [playProgress, setPlayProgress] = useState(0);
	const [cropDuration, setCropDuration] = useState(0);
	const [crop, setCrop] = useState(null);
	let resultObj = {};
	const playerRef = useRef(null);

	const handlePlayPause = () => {
		setPlaying((prev) => !prev);
	};

	const handleGetProgress = (progress) => {
		const progressInSeconds = progress.playedSeconds;
		const fixedProgress = progressInSeconds.toFixed(0);
		setPlayProgress(fixedProgress);
	};

	const handleOnSliderRelease = () => {
		const currVideoDuration = playerRef.current.seekTo(playProgress, "seconds");
	};

	const handleOnSliderChange = (e) => {
		setPlaying(false);
		setPlayProgress(e.target.value);
	};

	const handleOnCropDurationChange = (e) => {
		setCropDuration(e.target.value);
	};

	const handleOnReady = () => {
		setReadyToPlay((prev) => !prev);
	};

	const handleFinishEditing = () => {
		resultObj["start_time"] = playProgress;
		resultObj["duration"] = cropDuration;
		resultObj["mediaid"] = "wildlifeBear";
		resultObj["crop"] = "null";
		if (crop) {
			resultObj["crop"] = crop;
		}
		console.log(resultObj);
	};

	const durationToCrop =
		playProgress > 0
			? Number(playProgress) + Number(cropDuration)
			: cropDuration;

	const durationMaxVal =
		Number(playProgress) + Number(cropDuration) >= Number(duration)
			? Number(cropDuration)
			: Number(duration);

	useEffect(() => {
		if (readyToPlay) {
			const currVideoDuration = playerRef.current.getDuration();
			const videoDurationInSec = currVideoDuration.toFixed(0);
			setDuration(videoDurationInSec);
		}
	}, [readyToPlay]);

	return (
		<div className="video-player">
			<span className="info">
				* hover over the video and select the area to crop
			</span>
			<section className="left">
				<div className="video-container">
					<ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
						<ReactPlayer
							fallback={<VideoFallback />}
							className="react-player"
							ref={playerRef}
							url={wildlifeBear}
							muted={true}
							width="auto"
							height="50vh"
							playing={playing}
							onReady={handleOnReady}
							volume={0}
							controls={false}
							progressInterval={1000}
							onProgress={handleGetProgress}
						/>
					</ReactCrop>
					<div className="controls">
						<button
							title={playing ? "pause" : "play"}
							onClick={handlePlayPause}
						>
							{playing ? (
								<PauseCircle color={"white"} size={35} />
							) : (
								<PlayCircle color={"white"} size={35} />
							)}
						</button>
					</div>
				</div>
			</section>
			<section className="right">
				<div className="video-editor">
					<div className="drag-container">
						<p>Drag slider to select part of the video</p>
						<div className="slider-container">
							<span>{`${playProgress}s ${
								cropDuration > 0 ? `- ${durationToCrop}s` : ""
							}`}</span>
							<input
								type="range"
								id="slider"
								name="slider"
								min="0"
								max={duration}
								value={playProgress}
								onMouseUp={handleOnSliderRelease}
								onChange={(e) => handleOnSliderChange(e)}
							/>
							<label htmlFor="slider">0:{playProgress}</label>
						</div>
					</div>
					<div className="duration-input-container">
						<input
							max={durationMaxVal}
							type="number"
							id="duration"
							name="duration"
							value={cropDuration}
							onChange={(e) => handleOnCropDurationChange(e)}
						/>{" "}
						(s)
					</div>
					<div className="finish-btn-container">
						<button onClick={handleFinishEditing}>Finish Editing</button>
					</div>
				</div>
			</section>
		</div>
	);
};

const VideoFallback = () => {
	return (
		<div className="video-fallback">Loading...</div>
	)
}

export default Video;
