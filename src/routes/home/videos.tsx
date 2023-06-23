import { For, Show, createResource, createSignal, onMount } from "solid-js";
import { useRouteData } from "solid-start";
import { Layout } from "~/components/layout";
import { Loader } from "~/components/loading";
import { Table, TableRow } from "~/components/table";
import { FilmCategories } from "~/helpers/film-types";
import { isLoggedIn } from "~/helpers/is-logged-in";
import { VideoEndpointResponse } from "~/types/video-enpoint-response";

export const routeData = () => isLoggedIn();

const Home = () => {
  const user = useRouteData<typeof isLoggedIn>();
  const [videos, setVideos] = createSignal<VideoEndpointResponse[] | undefined>(
    undefined
  );

  onMount(async () => {
    const req = await fetch("/api/videos");
    const json = (await req.json()) as VideoEndpointResponse[];

    setVideos(json);
  });

  return (
    <Layout user={user}>
      <Show when={videos()} fallback={<Loader fullScreen />}>
        <Table
          tableColumns={[
            {
              size: 25,
              title: "Thumbnail",
            },
            {
              size: 25,
              title: "Title",
            },
            {
              size: 25,
              title: "Category",
            },
            {
              size: 25,
              title: "Role",
            },
          ]}
        >
          <For each={videos()}>
            {(video) => (
              <TableRow class="bg-white">
                <td>
                  <img src={video.thumnail} alt={video.title} width={150} />
                </td>
                <td>{video.title}</td>
                <td>{FilmCategories[video.category as never]}</td>
                <td>{video.role}</td>
              </TableRow>
            )}
          </For>
        </Table>
      </Show>
    </Layout>
  );
};

export default Home;
