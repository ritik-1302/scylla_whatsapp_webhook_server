import { sendToClient } from "./send_to_client.js";
import { webClient } from "../../models/web_client_model.js";

export const broadcastToAllClients=async(message)=>{
    let clientIdList=[];
    try{
        clientIdList=await webClient.find({});

    }catch(err){
        console.log(err);
    }

    for (const clientId of clientIdList) {
        console.log("Sending message to client",clientId['connectionId']);  
        await sendToClient(clientId['connectionId'], message);
    }
}
