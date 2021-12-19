<script>
	import Footer from '$lib/Footer.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<div
	class="bg-fixed bg-cover bg-center flex flex-grow flex-col"
	style="background-image: url(/background.jpg)"
>
	<section class="m-auto">
		<h1 class="name relative text-blue-100 p-2 text-9xl" style="color: #00ffff;">
			<span>Nathan Faucett</span>
			<span class="absolute mix-blend-multiply left-1 top-1" style="color: #ff0000;"
				>Nathan Faucett</span
			>
		</h1>
	</section>

	<Footer />
</div>
