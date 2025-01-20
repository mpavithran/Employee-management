import axios from "axios";
import { API } from "@/utils/API";

const utils = {};

utils.track = async (trackData, headers) => {
  try {
    const { data } = await axios.post(API.HOST + API.TRACK, trackData, headers);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

utils.headers = (token) => {
  return {
    headers: {
      authorization: "Bearer " + token,
    },
  };
};

export default utils;
