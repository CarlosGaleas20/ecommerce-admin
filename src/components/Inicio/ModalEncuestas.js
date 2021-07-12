/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Button, Header, Modal, Tab } from 'semantic-ui-react';
import { forEach } from 'lodash';
import EncuestaList from './EncuestaList';

function ModalEncuesta({ open, setOpen, encuestas, encuestasCard }) {

    const [encuestasType, setEncuestasType] = useState({
        muyBueno: [],
        Bueno: [],
        Regular: [],
        Malo: [],
        muyMalo: [],
    });

    useEffect(() => {
        let muyBueno = [];
        let Bueno = [];
        let Regular = [];
        let Malo = [];
        let muyMalo = [];
        forEach(encuestas, (encuesta) => {
            if (encuesta.titulo === 'Muy bueno') {
                muyBueno.push(encuesta);
            }
            if (encuesta.titulo === 'Bueno') {
                Bueno.push(encuesta);
            }
            if (encuesta.titulo === 'Regular') {
                Regular.push(encuesta);
            }
            if (encuesta.titulo === 'Malo') {
                Malo.push(encuesta);
            }
            if (encuesta.titulo === 'Muy malo') {
                muyMalo.push(encuesta);
            }
        })
        forEach(encuestasCard, (encuesta) => {
            if (encuesta.titulo === 'Muy bueno') {
                muyBueno.push(encuesta);
            }
            if (encuesta.titulo === 'Bueno') {
                Bueno.push(encuesta);
            }
            if (encuesta.titulo === 'Regular') {
                Regular.push(encuesta);
            }
            if (encuesta.titulo === 'Malo') {
                Malo.push(encuesta);
            }
            if (encuesta.titulo === 'Muy malo') {
                muyMalo.push(encuesta);
            }
        })

        setEncuestasType({
            muyBueno,
            Bueno,
            Regular,
            Malo,
            muyMalo
        })
    }, [encuestas, encuestasCard])

    const handleClose = () => {
        setOpen(false);
    }

    const panes = [
        {
            menuItem: 'Muy Bueno',
            render: () => (
                <Tab.Pane>
                    <EncuestaList
                        encuestas={encuestasType.muyBueno}
                        title='Muy Bueno'
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Bueno',
            render: () => (
                <Tab.Pane>
                    <EncuestaList
                        encuestas={encuestasType.Bueno}
                        title='Bueno'
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Regular',
            render: () => (
                <Tab.Pane>
                    <EncuestaList
                        encuestas={encuestasType.Regular}
                        title='Regular'
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Malo',
            render: () => (
                <Tab.Pane>
                    <EncuestaList
                        encuestas={encuestasType.Malo}
                        title='Malo'
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Muy Malo',
            render: () => (
                <Tab.Pane>
                    <EncuestaList
                        encuestas={encuestasType.muyMalo}
                        title='Muy Malo'
                    />
                </Tab.Pane>
            )
        },
    ];

    return (
        <>
            <Modal
                closeIcon
                onClose={handleClose}
                onOpen={() => setOpen(true)}
                open={open}
            >
                <Modal.Header>Encuestas de satisfacción</Modal.Header>
                <Modal.Content image>
                    <Modal.Description>
                        <Header>A continuacion se muestran los detalles de las encuestas</Header>
                        <div>
                            <Tab className="__product_data-tab" panes={panes} />
                        </div>
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

export default ModalEncuesta;