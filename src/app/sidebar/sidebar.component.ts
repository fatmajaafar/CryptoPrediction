import { Component } from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
    isCollapsed = false; // Sidebar starts expanded
    openSubMenu: string | null = null;

    toggleSubMenu(menu: string) {
        this.openSubMenu = this.openSubMenu === menu ? null : menu;
    }

    isSubMenuOpen(menu: string): boolean {
        return this.openSubMenu === menu;
    }
    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }
}