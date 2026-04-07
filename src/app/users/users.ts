import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  users: any[] = [
  ];

  user = {
    id: null,
    name: '',
    email: '',
  };

  save() {
    const newUser = { ...this.user, id: Math.floor(Math.random() * 1000 + 1)}

    this.users.push(newUser)

    this.user.name = '';
    this.user.email = '';
  }
}
