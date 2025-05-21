const API_ADDRESS = import.meta.env.VITE_API_ADDRESS;

export const chasseService = {
  findAll: async (email: string, token: string) => {
    try {
      const response = await fetch(`${API_ADDRESS}user/protected/wallet`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: email }),
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },
  create: async (chasseInput: any, email: string, token: string) => {
    try {
      const response = await fetch(`${API_ADDRESS}chasse/protected/create`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          chasseInput: chasseInput,
          email: email,
        }),
      });
      console.log("response", response);
      const json = await response.json();
      console.log("json", json);
      return json;
    } catch (error) {
      console.error(error);
    }
  },

  findById: async (email: string, token: string) => {
    try {
      const response = await fetch(
        `${API_ADDRESS}user/protected/get/${email}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response);
      const json = await response.json();
      console.log("json", json);
      return json;
    } catch (error) {
      console.error(error);
    }
  },
};
