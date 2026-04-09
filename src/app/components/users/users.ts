import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserRequest } from '../../models/UserRequest';
import { UserService } from '../../services/UserService';
import { UserResponse } from '../../models/UserResponse';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule],
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
    private cdr: ChangeDetectorRef
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

  update(id: number, userRequest: UserRequest){
    return this.userService.update(id, userRequest).subscribe({
      next: () => {
        this.loadUsers();
      },

      error(err){
        alert("Erro ao atualizar dados dos usuários: " + err);
      }
    })
  }

  findById(id: number){
    return this.userService.findById(id).subscribe({})
  }

  delete(id: number) {
    return this.userService.deleteById(id).subscribe({
      next: () => {
        this.loadUsers();
      },

      error(err) {
        alert("Erro ao deletar usuário: " + err)
      },
    });
  }
}