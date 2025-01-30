//Function for building different configurations for building a message
export const messageObjectBuilder = (queryObject) => {

  const message = queryObject.chat.message;
  const to = queryObject.chat.to;

  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: to,
    type: "text",
    text: {
      preview_url: false,
      body: message,
    },
  };
};
