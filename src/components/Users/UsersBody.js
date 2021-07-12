/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Tab } from 'semantic-ui-react';
import AdminList from './Admin/AdminList';
import ClientList from './Client/ClienteList';

const UsersBody = ({admin, users, setReloadOrder}) => {

    const panes = [
        {
            menuItem: 'Administradores',
            render: ()=>(
                <Tab.Pane>
                    <AdminList
                        admin={admin}
                        setReloadOrder={setReloadOrder}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Clientes',
            render: ()=>(
                <Tab.Pane>
                    <ClientList
                        users={users}
                        setReloadOrder={setReloadOrder}
                    />
                </Tab.Pane>
            )
        },
    ];
    return (
        <div>
            <Tab className="__product_data-tab" panes={panes} />
        </div>
    )
}

export default UsersBody;
