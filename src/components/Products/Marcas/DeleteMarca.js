/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { deleteMarca } from 'api/marcas';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function DeleteMarca({ open, setOpen, activeId, setReloadMarcas }) {

    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const deleteCategoryModal = async () => {
        setLoading(true);
        if (activeId) {
            try {
                const response = await deleteMarca(activeId.id, logout);
                console.log(response);
                if (response.statusCode === 400) {
                    toast.error('Error al eliminar la marca');
                } else {
                    if(response === 'found') {
                        toast.warning('Debe exister al menos una marca en la tabla');
                        setOpen(false);
                    }else {
                        toast.success('Marca Eliminada');
                    setOpen(false);
                    setReloadMarcas(true);
                    } 
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
                    <Icon name='archive' />
                    Eliminar Marca: {activeId.nombre}
                </Header>
            }
            <Modal.Content>
                <p>
                    ¿Esta seguro que desea eliminar esta marca?
                </p>
                <p>
                    Debe dejar al menos una marca en la tabla.
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No
                </Button>
                <Button color='green' inverted onClick={deleteCategoryModal} loading={loading}>
                    <Icon name='checkmark' /> Sí
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default DeleteMarca;