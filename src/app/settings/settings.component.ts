import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiLoaderModule } from '@taiga-ui/core';
import { TuiActionModule } from '@taiga-ui/kit';
import { LetModule } from '@ngrx/component';
import { RouterModule } from '@angular/router';

const TAIGA_UI = [TuiActionModule, TuiLoaderModule];

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, LetModule, ...TAIGA_UI],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {}
