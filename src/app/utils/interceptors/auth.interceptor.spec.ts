import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { TokenService } from 'src/cdk/services/token.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let next: { handle: (request: any) => any };
  let mockRequest: HttpRequest<unknown>;
  let interceptor: AuthInterceptor;
  let mockTokenService: jasmine.SpyObj<TokenService>;

  beforeEach(async () => {
    mockTokenService = jasmine.createSpyObj<TokenService>('TokenService', [
      'get',
    ]);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptor,
        HttpClient,
        HttpTestingController,
        {
          provide: TokenService,
          useValue: mockTokenService,
        },
      ],
    }).compileComponents();

    interceptor = TestBed.inject(AuthInterceptor);
    mockRequest = new HttpRequest('GET', '/test');
  });

  it('[Token misses] should not has Authorization header', () => {
    next = { handle: (): void => {} };
    interceptor.intercept(mockRequest, next);
    expect(mockTokenService.get).toHaveBeenCalled();
    expect(mockRequest.headers.get('Authorization')).toEqual(null);
  });

  it('[Token exists] should has Authorization header', fakeAsync(() => {
    let response: HttpResponse<any> | null = null;
    next = {
      handle: (responseHandle): void => {
        response = responseHandle;
      },
    };
    mockTokenService.get.and.returnValue('saved token');
    interceptor.intercept(mockRequest, next);

    expect(response!.headers.get('Authorization')).toContain('saved token');
  }));
});
