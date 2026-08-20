import { Component, inject, input, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuService } from '../../services/menu';

@Component({
  selector: 'app-plat-detail',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './plat-detail.html',
  styleUrl: './plat-detail.css'
})
export class PlatDetailComponent {
  private readonly menuService = inject(MenuService);

  readonly slug = input.required<string>();
  readonly platsResource = this.menuService.platsResource;

  readonly plat = computed(() => {
    const list = this.platsResource.value();
    return list?.find((p) => p.slug === this.slug());
  });
}