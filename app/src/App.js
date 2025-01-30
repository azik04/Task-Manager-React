import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './Utils/PrivateRoutes'; 
import LayOut from './Views/LayOut';
import Theme from './Views/Theme';
import Tasks from './Views/Tasks';
import Task from './Views/Task';
import Admin from './Views/Admin';
import Auth from './Views/Auth';
import Settings from './Views/Settings';
const App = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/Auth" element={<Auth />} />
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<LayOut />}>
                    <Route index element={<Theme />} />
                    <Route path="Theme/:themeId/Task" element={<Tasks />} />
                    <Route path="Theme/:themeId/Task/:id" element={<Task />} />
                    <Route path="Admin" element={<Admin />} />
                    <Route path="Settings" element={<Settings />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
    );
}

export default App;
