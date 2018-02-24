<template>
	<panel-wrapper :content-class="['panel-stream', 'is-scrollable']">
		<template slot="name">Stream Status</template>
		<DangerousButton
			:class="[streaming ? 'is-active' : 'is-inactive']"
			:vibrate="true"
			@click="setStreaming({status: !streaming})"
		>
			Streaming: {{ streamingText }}
		</DangerousButton>
		<DangerousButton
			:class="[recording ? 'is-active' : 'is-inactive']"
			:vibrate="true"
			@click="setRecording({status: !recording})"
		>
			Recording: {{ recordingText }}
		</DangerousButton>
		<DangerousButton
		:class="[replaybuffer ? 'is-active' : 'is-inactive']"
		:vibrate="true"
		@click="setreplaybuffer({status: !replaybuffer})"
	>
		Replay: {{ replaybufferText }}
	</DangerousButton>
	<button
		class="is-inactive"
		:vibrate="true"
		@click="saveReplayBuffer()"
	>
		{{ replaySavingText }}
	</button>
	</panel-wrapper>
</template>

<script>
	import {mapActions, mapGetters, mapState} from 'vuex'

	import panelMixin from '../mixins/panel'
	import DangerousButton from '../dangerous-button'

	export default {
		components: {
			DangerousButton
		},
		mixins: [panelMixin],
		computed: {
			...mapState('obs', {
				recording: state => state.stream.recording,
				recTimecode: state => state.stream.recTimecode,
				streaming: state => state.stream.streaming,
				streamTimecode: state => state.stream.streamTimecode,
				replaybuffer: state => state.stream.replaybuffer,
				replaySaving: state => state.stream.replaySaving
			}),
			...mapGetters('obs', ['recordingText', 'streamingText', 'replaybufferText', 'replaySavingText'])
		},
		methods: {
			...mapActions('obs', {
				setRecording: 'stream/recording',
				setStreaming: 'stream/streaming',
				setreplaybuffer: 'stream/replaybuffer',
				saveReplayBuffer: 'stream/saveReplay'
			})
		}
	}
</script>
