 export const handler=(reciever)=>{
    return{
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": reciever,
        "type": "interactive",
        "interactive": {
          "type": "list",
          "header": {
            "type": "text",
            "text": "Food"
          },
          "body": {
            "text": "Please select from the options below for your food needs."
          },
          "footer": {
            "text": "Powered By Reslink Technologies Pvt Ltd."
          },
          "action": {
            "button": "View Options",
            "sections": [
              {
                "title": "Food",
                "rows": [
                    {
                        "id":"pasta",
                        "title":"Pasta",
                        "description":"Pasta with tomato sauce"
                    },
                    {
                        "id":"pizza",
                        "title":"Pizza",
                        "description":"Pizza with cheese"
                    },
                    {
                        "id":"burger",
                        "title":"Burger",
                        "description":"Burger with fries"
                    },
                    {
                        "id":"sandwich",
                        "title":"Sandwich",
                        "description":"Sandwich with cheese"
                    },
                    {
                        "id":"salad",
                        "title":"Salad",
                        "description":"Salad with cheese"
                    },
                    {
                        "id":"soup",
                        "title":"Soup",
                        "description":"Soup with cheese"
                    },
                    {
                        "id":"steak",
                        "title":"Steak",
                        "description":"Steak with cheese"
                    },
                    {
                        "id":"chicken",
                        "title":"Chicken",
                        "description":"Chicken with cheese"
                    },
                    {
                        "id":"fish",
                        "title":"Fish",
                        "description":"Fish with cheese"
                    },
                   
               

                
                  
                ]
              },

          
            ]
          }
        }
      }


 }