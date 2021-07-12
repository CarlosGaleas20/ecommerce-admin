/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from 'react';
import { Tab } from 'semantic-ui-react';
import ImagesItemA from './ImagenItemA';
import NewImageA from './NewImageA';

const ImagenBodyA = ({images, setOpenModal, activeImage, setActiveImage, setReload, setActiveImageId, activeImageId}) => {

    
    const panes = [
        {
            menuItem: 'Imagenes Existentes',
            render: ()=>(
                <Tab.Pane>
                    <ImagesItemA
                        images={images}
                        setOpenModal={setOpenModal}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                        setActiveImageId={setActiveImageId}
                        activeImageId={activeImageId}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Suba una nueva imagen',
            render: ()=>(
                <Tab.Pane>
                    <NewImageA
                        images={images}
                        setOpenModal={setOpenModal}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                        setReload={setReload}
                        setActiveImageId={setActiveImageId}
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

export default ImagenBodyA;