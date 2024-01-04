import * as db from '$lib/server/database'

export function load({ params }) {
	const domain = db.domains.find((domain) => domain.domain === params.domain)
	return {
		domain: domain?.domain ?? "",
		responsible: domain?.responsible,
		teams: domain?.teams ?? [],
	};
}
