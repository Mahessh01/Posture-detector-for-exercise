let todos = [];

function addTodo(task) {
    todos.push(task);
    console.log(`Added: ${task}`);
}

function removeTodo(index) {
    if (index >= 0 && index < todos.length) {
        console.log(`Removed: ${todos[index]}`);
        todos.splice(index, 1);
    } else {
        console.log("Invalid index");
    }
}

function showTodos() {
    console.log("Todo List:");

    if (todos.length === 0) {
        console.log("No tasks available.");
        return;
    }

    todos.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}

addTodo("Learn JavaScript");
addTodo("Build a project");
showTodos();

removeTodo(0);
showTodos();