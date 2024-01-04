import * as db from '$lib/server/database'
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
	const domains = db.domains;
	const teams = db.teams;
	return {
		domains,
		teams,
	};
};

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		if (data.get("name") !== "") {
			db.domains.push({
				"domain": data.get("name") as string, 
				"responsible": (data.get("responsible") !== "" ? data.get("responsible") : data.get("name")) as string, 
				"teams": data.getAll("teams") as string[]
			});
			return { success: true };
		}
		else return { success: false };
	},
	remove: async ({ request }) => {
		const data = await request.formData();
		db.domains.splice(db.domains.findIndex((domain) => domain.domain === data.get("name")), 1);
		return { success: true };
	}
} satisfies Actions;
