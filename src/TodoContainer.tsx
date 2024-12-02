import {useState} from 'react'
import Todobox from './Todobox'


function TodoContainer() {
    
    interface TodoItemProps {
        id: string;
        onClick: () => void;
        name: boolean;
        isActive : boolean,
        createdByUser : string
    }

    const [activeTodoIndex, setActiveTodoIndex] = useState<number | null>(null);
    const todos:  = [
    //  ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4', 'Todo 5', 'Todo 6', 'Todo 7', 'Todo 8'];
    {
        id: 1,
        name: 'Science' ,
        createdByUser : 'Tom'
    }]


    const handleTodoClick = (index: number) => {
        setActiveTodoIndex(activeTodoIndex === index ? null : index);
    };
  return (
    <div className="todo-container">
            {todos.map((todo, index) => (
                <Todobox 
                    key={index} 
                    todo={todo} 
                    onClick={() => handleTodoClick(index)} 
                    isActive={activeTodoIndex === index}
                />
            ))}
        </div>
  )
}

export default TodoContainer
