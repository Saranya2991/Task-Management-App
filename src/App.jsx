import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./Pages/Home"
import Dashboard from "./Pages/Dashboard"
import CreateNew from "./Pages/CreateNew"
import EditPage from "./Pages/EditPage";

import { useState } from "react";

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      <Route path="home" element={<Home />}></Route>  
      <Route path="dashboard" element={<Dashboard />}></Route> 
      <Route path="createnew" element={<CreateNew />}></Route>  
      <Route path="editpage/:id" element={<EditPage />}></Route>  
      <Route path = "*" element = {<Navigate to ="/home" />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
