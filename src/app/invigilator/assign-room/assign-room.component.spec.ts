import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { InvigilatorAssignRoomComponent } from './assign-room.component';
import { NGRX, TAIGA_UI } from './assign-room.module';

describe('AssignRoomComponent', () => {
  let component: InvigilatorAssignRoomComponent;
  let fixture: ComponentFixture<InvigilatorAssignRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ...NGRX, ...TAIGA_UI],
      declarations: [InvigilatorAssignRoomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
