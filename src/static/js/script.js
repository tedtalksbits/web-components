import { Table } from '../../../src/components/Table.js';
import { employeesData, nbaPlayers } from '../../data/tablesData.js';

const table = document.createElement('table');
table.classList.add('my-table');
const myTable = new Table(table, employeesData.data, employeesData.types);
document.body.appendChild(myTable.render());

myTable.sortable();
myTable.filterable();
myTable.paginationConfig();

/*
    ========================================
    ========= Table 2 ======================
    ========================================
*/
const container = document.getElementById('table2');
const table2 = document.createElement('table');
const myTable2 = new Table(table2, nbaPlayers.data, nbaPlayers.types);
container.appendChild(myTable2.render());

myTable2.paginationConfig();
