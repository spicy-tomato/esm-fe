import { ChangeDetectionStrategy, Component } from '@angular/core';
import { tuiIconUserLarge, tuiIconUsersLarge } from '@taiga-ui/icons';

type Link = {
  url: string;
  label: string;
  icon:string;
};

@Component({
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataComponent {
  readonly links: Link[] = [
    {
      url: 'faculty',
      label: 'Khoa',
      icon: tuiIconUsersLarge,
    },
    {
      url: 'department',
      label: 'Bộ môn',
      icon: tuiIconUsersLarge,
    },
    {
      url: 'invigilator',
      label: 'CBCT',
      icon: tuiIconUserLarge,
    },
  ];
}
