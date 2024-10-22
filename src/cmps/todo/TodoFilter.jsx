import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import Select from 'react-select'; // Importing react-select component

export function TodoFilter({ filterBy, onSetFilterBy, onTogglePopUp }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });
    const [assigneeOptions, setAssigneeOptions] = useState([]);
    const [priorityOptions, setPriorityOptions] = useState([]);

    const todos = useSelector(storeState => storeState.todoModule.todos);

    // Creating flat arrays for assignee and priority when todos change
    useEffect(() => {
        if (todos.length) {
            const uniqueAssignees = [...new Set(todos.map(todo => todo.assignee).filter(Boolean))];
            const uniquePriorities = [...new Set(todos.map(todo => todo.priority).filter(Boolean))];

            // Formatting for react-select (label, value)
            setAssigneeOptions(uniqueAssignees.map(assignee => ({ value: assignee, label: assignee })));
            setPriorityOptions(uniquePriorities.map(priority => ({ value: priority, label: priority })));
        }
    }, [todos]);

    // Update filterByToEdit on selection change
    function handleAssigneeChange(selectedOptions) {
        const assignees = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFilterByToEdit(prevFilter => ({ ...prevFilter, assignee: assignees }));
    }

    function handlePriorityChange(selectedOptions) {
        const priorities = selectedOptions ? selectedOptions.map(option => option.value) : [];
        setFilterByToEdit(prevFilter => ({ ...prevFilter, priority: priorities }));
    }

    function handleInputChange({ target }) {
        const { name, value } = target;
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: value }));
    }

    // Apply filters and pass the object with assignee, priority fields
    function applyFilters(ev) {
        ev.preventDefault();

        const filterObj = {
            assignee: filterByToEdit.assignee || [],
            priority: filterByToEdit.priority || [],
        };

        onSetFilterBy(filterObj); // Pass the filter object when the button is clicked
    }

    return (
        <section className="todo-filter">
            <form onSubmit={applyFilters}>
                <div className="filter-input-wrapper">
                    <div className="filter-input-wrapper">
                        <label htmlFor="assignee">Assignee</label>
                        <div className="search">
                            <Select
                                id="assignee"
                                isMulti
                                name="assignee"
                                options={assigneeOptions}
                                value={assigneeOptions.filter(option => filterByToEdit.assignee?.includes(option.value))}
                                onChange={handleAssigneeChange}
                                placeholder="Select Assignees"
                            />
                        </div>
                    </div>
                </div>

                <div className="filter-input-wrapper">
                    <label htmlFor="priority">Priority</label>
                    <Select
                        id="priority"
                        isMulti
                        name="priority"
                        options={priorityOptions}
                        value={priorityOptions.filter(option => filterByToEdit.priority?.includes(option.value))}
                        onChange={handlePriorityChange}
                        placeholder="Select Priorities"
                    />
                </div>

                <button type="submit" className="apply-filter-btn">Apply Filters</button>
            </form>
        </section>
    );
}
