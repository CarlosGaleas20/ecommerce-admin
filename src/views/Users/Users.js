/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { size, forEach } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import useAuth from 'hooks/useAuth';
import UsersBody from 'components/Users/UsersBody';
import { getAllUsers } from 'api/user';

const Users = () => {

    const [users, setUsers] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [reloadOrder, setReloadOrder] = useState(false);
    const { logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getAllUsers(logout);
            if (size(response) > 0) {
                const userFound = [];
                const adminFound = [];
                forEach(response, (data) => {           
                    if (data.type === 'Admin') {
                        adminFound.push(data);
                    }
                    if(data.type === 'User'){
                        userFound.push(data);
                    }
                });
                setUsers(userFound);
                setAdmin(adminFound);
            } else {
                setUsers([]);
                setAdmin([]);
            }
            setReloadOrder(false);
        })()
    }, [reloadOrder])

    return (
        <>
            {
                (users && admin)
                    ? (
                        <UsersBody
                            users={users}
                            admin={admin}
                            setReloadOrder={setReloadOrder}
                        />
                    )
                    : (<CircularProgress />)
            }
        </>
    )
}

export default Users;