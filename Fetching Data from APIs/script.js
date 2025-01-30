fetch('https://dummyjson.com/users')
    .then(response => response.json())
    .then(data => {
        const staffList = document.getElementById('staffList');
        data.users.forEach(user => {
            const staffCard = document.createElement('div');
            staffCard.classList.add('staff-card');
            staffCard.innerHTML = 
                `<h2>${user.firstName} ${user.lastName}</h2>
                <p>Email: ${user.email}</p>
                <a href="details.html?id=${user.id}">View Details</a>`;
            staffList.appendChild(staffCard);
        });
    })
    .catch(error => console.error('Error fetching data:', error));