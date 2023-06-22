import { Disclosure, DisclosureButton, DisclosurePanel } from "solid-headless";
import { RiArrowsArrowDropDownLine } from "solid-icons/ri";
import { Component, For, Show } from "solid-js";
import { A, useLocation } from "solid-start";
import { NavItem as NavItemType } from "~/types/nav-item";

type Props = {
  navItem: NavItemType;
};

export const NavItem: Component<Props> = (props) => {
  const location = useLocation();

  return (
    <>
      <Show
        when={!props.navItem.subItems || props.navItem.subItems.length === 0}
      >
        <li>
          <A
            href={props.navItem.link ?? ""}
            class="flex items-center justify-between rounded pl-6 py-2 hover:text-sky-700"
            activeClass="bg-sky-200 text-sky-600"
          >
            {props.navItem.label}
          </A>
        </li>
      </Show>
      <Show when={props.navItem.subItems && props.navItem.subItems.length > 0}>
        <li>
          <Disclosure
            defaultOpen={false}
            isOpen={props.navItem.subItems?.some(
              (x) => x.link === location.pathname
            )}
            as="div"
          >
            {({ isOpen }) => (
              <>
                <DisclosureButton
                  as="button"
                  class="flex items-center justify-between w-full rounded pl-6 py-2 hover:text-sky-700"
                >
                  {props.navItem.label}
                  <RiArrowsArrowDropDownLine
                    size={24}
                    classList={{ "rotate-180": isOpen() }}
                  />
                </DisclosureButton>
                <DisclosurePanel class="px-6 ml-4 my-2">
                  <ul class="flex flex-col gap-2">
                    <For each={props.navItem.subItems}>
                      {(subItem) => (
                        <li class="relative">
                          <A
                            href={subItem?.link ?? ""}
                            class="block py-0.5 hover:text-sky-700"
                            activeClass='text-sky-600 before:content-[""] before:absolute before:h-full before:border-l-2 before:border-sky-600 before:-left-2'
                          >
                            {subItem.label}
                          </A>
                        </li>
                      )}
                    </For>
                  </ul>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>
        </li>
      </Show>
    </>
  );
};
