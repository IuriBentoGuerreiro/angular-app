import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserRequest } from '../../models/UserRequest';
import { UserService } from '../../services/UserService';
import { UserResponse } from '../../models/UserResponse';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-users',
  imports: [FormsModule, CommonModule, MatIconModule, RouterLink],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})

export class Users implements OnInit {
  users: UserResponse[] = [];

  userRequest: UserRequest = {
    name: '',
    email: ''
  }

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    return this.userService.findAll().subscribe({
      next: (data) => {
        this.users = data;
        this.cdr.detectChanges();
      },

      error(err) {
        alert("Erro na listagem dos usuários: " + err);

      },
    })
  }

  create(userRequest: UserRequest) {
    return this.userService.create(userRequest).subscribe({
      next: () => {
        this.loadUsers();
      },
      error(err) {
        alert("Erro ao salvar usuário: " + err)
      },

      complete() {
        userRequest.name = '', userRequest.email = '';
      },
    });
  }
}