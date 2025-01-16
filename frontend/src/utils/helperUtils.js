import axios from "axios";
import { API } from "@/utils/API";

const utils = {};

utils.track = async (trackData) => {
  try {
    const { data } = await axios.post(API.HOST + API.TRACK, trackData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
export default utils;
