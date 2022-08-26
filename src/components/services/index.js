import axios from 'axios';
import {
  GET_SHIPPING_ORDER,
  GET_SHIPPING_ORDER_CONFIRM,
  CONFIRM_SHIPPING_ORDER,
  GET_SHIPPING_ORDER_DELIVERING,
  SHIPPING_ORDER_DELIVERING,
  API_LOGIN,
} from './configs';

export const getShippingOrderAPI = async (body) => {
  try {
    const res = await axios.get(
      `${GET_SHIPPING_ORDER}?territoryID=${body?.territoryID}&mass=${body?.mass}&totalPrice=${body?.totalPrice}`
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
  try {
    const res = await axios.post(CONFIRM_SHIPPING_ORDER, body);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getShippingOrderDeliveryAPI = async (body) => {
  try {
    const res = await axios.get(
      `${GET_SHIPPING_ORDER_DELIVERING}?shipperID=${body?.shipperID}&inputDeliveryStatus=${body?.status}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const shippingOrderDeliveryAPI = async (body) => {
  try {
    const res = await axios.post(SHIPPING_ORDER_DELIVERING, body);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const loginAPI = async (body) => {
  try {
    const response = await axios.post(API_LOGIN, body);
    return response;
  } catch (error) {
    return error?.response?.data || error;
  }
};
