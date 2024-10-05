document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const registrationData = document.getElementById('registration-data');
    localStorage.removeItem('registrationData');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        const age = calculateAge(new Date(dob));
        if (age < 18 || age > 55) {
            alert("Age must be between 18 and 55.");
            return;
        }

        const data = { name, email, password, dob, terms: terms ? true : false };
        localStorage.setItem('registrationData', JSON.stringify([data]));
        addRowToTable(data);
        form.reset();
    });

    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function addRowToTable(data) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="border border-gray-300 px-4 py-2">${data.name}</td>
            <td class="border border-gray-300 px-4 py-2">${data.email}</td>
            <td class="border border-gray-300 px-4 py-2">${data.password}</td>
            <td class="border border-gray-300 px-4 py-2">${data.dob}</td>
            <td class="border border-gray-300 px-4 py-2">${data.terms}</td>
        `;
        registrationData.appendChild(row);
    }
});
