import { useState,useEffect} from 'react';
import TaskList from './Components/TaskList.jsx';
import TaskForm from './Components/TaskForm.jsx';

function App() {
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try{
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      setTasks(data);
    }
    catch(err){
      console.error('Error fetching tasks: ',err);
    }
  };

  const addTask = async (task) => {
    try{
      const response = await fetch('http://localhost:5000/api/tasks', {
        method : 'POST',
        headers : {'Content-type' : 'application/json'},
        body : JSON.stringify(task)
      });
      const newTask = await response.json();
      setTasks([...tasks,newTask]);
    }
    catch(err){
      console.log('Error adding task: ', err);
    }
  };

  const deleteTask = async (id) => {
    try{
      await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method : 'DELETE'
      });
      setTasks(tasks.filter((task) => task._id !== id));
    }
    catch(err){
      console.error('Error deleting task: ', err);
    }
  };

  return(
    <div>
      <h1>Task Manager</h1>
      <TaskForm onAddTask={addTask}/>
      <TaskList tasks={tasks} onDeleteTask={deleteTask}/>
    </div>
  );
}

export default App;