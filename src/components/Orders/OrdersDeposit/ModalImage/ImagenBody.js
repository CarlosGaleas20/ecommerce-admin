/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Header, Image, Grid } from 'semantic-ui-react';

const DatsPedido = ({order}) => {

    return (
        <>
            <Header>Vacher del Pedido </Header>
            <Grid>
                <Grid.Row>
                    <Grid.Column mobile={16} tablet={16} computer={16}>
                        <div className="container-user"
                        style={{
                            justifyContent: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        >
                            <h3>El vaucher de pedido colocado por el usuario es: </h3>
                            <div style={{margin: '0 auto'}}>
                            <Image
                                
                                src={order.vaucher.url}
                                alt='vaucher'
                            />
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    )
}

export default DatsPedido;