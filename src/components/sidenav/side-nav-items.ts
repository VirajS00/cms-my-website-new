import { NavItem } from "~/types/nav-item";

export const sideNavItems: NavItem[] = [
  {
    label: "Home",
    link: "/home",
  },
  {
    label: "Photos",
    subItems: [
      {
        label: "Abstract",
        link: "/photos/abstract",
      },
      {
        label: "Nature",
        link: "/photos/nature",
      },
      {
        label: "Macro",
        link: "/photos/macro",
      },
    ],
  },
  {
    label: "Coding & Design",
    link: "/codingDesign",
  },
  {
    label: "Videos",
    link: "/videos",
  },
  {
    label: "Resources",
    link: "/resource",
  },
];
