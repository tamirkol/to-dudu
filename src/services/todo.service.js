import { storageService } from './async-storage.service.js'

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getDefaultFilter,
    getDefaultSort
}

const STORAGE_KEY = 'todoDB'

function query(filterBy = {}, sortBy) {
    return storageService.query(STORAGE_KEY)
        .then(todos => {
            const todosData = {
                todosToDisplay: []
            }
            
            // Filter by assignee (multiple values handling)
            if (filterBy.assignee && filterBy.assignee.length) {
                todos = todos.filter(todo =>
                    filterBy.assignee.some(assignee => {
                        const regExp = new RegExp(assignee, 'i');
                        return regExp.test(todo.assignee);
                    })
                );
            }
            
            // Filter by priority (multiple values handling)
            if (filterBy.priority && filterBy.priority.length) {
                todos = todos.filter(todo =>
                    filterBy.priority.some(priority => {
                        const regExp = new RegExp(priority, 'i');
                        return regExp.test(todo.priority);
                    })
                );
            }

            // Sort the todos based on the sortBy parameter
            todos = getSortedTodos(todos, sortBy);

            // Assign filtered and sorted todos to display
            todosData.todosToDisplay = todos;
            return todosData;
        });
}

function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}

function remove(todoId) {
    return storageService.remove(STORAGE_KEY, todoId)
}

function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getSortedTodos(todosToDisplay, sortBy) {
    if (sortBy.type !== 'createdAt' ) {
        todosToDisplay.sort((b1, b2) => {
            const title1 = b1.txt.toLowerCase()
            const title2 = b2.txt.toLowerCase()
            return sortBy.desc * title2.localeCompare(title1)
        })
    } else {
        todosToDisplay.sort(
            (b1, b2) => sortBy.desc * (b2[sortBy.type] - b1[sortBy.type])
        )
    }
    return todosToDisplay
}

function getDefaultFilter() {
    return { assignee: '', priority:'' }
}

function getDefaultSort() {
    return { type: '', desc: -1 }
}

function getEmptyTodo() {
    return {
        _id: '',
        txt: '',
        assignee:'',
        priority:'',
        createdAt: Date.now()
    }
}