/* eslint-disable prettier/prettier */
import authFetch from "utils/authFetch";
import { toast } from 'react-toastify';
import { BASE_URL } from "../utils/constants";

export const getDatosEmpresa = async() =>{
    try {
        const url = `${BASE_URL}/datos-empresa`;

        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateDatosEmpresa = async (formData, formImages, logout) => {
    try {
      const url = `${BASE_URL}/datos-empresa`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...formData,
            ...formImages,
        }),
      };
  
      const result = await authFetch(url, params, logout);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  export const getInfoContact = async() =>{
    try {
        const url = `${BASE_URL}/info-contacto`;

        const response = await fetch(url);
        const result = await response.json();
        return result;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateInfoContact = async (formData, logout) => {

  const string = (formData.telefono).toString();
  const telefono = '0' + string;

  try {
    const url = `${BASE_URL}/info-contacto`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        telefono,
      }),
    };

    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTerms = async() =>{
  try {
      const url = `${BASE_URL}/terminos-y-condiciones`;

      const response = await fetch(url);
      const result = await response.json();
      return result;
      
  } catch (error) {
      console.log(error);
      return null;
  }
}

export const getTotalTerms = async(logout) =>{
  try {
      const url = `${BASE_URL}/terminos-y-condiciones/count`;
      const response = await authFetch(url, logout);
      return response;
      
  } catch (error) {
      console.log(error);
      return null;
  }
}

export const addTerms = async (formData, logout) => {

  try {
    const url = `${BASE_URL}/terminos-y-condiciones`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateTerms = async (idTerm, formData, logout) => {

  try {
    const url = `${BASE_URL}/terminos-y-condiciones/${idTerm}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteTerm = async (idTerm, logout) => {
  const total = await getTotalTerms(logout);
  console.log(total);
  if(total > 1){
    try {
      const url = `${BASE_URL}/terminos-y-condiciones/${idTerm}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const result = await authFetch(url, params, logout);
      return result;
    } catch (error) {
        console.log(error);
        return null;
    }
  }else{
    toast.error('Error. Debe haber al menos 1 Término o Condición');
  }
};

export const getCarrusel = async() =>{
  try {
      const url = `${BASE_URL}/carrusels`;
      const response = await fetch(url);
      const result = await response.json();
      return result;
  } catch (error) {
      console.log(error);
      return null;
  }
}

export const getTotalCarrusel = async(logout) =>{
  try {
      const url = `${BASE_URL}/carrusels/count`;
      const response = await authFetch(url, logout);
      return response;
  } catch (error) {
      console.log(error);
      return null;
  }
}

export const addImagenCarrusel = async (formData, imagen, logout) => {

  try {
    const url = `${BASE_URL}/carrusels`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        imagen,
      }),
    };

    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const updateImagenCarrusel = async (idImagen, formData, imagen, logout) => {

  try {
    const url = `${BASE_URL}/carrusels/${idImagen}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        imagen
      }),
    };

    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteImagenCarrusel = async (idImagen, logout) => {
  const total = await getTotalCarrusel(logout);
  console.log(total);
  if(total > 1){
    try {
      const url = `${BASE_URL}/carrusels/${idImagen}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const result = await authFetch(url, params, logout);
      return result;
    } catch (error) {
        console.log(error);
        return null;
    }
  }else{
    toast.error('Error. Debe haber al menos una Imagen en el carrusel');
  }
};

export const getInfoDeposit = async(logout) =>{
  try {
      const url = `${BASE_URL}/datos-deposito`;

      const response = await authFetch(url, logout);
      return response;
      
  } catch (error) {
      console.log(error);
      return null;
  }
}

export const updateInfoDeposit = async (formData, logout) => {

const numeroCuenta = (formData.numeroCuenta).toString();

try {
  const url = `${BASE_URL}/datos-deposito`;
  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData,
      numeroCuenta,
    }),
  };

  const result = await authFetch(url, params, logout);
  return result;
} catch (error) {
  console.log(error);
  return null;
}
};