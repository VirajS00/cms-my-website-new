import { redirect } from "solid-start/server";
import { createCookieSessionStorage } from "solid-start/session";
import { db } from ".";

type LoginForm = {
  username: string;
  password: string;
};

export const login = async ({ username, password }: LoginForm) => {
  const user = await db.user.findUnique({ where: { username, password } });
  if (!user) return null;
  return user;
};

const sessionSecret = process.env.SESSION_SECRET ?? "secret";

const storage = createCookieSessionStorage({
  cookie: {
    name: "admin_session",
    secure: true,
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    httpOnly: true,
  },
});

export const getUserSession = (request: Request) => {
  return storage.getSession(request.headers.get("Cookie"));
};

export const getUserId = async (request: Request) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") return null;
  return userId;
};

export const requireUserId = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const session = await getUserSession(request);
  const userId = session.get("userId");
  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
};

export const getUser = async (request: Request) => {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await db.user.findUnique({ where: { id: Number(userId) } });
    return user;
  } catch {
    throw logout(request);
  }
};

export const logout = async (request: Request) => {
  const session = await storage.getSession(request.headers.get("Cookie"));
  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
};

export const createUserSession = async (userId: string, redirectTo: string) => {
  const session = await storage.getSession();
  session.set("userId", userId);
  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session),
    },
  });
};
