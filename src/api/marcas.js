/* eslint-disable prettier/prettier */
import authFetch from "utils/authFetch";
import { BASE_URL } from "../utils/constants";

export const getMarcas = async () => {
  try {
    const url = `${BASE_URL}/marcas?_sort=createdAt:desc`;

    const response = await fetch(url);
    const result = await response.json();
    return result;

  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getTotalMarcas = async (logout) => {
  try {
    const url = `${BASE_URL}/marcas/count`;

    const response = await authFetch(url, null, logout);
    return response;

  } catch (error) {
    console.log(error);
    return null;
  }
}

export const addMarca = async (formData, portada, logout) => {
  try {
    const url = `${BASE_URL}/marcas`;
    const params = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        portada,
      })
    }
    const response = await authFetch(url, params, logout);
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const updateMarca = async (idMarca, formData, portada, logout) => {
  try {
    const url = `${BASE_URL}/marcas/${idMarca}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        portada,
      }),
    };

    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteMarca = async (idMarca, logout) => {
  try {
    const total = await getTotalMarcas(logout);
    if (total > 1) {
      const url = `${BASE_URL}/marcas/${idMarca}`;
      const params = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const result = await authFetch(url, params, logout);
      return result;
    } else {
      return 'found';
    }

  } catch (error) {
    console.log(error);
    return null;
  }
};