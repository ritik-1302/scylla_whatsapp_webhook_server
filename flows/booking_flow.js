const SCREEN_RESPONSES = {
  DATE_SELECTION: {
    screen: "DATE_SELECTION",
    data: {},
  },
  GUEST_DETAIL: {
    screen: "GUEST_DETAIL",
    data: {},
  },
  AMENITIES: {
    screen: "AMENITIES",
    data: {},
  },
  ENDING_SCREEN: {
    screen: "ENDING_SCREEN",
    data: {},
  },
  SUCCESS: {
    screen: "SUCCESS",
    data: {
      extension_message_response: {
        params: {
          flow_token: "REPLACE_FLOW_TOKEN",
          some_param_name: "PASS_CUSTOM_VALUE",
        },
      },
    },
  },
};

export const getNextScreen = async (decryptedBody) => {
  // eslint-disable-next-line no-unused-vars
  const { screen, data, version, action, flow_token } = decryptedBody;
  console.log("action", action);
  console.log("data", data);

  // handle health check request
  if (action === "ping") {
    return {
      version,
      data: {
        status: "active",
      },
    };
  }

  // handle error notification
  if (data?.error) {
    console.warn("Received client error:", data);
    return {
      version,
      data: {
        acknowledged: true,
      },
    };
  }

  // handle initial request when opening the flow and display PRODUCT_SELECTOR screen
  if (action === "INIT") {
    return {
      ...SCREEN_RESPONSES.DATE_SELECTION,
      data: {},
    };
  }

  if (action === "data_exchange") {
    // handle the request based on the current screen
    switch (screen) {
      // handles when user submits PRODUCT_SELECTOR screen
      case "DATE_SELECTION":
        return {
          ...SCREEN_RESPONSES.GUEST_DETAIL,
          data: {},
        };
      case "GUEST_DETAIL":
        // TODO here process user selected preferences and return customised offer
        return {
          ...SCREEN_RESPONSES.AMENITIES,
          data: {},
        };

      case "AMENITIES":
        // TODO return details of selected device
        return {
          ...SCREEN_RESPONSES.ENDING_SCREEN,
          data: {},
        };

      default:
        break;
    }
  }

  console.error("Unhandled request body:", decryptedBody);
  throw new Error(
    "Unhandled endpoint request. Make sure you handle the request action & screen logged above."
  );
};
