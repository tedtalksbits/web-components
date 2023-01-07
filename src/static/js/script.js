import { Table } from '../../../src/components/Table.js';
import { AlertBox } from '../../components/AlertBox.js';
import { Menu } from '../../components/Menu.js';
import { Modal } from '../../components/Modal.js';

import { employeesData, nbaPlayers } from '../../data/tablesData.js';

const container1 = document.getElementById('table1');
const table1 = document.createElement('table');
const myTable = new Table(table1, employeesData.data, employeesData.types);
container1.appendChild(myTable.render());

myTable.paginationConfig({
    itemsPerPage: 10,
    startPage: 1,
});

/*
    ========================================
    ========= Table 2 ======================
    ========================================
*/
const container2 = document.getElementById('table2');
const table2 = document.createElement('table');
const myTable2 = new Table(table2, nbaPlayers.data, nbaPlayers.types);
container2.appendChild(myTable2.render());

myTable2.sortable();
myTable2.filterable();

/*
    ========================================
    ALERT BOX
    ========================================
*/

const alertBox = new AlertBox({
    title: 'Alert Box',
    message: 'This is an alert box',
    buttons: [
        {
            text: 'OK',
            type: 'primary',
            callback: () => {
                alertBox.hide();
            },
        },
        {
            text: 'Cancel',
            type: 'secondary',
            callback: () => {
                alertBox.hide();
            },
        },
    ],
});

alertBox.render();
// alertBox.draggable();

const alertBtn = document.getElementById('alertBtn');
alertBtn.addEventListener('click', () => {
    alertBox.show();
});

const modal = new Modal({
    title: 'Modal',
    message: 'This is a modal',
    buttons: [
        {
            text: 'OK',
            type: 'primary',
            callback: () => {
                modal.hide();
            },
        },
    ],
    closeOnOutsideClick: true,
});

modal.render();

const modalBtn = document.getElementById('modalBtn');

modalBtn.addEventListener('click', () => {
    modal.show();
});

const customModal = new Modal();

customModal.createCustomModal();

const customModalBtn = document.getElementById('customModalBtn');

customModalBtn.addEventListener('click', () => {
    customModal.show();
});

/*
    ========================================
    Menu
    ========================================
*/
const menuBtn1 = document.getElementById('menuBtn1');
new Menu({
    items: [
        {
            text: 'Home',
            callback: () => {
                alert('Home');
            },
        },
        {
            text: 'About',
            callback: () => {
                alert('About');
            },
        },
        {
            text: 'Delete',
            callback: () => {
                alert('Delete');
            },
        },
    ],
    toggler: menuBtn1,
});
