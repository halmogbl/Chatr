//(to be dispatched when fetching an author detail)
import * as actionTypes from "./actionTypes";

import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchChannelMessages = channelID => {
  return async dispatch => {
    const res = await instance.get(`channels/${channelID}`);
    const channel = res.data;
    dispatch({ type: actionTypes.FETCH_CHANNEL_MESSAGES, payload: channel });
  };
};

export const postMessage = (message, channelID) => {
  message = {
    ...message,
    channels: [channelID]
  };
  return async dispatch => {
    try {
      const res = await instance.post(`channels/${channelID}/send/`, message);

      const newMessage = res.data;

      dispatch({
        type: actionTypes.POST_MESSAGE,
        payload: newMessage
      });
    } catch (error) {
      console.error(error.response.data);
    }
  };
};
