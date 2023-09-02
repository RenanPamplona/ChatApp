<script>
	import { roomName } from '../stores';
	import SideMenu from './SideMenu.svelte';

	let room = '';

	$: room = $roomName;
</script>

<header class="flex items-center justify-between bg-gray-800 p-4">
	<SideMenu />
	<span class="text-xl font-bold"> {room}</span>
</header>
