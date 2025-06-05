console.log('JS loaded');

const apiBase = 'https://potluck-signup.onrender.com'; // Change to your backend URL when deployed

const form = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const dishInput = document.getElementById('dish');
const signupList = document.getElementById('signupList');

let editId = null;

async function fetchSignups() {
    try {
        const res = await fetch(apiBase + '/dishes');
        const data = await res.json();
        signupList.innerHTML = '';

        data.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.dish}`;

            const actions = document.createElement('div');
            actions.className = 'actions';

            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => {
                nameInput.value = item.name;
                dishInput.value = item.dish;
                editId = item._id;
                form.querySelector('button').textContent = 'Update';
            };

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = async () => {
                if (confirm(`Delete ${item.name}'s dish?`)) {
                    await fetch(`${apiBase}/dishes/${item._id}`, { method: 'DELETE' });
                    fetchSignups();
                }
            };

            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            li.appendChild(actions);

            signupList.appendChild(li);
        });
    } catch (err) {
        console.error('Failed to fetch signups', err);
    }
}

form.onsubmit = async e => {
    e.preventDefault();
    console.log('Form submitted');

    const name = nameInput.value.trim();
    const dish = dishInput.value.trim();

    if (!name || !dish) return;

    try {
        if (editId) {
            // Update
            await fetch(`${apiBase}/dishes/${editId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, dish }),
            });
            editId = null;
            form.querySelector('button').textContent = 'Add';
        } else {
            // Add new
            await fetch(apiBase + '/dishes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, dish }),
            });
        }
        nameInput.value = '';
        dishInput.value = '';
        fetchSignups();
    } catch (err) {
        console.error('Failed to submit', err);
    }
};

// Initial fetch
fetchSignups();
