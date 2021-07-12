/* eslint-disable prettier/prettier */
import useAuth from 'hooks/useAuth';
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import UserProfile from './UserProfile';

const Account = () => {


    const { user, logout, setReloaderUser } = useAuth();

    return (
        <>
            {
                (user)
                ? (
                    <UserProfile
                        user={user}
                        logout={logout}
                        setReloaderUser={setReloaderUser}
                    />
                )
                : (<CircularProgress />)
            }
        </>
    );
}

export default Account;
