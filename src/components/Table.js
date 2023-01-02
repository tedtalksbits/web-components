/*
    This file contains the source code for the Table component.

    The Table component is a wrapper for the HTML table element with additional functionality.

    Additional functionality includes:  
        - Sorting
        - Filtering
        - Pagination

*/

export class Table {
    constructor(table, data, types) {
        this.table = table;
        this.data = data;
        this.types = types;
        this.table = document.createElement('table');
        this.table.classList.add('table');
        this.itemsPerPage = 10;
        this.startPage = 1;
    }

    render() {
        this.table.innerHTML =
            this.renderHeader(this.data) + this.renderBody(this.data);
        return this.table;
    }

    renderHeader(data) {
        let header = '<thead><tr>';

        for (let key in data[0]) {
            header += `<th>${key}</th>`;
        }

        header += '</tr></thead>';

        return header;
    }

    renderBody(data) {
        let body = '<tbody>';

        for (let row of data) {
            body += '<tr>';

            for (let key in row) {
                body += `<td>${row[key]}</td>`;
            }

            body += '</tr>';
        }

        body += '</tbody>';

        return body;
    }

    sort(column, order) {
        if (!this.types) {
            throw new Error('Types are not defined');
        }
        const type = this.types[column];
        console.log(
            'sorting by ' +
                column +
                ' in ' +
                order +
                ' order' +
                ' of type ' +
                type
        );

        if (type === 'number') {
            this.data.sort((a, b) => {
                if (order === 'asc') {
                    return a[column] - b[column];
                }

                return b[column] - a[column];
            });
        }

        if (type === 'string') {
            this.data.sort((a, b) => {
                if (order === 'asc') {
                    return a[column].localeCompare(b[column]);
                }

                return b[column].localeCompare(a[column]);
            });
        }

        if (type === 'date') {
            this.data.sort((a, b) => {
                if (order === 'asc') {
                    return new Date(a[column]) - new Date(b[column]);
                }

                return new Date(b[column]) - new Date(a[column]);
            });
        }

        if (type === 'money') {
            this.data.sort((a, b) => {
                const aMoney = parseFloat(
                    a[column].toString().replace(/[^0-9.-]/g, '')
                ).toFixed(2);
                const bMoney = parseFloat(
                    b[column].toString().replace(/[^0-9.-]/g, '')
                ).toFixed(2);

                if (order === 'asc') {
                    return aMoney - bMoney;
                }

                return bMoney - aMoney;
            });
        }

        if (!type) {
            // find which column is missing a type

            for (let key in this.data[0]) {
                if (!this.types[key]) {
                    return;
                }
            }
        }

        const tableBody = this.table.querySelector('tbody');
        tableBody.innerHTML = this.renderBody(this.data);
    }

    sortable() {
        const ths = this.table.querySelectorAll('th');
        console.log(ths);
        ths.forEach((th) => {
            th.dataset.order = 'asc';
            th.addEventListener('click', (e) => {
                const order = th.dataset.order === 'asc' ? 'desc' : 'asc';
                th.dataset.order = order;

                this.sort(th.textContent, order);
            });
        });
    }

    filter(column, value) {
        const filteredData = this.data.filter((row) =>
            row[column].toLowerCase().includes(value.toLowerCase())
        );
        const tableBody = this.table.querySelector('tbody');
        tableBody.innerHTML = this.renderBody(filteredData);
    }

    filterable() {
        const searchInput = document.createElement('input');
        searchInput.classList.add('search-input');
        // create drop down menu for search options
        const searchOptions = document.createElement('select');
        searchOptions.classList.add('search-options');

        // create options for drop down menu
        for (let key in this.data[0]) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = key;
            searchOptions.appendChild(option);
        }

        // let column be the first option in the drop down menu

        let column = searchOptions.value;
        let value = '';

        console.log(column);

        searchOptions.addEventListener('change', (e) => {
            column = e.target.value;
        });

        searchInput.addEventListener('input', (e) => {
            value = e.target.value;
            console.log(column, value);
            this.filter(column, value);
        });

        // insert search input and drop down menu before table
        this.table.parentNode.insertBefore(searchOptions, this.table);
        this.table.parentNode.insertBefore(searchInput, this.table);
    }

    paginate() {
        let page = this.startPage;
        const perPage = this.itemsPerPage;

        const start = (page - 1) * perPage;
        const end = page * perPage;

        // we cannot mutate the data array, so we need to create a new array
        // that contains only the items we want to display

        const paginatedData = this.data.slice(start, end);

        let body = '<tbody>';

        for (let row of paginatedData) {
            body += '<tr>';

            for (let key in row) {
                body += `<td>${row[key]}</td>`;
            }

            body += '</tr>';
        }

        body += '</tbody>';

        this.table.innerHTML =
            this.renderHeader(paginatedData) + this.renderBody(paginatedData);
    }

    createPaginationUI(startPage, perPage) {
        const MAX_PAGES = Math.ceil(this.data.length / perPage);

        console.log('createPaginiationUI call');

        console.log('start page: ' + startPage + ' perPage: ' + perPage);

        console.log('max pages ' + MAX_PAGES);

        this.paginate(startPage, perPage);

        const pagination = document.createElement('div');
        pagination.classList.add('pagination');

        for (let i = 1; i <= MAX_PAGES; i++) {
            const btn = document.createElement('button');
            btn.textContent = i;
            btn.addEventListener('click', () => {
                console.log('pagination btn click');
                console.log('i', i);
                this.startPage = i;
                this.paginate();
            });

            pagination.appendChild(btn);
        }

        this.table.parentNode.appendChild(pagination);
    }

    paginationConfig({ itemsPerPage = 10, startPage = 1 } = {}) {
        // input validations

        if (itemsPerPage < 1) {
            throw new Error('itemsPerPage must be greater than 0');
        }

        if (startPage < 1) {
            throw new Error('startPage must be greater than 0');
        }

        if (startPage > Math.ceil(this.data.length / itemsPerPage)) {
            throw new Error(
                'the maximum value for startPage is ' +
                    Math.ceil(this.data.length / itemsPerPage) +
                    ' for the current itemsPerPage value'
            );
        }

        if (itemsPerPage > this.data.length) {
            throw new Error(
                'itemsPerPage cannot be greater than the number of rows in the table'
            );
        }

        this.itemsPerPage = itemsPerPage;
        this.startPage = startPage;
        this.createPaginationUI(this.startPage, this.itemsPerPage);
    }

    // addRow(row) {
    //     this.data.push(row);

    //     this.table.innerHTML = this.renderHeader( ) + this.renderBody();
    // }

    // removeRow(row) {
    //     this.data = this.data.filter((r) => r !== row);

    //     this.table.innerHTML = this.renderHeader() + this.renderBody();
    // }

    // updateRow(row, data) {
    //     this.data = this.data.map((r) => (r === row ? data : r));

    //     this.table.innerHTML = this.renderHeader() + this.renderBody();
    // }

    // clear() {
    //     this.data = [];

    //     this.table.innerHTML = this.renderHeader() + this.renderBody();
    // }

    // renderWithData(data) {
    //     let body = '<tbody>';

    //     for (let row of data) {
    //         body += '<tr>';

    //         for (let key in row) {
    //             body += `<td>${row[key]}</td>`;
    //         }

    //         body += '</tr>';
    //     }

    //     body += '</tbody>';

    //     // this.table.innerHTML = this.renderHeader() + body;
    //     const tableBody = this.table.querySelector('tbody');
    //     tableBody.innerHTML = body;
    // }
}
