/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Tab } from 'semantic-ui-react';
import OrderListDispatch from './OrderListDispatch';
import OrderList from './OrderList';
import OrderListCanceled from './OrderListCanceled';
import OrderListSend from './OrderListSend';
import OrderListValidate from './OrderListValidate';


const OrdersCardBody = ({orderList, orderValidate, orderListDispatch, orderListOk, orderListDelete, setReloadOrder}) => {
    
    const panes = [
        {
            menuItem: 'Pedídos No Valdados',
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
            menuItem: 'Pedídos Validados',
            render: ()=>(
                <Tab.Pane>
                    <OrderListValidate
                        orders={orderValidate}
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
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Pedídos Cancelados',
            render: ()=>(
                <Tab.Pane>
                    <OrderListCanceled
                        orders={orderListDelete}
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