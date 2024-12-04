import  axios  from 'axios';
import process from 'process';
import { baseURL } from '../constants.js';

export const whatsappMessageParserMiddleware = async(req, res, next) => {
  console.log("Message Parser Middleware");
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
  const business_phone_number_id =req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;
  
  //Sending a Cab Location request to the sender
  if (message.type==='text'&&message.text.body==="CAB"){
    await axios({
      method: "POST",
      url: `${baseURL}/${business_phone_number_id}/messages`,
      headers: {
        Authorization: `Bearer ${process.env.GRAPH_API_TOKEN}`,
      },
      data: {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "type": "interactive",
        "to": "+919805278485",
        "interactive": {
          "type": "location_request_message",
          "body": {
            "text": "*🚖 Your Ride Awaits! 🚖* \n \n ✨ As a valued guest of Syclla, we’re excited to make your arrival seamless! As soon as you enter Mangaluru!, we’ve got a  cab ready to take you straight to our hotel. 🏨 \n ✨ Just sit back, relax, and let us take care of the rest! 🚗💨 "
          },
          "action": {
            "name": "send_location"
          }
        }
      },
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });


    await axios({
        method: "POST",
        url: `${baseURL}/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          status: "read",
          message_id: message.id,
        },
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  next();
};
