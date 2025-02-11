document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        const todos = getTodos();
        todos.push(todo);
        saveTodos(todos);
        renderTodos();
        input.value = '';
    }
}

function getTodos() {
    return JSON.parse(localStorage.getItem('todos') || '[]');
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    renderTodos();
}

function renderTodos() {
    const todoList = document.getElementById('todoList');
    const todos = getTodos();
    
    todoList.innerHTML = todos.map(todo => `
        <li>
            <input type="checkbox" 
                   ${todo.completed ? 'checked' : ''}
                   onchange="toggleTodo(${todo.id})">
            <span style="${todo.completed ? 'text-decoration: line-through' : ''}">
                ${todo.text}
            </span>
            <button onclick="deleteTodo(${todo.id})">削除</button>
        </li>
    `).join('');
}

function toggleTodo(id) {
    const todos = getTodos();
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos(todos);
        renderTodos();
    }
}

function deleteTodo(id) {
    const todos = getTodos();
    const filtered = todos.filter(t => t.id !== id);
    saveTodos(filtered);
    renderTodos();
}