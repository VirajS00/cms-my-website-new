import { useParams, useRouteData } from "solid-start";
import { createServerData$, redirect } from "solid-start/server";
import { Layout } from "~/components/layout";
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
  const params = useParams();

  return <Layout user={user}>{params.category}</Layout>;
};

export default Home;
