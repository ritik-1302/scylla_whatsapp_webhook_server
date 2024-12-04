export const handler=(reciever)=>{
   return  {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "type": "interactive",
        "to": reciever,
        "interactive": {
          "type": "location_request_message",
          "body": {
            "text": "*🚖 Your Ride Awaits! 🚖* \n \n ✨ As a valued guest of Syclla, we’re excited to make your arrival seamless! As soon as you enter Mangaluru!, we’ve got a  cab ready to take you straight to our hotel. 🏨 \n ✨ Just sit back, relax, and let us take care of the rest! 🚗💨 "
          },
          "action": {
            "name": "send_location"
          }
        }
      }

}