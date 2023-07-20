const table = document.getElementById("userTable");
const idInput = document.getElementById("id");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");
const designationInput = document.getElementById("designation");
const photoInput = document.getElementById("photo");

function resetForm() {
    idInput.value = "";
    nameInput.value = "";
    ageInput.value = "";
    genderInput.value = "";
    designationInput.value = "";
    photoInput.value = "";

    // Clear error messages
    const errors = document.querySelectorAll(".error");
    errors.forEach(error => error.textContent = "");
}

function validateForm() {
    const id = idInput.value;
    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const gender = genderInput.value;
    const designation = designationInput.value;
    const photoUrl = photoInput.value;

    let isValid = true;

    if (!id) {
        document.getElementById("idError").textContent = "ID cannot be empty.";
        isValid = false;
    }

    if (!name.match(/^[A-Za-z\s]+$/)) {
        document.getElementById("nameError").textContent = "Name should contain alphabets only.";
        isValid = false;
    }

    if (age < 18 || age > 60) {
        document.getElementById("ageError").textContent = "Age should be in the range of 18 to 60.";
        isValid = false;
    }

    if (!gender) {
        document.getElementById("genderError").textContent = "Please select a gender.";
        isValid = false;
    }

    if (!designation) {
        document.getElementById("designationError").textContent = "Please select a designation.";
        isValid = false;
    }

    if (!photoUrl) {
        document.getElementById("photoError").textContent = "Self Photo URL cannot be empty.";
        isValid = false;
    }

    return isValid;
}

function isIdUnique(id) {
    const rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) { // Skip the header row
        const cells = rows[i].getElementsByTagName("td");
        if (cells[0].textContent === id) {
            return false;
        }
    }
    return true;
}

function addUser() {
    if (validateForm()) {
        const id = idInput.value;
        const name = nameInput.value;
        const age = ageInput.value;
        const gender = genderInput.value;
        const designation = designationInput.value;
        const photoUrl = photoInput.value;

        if (!isIdUnique(id)) {
            document.getElementById("idError").textContent = "ID should be unique.";
            return;
        }

        const newRow = table.insertRow(-1);
        newRow.innerHTML = `
            <td>${id}</td>
            <td>${name}</td>
            <td>${age}</td>
            <td>${gender}</td>
            <td>${designation}</td>
            <td><img src="${photoUrl}" alt="Self Photo"></td>
            <td class="actions">
                <button class="edit" onclick="editUser(this)">Edit</button>
                <button class="delete" onclick="deleteUser(this)">Delete</button>
                <button class="view" onclick="viewUser(this)">View</button>
            </td>
        `;

        resetForm();
    }
}

function editUser(editButton) {
    const row = editButton.parentNode.parentNode;
    const cells = row.getElementsByTagName("td");

    idInput.value = cells[0].textContent;
    nameInput.value = cells[1].textContent;
    ageInput.value = cells[2].textContent;
    genderInput.value = cells[3].textContent;
    designationInput.value = cells[4].textContent;
    photoInput.value = cells[5].getElementsByTagName("img")[0].getAttribute("src");
}

function deleteUser(deleteButton) {
    const row = deleteButton.parentNode.parentNode;
    table.deleteRow(row.rowIndex);
}

function viewUser(viewButton) {
    // You can implement the "view" functionality as per your requirements.
    // For this example, we won't add any specific view functionality.
    // It could be something like displaying the user details in a modal or a separate page.
    const row = viewButton.parentNode.parentNode;
    const cells = row.getElementsByTagName("td");

    idInput.value = cells[0].textContent;
    nameInput.value = cells[1].textContent;
    ageInput.value = cells[2].textContent;
    genderInput.value = cells[3].textContent;
    designationInput.value = cells[4].textContent;
    photoInput.value = cells[5].getElementsByTagName("img")[0].getAttribute("src");
}

