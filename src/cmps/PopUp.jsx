import { useState, useEffect } from "react"
import { TodoFilter } from "./todo/TodoFilter"
import { TodoSort } from "./todo/TodoSort"

export function PopUp({ type, onSetFilterBy, filterBy, onTogglePopUp, sortBy, setSortBy,onRemoveTodo,selectedTodo}) {
    const [currentType, setCurrentType] = useState('')
    useEffect(() => {
        setCurrentType(type)
    }, [type])

    function handleConfirm(){
       onRemoveTodo(selectedTodo)
       onTogglePopUp()
    }

   


    return (
        <div className="pop-up">
                <div className="close-popup" onClick={onTogglePopUp}>X</div>
                <h1>{currentType}</h1>
           
                {currentType === 'filter' && <TodoFilter
                    onSetFilterBy={onSetFilterBy}
                    filterBy={filterBy}
                    
                />}
                {currentType === 'sort' && <TodoSort
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                    onTogglePopUp={onTogglePopUp}
                />}
          
            {type === 'delete' && (
                <div className="delete-wrapper">
                    <h4>Are you sure you want to delete this task?</h4>
                    <div className="delete-buttons-container">
                    <button className="yes" onClick={handleConfirm}>Yes</button>
                    <button className="no" onClick={onTogglePopUp}>No</button>
                    </div>
                </div>
            )}
        </div>
    )
}
