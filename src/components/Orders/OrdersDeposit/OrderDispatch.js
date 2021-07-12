/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { updateEstadoPedidoByDepositDispatch } from 'api/order';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function OrderDispatch({ open, setOpen, order, setReloadOrder, setActiveId }) {

    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);

    const updatePedido = async () => {
        setLoading(true);
        if (order) {
            try {
                const response = await updateEstadoPedidoByDepositDispatch(order.idPedido, logout);
                console.log(response);
                if (!response) {
                    toast.error('Error al cambiar de estado');
                } else {
                    toast.success('Pedido despachado');
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
                    <Icon name='send' />
                    Entregar pedido: {order.idPedido}
                </Header>
            }
            <Modal.Content>
                <p>
                    ¿Esta seguro que va a marcar como entregado este pedido?
                </p>
                <p>
                    Solo debe hacerlo si esta seguro que el pedido fue entregado
                </p>
                <p>
                    ¡Una vez realizada la acción no podra cambiar su estado de entrega!
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No. Cancelar.
                </Button>
                <Button color='green' inverted onClick={updatePedido} loading={loading}>
                    <Icon name='checkmark' /> Sí. Entregar.
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default OrderDispatch