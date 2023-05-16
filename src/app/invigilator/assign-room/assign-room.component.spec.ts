import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_STORE_PROVIDER } from '@esm/cdk';
import { LetModule } from '@ngrx/component';
import { InvigilatorAssignRoomComponent } from './assign-room.component';

describe('AssignRoomComponent', () => {
  let component: InvigilatorAssignRoomComponent;
  let fixture: ComponentFixture<InvigilatorAssignRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, LetModule],
      providers: [APP_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
