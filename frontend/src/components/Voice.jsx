const Voice = ({start, stop, isRecording, audioURL}) => {
    return ( 
        <div className="voice">
            <button id="startBtn" onClick={start} disabled={isRecording}>start</button>
            <button id="stopBtn" onClick={stop} disabled={!isRecording}>stop</button>
            {audioURL && <audio className="audioPlayback" controls src={audioURL}></audio>}
        </div>
     );
}
 
export default Voice;