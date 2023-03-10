import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_ENV } from '@esm/core';
import { appFeatureKey, appInitialState, AppPageAction } from '@esm/store';
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
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        LetModule,
        BellModule,
        ...TAIGA_UI,
      ],
      declarations: [TopBarComponent],
      providers: [
        { provide: APP_ENV, useValue: {} },
        provideMockStore({
          initialState: {
            [appFeatureKey]: appInitialState,
          },
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('onClickExaminationDropdownItem', () => {
  //   it('should set `openExaminationDropdown` to `false`', () => {
  //     const item = 'Selected item';

  //     component.openExaminationDropdown = true;
  //     component.onClickExaminationDropdownItem(item);

  //     expect(component.openExaminationDropdown).toBeFalse();
  //     expect(component.selectedExamination?.id).toEqual(item);
  //   });
  // });

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
