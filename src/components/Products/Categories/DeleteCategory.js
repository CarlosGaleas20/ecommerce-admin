/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { deleteCategory } from 'api/categories';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function DeleteCategory({ open, setOpen, activeId, setReloadCategories }) {

    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const deleteCategoryModal = async () => {
        setLoading(true);
        if (activeId) {
            try {
                const response = await deleteCategory(activeId.id, logout);
                if (response.statusCode === 400) {
                    toast.error('Error al eliminar la categoría');
                } else {
                    if (response === 'found') {
                        toast.warning('Elimine los productos asociados a esta categoria para eliminar');
                        toast.warning('No se puede eliminar la categoria');  
                    } else {
                        toast.success('Categorìa Eliminada');
                        setOpen(false);
                        setReloadCategories(true);
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
                    Eliminar Categoría: {activeId.title}
                </Header>
            }
            <Modal.Content>
                <p>
                    ¿Esta seguro que desea eliminar esta categoría?
                </p>
                <p>
                    Sí la categoría esta asociada a algun producto no se podrá ser eliminada.
                </p>
                <p>
                    Cambie las categorías de los productos asociadas a esta categoría para eliminarla.
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

export default DeleteCategory