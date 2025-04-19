import React, {useState,} from 'react'
// import Todobox from './Todobox'
import DOMPurify from 'dompurify';
import { Dispatch , Store , } from 'redux';






function TodoContainer() {
    
    interface TodoItemProps {
        id: string;
        onClick: () => void;
        name: boolean;
        isActive : boolean,
        createdByUser : string
    }

    const [content ,setContent] = useState<null|string>(null)

    const [activeTodoIndex, setActiveTodoIndex] = useState<number | null>(null);
    const todos  = [
    //  ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4', 'Todo 5', 'Todo 6', 'Todo 7', 'Todo 8'];
    {
        id: 1,
        name: 'Science' ,
        createdByUser : 'Tom'
    }]

  

        interface todotype{
            checkId : number,
            checkFlg : boolean,
            checkData : string

        }

    const checkTodos: todotype[] = [

        {
            checkId  :1,
            checkFlg : false,
            checkData : "Complete your installation"
        },
        
        {
            checkId  :2,
            checkFlg : false,
            checkData : "Complete your homework"
        }
    ]

    const [checkboxes, setCheckboxes] = useState<todotype[]>(checkTodos);

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) :void => {
        const sanitizedContent = DOMPurify.sanitize(e.currentTarget.innerHTML);
         setContent(sanitizedContent);
      };


    const addCheckBox = (event:any)=>{

        setTimeout(() => {
            console.log("After 1 second:", event.target.textContent); // Might throw error or log `null`
          }, 6000);
        };
 
       const handlerCheck = (e : React.ChangeEvent<HTMLInputElement> , type : string,selectedId:number) :void =>{
        setCheckboxes((prev)=>
            prev.map((data)=>{
                if  ((data.checkId == selectedId) && (type =='flag')){ 
                    
                          return  {...data , checkFlg  : !data.checkFlg} 
                }
                if   ((data.checkId == selectedId) && (type =='data')){ 
                    return  {...data , checkData  :e.currentTarget.value }
                    }
                return data
            })
        )
        }


    const handleTodoClick = (index: number) => {
        setActiveTodoIndex(activeTodoIndex === index ? null : index);
    };
  return (
<div className="flex-container">
            {/* {todos.map((todo, index) => (
                <Todobox 
                    key={index} 
                    todo={todo} 
                    onClick={() => handleTodoClick(index)} 
                    isActive={activeTodoIndex === index}
                />
            ))} */}

    <div className="container-row">

        <div className="todo-container" >
            <div className="todo-box">
                    <div className="box-delete"></div>
                    <div className="todo-title"></div>
            </div>
            <div className="todo-arrow "></div>
        </div>

    </div>

<div className="box-wrapper">

<div className='check-wrapper'>
{checkboxes.map((data)=>(
    <div className='check-box'>
        <input type='checkbox' 
            className='check' 
            checked ={data.checkFlg}
            onChange={(e)=>handlerCheck(e,'flag',data.checkId)}/>
    
    <input className='chk-desc' value={data.checkData} 
    onChange={(e)=>handlerCheck(e,'data',data.checkId)}/>
    </div>
))}

</div>
<div className='text-wrapper'>
    <textarea className='text-desc' spellCheck = 'false'>

    </textarea>
</div>
</div>



<button onClick={addCheckBox}>Add Checkpoint</button>
        </div>

    
  )
}

export default TodoContainer
