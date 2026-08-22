import { AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Validateur croisé de groupe : Vérifie que le mot de passe 
 * et la confirmation sont identiques.
 */
export function motsDePasseIdentiques(
  group: AbstractControl
): ValidationErrors | null {
  const mdp = group.get('password')?.value;
  const confirmation = group.get('confirmPassword')?.value || group.get('confirmation')?.value;

  return mdp === confirmation ? null : { motsDePasseDifferents: true };
}