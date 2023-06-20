import { Component, ParentComponent, Resource } from "solid-js";
import { Header } from "./header";
import { UserReturnType } from "~/types/user-return-type";
import { SideNav } from "./sidenav";

type Props = {
  user: Resource<UserReturnType | undefined>;
};

export const Layout: ParentComponent<Props> = (props) => {
  return (
    <div>
      <Header user={props.user} />
      <div class="grid grid-cols-[250px_1fr] h-[calc(100vh-80px)]">
        <SideNav />
        <main class="w-full space-y-2 p-4 overflow-y-auto">
          {props.children}
        </main>
      </div>
    </div>
  );
};
