import type { LayoutServerLoad } from "./$types";
import * as db from '$lib/server/database'

export const load: LayoutServerLoad = async () => {
	const domains = db.domains;
	const teams = db.teams;
	return {
		domains,
		teams,
	};
};