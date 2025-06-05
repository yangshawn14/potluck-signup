const form = document.getElementById('signup-form');
const list = document.getElementById('signup-list');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const dish = document.getElementById('dish').value.trim();

    if (!name || !dish) return;

    // Replace with your SheetDB POST URL
    const url = 'https://sheetdb.io/api/v1/YOUR_SHEETDB_ID';

    const data = {
        data: [{ name, dish }]
    };

    try {
        await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Add entry to list
        const entry = document.createElement('div');
        entry.className = 'signup-entry';
        entry.innerHTML = `<strong>${name}</strong> is bringing: ${dish}`;
        list.prepend(entry);

        form.reset();
    } catch (error) {
        alert('Something went wrong. Please try again.');
        console.error(error);
    }
});