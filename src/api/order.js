/* eslint-disable prettier/prettier */
import authFetch from "../utils/authFetch";
import { BASE_URL } from "../utils/constants";
import { map, size } from 'lodash';
import { toast } from 'react-toastify';


export const getOrders = async (logout) => {
    const estadoEntrega = 'No entregado';
    try {
        const url = `${BASE_URL}/pedidos?_sort=createdAt:desc&estadoEntrega=${estadoEntrega}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersGeneral = async (logout) => {
    try {
        const url = `${BASE_URL}/pedidos?_sort=createdAt:desc`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersDispatch = async (logout) => {
    const estadoEntrega = 'Despachado';
    try {
        const url = `${BASE_URL}/pedidos?_sort=createdAt:desc&estadoEntrega=${estadoEntrega}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersOk = async (logout) => {
    const estadoEntrega = 'Entregado';
    try {
        const url = `${BASE_URL}/pedidos?_sort=createdAt:desc&estadoEntrega=${estadoEntrega}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersByIdPedido = async (idPedido, logout) => {
    try {
        const url = `${BASE_URL}/pedidos?_sort=createdAt:desc&idPedido=${idPedido}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const updateEstadoPedido = async (idPedido, logout) => {
    try {
        const orders = await getOrdersByIdPedido(idPedido, logout);
        if (size(orders) > 0) {
            map(orders, async (order) => {
                const url = `${BASE_URL}/pedidos/${order.id}`;
                const params = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estadoEntrega: 'Despachado',
                    }),
                };

                await authFetch(url, params, logout);
            })
            return true;
        } else {
            toast.error('Error al cambiar de estado');
            return false;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateEstadoPedidoDispatch = async (idPedido, logout) => {
    try {
        const orders = await getOrdersByIdPedido(idPedido, logout);
        if (size(orders) > 0) {
            map(orders, async (order) => {
                const url = `${BASE_URL}/pedidos/${order.id}`;
                const params = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estadoEntrega: 'Entregado',
                    }),
                };

                await authFetch(url, params, logout);
            })
            return true;
        } else {
            toast.error('Error al cambiar de estado');
            return false;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const getOrdersByDeposit = async (logout) => {
    const estadoEntrega = 'No validado';
    try {
        const url = `${BASE_URL}/pedido-depositos?_sort=createdAt:desc&estadoEntrega=${estadoEntrega}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersByDepositGeneral = async (logout) => {
    try {
        const url = `${BASE_URL}/pedido-depositos?_sort=createdAt:desc`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersValidateByDeposit = async (logout) => {
    const estadoEntrega = 'Validado';
    try {
        const url = `${BASE_URL}/pedido-depositos?_sort=createdAt:desc&estadoEntrega=${estadoEntrega}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersDispatchByDeposit = async (logout) => {
    const estadoEntrega = 'Despachado';
    try {
        const url = `${BASE_URL}/pedido-depositos?_sort=createdAt:desc&estadoEntrega=${estadoEntrega}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersOkByDeposit = async (logout) => {
    const estadoEntrega = 'Entregado';
    try {
        const url = `${BASE_URL}/pedido-depositos?_sort=createdAt:desc&estadoEntrega=${estadoEntrega}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersDeleteByDeposit = async (logout) => {
    const estadoEntrega = 'Cancelado';
    try {
        const url = `${BASE_URL}/pedido-depositos?_sort=createdAt:desc&estadoEntrega=${estadoEntrega}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getOrdersByIdPedidoByDeposit = async (idPedido, logout) => {
    try {
        const url = `${BASE_URL}/pedido-depositos?_sort=createdAt:desc&idPedido=${idPedido}`;
        const response = await authFetch(url, null, logout);
        return response;

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const deletePedidoByDeposit = async (idPedido, logout) => {
    try {
        const orders = await getOrdersByIdPedidoByDeposit(idPedido, logout);
        if (size(orders) > 0) {
            map(orders, async (order) => {
                const url = `${BASE_URL}/pedido-depositos/${order.id}`;
                const params = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estadoEntrega: 'Cancelado',
                    }),
                };

                await authFetch(url, params, logout);
            })
            return true;
        } else {
            toast.error('Error al cambiar de estado');
            return false;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateEstadoPedidoByDeposit = async (idPedido, logout) => {
    try {
        const orders = await getOrdersByIdPedidoByDeposit(idPedido, logout);
        if (size(orders) > 0) {
            map(orders, async (order) => {
                const url = `${BASE_URL}/pedido-depositos/${order.id}`;
                const params = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estadoEntrega: 'Despachado',
                    }),
                };

                await authFetch(url, params, logout);
            })
            return true;
        } else {
            toast.error('Error al cambiar de estado');
            return false;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const updateEstadoPedidoByDepositDispatch = async (idPedido, logout) => {
    try {
        const orders = await getOrdersByIdPedidoByDeposit(idPedido, logout);
        if (size(orders) > 0) {
            map(orders, async (order) => {
                const url = `${BASE_URL}/pedido-depositos/${order.id}`;
                const params = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        estadoEntrega: 'Entregado',
                    }),
                };

                await authFetch(url, params, logout);
            })
            return true;
        } else {
            toast.error('Error al cambiar de estado');
            return false;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};