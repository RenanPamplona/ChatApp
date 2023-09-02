<script>
	import { userName } from '../stores';

	export let fromUser = '';
	export let message = '';
</script>

{#if fromUser == $userName}
	<li class="flex max-w-[200px] flex-col items-end self-end">
		<span class="text-sm font-semibold">{fromUser}</span>
		<span class="bg-primary-700 w-fit break-words break-all rounded-md px-3 py-1">{message}</span>
	</li>
{:else if fromUser == 'SOCKET ADMIN123'}
	<li class="flex w-full flex-col">
		<span
			class="w-full break-words break-all rounded-md bg-yellow-700 px-3 py-1 text-center font-semibold"
			>{message}</span
		>
	</li>
{:else}
	<li class="flex max-w-[200px] flex-col">
		<span class="text-sm font-semibold">{fromUser}</span>
		<span class="w-fit break-words break-all rounded-md bg-gray-700 px-3 py-1">{message}</span>
	</li>
{/if}
