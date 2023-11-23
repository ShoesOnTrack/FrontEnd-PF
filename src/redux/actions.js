import axios from "axios";

import {
  GET_ALL_PRODUCTS,
  GET_ALL_CATEGORIES,
  SEARCH_PRODUCTS,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART,
  REMOVE_FROM_CART,
  SORT_PRICE,
  GET_FAVORITES,
} from "./action-type";



export const getAllProducts = (page) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/productos?page=${page}`);

      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/categorias");
      dispatch({
        type: GET_ALL_CATEGORIES,
        payload: data.data,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export const buscarProductos = ({
  nombre,
  categoria,
  precioMin,
  precioMax,
  page,
}) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/filtros/search?nombre=${nombre}&categoriaId=${categoria}&precioMin=${precioMin}&precioMax=${precioMax}&page=${page}`
      );
      dispatch({
        type: SEARCH_PRODUCTS,
        payload: data,
      });
    } catch (error) {
      console.error("Error al buscar productos:", error);
    }
  };
};


export const sortProducts = (orderBy) => {
  return {
    type: SORT_PRICE,
    payload: orderBy,
  };
};

export const userRegister = (formData) => async () => {
  try {
    const response = await axios.post("/usuarios", formData);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
export const getCarrito = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/carrito/${userId}`);
      console.log("Datos del carrito recibidos:", data);
      dispatch({
        type: GET_CART,
        payload: data.data,
      });
    } catch (error) {
      console.error("Error al obtener el carrito:", error);
    }
  };
};

export const actualizarCarrito = (userId, carritoActualizado) => {
  return async (dispatch) => {
    try {
      await axios.put(`/carrito/${userId}`, { carrito: carritoActualizado });
      console.log("Carrito actualizado:", carritoActualizado);
      dispatch({
        type: UPDATE_CART,
        payload: carritoActualizado,
      });
    } catch (error) {
      console.error("Error al actualizar el carrito:", error);
    }
  };
};
export const agregarAlCarrito =
  (userId, productId, cantidad, idCarrito, subtotal) => async (dispatch) => {
    try {
      const response = await axios.post("/carrito/addItem", {
        id_usuario: userId,
        id_producto: productId,
        cantidad,
        id_carrito: idCarrito,
        subtotal,
      });
      dispatch({
        type: ADD_TO_CART,
        payload: response.data.data,
      });
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

export const eliminarDelCarrito = (userId, productId) => async (dispatch) => {
  try {
    const response = await axios.post("/carrito/delete", {
      id_usuario: userId,
      id_producto: productId,
    });
    console.log("Respuesta del servidor:", response.data);
    dispatch({
      type: REMOVE_FROM_CART,
      payload: response.data.data,
    });
  } catch (error) {
    console.error("Error al eliminar del carrito:", error);
  }
};

export const getFavorites = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/favoritos/${id}`);
    dispatch({
      type: GET_FAVORITES,
      payload: data.data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteFavorite = (datos) => async () => {
  try {
    const { data } = await axios.post("/favoritos/delete", datos);
  } catch (error) {
    console.error(error);
  }
};
