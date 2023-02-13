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
};

export class SideBarConstant {
  static items: SidebarItem[] = [
    {
      name: 'Tổng quan',
      icon: 'far fa-telescope',
      routerLink: '/',
    },
    {
      name: 'Đề thi',
      icon: 'far fa-briefcase',
      routerLink: '/exam',
    },
    {
      name: 'Quản lý CBCT',
      icon: 'far fa-user',
      subItems: [
        {
          name: 'Phân số lượng tới khoa',
          routerLink: '/invigilator/assign-faculty',
          icon: 'far fa-chalkboard',
        },
        {
          name: 'Phân công phòng thi',
          routerLink: '/schedule/import',
          icon: 'far fa-users-class',
        },
      ],
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
