import { Component, For } from "solid-js";
import { NavItem } from "./nav-item";
import { sideNavItems } from "./side-nav-items";

export const SideNav: Component = () => {
  return (
    <nav class="mt-4 px-2">
      <ul class="flex flex-col gap-2">
        <For each={sideNavItems}>{(item) => <NavItem navItem={item} />}</For>
      </ul>
    </nav>
  );
};
