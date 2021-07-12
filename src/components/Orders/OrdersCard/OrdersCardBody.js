/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Tab } from 'semantic-ui-react';
import OrderList from './OrderList';
import OrderListDispatch from './OrderListDispatch';
import OrderListSend from './OrderListSend';


const OrdersCardBody = ({orderList, orderListOk, orderListDispatch, setReloadOrder}) => {
    
    const panes = [
        {
            menuItem: 'Pedídos No Despachados',
            render: ()=>(
                <Tab.Pane>
                    <OrderList
                        orders={orderList}
                        setReloadOrder={setReloadOrder}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Pedídos Despachados',
            render: ()=>(
                <Tab.Pane>
                    <OrderListDispatch
                        orders={orderListDispatch}
                        setReloadOrder={setReloadOrder}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Pedídos Entregados',
            render: ()=>(
                <Tab.Pane>
                    <OrderListSend
                        orders={orderListOk}
                        setReloadOrder={setReloadOrder}
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

export default OrdersCardBody;