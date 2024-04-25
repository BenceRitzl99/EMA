const doc = {
    empBody: document.querySelector("#empBody"),
    addButton: document.querySelector("#addButton"),
    idDoc: document.querySelector("#id"),
    nameDoc: document.querySelector("#name"),
    cityDoc: document.querySelector("#city"),
    salaryDoc: document.querySelector("#salary")
}

const state = {
     url: "http://localhost:8000/employees",
     name: "",
     city: "",
     salary: 0,
     add: true
     
    
}

    

doc.addButton.addEventListener("click", () => {
    console.log("Működik")
    
    getDataFromForm()
    createEmployee()
    deleteModalContent()
    
    getEmployees()
    
})

function getDataFromForm() {
    state.name = doc.nameDoc.value
    state.city = doc.cityDoc.value
    state.salary = Number(doc.salaryDoc.value)
}



function createEmployee() {
    fetch(state.url, {
        method: "POST", //küldeni mindig post
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify( { // nem kell idézőjelbe tenni a name-t
            name: state.name,
            city: state.city,
            salary: state.salary
        })
    })
}

function editEmployee(){
    fetch(state.url)
    .then(response => response.json())
    .then(result => {renderEmployees(result)})
}

function getEmployees() {
    
    
    fetch(state.url)
    .then( response => response.json())
    .then(result => { 
        clearTableContent() 
        renderEmployees(result)
    
    })  //lekérés, aszinkron utasítás, névtelen függvény. Ha van neve, akkor nem kell a (zárójel), ha csak egy utasítás van, akkor nem kell a {kapcsos zárójel} sem.
    // Ha nem hagyom el a {kapcsos zárójelet}, akkor kell a return
    // fetch --> promise-t ad vissza --> használható a then utasítás
}

function renderEmployees(employeeList){
    
    employeeList.forEach(emp => {
        console.log(emp.salary)
        var row = document.createElement("tr")
        row.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.city}</td>
            <td>${emp.salary}</td>

            <td class="width">
                <button class="btn btn-outline-success" 
                data-id="${emp.id}"
                data-name="${emp.name}"
                data-city="${emp.city}"
                data-salary="${emp.salary}"
                data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                 
                onclick="startEdit(this)">Szerkesztés <i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-outline-danger" onclick="startDelete(${emp.id})">Törlés <i class="bi bi-trash3"></i></button>
            </td>
        `
        doc.empBody.appendChild(row)
    });
}


function deleteModalContent() {
    doc.idDoc.value = "";
    doc.nameDoc.value = "";
    doc.cityDoc.value = "";
    doc.salaryDoc.value = "";

}

function clearTableContent() {
    doc.empBody.textContent = "";
}

function startDelete(id) {
    console.log("törlendő:")
    deleteEmployee(id)
    getEmployees()
}

function deleteEmployee(id) {
    let newUrl = state.url + "/"+id
    fetch(newUrl, {
        method: "delete"
    })
}

function startEdit(source) {
    console.log("Szerkesztés...")
    doc.idDoc.value = source.dataset.id
    doc.nameDoc.value = source.dataset.name
    doc.cityDoc.value = source.dataset.city
    doc.salaryDoc.value = source.dataset.salary
    
    
}

function editEmployee(id) {
    let newUrl = state.url + "/"
}

function startAdding() {
    deleteModalContent();
}


getEmployees()