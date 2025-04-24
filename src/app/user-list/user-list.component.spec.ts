import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../services/user.service';
import { MockUserService, mockUsers } from '../services/user.service.mock';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../app.routes';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter(routes)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('should display users in table', () => {
    // Set data langsung ke komponen
    component.users = mockUsers;
    component.isLoading = false;
    fixture.detectChanges();

    const tableRows = fixture.nativeElement.querySelectorAll('tbody tr');
    expect(tableRows.length).toBe(2);
    
    const firstRowCells = tableRows[0].querySelectorAll('td');
    expect(firstRowCells[0].textContent).toContain('Leanne Graham');
    expect(firstRowCells[1].textContent).toContain('leanne@example.com');
    expect(firstRowCells[2].textContent).toContain('hildegard.org');

  });

  it('should show loading state', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('.loading');
    expect(loadingElement).toBeTruthy();
  });

  it('should show error message', () => {
    component.error = 'Test error message';
    component.isLoading = false;
    fixture.detectChanges();

    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement.textContent).toContain('Test error message');
  });
});