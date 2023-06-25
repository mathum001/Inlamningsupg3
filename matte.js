
let todoContainer = document.getElementById("todo");
let completedContainer = document.getElementById("completed");

//Fetchar alla todos från API
function fetchAll() {
    fetch('https://dummyjson.com/todos')
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            displayAllTodo(data.todos);
        }).catch((err) => {
            console.log(err);
        })

}


// Display all Todos
function displayAllTodo(data) {
    data.forEach(data => {

        let card = document.createElement("div");
        let titel = document.createElement("h3");
        titel.innerHTML = data.userId;
        let para = document.createElement("div")
        para.innerHTML = data.todo;
        let datum = document.createElement("div");
        datum.innerHTML = ("This card was created: " + new Date());
        let datumDone = document.createElement("div");
        let todoDone = document.createElement("button");
        todoDone.addEventListener("click", () => { moveTodo(data.id, data.completed, card) });
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "DELETE";
        deleteBtn.addEventListener("click", () => { deleteTodo(data.id, card) });


        card.append(titel, para, datum, datumDone, todoDone, deleteBtn);

        if (data.completed === false) {
            datumDone.innerHTML = ("--");
            todoDone.innerHTML = "Inte färdig";
            todoDone.setAttribute("class", "notDone");
            todoContainer.append(card);


        }
        else {
            datumDone.innerHTML = new Date();
            todoDone.innerHTML = "Färdig";
            todoDone.setAttribute("class", "done");
            completedContainer.append(card);
        }
    });
}

//Display new todo
function addOneTodo(data) {
    let card = document.createElement("div");
    let titel = document.createElement("h3");
    titel.innerHTML = data.userId;
    let para = document.createElement("div")
    para.innerHTML = data.todo;
    let datum = document.createElement("div");
    datum.innerHTML = ("This card was created: " + new Date());
    let datumDone = document.createElement("div");
    let todoDone = document.createElement("button");
    todoDone.addEventListener("click", () => { moveTodo(data.id, data.completed, card, data) });
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";
    deleteBtn.addEventListener("click", () => { deleteTodo(data.id, card) });

    card.append(titel, para, datum, datumDone, todoDone, deleteBtn);

    if (data.completed === false) {
        datumDone.innerHTML = ("--");
        todoDone.innerHTML = "Inte färdig";
        todoDone.setAttribute("class", "notDone");
        todoContainer.append(card);
    }
    else {
        datumDone.innerHTML = new Date();
        todoDone.innerHTML = "Färdig";
        todoDone.setAttribute("class", "done");
        completedContainer.append(card);
    }

}


//Addeventlisteererer
//add new TODO
let addNewCard = document.getElementById("addTodoBtn");
let addCustomCard = document.getElementById("customBtn");

addNewCard.addEventListener("click", () => {
    fetch('https://dummyjson.com/todos/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            todo: 'Use DummyJSON in the project',
            completed: false,
            userId: 5,
        })
    })
        .then(res => res.json())
        .then(data => {
            addOneTodo(data);
            console.log(data);
        });

})
//// Open/Close Create Custom Card
addCustomCard.addEventListener("click", () => {
    document.getElementById("customModule").style.display = "grid";
})

let closeModule = document.getElementById("closeBtn");

closeModule.addEventListener("click", () => {
    document.getElementById("customModule").style.display = "none";
})

///Add custom card
let submit = document.getElementById("submit");
let addTitle = document.getElementById("title");
let addDescription = document.getElementById("description");

submit.addEventListener("click", () => {
    let data = {
        id: 999,
        todo: addDescription.value,
        completed: false,
        userId: addTitle.value
    }
    addOneTodo(data);
    document.getElementById("customModule").style.display = "none";
})



function moveTodo(id, completed, card, data) {
    if (id === 999) {
        let tempCard = data;
        card.remove();
        tempCard.completed = !tempCard.completed;
        addOneTodo(tempCard);
        console.log(tempCard);

    }
    else {
        card.remove();
        fetch(('https://dummyjson.com/todos/' + id), {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                completed: !completed,
            })
        })
            .then(res => res.json())
            .then(data => {
                addOneTodo(data);
                console.log(data);
            });
    }
}

function deleteTodo(id, card) {
    if (id === 999) {
        card.remove();
    }
    else {
        fetch(('https://dummyjson.com/todos/' + id), {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                card.remove();
            });
    }
}


//init
fetchAll();