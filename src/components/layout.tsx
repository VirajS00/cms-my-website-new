import { ParentComponent, Resource } from "solid-js";
import { Header } from "./header";
import SideNav from "./sidenav";
import { UserReturnType } from "~/types/user-return-type";

export const Layout: ParentComponent<{
  user: Resource<UserReturnType | undefined>;
}> = (props) => {
  return (
    <div class="h-screen">
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
