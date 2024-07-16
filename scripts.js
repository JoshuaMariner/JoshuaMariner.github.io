document.addEventListener("DOMContentLoaded", function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateTable(data.couchCoopGames, 'couchCoopGamesTable');
            populateTable(data.onlineCoopGames, 'onlineCoopGamesTable');
            populateTable(data.webGames, 'webGamesTable');
            populateTable(data.hostGames, 'hostGamesTable');
        });

    const headerNames = {
        "Name": "Name",
        "Mic Required": "Mic",
        "Player Range": "Players",
        "Game Type": "Type",
        "ESRB Rating": "Rating",
        "Description": "Description"
    };

    function populateTable(data, tableId) {
        const table = document.getElementById(tableId);
        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');
        thead.innerHTML = '';
        tbody.innerHTML = '';

        // Populate headers
        const headerRow = document.createElement('tr');
        Object.keys(data[0]).forEach((key, index) => {
            const th = document.createElement('th');
            th.textContent = headerNames[key] || key;
            th.onclick = () => sortTable(index, tableId);
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Populate rows
        data.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }

    function sortTable(n, tableId) {
        const table = document.getElementById(tableId);
        const rows = Array.from(table.rows).slice(1);
        const isAsc = table.rows[0].cells[n].classList.toggle('asc');
        rows.sort((rowA, rowB) => {
            const cellA = rowA.cells[n].innerText.toLowerCase();
            const cellB = rowB.cells[n].innerText.toLowerCase();
            return cellA.localeCompare(cellB) * (isAsc ? 1 : -1);
        });
        rows.forEach(row => table.appendChild(row));
    }
});
