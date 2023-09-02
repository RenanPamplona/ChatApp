<script lang="ts">
	import { faBars, faX } from '@fortawesome/free-solid-svg-icons/index.js';
	// @ts-ignore
	import type { Socket } from 'socket.io-client';
	import Fa from 'svelte-fa/src/fa.svelte';
	import socket from '../socket';
	import { hasJoined, messages, roomName, userName, usersInCurrentRoom } from '../stores';

	let isOpen = false;

	function leaveRoom() {
		socket.emit('leave');

		localStorage.setItem('room', '');
		roomName.set('');
		hasJoined.update(() => false);
		messages.set([]);
	}
</script>

<div>
	<button on:click={() => (isOpen = true)} class="text-2xl">
		<Fa icon={faBars} />
	</button>

	<div
		class={`absolute left-0 top-0 flex h-screen w-1/2 flex-col bg-gray-700 p-4 transition-all duration-150 ${
			isOpen ? 'translate-x-0' : '-translate-x-full'
		}`}
	>
		<button on:click={() => (isOpen = false)} class="text-2xl">
			<Fa icon={faX} />
		</button>

		<ul class="flex max-h-full flex-grow flex-col overflow-y-auto py-4 text-lg">
			<h3 class="text-primary-400 mb-4 text-xl font-bold">Users in this room</h3>
			{#each $usersInCurrentRoom as user}
				<li>{user}</li>
			{/each}
		</ul>

		<button on:click={leaveRoom} class="rounded-md bg-red-600 p-2 font-semibold">
			Leave Room
		</button>
	</div>
</div>
