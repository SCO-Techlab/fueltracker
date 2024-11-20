export class NavbarOptions {
    showCacheTitle: boolean;
    showLinealMenu: boolean;
    showMenu: boolean;
    showBusinessText: boolean;

    constructor(showCacheTitle: boolean, showLinealMenu: boolean, showMenu: boolean, showBusinessText: boolean) {
        this.showCacheTitle = showCacheTitle;
        this.showLinealMenu = showLinealMenu;
        this.showMenu = showMenu;
        this.showBusinessText = showBusinessText;
    }
}