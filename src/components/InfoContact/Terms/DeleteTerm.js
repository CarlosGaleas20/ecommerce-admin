/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { deleteTerm } from 'api/infoContact';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function DeleteTerm({ open, setOpen, activeId, setReloadTerms, setActiveId}) {

    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const deleteCategoryModal = async () => {
        setLoading(true);
        if (activeId) {
            try {
                const response = await deleteTerm(activeId.id, logout);
                console.log(response);
                if (response.statusCode === 400) {
                    toast.error('Error al eliminar el termino');
                } else {
                    toast.success('Término o Condición Eliminado');
                    setOpen(false);
                    setReloadTerms(true);
                    setActiveId(null);
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
                    Eliminar Término o Concición: {activeId.titulo}
                </Header>
            }
            <Modal.Content>
                <p>
                    ¿Esta seguro que desea eliminar esta término o condición?
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

export default DeleteTerm