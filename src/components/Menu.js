export class Menu {
    constructor({ items, toggler, width = '500px' } = {}) {
        this.items = items;
        this.toggler = toggler;
        this.width = width;

        // this.render();
        this.init();
        this.isShowing = false;
    }
    render() {
        // Create the menu
        this.menu = document.createElement('div');
        this.menu.classList.add('menu');
        // Create the menu items
        this.menuItems = document.createElement('ul');
        this.menuItems.classList.add('menu-items');
        this.items.forEach((item) => {
            let menuItem = document.createElement('li');
            menuItem.classList.add('menu-item');
            menuItem.innerHTML = item.text;
            menuItem.addEventListener('click', async () => {
                await item.callback();
                this.toggle();
            });
            this.menuItems.appendChild(menuItem);
        });
        this.menu.appendChild(this.menuItems);
        // Add the menu to the absolute position of the toggler
        this.toggler.parentNode.style.position = 'relative';
        this.toggler.parentNode.appendChild(this.menu);

        // remove menu when clicking outside of it

        document.addEventListener('click', (e) => {
            if (e.target !== this.toggler && !this.menu?.contains(e.target)) {
                if (this.menu) {
                    this.isShowing = false;
                    this.menu.classList.add('hidden');
                    this.removeMenu();
                }
            }
        });
    }
    addMenuStyles() {
        const style = document.createElement('style');
        style.dataset.for = 'menu';
        style.innerHTML = `


            .menu {
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 5px;
                position: absolute;
                z-index: 100;
                min-width: ${this.width};
                opacity: 1;
                animation: animateIn 0.25s ease 0s;

            }
            .menu.hidden {
                opacity: 0;
                transition: opacity 0.25s;
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

            // .menu::before {
            //     content: '';
            //     position: absolute;
            //     width: 0;
            //     height: 0;
            //     border-style: solid;
            //     border-width: 0 5px 5px 5px;
            //     border-color: transparent transparent #fff transparent;
            //     top: -5px;
            //     left: 1rem;
            //     transform: translateX(-50%);
            // }

            @keyframes animateIn {
                0% {
                    opacity: 0;
                    -webkit-transform: scale3d(.3,.3,.3);
                    transform: scale3d(.3,.3,.3);
                }
                60% {
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    toggle() {
        this.isShowing = !this.isShowing;
        if (this.isShowing) {
            this.render();
            this.positionMenu();
        } else {
            this.removeMenu();
        }
    }
    hide() {
        this.menu.classList.add('hidden');
    }
    removeMenu() {
        this.menu.classList.add('hidden');
        setTimeout(() => {
            this.menu.remove();
        }, 250);

        this.isShowing = false;
    }
    init() {
        // create styles for the menu
        this.addMenuStyles();
        this.toggler.addEventListener('click', () => {
            this.toggle();
        });
    }

    positionMenu() {
        this.menu.style.top = `${
            this.toggler.offsetTop + this.toggler.offsetHeight + 5
        }px`;
        console.log(this.toggler.getBoundingClientRect());
        this.menu.style.right = '1rem';
    }

    removeMenuStyles() {
        const style = document.querySelector('[data-for="menu"]');
        console.log('removing style tag');
        setTimeout(() => {
            style.remove();
        }, 150);

        console.log('removed style tag');
    }
}
