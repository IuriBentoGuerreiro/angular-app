import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/User';
import { UserService } from '../services/UserService';
import { MatIconModule } from '@angular/material/icon';
import { UserRequest } from '../models/UserRequest';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})

export class Users implements OnInit {
  users: User[] = [];

  userRequest: UserRequest = {
    name: '',
    email: ''
  } as UserRequest;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.findAll().subscribe(data => {
      this.users = [...data];
      this.cdr.detectChanges();
    });
  }

  save() {
    this.userService.create(this.userRequest).subscribe({
      next: () => {
        this.loadUsers();
        this.userRequest = { name: '', email: '' };
      },
      error: (err) => alert(err)
    });
  }

  delete(id: number): void {
    this.userService.delete(id).subscribe({
      next: () => {
        this.loadUsers();
      }
    })
  }
}