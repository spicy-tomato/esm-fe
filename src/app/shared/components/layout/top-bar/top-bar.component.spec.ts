import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppPageAction } from '@esm/store';
import { LetModule } from '@ngrx/component';
import { provideMockStore } from '@ngrx/store/testing';
import { BellModule } from '../../bell';
import { TopBarComponent } from './top-bar.component';
import { TopBarConstants } from './top-bar.constant';
import { TAIGA_UI } from './top-bar.module';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        LetModule,
        BellModule,
        ...TAIGA_UI,
      ],
      declarations: [TopBarComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onClickExaminationDropdownItem', () => {
    it('should set `openExaminationDropdown` to `false`', () => {
      const item = 'Selected item';

      component.openExaminationDropdown = true;
      component.onClickExaminationDropdownItem(item);

      expect(component.openExaminationDropdown).toBeFalse();
      expect(component.selectedExamination).toEqual(item);
    });
  });

  describe('onClickUserDropdownItem', () => {
    it('should set `openUserDropdown` to `false`', () => {
      component.openUserDropdown = true;
      component.onClickUserDropdownItem('');
      expect(component.openUserDropdown).toBeFalse();
    });

    it('should dispatch AppPageAction.logOut() if click log out', () => {
      const spy = spyOn(component['appStore'], 'dispatch');
      component.onClickUserDropdownItem(TopBarConstants.keys.LOG_OUT);
      expect(spy).toHaveBeenCalledOnceWith(AppPageAction.logOut());
    });
  });
});
