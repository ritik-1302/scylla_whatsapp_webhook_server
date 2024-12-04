export const handler=(reciever)=>{
    return {
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": reciever,
        "type": "interactive",
        "interactive": {
          "type": "list",
          "header": {
            "type": "text",
            "text": "Beverage"
          },
          "body": {
            "text": "Please select from the options below for your beverage needs."
          },
          "footer": {
            "text": "Powered By Reslink Technologies Pvt Ltd."
          },
          "action": {
            "button": "View Options",
            "sections": [
              {
                "title": "Beverages",
                "rows": [
                {
                    "id": "tea",
                    "title": "Tea",
                    "description": "Enjoy a refreshing cup of tea."
                  },

                  {
                    "id": "coffee",
                    "title": "Coffee",
                    "description": "Sip on a delicious cup of coffee."
                  },
                  {
                    "id": "juice",
                    "title": "Juice",
                    "description": "Quench your thirst with a refreshing juice."
                  },

                  {
                    "id": "milk",
                    "title": "Milk",
                    "description": "Start your day with a glass of milk."
                  },

                  {
                    "id": "water",
                    "title": "Water",
                    "description": "Stay hydrated with a bottle of water."
                  }


                
                  
                ]
              },

          
            ]
          }
        }
      }

}