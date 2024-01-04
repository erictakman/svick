<script lang="ts">
	import type { PageData } from "./$types";
</script>

<form method="POST" action="?/create">
	<label for="team">Team name:</label>
	<input type="text" name="team" id="team" />
	<input type="submit" value="Create new team" />
</form>