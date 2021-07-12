/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Tab } from 'semantic-ui-react';
import CategoryList from './Categories/CategoryList';
import MarcaList from './Marcas/MarcaList';
import ProductsListBody from './ProductsListBody';

const ProductBody = ({products, categories, marcas, setReloadProducts, setReloadCategories, setReloadMarcas}) => {

    const panes = [
        {
            menuItem: 'Productos',
            render: ()=>(
                <Tab.Pane>
                    <ProductsListBody
                        products={products}
                        categories={categories}
                        setReloadProducts={setReloadProducts}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Categorias',
            render: ()=>(
                <Tab.Pane>
                    <CategoryList
                        categories={categories}
                        setReloadCategories={setReloadCategories}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Marcas',
            render: ()=>(
                <Tab.Pane>
                    <MarcaList
                        marcas={marcas}
                        setReloadMarcas={setReloadMarcas}
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

export default ProductBody;
