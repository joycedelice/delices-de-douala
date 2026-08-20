import { AbstractControl, ValidationErrors } from '@angular/forms';

export function motsDePasseIdentiques(group: AbstractControl): ValidationErrors | null {
  const mdp = group.get('password')?.value;
  const confirmation = group.get('confirmation')?.value;
  return mdp === confirmation ? null : { motsDePasseDifferents: true };
}