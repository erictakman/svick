<script lang="ts">
	import type { PageData } from "../$types";

	export let data: PageData;
</script>

<h1>{data.domain.charAt(0).toLocaleUpperCase() + data.domain.slice(1)} Docs</h1>

