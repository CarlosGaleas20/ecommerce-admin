/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React from 'react';
import { map } from 'lodash';
import Image from 'material-ui-image';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

const ImagenBox = ({ activeImageA }) => {
    return (
        <>
            <GridContainer>
                {
                    map(activeImageA, (image) => (
                        <GridItem xs={6} sm={6} md={3}>
                            <Image
                                src={image.url}
                                imageStyle={{
                                    position: 'realtive',
                                    paddingBottom: 10,
                                    width: '100%',

                                }}
                                style={{
                                    paddingTop: 0,
                                }}
                            />
                        </GridItem>
                    ))
                }
            </GridContainer>
        </>
    )
}

export default ImagenBox;
