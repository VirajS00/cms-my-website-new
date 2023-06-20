import { useRouteData } from "solid-start";
import {
	createServerAction$,
	createServerData$,
	redirect,
} from "solid-start/server";
import { getUser, logout } from "~/db/session";

export const routeData = () => {
	return createServerData$(async (_, { request }) => {
		const user = await getUser(request);

		if (!user) {
			throw redirect("/login");
		}

		return user;
	});
};

const Home = () => {
	const user = useRouteData<typeof routeData>();
	const [, { Form }] = createServerAction$((f: FormData, { request }) =>
		logout(request)
	);

	return (
		<main class='w-full p-4 space-y-2'>
			<h1 class='font-bold text-3xl'>
				Hello {user()?.first_name} {user()?.last_name}
			</h1>
			<h3 class='font-bold text-xl'>Message board</h3>
			<Form>
				<button name='logout' type='submit'>
					Logout
				</button>
			</Form>
		</main>
	);
};

export default Home;
