import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react';

export function TaskTable({ todos, onTogglePopUp }) {

    const [data, setData] = useState([])

    useEffect(() => {
        setData(todos)
    }, [todos])

    const columns = [
        {
            accessorKey: 'txt',
            header: "Task",
            cell: (props) => <p className="task">{props.getValue()}</p>,
        },
        {
            accessorKey: 'assignee',
            header: "Assignee",
            cell: (props) => <p>{props.getValue()}</p>,
        },
        {
            accessorKey: 'priority',
            header: "Priority",
            cell: (props) => {
                const priorityValue = props.getValue().toLowerCase(); // Get the priority value (low, medium, high)
                const priorityClass = `priority ${priorityValue}`; // Dynamically create class based on the value
                return (<p className={priorityClass}>{(props.getValue()) ? props.getValue() : ''}</p>)
            },
        },
        {
            id: 'edit',
            header: "Edit",
            cell: (props) => (
                <button>
                    <Link to={`/todo/edit/${props.row.original._id}`}>📝</Link>
                </button>
            ),
        },
        {
           
            accessorKey:'_id',
            header: "Delete",
            cell: (props) => (
                <button onClick={() => onTogglePopUp('delete',props.getValue())}>
                    ✖
                </button>
            ),
        },
    ]
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
        <div className="table">
            {table.getHeaderGroups().map(headerGroup => <div className="tr" key={headerGroup.id}>
                {headerGroup.headers.map(
                    header => <div className="th" key={header.id} >
                        {header.column.columnDef.header}
                    </div>
                )}
            </div>)}
            {table.getRowModel().rows.map(row => <div className="tr" key={row.id}>
                {row.getVisibleCells().map(cell => <div className="td" key={cell.id} >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>)}
            </div>)}
        </div>
    )
}