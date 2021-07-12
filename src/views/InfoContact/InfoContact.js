/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { size } from 'lodash';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getDatosEmpresa } from 'api/infoContact';
import ContactBody from 'components/InfoContact/ContactBody';
import { getInfoContact } from 'api/infoContact';
import { getTerms } from 'api/infoContact';
import { getCarrusel } from 'api/infoContact';
import { getInfoDeposit } from 'api/infoContact';

const InfoContact = () => {

    const [dats, setDats] = useState(null);
    const [info, setInfo] = useState(null);
    const [terms, setTerms] = useState(null);
    const [images, setImages] = useState(null);
    const [infoDeposit, setInfoDeposit] = useState(null);
    const [reloadDats, setReloadDats] = useState(false);
    const [reloadInfo, setReloadInfo] = useState(false);
    const [reloadTerms, setReloadTerms] = useState(false);
    const [reloadImages, setReloadImages] = useState(false);
    const [reloadDeposit, setReloadDeposit] = useState(false);

    useEffect(() => {
        ( async() => {
          const response = await getDatosEmpresa();
          if(size(response) > 0) setDats(response);
          else(setDats([]));
          setReloadDats(false);
        })()
      }, [reloadDats])

      useEffect(() => {
        ( async() => {
          const response = await getInfoContact();
          if(size(response) > 0) setInfo(response);
          else(setInfo([]));
          setReloadInfo(false);
        })()
      }, [reloadInfo])

      useEffect(() => {
        ( async() => {
          const response = await getTerms();
          if(size(response) > 0) setTerms(response);
          else(setTerms([]));
          setReloadTerms(false);
        })()
      }, [reloadTerms])

      useEffect(() => {
        ( async() => {
          const response = await getCarrusel();
          if(size(response) > 0) setImages(response);
          else(setImages([]));
          setReloadImages(false);
        })()
      }, [reloadImages])

      useEffect(() => {
        ( async() => {
          const response = await getInfoDeposit();
          if(size(response) > 0) setInfoDeposit(response);
          else(setInfoDeposit([]));
          setReloadDeposit(false);
        })()
      }, [reloadDeposit])

    return (
        <>
            {
                (dats && info && terms && images && infoDeposit)
                ? (
                    <ContactBody
                    dats={dats}
                    info={info}
                    terms={terms}
                    images={images}
                    infoDeposit={infoDeposit}
                    setReloadDats={setReloadDats}
                    setReloadInfo={setReloadInfo}
                    setReloadTerms={setReloadTerms}
                    setReloadImages={setReloadImages}
                    setReloadDeposit={setReloadDeposit}
                    />
                )
                : (<CircularProgress />)
            }
        </>
    );
}

export default InfoContact;