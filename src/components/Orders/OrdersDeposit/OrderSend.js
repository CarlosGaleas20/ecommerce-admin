/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import { sendEmailDispatchByDeposit } from 'api/email';
import { updateEstadoPedidoByDeposit } from 'api/order';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Modal, Dropdown } from 'semantic-ui-react';

function OrderSend({ open, setOpen, order, setReloadOrder, setActiveId }) {

    const { logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({time: '15'})

    const updatePedido = async () => {
        setLoading(true);
        if (order) {
            try {
                const response = await updateEstadoPedidoByDeposit(order.idPedido, logout);
                console.log(response);
                if (!response) {
                    toast.error('Error al cambiar de estado');
                } else {
                    const prueba = await sendEmailDispatchByDeposit(order.idPedido, data, logout);
                    console.log(prueba);
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

    const time = [
        {
            key: '1',
            text: '15 minutos',
            value: '15',
        },
        {
            key: '2',
            text: '30 minutos',
            value: '30',
        },
        {
            key: '3',
            text: '45 minutos',
            value: '45',
        },
        {
            key: '4',
            text: '1 hora',
            value: '60',
        },
    ]

    const handleChange = (e, { value }) => {
        setData({
            time: value,
        });
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
                    Despachar pedido: {order.idPedido}
                </Header>
            }
            <Modal.Content>
                <p>
                    ¿Esta seguro que va a despachar este pedido?
                </p>
                <p>
                    ¡Una vez despachado no podra cambiar su estado de entrega!
                </p>
                <p>
                    Seleccione el tiempo de entrega esperado:
                </p>
                <Dropdown
                    placeholder='Selecciona el tiempo'
                    fluid
                    selection
                    options={time}
                    onChange={handleChange}
                    value={data.time}
                />
            </Modal.Content>
            <Modal.Actions>
                <Button basic color='red' inverted onClick={() => setOpen(false)}>
                    <Icon name='remove' /> No. Cancelar.
                </Button>
                <Button color='green' inverted onClick={updatePedido} loading={loading}>
                    <Icon name='checkmark' /> Sí. Despachar.
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default OrderSend