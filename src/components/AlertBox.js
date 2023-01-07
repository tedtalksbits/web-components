export class AlertBox {
    constructor({ buttons, message, title, toggler } = {}) {
        this.buttons = buttons;
        this.message = message;
        this.title = title;
        this.toggler = toggler;
        // this.render();
    }

    render() {
        // create styles for the alert box

        const style = document.createElement('style');

        style.innerHTML = `

            .alert-backdrop {
                background-color: transparent;
                height: 100%;
                left: 0;
                position: fixed;
                top: 0;
                width: 100%;
                z-index: 99;
                
                
            }
            .alert-box {
                background-color: #fff;
                border: 1px solid #000;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                display: flex;
                flex-direction: column;
                height: 200px;
                justify-content: space-between;
                left: 50%;
                margin-left: -150px;
                margin-top: -100px;
                padding: 20px;
                position: fixed;
                top: 50%;
                width: 300px;
                z-index: 100;
            
            }

            .alert-backdrop.hidden {
                display: none;
            }

            .alert-box-title {
                font-size: 1.5em;
                font-weight: bold;
                margin: 0;
            }

            .alert-box-message {
                font-size: 1.2em;
                margin: 0;
            }

            .alert-box-buttons {
                display: flex;
                justify-content: flex-end;
            }
            
        `;

        document.head.appendChild(style);

        // Create the alert box
        this.alertBoxBackdrop = document.createElement('div');
        this.alertBoxBackdrop.classList.add('alert-backdrop');
        this.alertBoxBackdrop.classList.add('hidden');
        this.alertBox = document.createElement('div');
        this.alertBox.classList.add('alert-box');
        this.alertBox.classList.add('hidden');

        // Create the alert box title
        this.alertBoxTitle = document.createElement('h2');
        this.alertBoxTitle.classList.add('alert-box-title');
        this.alertBoxTitle.innerHTML = this.title;
        this.alertBox.appendChild(this.alertBoxTitle);

        // Create the alert box message
        this.alertBoxMessage = document.createElement('p');
        this.alertBoxMessage.classList.add('alert-box-message');
        this.alertBoxMessage.innerHTML = this.message;
        this.alertBox.appendChild(this.alertBoxMessage);

        // Create the alert box buttons
        this.alertBoxButtons = document.createElement('div');
        this.alertBoxButtons.classList.add('alert-box-buttons');

        if (!this.buttons) {
            // Create the default buttons
            this.buttons = [
                {
                    text: 'OK',
                    callback: () => {
                        this.hide();
                    },
                },
            ];
            console.log('No buttons provided, using default buttons');
        }
        this.buttons.forEach((button) => {
            let alertBoxButton = document.createElement('button');
            alertBoxButton.classList.add('alert-box-button');
            alertBoxButton.innerHTML = button.text;
            alertBoxButton.addEventListener('click', button.callback);
            this.alertBoxButtons.appendChild(alertBoxButton);
        });
        this.alertBox.appendChild(this.alertBoxButtons);
        this.alertBoxBackdrop.appendChild(this.alertBox);

        // Add the alert box to the page
        document.body.appendChild(this.alertBoxBackdrop);

        // Add the alert box to the global scope
        window.alertBox = this;

        // close the alert box when the user clicks outside of it
        this.alertBoxBackdrop.addEventListener('click', (event) => {
            if (event.target === this.alertBoxBackdrop) {
                this.hide();
            }
        });
    }

    show() {
        // Show the alert box
        this.alertBoxBackdrop.classList.remove('hidden');
    }

    hide() {
        // Hide the alert box
        this.alertBoxBackdrop.classList.add('hidden');
    }
    draggable(draggableHeader = this.alertBoxTitle, el = this.alertBox) {
        this.alertBox.style.position = 'absolute';
        this.alertBox.style.margin = 'auto';

        let pos1 = 0;
        let pos2 = 0;
        let pos3 = 0;
        let pos4 = 0;

        if (draggableHeader) {
            draggableHeader.onmousedown = dragMouseDown;
        }
        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }
        function elementDrag(e) {
            // if window is maximized, disable drag event
            if (el.classList.contains('max')) {
                return;
            }
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            el.style.top = el.offsetTop - pos2 + 'px';
            el.style.left = el.offsetLeft - pos1 + 'px';
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}
