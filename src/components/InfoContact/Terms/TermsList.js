/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import { map } from 'lodash';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TermModal from "./TermModal";
import TermEdit from "./TermEdit";
import DeleteTerm from "./DeleteTerm";

export default function TermsList({ terms, setReloadTerms }) {

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [activeId, setActiveId] = useState(null);
    const [activeEdit, setActiveEdit] = useState(null);

    const classes = useStyles();

    const accionEdit = (term) => {
        if(term){
            setActiveEdit(term);
            setOpenEdit(true);
        }
    }

    const accionDelete = (term) => {
        if(term){
            setActiveId(term);
            setOpenDelete(true);
        }
        
    }

    return (
        <>
        <TermModal
            open={open}
            setOpen={setOpen}
            setReloadTerms={setReloadTerms}
        />
        {
            activeEdit &&
            <TermEdit
            open={openEdit}
            setOpen={setOpenEdit}
            setReloadTerms={setReloadTerms}
            activeEdit={activeEdit}
            setActiveEdit={setActiveEdit}
        />
        }
        <DeleteTerm
            open={openDelete}
            setOpen={setOpenDelete}
            setReloadTerms={setReloadTerms}
            activeId={activeId}
            setActiveId={setActiveId}
        />
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>T??rminos y Condiciones</h4>
                        <p className={classes.cardCategoryWhite}>
                            Tabla para le gesti??n de t??rminos y condiciones existentes.
                        </p>
                    </CardHeader>
                    <Button
                        color="primary"
                        style={{
                            paddingTop: 10,
                            fontSize: 15,
                        }}
                        onClick={() => setOpen(!open)}
                    >
                        Agregar nuevo T??rmino o Condici??n
                    </Button>
                    <CardBody>
                        <Table
                            tableHeaderColor="primary"
                            tableHead={["T??tulo", "Descripci??n", "Acci??n"]}
                            tableData={
                                map(terms, (term) => [term.titulo, `${term.descripcion}`,
                                    <>
                                        <Button
                                            color="primary"
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            onClick={() => accionEdit(term)}
                                        >Modificar</Button>
                                        <Button
                                            color="primary"
                                            style={{
                                                paddingTop: 10,
                                                fontSize: 12,
                                            }}
                                            onClick={() => accionDelete(term)}
                                        >Eliminar</Button>
                                    </>
                                ])
                            }
                        />
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        </>
    );
}

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0",
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF",
        },
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1",
        },
    },
};

const useStyles = makeStyles(styles);