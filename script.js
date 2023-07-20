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
    const errors = document.querySelectorAll(".error");  //return karega all html element with class="error"
    errors.forEach(error => error.textContent = "");     //unn return kiye hue elements pe sabke textcontext ko empty string karega
}

function validateForm() {
    //getting all the values from the input to variables
    const id = idInput.value;
    const name = nameInput.value;
    const age = parseInt(ageInput.value);
    const gender = genderInput.value;
    const designation = designationInput.value;
    const photoUrl = photoInput.value;

    //A variable to keep track of the form's validity
    let isValid = true;

    //id cant be null
    if (!id) {
        document.getElementById("idError").textContent = "ID cannot be null.";
        isValid = false;
    }

    //Name cant be in numbers 
    if (!name.match(/^[A-Za-z\s]+$/)) {
        document.getElementById("nameError").textContent = "Name should contain alphabets only.";
        isValid = false;
    }

    //age in 18 to 60
    if (age < 18 || age > 60) {
        document.getElementById("ageError").textContent = "Age should be in the range of 18 to 60.";
        isValid = false;
    }

    //gender should be added
    if (!gender) {
        document.getElementById("genderError").textContent = "Please select a gender.";
        isValid = false;
    }

    //designation should be add
    if (!designation) {
        document.getElementById("designationError").textContent = "Please select a designation.";
        isValid = false;
    }

    //photourl should be added compulsorily
    if (!photoUrl) {
        document.getElementById("photoError").textContent = "Self Photo URL cannot be empty.";
        isValid = false;
    }

    //sab theek hai
    return isValid;
}

//id unique hona chahiye
function isIdUnique(id) {
    //gets all rows , not header
    const rows = table.getElementsByTagName("tr");
    for (let i = 1; i < rows.length; i++) { // Skip karega header row
        const cells = rows[i].getElementsByTagName("td");
        // anything cell is means the inputs
        //cell 0 matlab at first cell i.e id it should not be same as id 
        //kisi bhi row k column mein id pahle jaisa same na ho
        if (cells[0].textContent === id) {
            return false;
        }
    }
    return true;
}


function addUser() {
    //agar theek se validate ho gaya toh , aage 
    if (validateForm()) {
        const id = idInput.value;
        const name = nameInput.value;
        const age = ageInput.value;
        const gender = genderInput.value;
        const designation = designationInput.value;
        const photoUrl = photoInput.value;

        //if id is not unique , give error
        if (!isIdUnique(id)) {
            document.getElementById("idError").textContent = "ID should be unique.";
            return;
        }

        //create new row 
        const newRow = table.insertRow(-1);
        //-1 means it will be inserted at the end of row
        //innerhtml is used to enter info in html table
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
        scrollDown();
    }
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: "smooth" });
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

function scrollDown() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });
}

function searcher(){
    document.addEventListener("DOMContentLoaded", function() {
        const filterInput = document.getElementById("filterInput");
        const dataTable = document.getElementById("dataTable");
        const rows = dataTable.getElementsByTagName("tr");
    
        filterInput.addEventListener("keyup", function() {
            const filterValue = filterInput.value.toLowerCase();
    
            for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip the header row
                const row = rows[i];
                const cells = row.getElementsByTagName("td");
    
                // Convert the HTMLCollection to an array to use the filter() method
                const cellTexts = Array.from(cells).map(cell => cell.textContent || cell.innerText);
    
                const showRow = cellTexts.some(cellText => cellText.toLowerCase().includes(filterValue));
    
                row.style.display = showRow ? "" : "none";
            }
        });
    });

}


