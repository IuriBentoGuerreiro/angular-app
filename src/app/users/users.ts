import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/User';
import { UserService } from '../services/UserService';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})

export class Users implements OnInit {
  users: User[] = [];
  user = { name: '', email: '' };

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.findAll().subscribe(data => {
      this.users = [...data];
      this.cdr.detectChanges(); // 👈
    });
  }

  save() {
    this.userService.create(this.user).subscribe({
      next: () => {
        this.loadUsers();
        this.user = { name: '', email: '' };
      },
      error: (err) => console.error(err)
    });
  }
}