import { useEffect, useRef, useState } from "react";

export function TodoForm({addTodo}) {
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        // const todoText = inputValue.trim();
        if (inputValue.trim()) {
            addTodo(inputValue.trim());
            setInputValue("");
        }
    }

    return (
        <form  onSubmit={handleSubmit} className="todo-form">
            <input ref={inputRef} value={inputValue} type="text" placeholder="Add your text" onChange={(e) => setInputValue(e.target.value)}/>
            <button type="submit">Add</button>
        </form>
    )
}