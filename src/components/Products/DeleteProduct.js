/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { actionProduct } from 'api/products';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function DeleteProduct({ open, setOpen, activeId, setReloadProducts }) {

    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const activarAdmin = async () => {
        const data = true;
        setLoading(true);
        if (activeId) {
            try {
                const response = await actionProduct(activeId.id, data, logout);
                console.log(response);
                if (response.statusCode === 400) {
                    toast.error('Error al cambiar de estado');
                } else {
                    toast.success('Producto activado');
                    setOpen(false);
                    setReloadProducts(true);
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
                const response = await actionProduct(activeId.id, data, logout);
                console.log(response);
                if (response.statusCode === 400) {
                    toast.error('Error al cambiar de estado');
                } else {
                    toast.success('Producto desactivado');
                    setOpen(false);
                    setReloadProducts(true);
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
                    <Icon name={
                        activeId.estado === 'Activo'
                        ? 'power off'
                        : 'check'
                    } />
                    {
                        activeId.estado === 'Activo'
                        ? `Desactivar producto: ${activeId.title}`
                        : `Activar producto: ${activeId.title}`
                    }
                </Header>
            }
            <Modal.Content>
                <p>
                {
                        activeId.estado === 'Activo'
                        ? `¿Esta seguro que desea desactivar este producto?`
                        : `¿Esta seguro que desea activar este producto?`
                    }
                </p>
                <p>
                {
                        activeId.estado === 'Activo'
                        ? `Si lo hace el cliente no podra encontrarlo en la aplicación del cliente`
                        : `Si lo hace el cliente podra encontrarlo en la aplicación del cliente`
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
                        activeId.estado === 'Activo'
                        ? desactivarAdmin
                        : activarAdmin
                    } 
                    loading={loading}>
                    <Icon name='checkmark' /> Sí
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteProduct