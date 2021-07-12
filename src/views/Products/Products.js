/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductsBody from 'components/Products/ProductsBody';
import { getProducts } from 'api/products';
import { getCategories } from 'api/categories';
import { getMarcas } from 'api/categories';

const Products = () => {

    const [products, setProducts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [marcas, setMarcas] = useState(null);
    const [reloadProducts, setReloadProducts] = useState(false);
    const [reloadCategories, setReloadCategories] = useState(false);
    const [reloadMarcas, setReloadMarcas] = useState(false);

    useEffect(() => {
        ( async() => {
          const response = await getProducts();
          if(size(response) > 0) setProducts(response);
          else(setProducts([]));
          setReloadProducts(false);
        })()
      }, [reloadProducts])

      useEffect(() => {
        ( async() => {
          const response = await getCategories();
          if(size(response) > 0) setCategories(response);
          else(setProducts([]));
          setReloadCategories(false);
        })()
      }, [reloadCategories])

      useEffect(() => {
        ( async() => {
          const response = await getMarcas();
          if(size(response) > 0) setMarcas(response);
          else(setProducts([]));
          setReloadMarcas(false);
        })()
      }, [reloadMarcas])

    return (
        <>
            {
                (products && categories && marcas)
                ? (
                    <ProductsBody
                    products={products}
                    categories={categories}
                    marcas={marcas}
                    setReloadProducts={setReloadProducts}
                    setReloadCategories={setReloadCategories}
                    setReloadMarcas={setReloadMarcas}
                    />
                )
                : (<CircularProgress />)
            }
        </>
    );
}

export default Products;