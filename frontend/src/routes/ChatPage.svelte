<script>
	import { beforeNavigate } from '$app/navigation';
	import { beforeUpdate, onDestroy } from 'svelte';
	import Header from '../components/Header.svelte';
	import MessageInput from '../components/MessageInput.svelte';
	import MessageList from '../components/MessageList.svelte';
	import socket from '../socket';

	onDestroy(() => {
		socket.emit('leave');
	});
</script>

<div class="flex h-screen flex-col bg-gray-900 text-gray-100">
	<Header />
	<div id="messageContainer" class="max-h-full flex-grow overflow-y-auto">
		<MessageList />
	</div>
	<MessageInput />
</div>
