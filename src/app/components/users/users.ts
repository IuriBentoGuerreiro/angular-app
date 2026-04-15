import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { UserRequest } from '../../models/UserRequest';
import { UserService } from '../../services/UserService';
import { UserResponse } from '../../models/UserResponse';
import { RouterLink } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { FilterName } from '../../models/FilterName';

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

  filterName: FilterName = {
    name: ''
  }

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private toastService: ToastrService
  ) { }

  ngOnInit(): void {
    this.serachName();
  }

  serachName() {
    return this.userService.searchName(this.filterName).subscribe({
      next: (data: UserResponse[]) => {
        this.users = data;
        this.cdr.detectChanges();
      },

    });
   }

  loadUsers() {
    return this.userService.findAll().subscribe({
      next: (data) => {
        this.users = data;
        this.cdr.detectChanges();
      },

      error() {
        alert("Erro na listagem dos usuários: ");

      },
    })
  }

  create(userRequest: UserRequest) {
    return this.userService.create(userRequest).subscribe({
      next: () => {
        this.loadUsers();
        this.toastService.success("Cadastro Realizado Com Sucesso!");
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