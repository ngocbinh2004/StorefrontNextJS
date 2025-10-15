import { ReactNode } from "react";

type MenuJson = {
  name: string;
  url: string;
  icon: ReactNode;
  discount?: number;
  submenu: MenuJson[];
};

export type { MenuJson };
