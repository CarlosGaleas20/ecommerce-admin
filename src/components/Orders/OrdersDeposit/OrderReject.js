/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { deletePedidoByDeposit } from 'api/order';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function OrderReject({ open, setOpen, order, setReloadOrder, setActiveId }) {

    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const updatePedido = async () => {
        setLoading(true);
        if (order) {
            try {
                const response = await deletePedidoByDeposit(order.idPedido, logout);
                console.log(response);
                if (!response) {
                    toast.error('Error al cambiar de estado');
                } else {
                    toast.success('Pedido Cancelado.');
                    setOpen(false);
                    setReloadOrder(true);
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
            centered={true}
        >
            {
                order &&
                <Header icon>
                    <Icon name='trash alternate' />
                    Cancelar pedido: {order.idPedido}
                </Header>
            }
            <Modal.Content>
                <p>
                    ¿Esta seguro que va a cancelar este pedido?
                </p>
                <p>
                    ¡Una vez cancelado no podra cambiar su estado de entrega!
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No. Cancelar.
                </Button>
                <Button color='green' inverted onClick={updatePedido} loading={loading}>
                    <Icon name='checkmark' /> Sí. Dar de Baja.
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default OrderReject