import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState } from '@esm/store';
import { provideMockStore } from '@ngrx/store/testing';
import {
  InvigilatorAssignRoomComponent,
  NGRX,
  TAIGA_UI,
} from './assign-room.component';

describe('AssignRoomComponent', () => {
  let component: InvigilatorAssignRoomComponent;
  let fixture: ComponentFixture<InvigilatorAssignRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        ...NGRX,
        ...TAIGA_UI,
      ],
      providers: [
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
        { provide: APP_ENV, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
