import React from "react";
import css from './css/todolist.module.css'
import trash from './assets/trash.svg'

export default function TodoItem({todo, onUpdateTaskStatus, onDeleteTask}){
  return ( 
  <> 
    <li className={css.todoItem}>
      <div>
        <input type="checkbox" className={css.checkBox} checked={todo.completed}  onChange={ () => onUpdateTaskStatus(todo.id, !todo.completed)} />
        <p className={todo.completed ? css.textChecked : ''}> {todo.title}    </p>
      </div>

      <a onClick={() => onDeleteTask(todo.id)}><img src={trash} alt="trash can" />  </a>
    </li>
    </>
    );
}