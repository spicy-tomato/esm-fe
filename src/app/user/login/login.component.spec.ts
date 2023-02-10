import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { APP_ENV } from '@esm/core';
import { provideMockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';
import { NGRX, TAIGA_UI } from './login.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        ...NGRX,
        ...TAIGA_UI,
      ],
      declarations: [LoginComponent],
      providers: [{ provide: APP_ENV, useValue: {} }, provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    it('should be init', () => {
      const form = component.form;
      expect(form.value).toEqual({
        userName: '',
        password: '',
        validator: '',
      });

      for (const control in form.controls) {
        if (control !== 'validator') {
          expect(
            form.controls[control as keyof typeof form.controls].hasValidator(
              Validators.required
            )
          ).toEqual(true);
        }
      }
    });
  });

  describe('status$', () => {
    it('[No error] Form error should be null', fakeAsync(() => {
      for (let status of ['idle', 'loading', 'success'] as const) {
        component['store'].patchState({ status });
        component.status$.subscribe(() => {
          expect(component.form.errors).toBeNull();
        });
      }
    }));

    it('[Error] Form error should be set', fakeAsync(() => {
      component['store'].patchState({ status: 'error' });
      component.status$.subscribe(() => {
        expect(component.form.errors).not.toBeNull();
      });
    }));
  });

  describe('ngOnInit', () => {
    it('handleStatusChange should be called', () => {
      const spy = spyOn<any>(component, 'handleStatusChange');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('[Invalid form] should not login', () => {
      const spy = spyOn(component['store'], 'login');
      component.login();
      expect(spy).not.toHaveBeenCalled();
    });

    it('[Valid form] should login when form is valid', () => {
      component.form.patchValue({
        userName: 'userName',
        password: 'password',
      });
      const spy = spyOn(component['store'], 'login');
      component.login();
      expect(spy).toHaveBeenCalled();
    });
  });
});
