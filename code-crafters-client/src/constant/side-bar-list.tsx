import {
  Bookmark,
  ChartBarStacked,
  CircleFadingPlus,
  Languages,
  LayoutGrid,
  LucideIcon,
  SendHorizontal,
  Users
} from 'lucide-react';

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
          href: `/admin/categories`,
          label: 'Categories',
          active: pathname.includes(`/admin/categories`),
          icon: ChartBarStacked,
          submenus: [],
        },
        {
          href: `/admin/contests`,
          label: 'Contests',
          active: pathname.includes('/admin/contests'),
          icon: CircleFadingPlus,
          submenus: [],
        },
        {
          href: `/admin/languages`,
          label: 'Languages',
          active: pathname.includes('/admin/languages'),
          icon: Languages,
          submenus: [],
        },
        {
          href: `/admin/problems`,
          label: 'Problems',
          active: pathname.includes('/admin/problems'),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: `/admin/submissions`,
          label: 'Submissions',
          active: pathname.includes('/admin/submissions'),
          icon: SendHorizontal,
          submenus: [],
        },
      ],
    },
  ];
}