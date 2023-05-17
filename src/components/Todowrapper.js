import React, {useState, useEffect} from 'react'
import {TodoForm} from './TodoForm'
import { v4 as uuidv4 } from 'uuid'
import { Todo } from './Todo'
import { EditTodoForm } from './EditTodoForm'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'




uuidv4()

export const Todowrapper = () => {
    const [todos, setTodos] = useState([])

    const addTodo = todo => {
        setTodos([...todos, {id: uuidv4(), task: todo,
            completed: false, isEditing: false}])

        console.log(todos)
    }
  
    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? 
            {...todo, completed: !todo.completed} : todo))
    }

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ? 
            {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ?
             {...todo, task, isEditing: !todo.isEditing} : todo))
    }

    useEffect( ()=>{
        async function fetchData() {
        const querySnapshot = await getDocs(collection(db, "todos"));
        let todosArr = [];
        querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        todosArr.push(doc.data());
        console.log(doc.id, " => ", doc.data());
        });
        
        setTodos(todosArr)

        }
        fetchData();
    })

 return (
    <div className='TodoWrapper'>
        <h1>Get Things Done!</h1>
        <TodoForm addTodo={addTodo} />
        {todos.map((todo, index) => (
            todo.isEditing ? (
                <EditTodoForm editTodo={editTask} task={todo}/>
            ) : (
                <Todo task={todo} key={index}
                toggleComplete={toggleComplete}
                deleteTodo= {deleteTodo} 
                editTodo={editTodo}/>
            )
          
         ))}
    </div>
  )
}
