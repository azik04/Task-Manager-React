import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './Utils/PrivateRoutes'; 
import LayOut from './Views/LayOut';
import LogIn from './Views/LogIn';
import Theme from './Views/Theme';
import Tasks from './Views/Tasks';
import Task from './Views/Task';
import Admin from './Views/Admin';
const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route index element={<LogIn />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<LayOut />}>
                    <Route path="/Theme" element={<Theme />} />
                    <Route path="Theme/:themeId/Task" element={<Tasks />} />
                    <Route path="Theme/:themeId/Task/:id" element={<Task />} />
                    <Route path="Admin" element={<Admin />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
