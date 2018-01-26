import {updateStateKey} from '../../../../../util'

const setBytesPerSec = updateStateKey('bytesPerSec')
const setFps = updateStateKey('fps')
const setKbitsPerSec = updateStateKey('kbitsPerSec')
const setNumDroppedFrames = updateStateKey('numDroppedFrames')
const setNumTotalFrames = updateStateKey('numTotalFrames')
const setRecording = updateStateKey('recording')
const setRecTimecode = updateStateKey('recTimecode')
const setStrain = updateStateKey('strain')
const setStreaming = updateStateKey('streaming')
const setStreamTimecode = updateStateKey('streamTimecode')
const setTotalStreamTime = updateStateKey('totalStreamTime')
const setReplayRecording = updateStateKey('replayRecording')
const saveReplayBuffer = updateStateKey('replaySaving')

function streamReset(state) {
	setStreaming(state, false)
	setRecording(state, false)
	setReplayRecording(state, false)
	setBytesPerSec(state, 0)
	setKbitsPerSec(state, 0)
	setStrain(state, 0)
	setTotalStreamTime(state, 0)
	setNumTotalFrames(state, 0)
	setNumDroppedFrames(state, 0)
	setFps(state, 0)
}

function streamStatus(state, status) {
	setStreaming(state, status.streaming)
	setRecording(state, status.recording)
	/*setReplayRecording(state, status.replayRecording) Disable this until obs websocket returns a value otherwise it'll get reset to unknown with every refresh */
	setBytesPerSec(state, status['bytes-per-sec'])
	setKbitsPerSec(state, status['kbits-per-sec'])
	setStrain(state, status.strain)
	setTotalStreamTime(state, status['total-stream-time'])
	setNumTotalFrames(state, status['num-total-frames'])
	setNumDroppedFrames(state, status['num-dropped-frames'])
	setFps(state, status.fps)
	setStreamTimecode(state, status['stream-timecode'])
	setRecTimecode(state, status['rec-timecode'])
}

export default {
	'stream/reset': streamReset,
	'stream/status': streamStatus,
	'stream/set/recording': setRecording,
	'stream/set/recTimecode': setRecTimecode,
	'stream/set/streaming': setStreaming,
	'stream/set/streamTimecode': setStreamTimecode,
	'stream/set/replaySaving': saveReplayBuffer,
	'stream/set/replayRecording': setReplayRecording
}
