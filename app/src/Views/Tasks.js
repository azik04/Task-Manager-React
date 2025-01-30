import React from 'react';
import DoneTask from '../Component/Task/DoneTask'; 
import NotDoneTask from '../Component/Task/NotDoneTask'; 

const Tasks = () => {
    return (
        <section className="content">
            <NotDoneTask />
            <DoneTask />

        </section>
    );
};

export default Tasks;
