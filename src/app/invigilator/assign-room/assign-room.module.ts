import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LetModule } from '@ngrx/component';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiRepeatTimesModule } from '@taiga-ui/cdk';
import { TuiButtonModule, TuiScrollbarModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiSelectModule } from '@taiga-ui/kit';
import { InvigilatorAssignRoomComponent } from './assign-room.component';
import { AssignRoomRoutingModule } from './assign-room.routing';

export const NGRX = [LetModule];
export const TAIGA_UI = [
  TuiButtonModule,
  TuiDataListWrapperModule,
  TuiRepeatTimesModule,
  TuiScrollbarModule,
  TuiSelectModule,
  TuiTableModule,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AssignRoomRoutingModule,
    ...NGRX,
    ...TAIGA_UI,
  ],
  declarations: [InvigilatorAssignRoomComponent],
  exports: [InvigilatorAssignRoomComponent],
})
export class InvigilatorAssignRoomModule {}
