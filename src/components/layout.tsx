import { ParentComponent, Resource } from "solid-js";
import { Header } from "./header";
import SideNav from "./sidenav";
import { UserReturnType } from "~/types/user-return-type";

export const Layout: ParentComponent<{
  user: Resource<UserReturnType | undefined>;
}> = (props) => {
  return (
    <div>
      <Header user={props.user} />
      <div class="grid grid-cols-[250px_1fr] h-[calc(100vh-90px)]">
        <SideNav />
        <main class="relative w-full space-y-2 p-4 overflow-y-auto pb-16">
          {props.children}
        </main>
      </div>
    </div>
  );
};
