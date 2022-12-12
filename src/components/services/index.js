import axios from 'axios';
import {
  GET_SHIPPING_ORDER,
  GET_SHIPPING_ORDER_CONFIRM,
  CONFIRM_SHIPPING_ORDER,
  GET_SHIPPING_ORDER_DELIVERING,
  SHIPPING_ORDER_DELIVERING,
  API_LOGIN,
  API_GET_TERRITORY,
  API_GET_REGION,
  API_SHIPPER_WORK,
  API_REGISTER,
  API_PICKUP_CONFIRMATION,
  API_PICKUP_ORDERS,
  GET_STAFF_INFO,
  API_GET_RETURN_BACK,
  API_UPDATE_RETURN_BACK,
  API_GET_RETURN_CONFIRMATION,
  API_UPDATE_RETURN_CONFIRMATION,
  API_GET_RETURNING_BACK,
  API_UPDATE_RETURNING_BACK,
} from './configs';

export const getTerritoryAPI = async () => {
  try {
    const response = await axios.get(API_GET_TERRITORY);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
export const updateShipperWorkAPI = async (body) => {
  const response = await axios.post(API_SHIPPER_WORK, body);
  return response;
};

export const getRegionAPI = async (id) => {
  try {
    const response = await axios.get(`${API_GET_REGION}?territoryID=${id}`);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};

export const getShippingOrderAPI = async (body) => {
  try {
    const res = await axios.get(
      `${GET_SHIPPING_ORDER}?shipperID=${body?.shipperID}&mass=${body?.mass}&totalPrice=${body?.totalPrice}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getShippingOrderConfirmAPI = async (body) => {
  try {
    const res = await axios.get(
      `${GET_SHIPPING_ORDER_CONFIRM}?shipperID=${body?.shipperID}&mass=${body?.mass}&totalPrice=${body?.totalPrice}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const confirmShippingOrderAPI = async (body) => {
  const res = await axios.post(CONFIRM_SHIPPING_ORDER, body);
  return res;
};

export const getShippingOrderDeliveryAPI = async (body) => {
  try {
    const res = await axios.get(
      `${GET_SHIPPING_ORDER_DELIVERING}?shipperID=${body?.shipperID}&inputDeliveryStatus=${body?.inputDeliveryStatus}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const shippingOrderDeliveryAPI = async (body) => {
  const res = await axios.post(SHIPPING_ORDER_DELIVERING, body);
  return res;
};

export const loginAPI = async (body) => {
  const response = await axios.post(API_LOGIN, body);
  return response;
};
export const registerAPI = async (body) => {
  const response = await axios.post(API_REGISTER, body);
  return response;
};

export const updatePickupConfirmationAPI = async (body) => {
  const response = await axios.post(API_PICKUP_CONFIRMATION, body);
  return response;
};

export const pickupConfirmationAPI = async (body) => {
  const response = await axios.get(
    `${API_PICKUP_CONFIRMATION}?shipperID=${body?.shipperID}&mass=${body?.mass}&totalPrice=${body?.totalPrice}`
  );
  return response;
};

export const updatePickUpOrderAPI = async (body) => {
  const response = await axios.post(API_PICKUP_ORDERS, body);
  return response;
};

export const pickupOrderAPI = async (body) => {
  const response = await axios.get(`${API_PICKUP_ORDERS}?shipperID=${body?.shipperID}&inputDeliveryStatus=${body?.inputDeliveryStatus}`);
  return response;
};

export const staffInfoAPI = async (body) => {
  const response = await axios.get(
    `${GET_STAFF_INFO}?staffID=${body?.staffID}`
  );
  return response;
};

export const getReturnBackAPI = async (body) => {
  const response = await axios.get(`${API_GET_RETURN_BACK}?shipperID=${body?.shipperID}&inputStatus=${body?.inputStatus}`);
  return response;
};

export const updateReturnBackAPI = async (body) => {
  const response = await axios.post(API_UPDATE_RETURN_BACK, body);
  return response;
};

export const getReturnConfirmationAPI = async (body) => {
  const response = await axios.get(`${API_GET_RETURN_CONFIRMATION}?shipperID=${body?.shipperID}&mass=${body?.mass}&totalPrice=${body?.totalPrice}`);
  return response;
};

export const updateReturnConfirmationAPI = async (body) => {
  const response = await axios.post(API_UPDATE_RETURN_CONFIRMATION, body);
  return response;
};

export const getReturningBackAPI = async (body) => {
  const response = await axios.get(`${API_GET_RETURNING_BACK}?shipperID=${body?.shipperID}&inputStatus=${body?.inputStatus}`);
  return response;
};

export const updateReturningBackAPI = async (body) => {
  const response = await axios.post(API_UPDATE_RETURNING_BACK, body);
  return response;
};
