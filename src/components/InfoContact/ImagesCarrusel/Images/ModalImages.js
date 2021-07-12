/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { searchImages } from 'api/images';
import { size } from 'lodash';
import { Modal, Button } from 'semantic-ui-react'
import ImagenBody from './ImagenBody';
import './ImagesStyle.css';

export default function ModalImages({ openModal, setOpenModal, activeImage, setActiveImage }) {

    const [images, setImages] = useState(false);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await searchImages();
            if (size(response) > 0) setImages(response);
            else (setImages([]));
            setReload(false);
        })()
    }, [reload])

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <Modal
                onClose={handleClose}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Modal.Header>Selecciona una imagen</Modal.Header>
                <Modal.Content image scrolling>
                    {
                        images
                        && <ImagenBody
                        images={images}
                        setOpenModal={setOpenModal}
                        activeImage={activeImage}
                        setActiveImage={setActiveImage}
                        setReload={setReload}
                        />

                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Listo"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={handleClose}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    );
}