import { useState, useEffect } from 'react'
import Task from './components/Task';
import type { TaskType } from './types'
import './App.css'

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const saved = localStorage.getItem('todo_tasks');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [inputValue, setInputValue] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('all'); 

  useEffect(() => {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTaskClick = () => {
    if (!inputValue.trim()) return;

    const newTask: TaskType = {
      id: Date.now().toString(),
      value: inputValue,
      isActive: true 
    }

    setTasks(prev => [...prev, newTask]);
    setInputValue('');
  }

  const handleToggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, isActive: !task.isActive } : task
      )
    );
  }

 
  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return task.isActive;
    if (filter === 'completed') return !task.isActive;
    return true; 
  });

  return (
    <div className="app-container">
      <header>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='Новая задача'
        />
        <button onClick={handleAddTaskClick}>
          Добавить
        </button>
      </header>

      <div className="filter-buttons">
        <button className={filter === 'all' ? 'active-filter' : ''} onClick={() => setFilter('all')}>Все</button>
        <button className={filter === 'active' ? 'active-filter' : ''} onClick={() => setFilter('active')}>Активные</button>
        <button className={filter === 'completed' ? 'active-filter' : ''} onClick={() => setFilter('completed')}>Выполненные</button>
      </div>

      <main className='tasks-list'>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </main>
    </div>
  )
}

export default App
