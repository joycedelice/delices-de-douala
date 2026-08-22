import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css'
})
export class ConnexionComponent {
  user: User = {
    email: '',
    password: ''
  };

  seConnecter(): void {
    if (this.user.email && this.user.password) {
      console.log('Connexion de :', this.user);
    }
  }
}