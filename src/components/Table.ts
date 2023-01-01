/*
    This file contains the source code for the Table component.

    The Table component is a wrapper for the HTML table element with additional functionality.

    Additional functionality includes:  
        - Sorting
        - Filtering
        - Pagination

*/

export class Table {
    constructor(private table: HTMLTableElement, private data: any[]) {
        this.table = document.createElement('table');
        this.table.classList.add('table');
    }

    public render() {
        this.table.innerHTML = this.renderHeader() + this.renderBody();
        return this.table;
    }

    private renderHeader() {
        let header = '<thead><tr>';

        for (let key in this.data[0]) {
            header += `<th>${key}</th>`;
        }

        header += '</tr></thead>';

        // when the user clicks on a column header, sort the table by that column

        return header;
    }

    private renderBody() {
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

    public sort(column: string, order: 'asc' | 'desc') {
        this.data.sort((a, b) => {
            if (a[column] < b[column]) {
                return order === 'asc' ? -1 : 1;
            }

            if (a[column] > b[column]) {
                return order === 'asc' ? 1 : -1;
            }

            return 0;
        });

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    public filter(column: string, value: string) {
        this.data = this.data.filter((row) =>
            row[column].toLowerCase().includes(value.toLowerCase())
        );

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    public paginate(page: number, perPage: number) {
        const start = (page - 1) * perPage;
        const end = page * perPage;

        this.data = this.data.slice(start, end);

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    public addRow(row: any) {
        this.data.push(row);

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    public removeRow(row: any) {
        this.data = this.data.filter((r) => r !== row);

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    public updateRow(row: any, data: any) {
        this.data = this.data.map((r) => (r === row ? data : r));

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }

    public clear() {
        this.data = [];

        this.table.innerHTML = this.renderHeader() + this.renderBody();
    }
}
