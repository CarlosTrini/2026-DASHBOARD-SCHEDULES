import { RoleSystem } from "./systemTypes";

export type SidebarNavItem = {
  key: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  badge?: string;
  section?: string;
  subItems?: {
    key: string;
    label: string;
    path: string;
    badge?: string;
  }[];
};

export interface NavItem {
  key: string;
  title?: string;
  icon?: React.ReactNode;
  path?: string;
  target?: string;
  badge?: string;
  permissions?: RoleSystem[];
  subItems?: {
    key: string;
    title?: string;
    path: string;
    badge?: string;
    target?: string;
    permissions?: RoleSystem[];
  }[];
}

