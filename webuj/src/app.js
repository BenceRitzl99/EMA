const doc = {
    empBody: document.querySelector("#empBody"),
    addButton: document.querySelector("#addButton"),
    nameDoc: document.querySelector("#name"),
    cityDoc: document.querySelector("#city"),
    salaryDoc: document.querySelector("#salary")
}

const state = {
     url: "http://localhost:8000/employees",
     name: "",
     city: "",
     salary: 0
    
}

    

doc.addButton.addEventListener("click", () => {
    console.log("Működik")
    createEmployee()
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
    .then(result => {renderEmployees(result)})  //lekérés, aszinkron utasítás, névtelen függvény. Ha van neve, akkor nem kell a (zárójel), ha csak egy utasítás van, akkor nem kell a {kapcsos zárójel} sem.
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

            <td>
                <button class="btn btn-outline-success">Szerkesztés</button>
                <button class="btn btn-outline-danger">Törlés</button>
            </td>
        `
        doc.empBody.appendChild(row)
    });

}

getEmployees()