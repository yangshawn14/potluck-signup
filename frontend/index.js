axios.get('http://localhost:3000/dishes')
    .then(res => {
        const list = document.getElementById('dishList');
        res.data.forEach(item => {
            const entry = document.createElement('li');
            entry.textContent = `${item.name}: ${item.dish}`;
            list.appendChild(entry);
        });
    });

document.getElementById('dishForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('nameInput').value;
    const dish = document.getElementById('dishInput').value;

    axios.post('http://localhost:3000/dishes', { name, dish })
        .then(() => location.reload())  // simple reload to fetch updated list
        .catch(err => console.error(err));
});
