import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiButtonModule, TuiHintModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputNumberModule } from '@taiga-ui/kit';
import { AddRoomDialogComponent } from './add-room.component';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiHintModule,
  TuiInputModule,
  TuiInputNumberModule,
  TuiTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [AddRoomDialogComponent],
  exports: [AddRoomDialogComponent],
})
export class AddRoomDialogModule {}
