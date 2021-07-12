/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { Tab, Loader } from 'semantic-ui-react';
import ProductList from './ProductList';
import { forEach } from 'lodash';

const ProductsListBody = ({products, categories, setReloadProducts}) => {

    const [productsActive, setProductsActive] = useState(null);
    const [productsDisabled, setProductsDisabled] = useState(null);

    useEffect(() => {
        let products1 = []
        let products2 = []
        forEach(products, (product) => {
            if(product.estado === 'Activo') {
                products1.push(product);
            } else {
                products2.push(product)
            }
        })
        setProductsActive(products1);
        setProductsDisabled(products2);
    }, [products])
    const panes = [
        {
            menuItem: 'Productos Activos',
            render: ()=>(
                <Tab.Pane>
                    {
                        productsActive 
                        ? <ProductList
                            products={productsActive}
                            categories={categories}
                            setReloadProducts={setReloadProducts}
                            title='Activos'
                        />
                        : <Loader active>Cargando</Loader>
                    }
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Productos Inactivos',
            render: ()=>(
                <Tab.Pane>
                    {
                        productsDisabled 
                        ? <ProductList
                            products={productsDisabled}
                            categories={categories}
                            setReloadProducts={setReloadProducts}
                            title='Inactivos'
                        />
                        : <Loader active>Cargando</Loader>
                    }
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

export default ProductsListBody;
