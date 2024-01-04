import * as db from '$lib/server/database'
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const teams = db.teams;
	return {
		teams,
	};
};

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		if (data.get("team") !== "") {
			db.teams.push(data.get("team") as string);
			return { success: true };
		}
		else return { success: false };
	},
} satisfies Actions;
