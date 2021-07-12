/* eslint-disable prettier/prettier */
import useNav from 'hooks/useNav.js';
import { Loader } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import { forEach } from 'lodash';
import { toast } from 'react-toastify';

const NavBody = () => {

    const [count, setCount] = useState(0);
    const [productsActive, setProductsActive] = useState(null);
    const { products } = useNav();

    useEffect(() => {
        let listProducts = [];
        let suma = 0;
        forEach(products, (product) =>{
            if(product.amount < 6){
                listProducts.push(product)
                suma = suma + 1;
            }
        })
        setCount(suma);
        setProductsActive(listProducts);
    }, [products])

    useEffect(() => {
        if(count === 1 ){
            toast.warning(`Tiene ${count} notificación activa`);
        }
        if(count > 1 ){
            toast.warning(`Tiene ${count} notificaciones activas`);
        }
    }, [count])


    return (
        <>
        {
            productsActive
            ? (<AdminNavbarLinks
                products={productsActive}
                count={count}
            />)
            : (<Loader active>Cargando</Loader>)
        }
            
        </>
    )
}

export default NavBody;
