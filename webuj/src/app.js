const doc = {
    empBody: document.querySelector("#empBody"),
    addButton: document.querySelector("#addButton")
}

const state = {
     url: "http://localhost:8000/employees"
    
}

    

doc.addButton.addEventListener("click", () => {
    console.log("Működik")
})



function createEmployee() {
    fetch(state.url, {
        method: "POST", //küldeni mindig post
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify( { // nem kell idézőjelbe tenni a name-t
            name: "Valaki",
            city: "Budapest",
            salary: 300
        })
    })

}

function getEmployees() {
    
    
    fetch(state.url)
    .then( response => response.json())
    .then(result => {
        // console.log(result)
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

            <td>
                <button class="btn btn-outline-success">Szerkesztés</button>
                <button class="btn btn-outline-danger">Törlés</button>
            </td>
        `
        doc.empBody.appendChild(row)
    });

}

getEmployees()