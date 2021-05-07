import { useEffect, useState } from 'react';
import AddTask from './component/AddTask';
import Header from './component/Header';
import Tasks from './component/Tasks';

function App() {

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([])

  useEffect(() => {

    //Getting all the tasks
    const getTasks = async() => {
      const AllTasks = await fetchTasks();
      setTasks(AllTasks);
    }

    getTasks();
  }, []);

  //Fetching all tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();

    return(data);
  }

  //fetching a single task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return(data);
  }

  //Add Tasks Function
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000 + 1);
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask]);

    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task),
    })

    const data = await res.json();

    setTasks([...tasks, data]);
  }

  //Delete Tasks.
  const deleteTask = async (id) => {
    // console.log(id);
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    });

    setTasks(tasks.filter((task) => task.id !== id));
  }

  //Reminder Function
  const toggleReminder = async (id) => {
    // console.log(id);

    const toggleTask = await fetchTask(id);
    const updateTask = {...toggleTask, reminder: !toggleTask.reminder};

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers:{
        "Content-type": 'application/json'
      },
      body: JSON.stringify(updateTask)
    });

    const data = res.json()

    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: !data.reminder } : data
    )
    )
  };

  return (
    <div className='container'>
      <Header title='Task Tracker' toggleAdd={() => setOpen(!open)} />
      {open && <AddTask onAdd={addTask} />}
      {tasks.length > 0
        ?
        <Tasks tasks={tasks} deleteTask={deleteTask} onToggle={toggleReminder} />
        :
        'No Tasks To Show'}
    </div>
  );
}

export default App;
