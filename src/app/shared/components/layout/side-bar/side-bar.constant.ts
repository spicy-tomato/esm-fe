export type SidebarItem = {
  name: string;
  icon: string;
  routerLink?: string;
  subItems?: {
    name: string;
    routerLink: string;
    icon: string;
  }[];
  permission?: number;
  externalLink?: string;
  exactRouterLink?: boolean;
};

export class SideBarConstant {
  static items: SidebarItem[] = [
    {
      name: 'Lịch thi',
      routerLink: '/exam/data',
      icon: 'far fa-calendar-alt',
      // subItems: [
      //   {
      //     name: 'Lịch thi',
      //     routerLink: '/exam/data',
      //     icon: 'far fa-calendar-alt',
      //   },
        // {
        //   name: 'Cán bộ coi thi',
        //   routerLink: '/invigilator/data',
        //   icon: 'far fa-users',
        // },
        // {
        //   name: 'Thanh toán',
        //   routerLink: '/paid/data',
        //   icon: 'far fa-money-check',
        // },
      // ],
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
          name: 'Khối lượng',
          routerLink: '/invigilator/assign-faculty',
          icon: 'far fa-chalkboard',
        },
        {
          name: 'Phân công',
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
      routerLink: '/exam/handover',
    },
    {
      name: 'Thanh toán',
      icon: 'far fa-wallet',
      subItems: [
        {
          name: 'Ban coi thi',
          routerLink: '/paid/invigilator-department',
          icon: 'far fa-money-bill',
        },
        {
          name: 'Ban đề thi',
          routerLink: '/paid/exam-department',
          icon: 'far fa-money-bill',
        },
        {
          name: 'Cán bộ coi thi',
          routerLink: '/paid/invigilator',
          icon: 'far fa-money-bill',
        },
      ],
    },
    {
      name: 'Báo cáo, thống kê',
      icon: 'far fa-chart-pie',
      subItems: [
        {
          name: 'Tiến độ',
          routerLink: '/process',
          icon: 'far fa-tasks',
        },
        {
          name: 'Tổng hợp',
          routerLink: '/',
          icon: 'far fa-clipboard-list',
        },
        {
          name: 'Báo cáo',
          routerLink: '/report',
          icon: 'far fa-file-chart-pie',
        },
      ],
    },
    {
      name: 'Thông báo, tài liệu',
      icon: 'far fa-folders',
      routerLink: '/document',
    },
  ];
}
