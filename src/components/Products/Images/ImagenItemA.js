/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Image from 'material-ui-image';
import { map } from 'lodash';
import { Modal } from 'semantic-ui-react'
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import './ImagesStyle.css';

export default function ModalImages({ images, setOpenModal, activeImage, setActiveImage, activeImageId, setActiveImageId }) {
    const classes = useStyles();

    const handleAdd = (image) => {
        let active = activeImage;
        let activeId = activeImageId;
        const found = active.find(element => element.id === image.id);
        if (!found) {
            active.push(image);
            activeId.push(image.id);
        } else {
            let indice = active.findIndex(element => element.id === image.id)
            let indiceId = activeId.findIndex(element => element.id === image.id)
            active.splice(indice, 1);
            activeId.splice(indiceId, 1);
        }
        setActiveImage(active);
        setActiveImageId(activeId);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <div>
            <Modal.Content>
                <div className={classes.paper}>
                    <h2 id="transition-modal-title">Imagenes existentes</h2>
                    <Button
                        onClick={handleClose}
                        color="primary"
                    >
                        Terminar
                    </Button>
                    {
                        images &&
                        (
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <Card>
                                        <CardBody xs={12} sm={12} md={12}>
                                            <GridContainer>
                                                {
                                                    map(images, (image) => {

                                                        const [active, setActive] = useState(false);
                                                        const [reloader, setReloader] = useState(false);

                                                        useEffect(() => {
                                                            const found = activeImage.find(element => element.id === image.id);
                                                            if (found) {
                                                                setActive(true);
                                                            } else {
                                                                setActive(false)
                                                            }
                                                            setReloader(false);
                                                        }, [image, reloader])


                                                        return (
                                                            <>
                                                                <GridItem xs={12} sm={12} md={4}
                                                                    key={image.id}
                                                                    onClick={() => handleAdd(image)}
                                                                    style={{
                                                                        marginHorizontal: 10,
                                                                    }}
                                                                >
                                                                    <div
                                                                        onClick={() => setReloader(true)}
                                                                        className={
                                                                            activeImage &&
                                                                            (active ? classes.imageSelected : classes.imageNoSelected)
                                                                        }
                                                                        style={{
                                                                            padding: 10,
                                                                            marginBottom: 20,
                                                                        }}
                                                                    >
                                                                        <Image
                                                                            src={image.url}
                                                                            imageStyle={{
                                                                                position: 'realtive',
                                                                                paddingBottom: 10,

                                                                            }}
                                                                            style={{
                                                                                paddingTop: 0,
                                                                                height: 200,
                                                                            }}
                                                                        />
                                                                        <InputLabel id="demo-simple-select-label">{image.name}</InputLabel>
                                                                    </div>
                                                                </GridItem>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </GridContainer>
                                        </CardBody>
                                    </Card>
                                </GridItem>
                            </GridContainer>
                        )
                    }
                </div>
            </Modal.Content>
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    imageSelected: {
        border: '1px solid #007bff',
    },
    imageNoSelected: {
        border: 'none',
    },
}));