
let todoContainer = document.getElementById("todo");
let completedContainer = document.getElementById("completed");
let addNewCard = document.getElementById("addTodoBtn");
let addCustomCard = document.getElementById("customBtn");
let closeModule = document.getElementById("closeBtn");
let submit = document.getElementById("submit");
let addTitle = document.getElementById("title");
let addDescription = document.getElementById("description");

//init
fetchAll();

//Fetchar alla todos från API
function fetchAll() {
    fetch('https://dummyjson.com/todos')
        .then(res => {
            return res.json();
        })
        .then(data => {
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
        let para = document.createElement("div");
        para.innerHTML = data.todo;
        para.style.fontSize = "x-large";


        let todoDone = document.createElement("button");
        todoDone.addEventListener("click", () => { moveTodo(data.id, data.completed, card) });
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "DELETE";
        deleteBtn.addEventListener("click", () => { deleteTodo(data.id, card) });


        card.append(titel, para, todoDone, deleteBtn);

        if (data.completed === false) {
            let datum = document.createElement("div");
            datum.innerHTML = ("This card was created: " + new Date());
            todoDone.innerHTML = "Move to Done";
            todoDone.setAttribute("class", "notDone");
            card.append(datum);
            todoContainer.append(card);
        }
        else {
            let datumDone = document.createElement("div");
            datumDone.innerHTML = ("This card was completed: " + new Date());
            todoDone.innerHTML = "Move to Todo";
            todoDone.setAttribute("class", "done");
            card.append(datumDone);
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
    para.style.fontSize = "x-large";


    let todoDone = document.createElement("button");
    todoDone.addEventListener("click", () => { moveTodo(data.id, data.completed, card, data) });
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "DELETE";
    deleteBtn.addEventListener("click", () => { deleteTodo(data.id, card) });

    card.append(titel, para, todoDone, deleteBtn);

    if (data.completed === false) {
        let datum = document.createElement("div");
        datum.innerHTML = ("This card was created: " + new Date());
        todoDone.innerHTML = "Move to Done";
        todoDone.setAttribute("class", "notDone");
        card.append(datum);
        todoContainer.append(card);
    }
    else {
        let datumDone = document.createElement("div");
        datumDone.innerHTML = ("This card was completed: " + new Date());
        todoDone.innerHTML = "Move to Todo";
        todoDone.setAttribute("class", "done");
        card.append(datumDone);
        completedContainer.append(card);
    }

}


//Addeventlisteererer
//add new TODO
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
        });

})

//// Open/Close Create Custom Card
addCustomCard.addEventListener("click", () => {
    document.getElementById("customModule").style.display = "grid";
})



closeModule.addEventListener("click", () => {
    document.getElementById("customModule").style.display = "none";
})


///Add custom card
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


// Move card from Done <--> Todo
function moveTodo(id, completed, card, data) {
    if (id === 999 || id === 151) {
        let tempCard = data;
        card.remove();
        tempCard.completed = !tempCard.completed;
        addOneTodo(tempCard);

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
