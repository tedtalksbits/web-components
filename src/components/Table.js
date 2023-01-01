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
        this.ths = this.table.querySelectorAll('th');
    }

    render() {
        this.table.innerHTML = this.renderHeader() + this.renderBody();
        return this.table;
    }

    renderHeader() {
        let header = '<thead><tr>';

        for (let key in this.data[0]) {
            header += `<th>${key}</th>`;
        }

        header += '</tr></thead>';

        return header;
    }

    renderBody() {
        let body = '<tbody>';

        for (let row of this.data) {
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

                console.log(aMoney, bMoney);
                if (order === 'asc') {
                    return aMoney - bMoney;
                }

                return bMoney - aMoney;
            });
        }

        // check data type of column

        const tableBody = this.table.querySelector('tbody');
        tableBody.innerHTML = this.renderBody();
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
        this.data = this.data.filter((row) =>
            row[column].toLowerCase().includes(value.toLowerCase())
        );

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    paginate(page, perPage) {
        const start = (page - 1) * perPage;
        const end = page * perPage;

        this.data = this.data.slice(start, end);

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    addRow(row) {
        this.data.push(row);

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    removeRow(row) {
        this.data = this.data.filter((r) => r !== row);

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    updateRow(row, data) {
        this.data = this.data.map((r) => (r === row ? data : r));

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    clear() {
        this.data = [];

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }
}
