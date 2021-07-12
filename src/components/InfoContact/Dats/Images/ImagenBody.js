/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { Tab } from 'semantic-ui-react';
import ImagesItem from './ImagenItem';
import NewImage from './NewImage';

const ImagenBody = ({
    images,
    setOpenModal,
    activeImage,
    setActiveImage,
    setReload,
    datosEmpresaImages,
    setDatosEmpresaImages,
    nombre
}) => {

    const panes = [
        {
            menuItem: 'Imagenes Existentes',
            render: ()=>(
                <Tab.Pane>
                    <ImagesItem
                        images={images}
                        setOpenModal={setOpenModal}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Suba una nueva imagen',
            render: ()=>(
                <Tab.Pane>
                    <NewImage
                        images={images}
                        setOpenModal={setOpenModal}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                        setReload={setReload}
                        datosEmpresaImages={datosEmpresaImages}
                        setDatosEmpresaImages={setDatosEmpresaImages}
                        nombre={nombre}
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

export default ImagenBody;