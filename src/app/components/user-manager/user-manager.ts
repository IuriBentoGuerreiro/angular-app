import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../../services/UserService';
import { UserRequest } from '../../models/UserRequest';
import { FormsModule } from "@angular/forms";
import { UserResponse } from '../../models/UserResponse';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-manager',
  imports: [FormsModule],
  templateUrl: './user-manager.html',
  styleUrl: './user-manager.scss',
})
export class UserManager implements OnInit {

  userResponse!: UserResponse;

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  get userId(): number {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    return this.userService.findById(this.userId).subscribe({
      next: (data) => {
        this.userResponse = data;
        this.cdr.detectChanges();
      },
    })
  }

  update() {
    const request: UserRequest = { name: this.userResponse.name, email: this.userResponse.email }

    return this.userService.update(this.userId, request).subscribe({

      error(err) {
        alert("Erro ao atualizar dados dos usuários: " + err);
      }
    })
  }

  delete() {
    return this.userService.deleteById(this.userId).subscribe({
      next: () => {
        this.router.navigate(['/users']);
      },
    })
  }
}
