import { useState, useEffect } from 'react'

export function TodoSort({ sortBy, setSortBy,onTogglePopUp }) {

    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        setSortBy(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        if (field === 'desc') setSortByToEdit(prevSort => ({
            ...prevSort,
            desc: -(prevSort.desc)
        }))
        else setSortByToEdit((prevSort) => ({
            ...prevSort,
            [field]: value,
        }))
    }

    return (
        <div>
            <form className="todo-sort todo-functions">
                < select name="type" value={sortByToEdit.type} onChange={handleChange}>
                    <option value="default">Sort by</option>
                    <option value="assignee">Assignee</option>
                    <option value="priority">Priority</option>
                    <option value="createdAt">Date</option>
                </select >
                <label htmlFor="desc"> Descending</label>
                <input
                    id='desc'
                    type="checkbox"
                    name="desc"
                    checked={sortByToEdit.desc > 0}
                    onChange={handleChange}
                />
            </form >
        </div>
    )
}