import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../services/user.service';
import { MockUserService, mockUser } from '../services/user.service.mock';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', '1']]))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details based on route param', () => {
    expect(userService.getUserById).toHaveBeenCalledWith(1);
  });

  it('should display user information', () => {
    component.user = mockUser;
    component.isLoading = false;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    
    // Verifikasi data dasar user
    expect(compiled.textContent).toContain(mockUser.name);
    expect(compiled.textContent).toContain(mockUser.email);
    expect(compiled.textContent).toContain(mockUser.phone);
    expect(compiled.textContent).toContain(mockUser.website);
    expect(compiled.textContent).toContain(mockUser.address.street);
    expect(compiled.textContent).toContain(mockUser.address.suite);
    expect(compiled.textContent).toContain(mockUser.address.city);
    expect(compiled.textContent).toContain(mockUser.address.zipcode);
    expect(compiled.textContent).toContain(mockUser.company.name);
    expect(compiled.textContent).toContain(mockUser.company.catchPhrase);
    expect(compiled.textContent).toContain(mockUser.company.bs);
  });

  it('should show loading state', () => {
    component.isLoading = true;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Loading');
  });

  it('should show error message', () => {
    const testError = 'Test error message';
    component.error = testError;
    component.isLoading = false;
    fixture.detectChanges();
    
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain(testError);
  });
});