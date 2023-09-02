<script>
	import { beforeUpdate } from 'svelte';

	// @ts-nocheck

	import JoinForm from '../components/JoinForm.svelte';
	import socket from '../socket';
	import { hasJoined } from '../stores';
	import ChatPage from './ChatPage.svelte';
	import HomePage from './HomePage.svelte';

	let userHasJoined = false;

	hasJoined.subscribe((value) => (userHasJoined = value));

	socket.on('disconnect', () => {
		socket.emit('leave');
	});
</script>

{#if userHasJoined === true}
	<ChatPage />
{:else}
	<HomePage />
{/if}
