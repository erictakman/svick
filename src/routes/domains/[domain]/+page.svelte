<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

{#await data}
	<p>...Loading</p>
{:then data}
	<h1>{data.domain.charAt(0).toLocaleUpperCase() + data.domain.slice(1)}</h1>
	<h2>Responsible team {data.responsible}</h2>
	{#each data.teams as team}
		<p>{team}</p>
	{/each}
{/await}
