import { useRouteData } from "solid-start";
import { Layout } from "~/components/layout";
import { isLoggedIn } from "~/helpers/is-logged-in";

export const routeData = () => isLoggedIn();

const Home = () => {
  const user = useRouteData<typeof isLoggedIn>();

  return <Layout user={user}>d9jjdij</Layout>;
};

export default Home;
