import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faTags } from '@fortawesome/free-solid-svg-icons';

import { MenuItem } from '../../../models/menuItem';
import { TokenStorageService } from '../../../services/token-storage.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule, FontAwesomeModule],
  providers: [TokenStorageService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  faSignOutAlt = faSignOutAlt;

  constructor(
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  menuItems: MenuItem[] = [
    {
      id: uuidv4(),
      title: 'Головна',
      icon: faDesktop,
      route: '/admin/dashboard',
      isSimple: true,
    },
    {
      id: uuidv4(),
      title: 'Управління товарами',
      icon: faWarehouse,
      subItems: [
        {
          id: uuidv4(),
          title: 'Створити товар',
          icon: faPlus,
          route: '/admin/create-product',
        },
      ],
      expanded: false,
    },
    {
      id: uuidv4(),
      title: 'Категорії',
      icon: faTags,
      subItems: [
        {
          id: uuidv4(),
          title: 'Додати категорію',
          icon: faPlus,
          route: '/admin/create-category',
        },
      ],
      expanded: false,
    },
  ];

  public toggleSubItems(item: MenuItem): void {
    if (item.subItems?.length) {
      item.expanded = !item.expanded;
    }
  }

  public logout() {
    this.tokenStorage.clearToken();
    this.router.navigate(['auth/login']);
  }
}
