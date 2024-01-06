<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import '../app.css';
	
</script>

<nav>
	<Button variant="link" href="/">Home</Button>
	<Button variant="link" href="/domains">Domains</Button>
	<Button variant="link" href="/teams">Teams</Button>
</nav>
<slot />

<style>
	:global(html, body) {
		background-color: #f5f5f5;
		font-family: 'Giphurs';
		height: 100vh;
	}
</style>
