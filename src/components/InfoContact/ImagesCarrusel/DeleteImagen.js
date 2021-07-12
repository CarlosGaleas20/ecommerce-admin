/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { deleteImagenCarrusel } from 'api/infoContact';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function DeleteImagen({ open, setOpen, activeId, setReloadImages, setActiveId}) {

    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const deleteCategoryModal = async () => {
        setLoading(true);
        if (activeId) {
            try {
                const response = await deleteImagenCarrusel(activeId.id, logout);
                console.log(response);
                if (response.statusCode === 400) {
                    toast.error('Error al eliminar la imagen');
                } else {
                    toast.success('Imagen del Carrusel Eliminada');
                    setOpen(false);
                    setReloadImages(true);
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
                    Eliminar Imagen del carrusel: {activeId.titulo}
                </Header>
            }
            <Modal.Content>
                <p>
                    ¿Esta seguro que desea eliminar esta imagen del carrusel?
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

export default DeleteImagen;