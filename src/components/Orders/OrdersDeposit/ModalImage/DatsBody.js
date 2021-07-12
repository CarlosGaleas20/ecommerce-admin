/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Tab } from 'semantic-ui-react';
import DatsPedido from './DatsPedido';
import ImagenBody from './ImagenBody';


const DatsBody = ({orders, order}) => {
    
    const panes = [
        {
            menuItem: 'Datos del pedido',
            render: ()=>(
                <Tab.Pane>
                    <DatsPedido
                        orders={orders}
                        order={order}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Vaucher del pedido',
            render: ()=>(
                <Tab.Pane>
                    <ImagenBody
                        order={order}
                    />
                </Tab.Pane>
            )
        },
    ];
    return (
        <div>
            <Tab className="__product_data-tab" panes={panes} />
        </div>
    )
}

export default DatsBody;