import axios from "axios";
import process from "process";
import { baseURL } from "../../constants.js";
import { saveMessageToDB } from "../../utils/functions/save_message_to_db.js";

export const sendMessage = async (
  data,
  businessPhoneNumberId = "571831106008234"
) => {
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
        data["messages"] = response.data["messages"];
        await saveMessageToDB(data, data["to"]);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};
