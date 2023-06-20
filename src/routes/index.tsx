import { useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { Header } from "~/components/header";
import { getUser } from "~/db/session";

export const routeData = () =>
	createServerData$(async (_, { request }) => {
		const user = await getUser(request);

		if (!user) {
			throw redirect("/login");
		}

		return user;
	});

const Home = () => {
	const user = useRouteData<typeof routeData>();

	return (
		<main class='w-full space-y-2'>
			<Header user={user} />
		</main>
	);
};

export default Home;
