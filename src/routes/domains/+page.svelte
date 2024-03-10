<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';
	import { CheckIcon, ChevronDownIcon, Trash2Icon } from 'svelte-feather-icons';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Icon, ArrowUp, Trash } from "svelte-hero-icons";

	import { createSelect, melt } from '@melt-ui/svelte';
	import Label from '$lib/components/melts/label.svelte';
	// import DialogTitle from '$lib/components/ui/dialog/dialog-title.svelte';
	import DialogTitle from '$lib/components/melts/dialog/dialog-content.svelte';

	const {
		elements: { trigger, menu, option, group, groupLabel, label },
		states: { selectedLabel, open },
		helpers: { isSelected }
	} = createSelect({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		},
		multiple: true,
		name: 'teams'
	});

	export let data: PageData;
</script>

<h1>Domains</h1>

<Label />

<DialogTitle />

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
					<label use:melt={$label} for="meat" class="cursor-pointer relative">Teams</label>
					<button use:melt={$trigger} aria-label="Teams">
						{$selectedLabel || 'Select teams'}
						<ChevronDownIcon size="16" />
					</button>
					{#if $open}
						<div
							use:melt={$menu}
							class="z-10 flex flex-col rounded-lg bg-white p-1 shadow focus:!ring-0"
						>
							<div use:melt={$group('teams')} id="teams" class="flex flex-col gap-0">
								{#each data.teams as team}
									<div
										class="relative cursor-pointer rounded-lg leading-3"
										use:melt={$option({ value: team, label: team })}
									>
										<CheckIcon size="12" class="check {$isSelected(team) ? 'block' : 'hidden'}" />
										{team}
									</div>
								{/each}
							</div>
						</div>
					{/if}
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
							<Icon src={Trash} micro size={"16px"} />
						</Button>
					</Card.Footer>
				</Card.Root>
			</form>
		{/each}
	</div>
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<style lang="postcss">
	div {
		margin: 1em 0;
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		align-items: flex-start;
	}

	.modal {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.check {
		position: absolute;
		left: theme(spacing.2);
		top: 50%;
		z-index: theme(zIndex.20);
		translate: 0 calc(-50% + 1px);
	}
</style>
