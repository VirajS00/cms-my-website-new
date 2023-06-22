import { useRouteData, redirect as redirectClient } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { getUser } from "~/db/session";

export const routeData = () =>
  createServerData$(async (_, { request }) => {
    const user = await getUser(request);

    if (!user) {
      throw redirect("/login");
    }

    throw redirect("/home/main");
  });

const Home = () => {
  const user = useRouteData<typeof routeData>();

  user();

  return <></>;
};

export default Home;
