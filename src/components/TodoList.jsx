import React, { useState } from "react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa"
const  TodoList = ({todos, onToggle, onDelete, onEdit}) => {
    const [editId, setEditId]= useState(null);
    const [editValue, setEditValue] = useState("");

    const taskSatus = todos.map(todo => todo.isComplete);

    const allComplete = taskSatus.every(status => status === true);
    const anyComplete = taskSatus.some(status => status === true);

    const notComplete = taskSatus.filter(status => status === false).length;
    const completed = taskSatus.filter(status => status === true).length;


    const handleEdit = (id,value) => {
        setEditId(id);
        setEditValue(value);
    }

    const handleSave = (id) => {
        if (editValue.trim()) {
            onEdit (id, editValue.trim());
            setEditId(null);
            setEditValue("");
        }
    }


    return (
    <>
       <ul>
        {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
            <label className="checkbox-container">
                <input type="checkbox" checked={todo.complete} onChange={() => onToggle(todo.id)}/>             

            { editId === todo.id ? (
                <input type="text" placeholder="Edit" value={editValue} onChange={(e) => setEditValue(e.target.value)} className="edit-input" autoFocus/>
            )  : (
                <>
                <span className={`checkmark ${todo.isComplete ? 'checked' : ''}`}>
                    <span className="check-icon color-white">&#10003;</span>
                </span>
                <span style={{
                textDecoration: todo.complete ? 'line-through' : 'none',
            }}>{todo.text}</span>
            </>)}
            </label>
            <div className="todo-actions">              
              { editId === todo.id ? (<button onClick={() => handleSave(todo.id)} className="save-button"><FaSave /></button>):
              (
              <>
                <button onClick={() => onDelete(todo.id)} className="delete-button"><FaTrash /></button>
                <button onClick={() => handleEdit(todo.id, todo.text)} className="edit-button"><FaEdit /></button>
               </>)}
            </div>
       </li>
        ))}
       </ul>

       <div className="todo-list">
        <div className="todo-stats">
            <h2 className="stats-title">📊 Task Summary</h2>
            <div className="stats-grid">
            <div className="stat-box completed">
                <p>Completed</p>
                <span>{completed}</span>
            </div>
            <div className="stat-box not-complete">
                <p>Not Completed</p>
                <span>{notComplete}</span>
            </div>
            </div>
         </div>
        </div>

    </>
    )
}


export default React.memo(TodoList)