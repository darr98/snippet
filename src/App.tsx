// import React, { useState } from 'react';
// import './TodoContainer.css'; // Assume you create a CSS file for styles
// import TodoContainer from './TodoContainer';
// import Todobox from './Todobox';
// // Define the props type for TodoItem


// // const TodoItem: React.FC<TodoItemProps> = ({ todo, onClick, isActive }) => {
// //     return (
// //         <div className="todo-item">
// //             <div onClick={onClick} className="todo-text">
// //                 {todo}
// //             </div>
// //             {isActive && (
// //                 <button className="action-button">Action</button>
// //             )}
// //         </div>
// //     );
// // };

// const App: React.FC = () => {
//     return (
//       // <TodoContainer></TodoContainer>
//       // <TodoContainer></TodoContainer>
//       <Todobox></Todobox>
//     );
// };

// export default App;



import React, { useState, useEffect } from 'react';
// import './test.css';
import { motion } from "framer-motion";
import * as Checkbox from "@radix-ui/react-checkbox";
import "./Memo.css";
import Register from './Register';
import Login from './Login';
import Layout from './Layout';
import Dashboard from './Dashboard';
import User from './User';
import RequireAuth from './RequireAuth';
import { Routes, Route } from 'react-router-dom';
interface AppProps {}


const App: React.FC<AppProps> = () => {
  return (
    /*Testing*/
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path='register' element ={<Register/>}/>
      <Route path='login' element ={<Login/>}/>

      <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="user" element={<User />} />
        </Route>
      </Route>
    </Routes>
   
  )


}
 export default App