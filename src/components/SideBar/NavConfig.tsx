import React from "react";
import Iconify from "../iconify";

const getIcon = (name: string) => (
  <Iconify icon={name} width={22} height={22} />
);

const navConfig = [
  {
    title: "Dashboard",
    path: "/",
    icon: getIcon("ic:twotone-speed"),
    //  getIcon("uim:layer-group"),
  },
  {
    title: "Profile",
    path: "/profile",
    icon: getIcon("uim:user-nurse"),
  },
  {
    title: "Availability",
    path: "/availability",
    icon: getIcon("uim:clock"),
  },
  {
    title: "Calendar",
    path: "/calendar",
    icon: getIcon("uim:schedule"),
  },
  {
    title: "Reports",
    path: "/reports",
    icon: getIcon("uim:graph-bar")
  },
  {
    title: "AHPRA",
    path: "/AHPRA",
    icon: getIcon("uim:microscope"),
  },
];

export default navConfig;
