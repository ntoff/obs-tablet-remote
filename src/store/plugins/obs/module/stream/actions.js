function connectionClosed({commit}) {
	commit('stream/reset')
}

function connectionReady({dispatch}) {
	return dispatch('stream/reload')
}

function eventStreamStatus({commit}, data) {
	commit('stream/status', data)
}

function eventRecordingStarting({commit}) {
	commit('stream/set/recording', 'starting')
}

function eventRecordingStarted({commit}) {
	commit('stream/set/recording', true)
}

function eventRecordingStopping({commit}) {
	commit('stream/set/recording', 'stopping')
}

function eventRecordingStopped({commit}) {
	commit('stream/set/recording', false)
}

function eventStreamStarting({commit}) {
	commit('stream/set/streaming', 'starting')
}

function eventStreamStarted({commit}) {
	commit('stream/set/streaming', true)
}

function eventStreamStopping({commit}) {
	commit('stream/set/streaming', 'stopping')
}

function eventStreamStopped({commit}) {
	commit('stream/set/streaming', false)
}

function eventReplayStarting({commit}) {
	//nothing to do here, possibly used in the future
}
function eventReplayStarted({commit}) {
	//nothing to do here, possibly used in the future
}
function eventReplayStopping({commit}) {
	//nothing to do here, possibly used in the future
}
function eventReplayStopped({commit}) {
	//nothing to do here, possibly used in the future
}

async function saveReplayBuffer({commit, getters: {client}}) {
	await client.send({'request-type': 'SaveReplayBuffer'})
}

async function setStreaming({commit, getters: {client}}, {status}) {
	const req = status ? 'StartStreaming' : 'StopStreaming'

	await client.send({'request-type': req})
}

async function setRecording({commit, getters: {client}}, {status}) {
	const req = status ? 'StartRecording' : 'StopRecording'

	await client.send({'request-type': req})
}

async function streamReload({commit, getters: {client}}) {
	const {
		streaming,
		recording,
		'stream-timecode': streamTimecode,
		'rec-timecode': recTimecode
	} = await client.send({'request-type': 'GetStreamingStatus'})

	commit('stream/set/streaming', streaming)
	commit('stream/set/recording', recording)
	commit('stream/set/streamTimecode', streamTimecode)
	commit('stream/set/recTimecode', recTimecode)
}

export default {
	'connection/closed': connectionClosed,
	'connection/ready': connectionReady,
	'event/RecordingStarted': eventRecordingStarted,
	'event/RecordingStarting': eventRecordingStarting,
	'event/RecordingStopped': eventRecordingStopped,
	'event/RecordingStopping': eventRecordingStopping,
	'event/StreamStarted': eventStreamStarted,
	'event/StreamStarting': eventStreamStarting,
	'event/StreamStopped': eventStreamStopped,
	'event/StreamStopping': eventStreamStopping,
	'event/StreamStatus': eventStreamStatus,
	'event/ReplayStarting' : eventReplayStarting,
	'event/ReplayStarted' : eventReplayStarted,
	'event/ReplayStopping' : eventReplayStopping,
	'event/ReplayStopped' : eventReplayStopped,
	'stream/streaming': setStreaming,
	'stream/recording': setRecording,
	'stream/saveReplay': saveReplayBuffer,
	'stream/reload': streamReload
}
