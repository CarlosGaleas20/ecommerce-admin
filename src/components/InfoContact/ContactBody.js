/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
import React from 'react';
import { Tab } from 'semantic-ui-react';
import DatsBody from './Dats/DatsBody';
import ImageList from './ImagesCarrusel/ImageList';
import InfoBody from './Info/InfoBody';
import TermsList from './Terms/TermsList';
import InfoDepositBody from './InfoDeposit/InfoDepositBody';

const ContactBody = ({dats, setReloadDats, info, setReloadInfo, terms, setReloadTerms, images, setReloadImages, infoDeposit, setReloadDeposit}) => {

    const panes = [
        {
            menuItem: 'Datos de la empresa',
            render: ()=>(
                <Tab.Pane>
                    <DatsBody
                        dats={dats}
                        setReloadDats={setReloadDats}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Información de contacto',
            render: ()=>(
                <Tab.Pane>
                    <InfoBody
                        info={info}
                        setReloadInfo={setReloadInfo}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Terminos y Condiciones',
            render: ()=>(
                <Tab.Pane>
                    <TermsList
                        terms={terms}
                        setReloadTerms={setReloadTerms}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Información de Deposito',
            render: ()=>(
                <Tab.Pane>
                    <InfoDepositBody
                        infoDeposit={infoDeposit}
                        setReloadDeposit={setReloadDeposit}
                    />
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Carrusel de Imagenes',
            render: ()=>(
                <Tab.Pane>
                    <ImageList
                        images={images}
                        setReloadImages={setReloadImages}
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

export default ContactBody;