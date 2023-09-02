<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { onDestroy, onMount } from 'svelte';
	import socket from '../socket';
	import { messages, roomName, userName, usersInCurrentRoom, type MessageObject } from '../stores';
	import Message from './Message.svelte';

	export function scrollToBottom() {
		const messageContainer = document.getElementById('messageContainer');
		if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight;
	}

	function handleMessageReceive(messageObject: MessageObject) {
		messages.update((oldMessages) => [...oldMessages, messageObject]);
		scrollToBottom();
	}

	onMount(() => {
		let storageRoomName = localStorage.getItem('room');
		if (storageRoomName) roomName.set(storageRoomName);

		let storageUserName = localStorage.getItem('user');
		if (storageUserName) userName.set(storageUserName);

		socket.on('messageReceive', handleMessageReceive);

		socket.on('userIn', (name: string) => {
			const messageObject = {
				fromUser: 'SOCKET ADMIN123',
				message: `${name} joined`
			};

			messages.update((oldMessages) => [...oldMessages, messageObject]);
		});

		socket.on('userOut', (name: string) => {
			const messageObject = {
				fromUser: 'SOCKET ADMIN123',
				message: `${name} left the room`
			};

			messages.update((oldMessages) => [...oldMessages, messageObject]);
		});

		socket.on('updateUsers', (usersInRoom: string[]) => {
			usersInCurrentRoom.set(usersInRoom);
		});
	});

	onDestroy(() => {
		socket.off('messageReceive', handleMessageReceive);
	});
</script>

<ul class="flex min-h-full flex-col justify-end gap-2 p-4">
	{#each $messages as { fromUser, message }, i}
		<Message {fromUser} {message} />
	{/each}
</ul>
