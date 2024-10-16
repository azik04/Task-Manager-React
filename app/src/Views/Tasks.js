import React from 'react';
import DoneTask from '../Component/Task/DoneTask'; 
import NotDoneTask from '../Component/Task/NotDoneTask'; 

const Tasks = () => {
    return (
        <section >
            <NotDoneTask />
            <DoneTask />
        </section>
    );
};

export default Tasks;
