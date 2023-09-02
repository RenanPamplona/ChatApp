<script>
	import JoinForm from '../components/JoinForm.svelte';
</script>

<section
	class="flex min-h-screen flex-col items-center justify-center gap-10 bg-gray-900 text-gray-100"
>
	<div class="flex flex-col gap-2 text-center">
		<h1 class="text-4xl font-bold">ChatAppV2 🐲</h1>
		<span class="text-primary-400 font-bold">Join a room and start a chat in real time!</span>
	</div>
	<JoinForm />
</section>
