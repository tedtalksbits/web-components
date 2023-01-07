export class Menu {
    constructor({ items, toggler, position = 'bottom', width = '500px' } = {}) {
        this.items = items;
        this.toggler = toggler;
        this.position = position;
        this.width = width;
        this.menu = document.createElement('div');

        this.render();
    }
    render() {
        // create styles for the menu
        this.addMenuStyles();
        // Create the menu
        this.menu.classList.add('menu');
        this.menu.classList.add('hidden');
        // Create the menu items
        this.menuItems = document.createElement('ul');
        this.menuItems.classList.add('menu-items');
        this.items.forEach((item) => {
            let menuItem = document.createElement('li');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = item.text;
            menuItem.addEventListener('click', () => {
                item.callback();
                this.hide();
            });
            this.menuItems.appendChild(menuItem);
        });
        this.menu.appendChild(this.menuItems);
        // Add the menu to the absolute position of the toggler
        this.toggler.parentNode.style.position = 'relative';
        this.toggler.parentNode.appendChild(this.menu);
        // Position the menu

        // Add the event listener to the toggler
        this.toggler.addEventListener('click', () => {
            this.toggle();
        });
    }
    addMenuStyles() {
        const style = document.createElement('style');
        style.innerHTML = `
            .menu {
                background-color: #fff;
                border: 1px solid #000;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 20px;
                position: absolute;
                z-index: 100;
                min-width: ${this.width};
            }
            .menu.hidden {
                display: none;
            }
            .menu-items {
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .menu-item {
                cursor: pointer;
                padding: 5px;
            }
            .menu-item:hover {
                background-color: #eee;
            }
        `;
        document.head.appendChild(style);
    }
    toggle() {
        this.menu.classList.toggle('hidden');
        this.positionMenu();
    }
    hide() {
        this.menu.classList.add('hidden');
    }

    positionMenu() {
        switch (this.position) {
            case 'bottom':
                this.menu.style.top = `${
                    this.toggler.offsetTop + this.toggler.offsetHeight
                }px`;

                break;
            case 'top':
                this.menu.style.bottom = `${this.toggler.offsetTop}px`;
                break;
            case 'left':
                const rightSideOfToggler =
                    this.toggler.offsetWidth + this.toggler.offsetLeft;
                this.menu.style.left = `${rightSideOfToggler}px`;
                break;
            case 'right':
                console.log('here!!!!!!!!!!!!!!');
                console.log(this.toggler.offsetLeft);
                console.log(this.menu.offsetWidth);
                console.log(this.toggler);
                console.log(this.menu.getBoundingClientRect());
                if (this.toggler.offsetLeft < this.menu.offsetWidth) {
                    console.log(this.menu.offsetWidth);
                    this.menu.style.left = `${this.toggler.offsetLeft}px`;
                }
                break;

            default:
                this.menu.style.top = `${
                    this.toggler.offsetTop + this.toggler.offsetHeight
                }px`;
                break;
        }
    }
}
