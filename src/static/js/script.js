import { Table } from '../../../src/components/Table.js';

// when the page is loaded

const data = [
    {
        name: 'John',
        age: 25,
        job: 'Engineer',
        city: 'New York',
        salary: '$100,000.75',
        dob: '1995-03-25',
    },
    {
        name: 'Mike',
        age: 25,
        job: 'Zoologist',
        city: 'New York',
        salary: '$100,000.73',
        dob: '1995-03-25',
    },
    {
        name: 'Jane',
        age: 30,
        job: 'Designer',
        city: 'Chicago',
        salary: '$80,000.43',
        dob: '1990-01-12',
    },
    {
        name: 'Bob',
        age: 35,
        job: 'Developer',
        city: 'Los Angeles',
        salary: '$120,000.90',
        dob: '1985-10-11',
    },
    {
        name: 'Mary',
        age: 28,
        job: 'Developer',
        city: 'San Francisco',
        salary: '$110,000.50',
        dob: '1992-07-23',
    },
];

const types = {
    name: 'string',
    age: 'number',
    job: 'string',
    city: 'string',
    salary: 'money',
    dob: 'date',
};

const table = document.createElement('table');
table.classList.add('my-table');
const myTable = new Table(table, data, types);
document.body.appendChild(myTable.render());

myTable.sortable();

const table2 = document.createElement('table');
const data2 = [
    {
        product: 'Apple',
        price: 1.5,
        quantity: 10,
        total: 15,
    },
    {
        product: 'Orange',
        price: 2.5,
        quantity: 5,
        total: 12.5,
    },
    {
        product: 'Banana',
        price: 3.5,
        quantity: 2,
        total: 7,
    },
];

const types2 = {
    product: 'string',
    price: 'money',
    quantity: 'number',
    total: 'money',
};

const myTable2 = new Table(table2, data2, types2);
document.body.appendChild(myTable2.render());
myTable2.sortable();
