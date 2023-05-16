import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { InvigilatorAssignRoomStore } from '../../assign-room.store';
import {
  InvigilatorAssignRoomTableTeacherCellComponent,
  TAIGA_UI,
} from './teacher-cell.component';

describe('InvigilatorAssignRoomTableTeacherCellComponent', () => {
  let component: InvigilatorAssignRoomTableTeacherCellComponent;
  let fixture: ComponentFixture<InvigilatorAssignRoomTableTeacherCellComponent>;
  let mockNgControl: jasmine.SpyObj<NgControl>;

  beforeEach(async () => {
    mockNgControl = jasmine.createSpyObj<NgControl>('ngControl', ['control']);

    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, TAIGA_UI],
      providers: [
        APP_STORE_PROVIDER,
        InvigilatorAssignRoomStore,
        {
          provide: NgControl,
          useValue: mockNgControl,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(
      InvigilatorAssignRoomTableTeacherCellComponent
    );
    component = fixture.componentInstance;
    component.ngControl = new FormControl() as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
