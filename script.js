var SelectedRow = null;

//Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div,main);

    setTimeout(() => document.querySelector(".alert").remove(),3000);

}
// Clear All Fields
function clearFields() {
    document.querySelector("#movieName").value = "";
    document.querySelector("#directorName").vaue = "";
    document.querySelector("#releasedYear").value = "";

}

//Add Data
document.querySelector("#movie-form").addEventListener("submit",(e) => {
    e.preventDefault();

    //Get Form Values 
    const movieName = document.querySelector("#movieName").value;
    const directorName = document.querySelector("#directorName").value;
    const releasedYear = document.querySelector("#releasedYear").value;

    //validate
    if(movieName == "" || directorName == "" || releasedYear == "" )
    {
        showAlert("Please fill all fields","danger");

    }
    else
    {
        if(SelectedRow == null){
            const list = document.querySelector("#movie-list");
            const row = document.createElement("tr");
    
            row.innerHTML = `
                <td>${movieName}</td>
                <td>${directorName}</td>
                <td>${releasedYear}</td>
                <td>
                <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
            
            `;
            list.appendChild(row);
            SelectedRow = null;
            showAlert("Movie Added", "success")

        }
        else
        {
            SelectedRow.children[0].textContent = movieName;
            SelectedRow.children[1].textContent = directorName;
            SelectedRow.children[2].textContent = releasedYear;
            SelectedRow = null;
            showAlert("Movie Info Edited","info");



        }
        clearFields();

    }

});


//Edited Data
document.querySelector("#movie-list").addEventListener("click", (e) => {
    target = e.target;

    if(target.classList.contains("edit")){
        SelectedRow = target.parentElement.parentElement;
        document.querySelector("#movieName").value = SelectedRow.children[0].textContent;
        document.querySelector("#directorName").value = SelectedRow.children[1].textContent;
        document.querySelector("#releasedYear").value = SelectedRow.children[2].textContent;
    }
} );


// Delete Data
document.querySelector("#movie-list").addEventListener("click", (e) =>{

        target = e.target;
        if(target.classList.contains("delete")){
            target.parentElement.parentElement.remove();
            showAlert("Movie Data Deleted","danger");
            
        }

});