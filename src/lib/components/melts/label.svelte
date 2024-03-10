<script lang="ts">
	import { createLabel, melt } from '@melt-ui/svelte';

	const {
		elements: { root }
	} = createLabel();

	export { root as Label };
</script>

<label for="name" use:melt={$root}>Name</label>
<input type="text" id="name" />
