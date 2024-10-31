document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value).toFixed(2);

    const transactionTable = document.getElementById('transactionTable');
    const newRow = transactionTable.insertRow();

    newRow.innerHTML = `
        <td>${date}</td>
        <td>${description}</td>
        <td>${category}</td>
        <td>${amount}</td>
    `;

    document.getElementById('transactionForm').reset();
});
