import axios from "axios";
import process from "process";
import { baseURL } from "../../constants.js";
export const sendMessage = async (businessPhoneNumberId, data) => {
  try {
    await axios({
      method: "POST",
      url: `${baseURL}/${businessPhoneNumberId}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
      },
      data: data,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
