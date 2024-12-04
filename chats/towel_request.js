export const handler=(reciever)=>{
    return  {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": reciever,
        "type": "text",
        "text": {
          "body": "Towels will be brought to you shortly"
        }
      }
}