import {
  For,
  Show,
  Suspense,
  createEffect,
  createResource,
  createSignal,
} from "solid-js";
import { Title, useParams, useRouteData } from "solid-start";
import { Layout } from "~/components/layout";
import { Table, TableRow } from "~/components/table";
import { isLoggedIn } from "~/helpers/is-logged-in";
import { PhotosReturnType } from "~/types/photos-return-type";

export const routeData = () => isLoggedIn();

const Home = () => {
  const user = useRouteData<typeof isLoggedIn>();
  const params = useParams();

  const [photos, setPhotos] = createSignal<PhotosReturnType[] | undefined>(
    undefined
  );

  createEffect(async () => {
    setPhotos(undefined);
    const response = await fetch(`/api/photos/${params.category}`);
    const photos = (await response.json()) as PhotosReturnType[];

    setPhotos(photos);
  });

  return (
    <>
      <Title>Photos - {params.category}</Title>
      <Layout user={user}>
        <Show when={photos()} fallback={<>Loading...</>}>
          <Table
            tableColumns={[
              {
                size: 25,
                title: "Image",
              },
              {
                size: 25,
                title: "Category",
              },
              {
                size: 40,
                title: "Caption",
              },
            ]}
          >
            <For each={photos()}>
              {(photo) => (
                <TableRow class="bg-white">
                  <td>
                    <img src={photo.img_path} alt={photo.caption} width={150} />
                  </td>
                  <td>{photo.category}</td>
                  <td>{photo.caption}</td>
                </TableRow>
              )}
            </For>
          </Table>
        </Show>
      </Layout>
    </>
  );
};

export default Home;
