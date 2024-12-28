import {Bookmark, CircleFadingPlus, Languages, LayoutGrid, LucideIcon, SendHorizontal, Users} from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function SideBarList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: `/admin/dashboard`,
          label: 'Dashboard',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },

      ],
    },
    {
      groupLabel: 'Quản lý',
      menus: [
        {
          href: `/admin/users`,
          label: 'Users',
          active: pathname.includes(`/admin/users`),
          icon: Users,
          submenus: [],
        },
        {
          href: `/admin/contest`,
          label: 'Contest',
          active: pathname.includes('/admin/contest'),
          icon: CircleFadingPlus,
          submenus: [],
        },
        {
          href: `/admin/language`,
          label: 'Language',
          active: pathname.includes('/admin/language'),
          icon: Languages,
          submenus: [],
        },
        {
          href: `/admin/problem`,
          label: 'Problem',
          active: pathname.includes('/admin/problem'),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: `/admin/submission`,
          label: 'Submission',
          active: pathname.includes('/admin/submission'),
          icon: SendHorizontal,
          submenus: [],
        },
      ],
    },
  ];
}