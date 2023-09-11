let users = [];
users.push(...JSON.parse(localStorage.getItem('users')));
users.forEach(user => renderUser(user));

async function onFetchUser() {
    const apiUrl = 'https://randomuser.me/api';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const user = extractRequiredUserData(data.results[0]);
        updateUsers(user);
        renderUser(user);
    } catch (error) {
        alert('Something went wrong, try again later');
    }
}

function onClearStorage() {
    const userContainer = document.querySelector('.user-container');
    users = [];
    localStorage.setItem('users', JSON.stringify(users));
    userContainer.innerHTML = '';
}

function extractRequiredUserData(data) {
    return {
        "name": {
            "title": data.name.title,
            "first": data.name.first,
            "last": data.name.last
        },
        "country": data.location.country,
        "city": data.location.city,
        "cell": data.cell,
        "picture": data.picture.large
    };
}

function renderUser(user) {
    const userContainer = document.querySelector('.user-container');
    const userTemplate = ` <div class="col-md-3 mt-2">
                <div class="card">
                    <img src="${user.picture}" class="card-img-top" alt="User Picture">
                    <div class="card-body">
                        <h5 class="card-title">${user.name.title} ${user.name.first} ${user.name.last}</h5>
                        <p class="card-text">
                            <strong>Cell:</strong> ${user.cell}<br>
                            <strong>City:</strong> ${user.city}<br>
                            <strong>Country:</strong> ${user.country}
                        </p>
                    </div>
                </div>
            </div>`;
    userContainer.insertAdjacentHTML('beforeend', userTemplate);
}

function updateUsers(user) {
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}
