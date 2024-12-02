import React from 'react'
interface TodoItemProps {
    id: string;
    onClick: () => void;
    name: boolean;
    isActive : boolean,
    createdByUser : string
}
const  Todobox: TodoItemProps = ({payload}) {

   
    const {id ,memoname , name,onClick} =  payload
  return (
    <div>
        <div className="box">
            <button onClick={}></button>    
        </div>    
    </div>
  )
}

export default Todobox
