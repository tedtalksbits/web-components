export class Menu {
    constructor({ items, toggler, position = 'bottom', width = '500px' } = {}) {
        this.items = items;
        this.toggler = toggler;
        this.position = position;
        this.width = width;

        // this.render();
        this.init();
        this.isShowing = false;
    }
    render() {
        // create styles for the menu
        this.addMenuStyles();
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

        // Add the event listener to the toggler
        // this.toggler.addEventListener('click', () => {
        //     this.toggle();
        // });
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
        console.log('toggle');
        // this.menu.classList.toggle('hidden');
        this.isShowing = !this.isShowing;
        if (this.isShowing) {
            console.log('showing');
            this.render();
            this.positionMenu();
        } else {
            console.log('hiding');

            this.menu.classList.add('hidden');
            setTimeout(() => {
                this.menu.remove();
            }, 250);
        }
    }
    hide() {
        this.menu.classList.add('hidden');
    }
    init() {
        this.toggler.addEventListener('click', () => {
            this.toggle();
        });
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
