<script lang="ts">
	import { enhance } from '$app/forms';
	import Modal from '$lib/components/Modal.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let showModal = false;

</script>

<h1>Domains</h1>

<button on:click={() => (showModal = true)}>Create new domain</button>

<Modal bind:showModal>
	<h2 slot="header">Create new domain</h2>
	<form class="modal" method="POST" action="?/create" use:enhance>
		<label for="name">Domain name:</label>
		<input type="text" name="name" id="name" />
		<label for="responsible">Responsible:</label>
		<input type="text" name="responsible" id="responsible" />
		<label for="teams">Teams:</label>
		<select name="teams" id="teams" multiple>
			{#each data.teams as team}
				<option value={team}>{team}</option>
			{/each}
		</select>
		<input type="submit" value="Create new domain" />
	</form>
</Modal>

{#await data.domains}
	<p>loading...</p>
{:then domains}
	<div>
		{#each domains as domain}
			<form class="card" method="POST" action={`?/remove`} use:enhance>
				<p style="font-size: 1.2em;">
					<b>{domain.domain.charAt(0).toLocaleUpperCase() + domain.domain.slice(1)}</b>
				</p>
				<p>Administrators: {domain.responsible.charAt(0).toLocaleUpperCase() + domain.responsible.slice(1)}</p>
				<p>Teams:</p>
				<ul>
					{#each domain.teams as team}
						<li>{team}</li>
					{/each}
				</ul>
				<input type="hidden" name="name" value={domain.domain} />
				<input
					style="color: var(--secondary-color); font-size: 1em; background-color: transparent; border: none; position: absolute; right: 1.6em; top: 1.6em;"
					type="submit"
					value="Delete"
				/>
			</form>
		{/each}
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style>
	div {
		margin: 1em 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		align-items: start;
	}

	.modal {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.card {
		display: flex;
		width: 20em;
		flex-direction: column;
		position: relative;
		align-items: baseline;
		border-radius: 0.5em;
		padding: 1em 1.4em;
		border: 1px solid var(--light-color);
	}

	p {
		line-height: 0;
	}

	input[type='submit'] {
		cursor: pointer;
	}
</style>
