/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { actionAdmin } from 'api/user';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function DeleteAdmin({ open, setOpen, activeId, setReloadOrder }) {

    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const activarAdmin = async () => {
        const data = true;
        setLoading(true);
        if (activeId) {
            try {
                const response = await actionAdmin(activeId.id, data, logout);
                console.log(response);
                if (response.statusCode === 400) {
                    toast.error('Error al cambiar de estado');
                } else {
                    toast.success('Administrador activado');
                    setOpen(false);
                    setReloadOrder(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false);
    }

    const desactivarAdmin = async () => {
        const data = false;
        setLoading(true);
        if (activeId) {
            try {
                const response = await actionAdmin(activeId.id, data, logout);
                console.log(response);
                if (response.statusCode === 400) {
                    toast.error('Error al cambiar de estado');
                } else {
                    toast.success('Cliente desactivado');
                    setOpen(false);
                    setReloadOrder(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false);
    }

    return (
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
        >
            {
                activeId &&
                <Header icon>
                    <Icon name='user' />
                    {
                        activeId.active
                        ? `Desactivar cliente: ${activeId.name} ${activeId.lastname}`
                        : `Activar cliente: ${activeId.name} ${activeId.lastname}`
                    }
                </Header>
            }
            <Modal.Content>
                <p>
                {
                        activeId.active
                        ? `??Esta seguro que desea desactivar este cliente?`
                        : `??Esta seguro que desea activar este cliente?`
                    }
                </p>
                <p>
                {
                        activeId.active
                        ? `Si lo hace no podra ingresar a su cuenta en la aplicaci??n del cliente`
                        : `Si lo hace podra ingresar a su cuenta en la aplicaci??n del cliente`
                    }
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                </Button>
                <Button 
                    color='green' 
                    inverted 
                    onClick={
                        activeId.active
                        ? desactivarAdmin
                        : activarAdmin
                    } 
                    loading={loading}>
                    <Icon name='checkmark' /> S??
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteAdmin