import axios from "axios";
import process from "process";
import { baseURL } from "../../constants.js";
import { saveMessageToDB } from "../../utils/functions/save_message_to_db.js";
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
      .then(async function (response) {
         console.log(response);
        data['messages']=response.data["messages"];
        await saveMessageToDB(data, businessPhoneNumberId);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
