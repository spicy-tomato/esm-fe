import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { InvigilatorAssignRoomStore } from '../assign-room.store';
import { InvigilatorAssignRoomHeaderComponent } from './header.component';

describe('InvigilatorAssignRoomHeaderComponent', () => {
  let component: InvigilatorAssignRoomHeaderComponent;
  let fixture: ComponentFixture<InvigilatorAssignRoomHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS],
      providers: [APP_STORE_PROVIDER, InvigilatorAssignRoomStore],
    }).compileComponents();

    fixture = TestBed.createComponent(InvigilatorAssignRoomHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
