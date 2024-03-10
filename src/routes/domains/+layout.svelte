<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let URL = "";

	const updateURL = (domain: string) => {
		URL = domain;
	}

	onMount(() => {
		URL = document.URL.split('/')[4];
	});
	
</script>

{#await data.domains}
	<p>...Loading</p>
{:then domains} 
<main>
	<nav>
		<a on:click={() => updateURL("")} href="/domains">Domains</a>
		<div>
			{#each domains as domain}
				<a on:click={() => updateURL(domain.domain)} href="/domains/{domain.domain}">{domain.domain.charAt(0).toLocaleUpperCase() + domain.domain.slice(1)}</a>
				{#if domain.domain === URL}
					<div>
						<a href="/domains/{domain.domain}/docs">Docs</a>
					</div>
				{/if}
			{/each}
		</div>
	</nav>
	
	<section>
		<slot />
	</section>
</main>
{/await}

<style>

	main {
		display: flex;
		align-items: start;
	}
	
	nav {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		gap: 0.5em;
		padding: 1em;
		margin: 1em;
		border: 1px solid var(--light-color);
		border-radius: 0.5em;
	}

	a {
		color: var(--primary-color);
		text-decoration: none;
	}

	section {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1em;
		padding: 1em;
	}

	div {
		display: flex;
		padding-left: 1em;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.5em;
	}

</style>