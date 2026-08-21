import { Injectable, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';
import { environment } from '../../environments/environment';
import { Plat } from '../models/Plat';

@Injectable({ providedIn: 'root' })
export class MenuService {
  // Chemin relatif local si serverUrl est vide en dev
  private readonly apiUrl = environment.production 
    ? `${environment.serverUrl}/api/plats.json`
    : '/api/plats.json';

  readonly platsResource = httpResource<Plat[]>(() => this.apiUrl);

  private readonly timer$ = interval(5000);
  private readonly timerIndex = toSignal(this.timer$, { initialValue: 0 });

  readonly platDuJour = computed(() => {
    const platsDispo = (this.platsResource.value() ?? []).filter((p) => p.disponible);
    if (platsDispo.length === 0) return null;
    
    const index = this.timerIndex() % platsDispo.length;
    return platsDispo[index];
  });
}