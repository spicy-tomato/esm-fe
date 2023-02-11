export type SidebarItem = {
  name: string;
  icon: string;
  routerLink?: string;
  subItems?: {
    name: string;
    routerLink: string;
    icon: string;
    useTaigaIcon?: boolean;
  }[];
  permission?: number;
  useTaigaIcon?: boolean;
  externalLink?: string;
  exactRouterLink?: boolean;
  controlName?: string;
};

export class SideBarConstant {
  static items: SidebarItem[] = [
    {
      controlName: 'calendar',
      name: 'Quản lý CBCT',
      icon: 'far fa-user',
      routerLink: '/calendar',
    },
    {
      name: 'Quản lý coi thi',
      icon: 'far fa-pencil-paintbrush',
      subItems: [
        {
          name: 'Quản lý lịch thi',
          routerLink: '/schedule/assign',
          icon: 'far fa-calendar-day',
        },
        {
          name: 'Phân công CBCT',
          routerLink: '/schedule/import',
          icon: 'far fa-users-class',
        },
      ],
    },
    {
      name: 'Đề thi',
      icon: 'far fa-briefcase',
    },
    {
      name: 'Quản lý thanh toán',
      icon: 'far fa-wallet',
      routerLink: '/schedule/change',
    },
    {
      name: 'Thống kê',
      icon: 'far fa-chart-pie',
      routerLink: '/statistic',
      // permission: PermissionConstant.STATISTICIZE_CHANGE_SCHEDULE,
    },
  ];
}
