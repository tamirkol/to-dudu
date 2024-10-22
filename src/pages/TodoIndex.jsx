import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { addTodo, loadTodos, removeTodo, setFilterBy, toggleTodo } from '../store/actions/todo.actions.js'

import { todoService } from '../services/todo.service.js'
import { TaskTable } from '../cmps/todo/TaskTable.jsx'
import { PopUp } from '../cmps/PopUp.jsx'
import { FilterSvg, SortSvg } from '../cmps/svg/ImgSvg.jsx'


export function TodoIndex() {

    const todos = useSelector(storeState => storeState.todoModule.todos)
    const filterBy = useSelector(storeState => storeState.todoModule.filterBy)
    const isLoading = useSelector(storeState => storeState.todoModule.isLoading)
    const [todoToAdd, setTodoToAdd] = useState(todoService.getEmptyTodo())
    const [sortBy, setSortBy] = useState({ type: '', desc: -1 })
    const [isPopUpVisible, setIsPopUpVisible] = useState(false)
    const [popUpType, setPopUpType] = useState('')
    const [selectedTodo, setSelectedTodo] = useState('')
    
    useEffect(() => {
        loadTodos(sortBy)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot load todos')
            })
    }, [filterBy, sortBy])

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    function onTogglePopUp(type,todoId) {
        setSelectedTodo(todoId)
        setPopUpType(type)
        setIsPopUpVisible(!isPopUpVisible);


    }


    function onRemoveTodo(todoId) {
         removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                console.log('Cannot remove todo', err)
                showErrorMsg('Cannot remove todo')
            })

    }

    function handleChange({ target }) {
        const value = target.value
        setTodoToAdd(prevTodo => ({ ...prevTodo, txt: value }))
    }

    function onAddTodo(ev) {
        ev.preventDefault()
        addTodo(todoToAdd)
            .then(() => {
                showSuccessMsg('Todo added')
                setTodoToAdd(todoService.getEmptyTodo())
            })
            .catch(err => {
                console.log('Cannot add todo', err)
                showErrorMsg('Cannot add todo')
            })
    }

    return (
        <section className='todo-index'>
            <div className="todo-functions-container">
                <form className='todo-functions' onSubmit={onAddTodo}>
                    <input
                        type="text"
                        placeholder="What needs to be done?"
                        onChange={handleChange}
                        value={todoToAdd.txt}
                    />
                    <button>Add</button>
                </form>
                <div className='todo-functions' onClick={() => { onTogglePopUp('filter') }}>
                    <div className="filter-svg">
                        <FilterSvg />
                    </div>
                    <div><p>Filter</p></div>
                </div>

                <div className='todo-functions' onClick={() => { onTogglePopUp('sort') }}>
                    <div><SortSvg /></div>
                    <div><p>Sort</p></div>
                </div>

            </div>
            {!isLoading && <TaskTable
                todos={todos}
                onTogglePopUp={onTogglePopUp}
            />}
            {isPopUpVisible &&
                <PopUp
                    type={popUpType}
                    onSetFilterBy={onSetFilterBy}
                    filterBy={filterBy}
                    onTogglePopUp={onTogglePopUp}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onRemoveTodo={onRemoveTodo}
                    selectedTodo={selectedTodo}
                />
            }

            {isLoading &&
                <div className='loader-container'>
                    <span className="loader"></span>
                </div>
            }

        </section>
    )
}