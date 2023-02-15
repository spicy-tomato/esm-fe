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
      name: 'Đề thi',
      icon: 'far fa-briefcase',
      routerLink: '/exam',
    },
    {
      name: 'Phân công CBCT',
      icon: 'far fa-user',
      subItems: [
        {
          name: 'Khối lượng CBCT',
          routerLink: '/invigilator/assign-faculty',
          icon: 'far fa-chalkboard',
        },
        {
          name: 'Phân công CBCT',
          routerLink: '/invigilator/assign-teacher',
          icon: 'far fa-chalkboard',
        },
        {
          name: 'Phòng thi',
          routerLink: '/invigilator/assign-room',
          icon: 'far fa-users-class',
        },
      ],
    },
    {
      name: 'Bàn giao bài thi',
      icon: 'far fa-pencil-paintbrush',
      routerLink: '/handover',
    },
    {
      name: 'Quản lý thanh toán',
      icon: 'far fa-wallet',
      routerLink: '/pay',
    },
    {
      name: 'Thống kê',
      icon: 'far fa-chart-pie',
      routerLink: '/statistic',
      // permission: PermissionConstant.STATISTICIZE_CHANGE_SCHEDULE,
    },
    {
      name: 'Thông báo, tài liệu',
      icon: 'far fa-folders',
      routerLink: '/document',
      // permission: PermissionConstant.STATISTICIZE_CHANGE_SCHEDULE,
    },
  ];
}
