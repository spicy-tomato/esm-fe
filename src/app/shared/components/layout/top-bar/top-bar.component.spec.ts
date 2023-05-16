import { ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_STORE_PROVIDER, TESTING_COMMON_IMPORTS } from '@esm/cdk';
import { AppPageAction } from '@esm/store';
import { LetModule } from '@ngrx/component';
import { BellComponent } from '../../bell';
import { TAIGA_UI, TopBarComponent } from './top-bar.component';
import { TopBarConstants } from './top-bar.constant';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TESTING_COMMON_IMPORTS, LetModule, BellComponent, TAIGA_UI],
      providers: [APP_STORE_PROVIDER],
    }).compileComponents();

    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
