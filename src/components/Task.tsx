import './Task.css'
import type { TaskType } from '../types'; 

interface TaskProps {
    task: TaskType;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

function Task({ task, onToggle, onDelete }: TaskProps) {
    return (
        <div className={`task-container ${!task.isActive ? 'completed' : ''}`}>
            <input 
                type="checkbox"  
                checked={!task.isActive} 
                onChange={() => onToggle(task.id)}
            />
            <input 
                type='text'
                value={task.value}
                readOnly
                className='input-value'
            />
            <button
                className='delete-task-btn'
                onClick={() => onDelete(task.id)}
                title="Удалить задачу"
            >
                <svg xmlns="http://w3.org" width="24" height="24" viewBox="0 0 24 24">
                    <title>bin-1</title>
                    <path fill="none" stroke="#212121" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M1 5h22m-8.75-4h-4.5a1.5 1.5 0 0 0-1.5 1.5V5h7.5V2.5a1.5 1.5 0 0 0-1.5-1.5m-4.5 16.75v-7.5m4.5 7.5v-7.5m4.61 11.37A1.49 1.49 0 0 1 17.37 23H6.63a1.49 1.49 0 0 1-1.49-1.38L3.75 5h16.5z"/>
                </svg>
            </button>
        </div>
    )
}

export default Task;
