<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { Trash2Icon } from 'svelte-feather-icons';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';

	export let data: PageData;
</script>

<h1>Domains</h1>

<Dialog.Root>
	<Dialog.Trigger>Open</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create new domain</Dialog.Title>
			<Dialog.Description>
				<form class="modal" method="POST" action="?/create" use:enhance>
					<label for="name">Domain name:</label>
					<Input type="text" name="name" id="name" />
					<label for="responsible">Responsible:</label>
					<Input type="text" name="responsible" id="responsible" />
					<Button type="submit">Create new domain</Button>
				</form>
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>

{#await data.domains}
	<p>loading...</p>
{:then domains}
	<div>
		{#each domains as domain}
			<form method="POST" action={`?/remove`} use:enhance>
				<Card.Root class="w-80">
					<Card.CardHeader>
						<Card.Title>
							{domain.domain.charAt(0).toLocaleUpperCase() + domain.domain.slice(1)}
						</Card.Title>
						<Card.Description>
							<Badge variant="secondary">
								Administrators: {domain.responsible.charAt(0).toLocaleUpperCase() +
									domain.responsible.slice(1)}
							</Badge>
						</Card.Description>
					</Card.CardHeader>
					<Card.Content>
						<p>Teams:</p>
						<ul>
							{#each domain.teams as team}
								<li>{team}</li>
							{/each}
						</ul>
						<input type="hidden" name="name" value={domain.domain} />
					</Card.Content>
					<Card.Footer class="justify-end">
						<Button variant="ghost" type="submit" size="icon">
							<Trash2Icon size="16" />
						</Button>
					</Card.Footer>
				</Card.Root>
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
</style>
