<script lang="ts">
	import '../app.css';
</script>

<nav>
	<a href="/">Home</a>
	<a href="/domains">Domains</a>
	<a href="/teams">Teams</a>
</nav>
<slot />

<style>
	:global(html, body) {
		background-color: #f5f5f5;
		font-family: 'Giphurs';
	}
</style>
