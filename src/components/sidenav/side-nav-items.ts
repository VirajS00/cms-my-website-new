import { NavItem } from "~/types/nav-item";

export const sideNavItems: NavItem[] = [
  {
    label: "Home",
    link: "/home/main",
  },
  {
    label: "Photos",
    subItems: [
      {
        label: "Abstract",
        link: "/home/photos/abstract",
      },
      {
        label: "Nature",
        link: "/home/photos/nature",
      },
      {
        label: "Macro",
        link: "/home/photos/macro",
      },
    ],
  },
  {
    label: "Coding & Design",
    link: "/home/cd",
  },
  {
    label: "Videos",
    link: "/home/videos",
  },
  {
    label: "Resources",
    link: "/home/resources",
  },
];
