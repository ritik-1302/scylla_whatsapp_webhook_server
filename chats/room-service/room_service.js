export const handler = (reciever) => {
  return {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: reciever,
    type: "interactive",
    interactive: {
      type: "list",
      header: {
        type: "text",
        text: "🛎 Room Service Bot",
      },
      body: {
        text: "Please select from the options below for your  service needs.",
      },
      footer: {
        text: "Powered By Reslink Technologies Pvt Ltd.",
      },
      action: {
        button: "View Options",
        sections: [
          {
            title: "Food & Beverages",
            rows: [
              {
                id: "food_order",
                title: "Order Food",
                description: "Choose from our menu and order delicious meals.",
              },
              {
                id: "beverages_order",
                title: "Order Beverages",
                description: "Select from a variety of refreshing drinks.",
              },
            ],
          },

          {
            title: "Housekeeping",
            rows: [
              {
                id: "cleaning_service",
                title: "Request Cleaning",
                description: "Schedule a room cleaning.",
              },
              {
                id: "towel_request",
                title: "Request Towels",
                description: "Request additional towels.",
              },
            ],
          },
          {
            title: "Transportation",
            rows: [
              {
                id: "cab_service",
                title: "Request a Ride",
                description: "Schedule a Cab at your destination",
              },
            ],
          },
        ],
      },
    },
  };
};
