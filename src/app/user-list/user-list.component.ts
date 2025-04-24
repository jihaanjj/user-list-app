import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService} from '../services/user.service';
import { User } from '../models/user.model'; // Update import path
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading: boolean = true;
  error: string | null = null;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Gagal memuat data pengguna. Silakan coba lagi nanti.';
        this.isLoading = false;
      }
    });
  }
}