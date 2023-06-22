import { Show } from "solid-js";
import { useParams, useRouteData } from "solid-start";
import { FormError } from "solid-start/data";
import {
  createServerAction$,
  createServerData$,
  redirect,
} from "solid-start/server";
import { Loader } from "~/components/loading";
import { createUserSession, getUser, login } from "~/db/session";

const validateUsername = (username: unknown) => {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
};

const validatePassword = (password: unknown) => {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
};

export const routeData = () => {
  return createServerData$(async (_, { request }) => {
    if (await getUser(request)) {
      throw redirect("/home/main");
    }
    return {};
  });
};

const Login = () => {
  const data = useRouteData<typeof routeData>();
  const params = useParams();

  const [loggingIn, { Form }] = createServerAction$(async (form: FormData) => {
    const username = form.get("username");
    const password = form.get("password");
    const redirectTo = form.get("redirectTo") || "/";
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof redirectTo !== "string"
    ) {
      throw new FormError(`Form not submitted correctly.`);
    }

    const fields = { username, password };
    const fieldErrors = {
      username: validateUsername(username),
      password: validatePassword(password),
    };
    if (Object.values(fieldErrors).some(Boolean)) {
      throw new FormError("Fields invalid", { fieldErrors, fields });
    }

    const user = await login({ username, password });
    if (!user) {
      throw new FormError(`Username/Password combination is incorrect`, {
        fields,
      });
    }
    return createUserSession(`${user.user_id}`, redirectTo);
  });

  return (
    <main class="min-h-screen w-screen flex justify-center items-center flex-col">
      <div class="h-96 max-w-[384px] w-full flex flex-col justify-center items-center border border-gray-200 shadow-md rounded-lg gap-6">
        <h1 class="text-3xl font-semibold">Login</h1>
        <Form class="w-full">
          <div class="flex flex-col gap-4 w-full px-6">
            <input
              type="hidden"
              name="redirectTo"
              value={params.redirectTo ?? "/"}
            />
            <div>
              <label for="username-input" class="hidden">
                Username
              </label>
              <input
                name="username"
                placeholder="Username"
                class="border border-gray-400 rounded px-4 py-1.5 w-full"
              />
            </div>
            <Show when={loggingIn.error?.fieldErrors?.username}>
              <p role="alert" class="mt-4 mb-2 text-red-600">
                {loggingIn.error.fieldErrors.username}
              </p>
            </Show>
            <div>
              <label for="password-input" class="hidden">
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                class="border border-gray-400 rounded px-4 py-1.5 w-full"
              />
            </div>
            <Show when={loggingIn.error?.fieldErrors?.password}>
              <p role="alert" class="mt-4 text-red-600">
                {loggingIn.error.fieldErrors.password}
              </p>
            </Show>
            <Show when={loggingIn.error}>
              <p role="alert" id="error-message" class="mb-2 text-red-600">
                {loggingIn.error.message}
              </p>
            </Show>
            <button
              type="submit"
              class="w-full bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 py-2 rounded flex justify-center items-center"
            >
              <Show when={data()} fallback="">
                <Show
                  when={!loggingIn.pending}
                  fallback={<Loader color="light" size="sm" />}
                >
                  Login
                </Show>
              </Show>
            </button>
          </div>
        </Form>
      </div>
    </main>
  );
};

export default Login;
