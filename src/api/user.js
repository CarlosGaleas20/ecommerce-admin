/* eslint-disable prettier/prettier */
import jwtDecode from "jwt-decode";
import authFetch from "../utils/authFetch";
import { BASE_URL } from "../utils/constants";

export const registerUser = async (formData) => {
  try {
    const url = `${BASE_URL}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        type: 'Admin',
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const loginUser = async (formData) => {
  try {
    const url = `${BASE_URL}/auth/local`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const resetPasswordUser = async ({ email }) => {
  try {
    const url = `${BASE_URL}/auth/forgot-password`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const updateNameUser = async (idUser, formData, logout) => {
  try {
    const url = `${BASE_URL}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const result = await fetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return error;
  }
};

export const updateEmailUser = async (idUser, email, logout) => {
  try {
    const url = `${BASE_URL}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    };

    const result = await fetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return error;
  }
};

export const updatePassUser = async (idUser, password, logout) => {
  try {
    const url = `${BASE_URL}/users/${idUser}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    };

    const result = await fetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return error;
  }
};

export const createUserAddress = async (idUser, data, logout) => {
  try {
    const url = `${BASE_URL}/direcciones?users_permissions_user=${idUser}`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const result = await fetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return error;
  }
};

export const getUserAddress = async (idUser, logout) => {
  try {
    const url = `${BASE_URL}/direcciones?users_permissions_user=${idUser}`;

    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    return error;
  }
};

export const updateUserAddress = async (idAddress, data, logout) => {
  try {
    const url = `${BASE_URL}/direcciones/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const result = await fetch(url, params, logout);
    return result;
  } catch (error) {
    return error;
  }
};

export const deleteUserAddress = async (idAddress, logout) => {
  try {
    const url = `${BASE_URL}/direcciones/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const result = await fetch(url, params, logout);
    return result ? result : null;
  } catch (error) {
    return error;
  }
};

export const getMeUser = async (logout) => {
  try {
    const url = `${BASE_URL}/users/me`;
    const result = await authFetch(url, null, logout);
    return result ? result : null;
  } catch (error) {
    return error;
  }
};

export const setToken = (token) => {
  localStorage.setItem("token-admin", token);
};

export const getToken = () => {
  const ISSERVER = typeof window === "undefined";

  if (!ISSERVER) {
    const token = localStorage.getItem("token-admin");

    if (!token) {
      return null;
    } else {
      return token;
    }
  }
};

export const deleteToken = () => {
  localStorage.removeItem("token-admin");
};

export const checkToken = (token) => {
  const tokenDecode = jwtDecode(token);
  const expireDataToken = tokenDecode.exp * 1000;
  const currentDate = new Date().getTime();
  if (currentDate > expireDataToken) {
    return true;
  }
  return false;
};

export const getAllUsers = async (logout) => {
  try {
    const url = `${BASE_URL}/users`;

    const result = await authFetch(url, null, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const registerAdmin = async (formData) => {
  try {
    const url = `${BASE_URL}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        type: 'Admin',
        active: true,
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const registerClient = async (formData) => {
  try {
    const url = `${BASE_URL}/auth/local/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        type: 'User',
        active: true,
      }),
    };

    const response = await fetch(url, params);
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
};

export const actionAdmin = async (idUser, data, logout) => {
  try {
    if (data) {
      const url = `${BASE_URL}/users/${idUser}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: true,
        }),
      };

      const result = await fetch(url, params, logout);
      return result
    } else {
      const url = `${BASE_URL}/users/${idUser}`;
      const params = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          active: false,
        }),
      };

      const result = await fetch(url, params, logout);
      return result;
    }

  } catch (error) {
    return error;
  }
};
