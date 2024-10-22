import { todoService } from "../services/todo.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function TodoEdit() {

    const [todoToEdit, setTodoToEdit] = useState(todoService.getEmptyTodo())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [params.todoId])

    function loadTodo() {
        todoService.getById(params.todoId)
            .then(setTodoToEdit)
            .catch(err => {
                console.log('Had issued in todo edit:', err);
                navigate('/todo')
                showErrorMsg('Todo not found!')
            })
    }

    function handleChange({ target }) {
        const { name, value } = target
        setTodoToEdit(prevTodo => ({ ...prevTodo, [name]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        todoService.save(todoToEdit)
            .then(() => navigate('/todo'))
            .catch(err => {
                showErrorMsg('Cannot save todo', err)
            })
    }

    const { txt, priority, assignee } = todoToEdit

    return (
        <section className="todo-edit">
            <div className="todo-edit-container">             
                <h2>Edit Todo</h2> 

                <form onSubmit={onSaveTodo}>
                    <label htmlFor="task">Task</label>
                    <input
                        id="task"
                        name="txt"
                        type="text"
                        value={txt}
                        onChange={handleChange}
                    />
                    <label htmlFor="priority">Priority</label>
                    <select
                        id="priority"
                        name="priority"
                        value={priority}
                        onChange={handleChange}
                    >
                        <option value="">Select</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <label htmlFor="assignee">Assignee</label>
                    <input
                        id="assignee"
                        type="text"
                        name="assignee"
                        value={assignee}
                        onChange={handleChange}
                        placeholder="Assignee"
                    />

                    <button>Update</button>
                </form>
            </div>
        </section>
    )
}