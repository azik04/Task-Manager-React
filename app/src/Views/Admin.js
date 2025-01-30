import React from 'react';
import Admins from '../Component/Admin/Admins';
import Users from '../Component/Admin/Users';

const Admin = () => {
    return (
        <section className="content">
            <Admins />
            <Users />
        </section>
    );
};

export default Admin;
