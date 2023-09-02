<script lang="ts">
	import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
	// @ts-ignore
	import type { Socket } from 'socket.io-client';
	import Fa from 'svelte-fa/src/fa.svelte';
	import socket from '../socket';
	import { messages, userName } from '../stores';

	let message = '';

	function sendMessage() {
		const messageObject = {
			fromUser: $userName,
			message: message
		};

		socket.emit('messageSent', messageObject);
		console.log(messageObject);

		messages.update((oldMessages) => [...oldMessages, messageObject]);

		message = '';
		setTimeout(() => {
			scrollToBottom();
		}, 1);
	}

	export function scrollToBottom() {
		const messageContainer = document.getElementById('messageContainer');
		if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight;
	}

	function handleTextareaKeydown(event: KeyboardEvent) {
		if (event.keyCode === 13 && !event.shiftKey) {
			event.preventDefault();
			sendMessage();
		}
	}
</script>

<form class="grid grid-cols-4 gap-4 bg-gray-800 p-4" on:submit|preventDefault={sendMessage}>
	<textarea
		class="over col-span-3 h-10 resize-none overflow-y-auto whitespace-pre-wrap rounded-md p-2 text-black"
		placeholder="Message"
		required
		bind:value={message}
		on:keydown={(e) => handleTextareaKeydown(e)}
	/>
	<button class="bg-primary-500 grid place-items-center rounded-md text-xl">
		<Fa icon={faPaperPlane} />
	</button>
</form>
