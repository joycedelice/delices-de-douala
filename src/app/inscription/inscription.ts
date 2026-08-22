import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { motsDePasseIdentiques } from '../validateurs';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css'
})
export class InscriptionComponent {
  // 1. Injection du FormBuilder
  private readonly fb = inject(FormBuilder);

  // 2. PLACEZ VOTRE BLOC ICI (Déclaration du FormGroup)
  readonly inscriptionForm = this.fb.nonNullable.group(
    {
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    },
    { validators: motsDePasseIdentiques }
  );

  // 3. Accesseurs pour faciliter l'accès dans le HTML
  get firstName() { return this.inscriptionForm.controls.firstName; }
  get lastName() { return this.inscriptionForm.controls.lastName; }
  get email() { return this.inscriptionForm.controls.email; }
  get password() { return this.inscriptionForm.controls.password; }
  get confirmPassword() { return this.inscriptionForm.controls.confirmPassword; }

  // 4. Méthode de soumission
  soumettre(): void {
    if (this.inscriptionForm.invalid) return;
    console.log('Données d\'inscription :', this.inscriptionForm.value);
  }
}