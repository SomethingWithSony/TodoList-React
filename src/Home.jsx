import './App.css'
import TodoItem from './TodoItem'
import { useState, useEffect } from 'react'
import css from './css/todolist.module.css'

function Home() {

  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  
  useEffect(() => {
    fetch("http://localhost:3000/tasks")
    .then(response => response.json())
    .then(setTodos)
  }, []);

  const addTask = () => {
    fetch("http://localhost:3000/tasks",{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        title: newTask,
        completed: false
      })
    })
    .then(response => response.json())
    .then(task => setTodos([...todos, task]))
    .then(setNewTask(''))
  }

  const updateTaskStatus = (id, completed) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "PATCH",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({completed})
    })
    .then(response => response.json())
    .then( (updatedTask) => 
      setTodos( (todos) =>
        todos.map( (task) =>
          task.id === id ? {...task, completed: updatedTask.completed} : task
        ) 
      ));
  }

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`,{
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
    })
    .then( 
      setTodos( (todos) =>
        todos.filter( (task) =>
          task.id !== id 
        ) 
      ));
  }

  return (
    <>
    <div className={css.todoHeader}>
      <h2>Todo List</h2>
    </div>
    <div className={css.todoBody}>
      <div className={css.searchContainer}>
        <input className={css.search} type="text" placeholder='Insert task' value={newTask} onChange={e => setNewTask(e.target.value)} />
        <button className={css.btn} onClick={addTask} >Add Task</button> 
      </div>

      <ul>
        { todos.map( (task) => 
          <TodoItem key={task.id} todo={task} onUpdateTaskStatus={updateTaskStatus} onDeleteTask={deleteTask}/>
        )}
      </ul>
    </div>
    
     
    </>
  )
}

export default Home
