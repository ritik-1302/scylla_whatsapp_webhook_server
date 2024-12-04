export const handler=(reciever)=>{

    return {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": reciever,
        "type": "text",
        "text": {
          "body": "Your Room will be cleaned Shortly"
        }
      }
    
}