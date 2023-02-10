import {
  tuiIconCommentLarge,
  tuiIconHelpCircleLarge,
  tuiIconLogoutLarge,
  tuiIconSettingsLarge,
} from '@taiga-ui/icons';

type NavbarItem = {
  key: string;
  label?: string;
  routerLink?: string;
  icon: string;
  externalLink?: string;
};

type NavbarGroup = {
  items: NavbarItem[];
};

export class TopBarConstants {
  static keys = {
    USER_INFO: 'user-info',
    COMMENTS: 'comments',
    SETTINGS: 'settings',
    CHANGE_PASSWORD: 'change-password',
    HELP: 'help',
    LOG_OUT: 'log-out',
  };

  static items: NavbarGroup[] = [
    {
      items: [
        {
          key: TopBarConstants.keys.USER_INFO,
          label: 'Thông tin cá nhân',
          routerLink: '/user-info',
          icon: '<i class="far fa-user" style="font-size: 23px"></i>',
        },
      ],
    },
    {
      items: [
        {
          key: TopBarConstants.keys.COMMENTS,
          label: 'Đóng góp ý kiến',
          routerLink: '/feedback',
          icon: tuiIconCommentLarge,
        },
        {
          key: TopBarConstants.keys.CHANGE_PASSWORD,
          label: 'Cài đặt',
          routerLink: '/settings',
          icon: tuiIconSettingsLarge,
        },
      ],
    },
    {
      items: [
        {
          key: TopBarConstants.keys.HELP,
          label: 'Trợ giúp & hỗ trợ',
          icon: tuiIconHelpCircleLarge,
          externalLink: 'https://m.me/utcketnoi',
        },
        {
          key: TopBarConstants.keys.LOG_OUT,
          label: 'Đăng xuất',
          icon: tuiIconLogoutLarge,
        },
      ],
    },
  ];
}
