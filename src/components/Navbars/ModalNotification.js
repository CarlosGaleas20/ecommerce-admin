/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Button, Header, Modal, Grid } from 'semantic-ui-react';
import { map, size } from 'lodash';
import NotificationItem from './NotificationItem';

function ModalNotification({ open, setOpen, products }) {

    return (
        <>
            <Modal
                closeIcon
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>Notificaciones</Modal.Header>
                <Modal.Content image scrolling>
                    <Modal.Description>
                        {
                            size(products) > 0
                                ? (
                                    <>
                                    <Header>Productos por acabarse:</Header>
                                    <p>
                                        Lo siguientes productos estan por agotarse. Añada más productos para que sus clientes puedan comprarlos.
                                    </p>
                                        <Grid>
                                            <Grid.Row>
                                                {
                                                    map(products, (product) => (
                                                        <Grid.Column mobile={16} tablet={8} computer={5} >
                                                            <NotificationItem
                                                                product={product}
                                                                setOpen={setOpen}
                                                            />
                                                        </Grid.Column>
                                                    ))
                                                }
                                            </Grid.Row>
                                        </Grid>
                                    </>
                                )
                                : (
                                    <>
                                    <Header>No tienes notificaciones activas.</Header>
                                        <p>Esta todo bien. Por el momento!</p>
                                    </>
                                )
                        }
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Cerrar"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => setOpen(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </>
    )
}

export default ModalNotification;