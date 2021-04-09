// import React from 'react'   needed for class based component
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  const [toggleAddTask, setToggleAddTask] = useState (false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, []) 

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', 
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])

    // const randid = Math.floor(Math.random) * 5000 + 1
    // const newTask = { randid, ...task }
    // setTasks([ ...tasks, newTask ])
  }

  //Delete Task when clicking X
  const deleteTask = async (id) => {
    await fetch(`/tasks/${id}`, {method: 'DELETE'})
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <Router>
    <div className="container">
      <Header onAdd={() => setToggleAddTask(!toggleAddTask)} toggleAdd={toggleAddTask}/>
      <Route path='/' exact render={(props) => (
        <>
        {toggleAddTask && <AddTask onAdd={addTask}/>}
        {(tasks.length) > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/> : 'No Tasks to Show'}
        </>
      )}/>
      <Route path='/about' component={About} />
      <Footer />
    </div>
    </Router>
  );
}

// Class based component
// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }

export default App;
