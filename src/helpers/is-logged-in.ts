import { createServerData$, redirect } from "solid-start/server";
import { getUser } from "~/db/session";

export const isLoggedIn = () =>
  createServerData$(async (_, { request }) => {
    const user = await getUser(request);

    if (!user) {
      throw redirect("/login");
    }

    return user;
  });
