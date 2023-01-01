import { Table } from '../../../dist/components/Table.js';

const data = [
    { name: 'John', age: 25, job: 'Engineer' },
    { name: 'Jane', age: 32, job: 'Mechanic' },
    { name: 'Bob', age: 23, job: 'Developer' },
];

const table = document.createElement('table');

const myTable = new Table(table, data);

document.body.appendChild(myTable.render());
