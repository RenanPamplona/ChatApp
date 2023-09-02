<script lang="ts">
	import type { Socket } from 'socket.io-client';
	import { onMount } from 'svelte';
	import socket from '../socket';
	import { hasJoined, userName } from '../stores';

	let user = '';
	let room = '';

	onMount(() => {
		let storageUserName = localStorage.getItem('user');
		if (storageUserName) {
			user = storageUserName;
			userName.set(user);
		}
	});

	function joinRoom() {
		socket.emit('join', user, room);
		hasJoined.update(() => true);

		localStorage.setItem('user', user);
		localStorage.setItem('room', room);

		user = '';
		room = '';
	}
</script>

<form class="bg-primary-600 flex flex-col gap-4 rounded-md p-4" on:submit|preventDefault={joinRoom}>
	<input
		required
		maxlength="15"
		type="text"
		placeholder="Name"
		class="rounded-md p-2 text-black"
		bind:value={user}
	/>
	<input
		required
		maxlength="15"
		type="text"
		placeholder="Room name"
		class="rounded-md p-2 text-black"
		bind:value={room}
	/>
	<button
		class="bg-primary-900 hover:bg-primary-800 ring-primary-900 rounded-md p-2 font-bold uppercase ring-1 hover:ring-white active:scale-95"
		>Join</button
	>
</form>
