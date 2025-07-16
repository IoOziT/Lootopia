const API_ADDRESS = import.meta.env.VITE_API_ADDRESS;

export const chasseService = {
  findAll: async () => {
    try {
      const response = await fetch(`${API_ADDRESS}chasse`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
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

  findById: async (id: number, token: string) => {
    try {
      const response = await fetch(`${API_ADDRESS}chasse/protected/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response);
      const json = await response.json();
      console.log("json", json);
      return json;
    } catch (error) {
      console.error(error);
    }
  },

  register: async (chasseId: number, token: string) => {
  try {
    const response = await fetch(`${API_ADDRESS}chasse/protected/${chasseId}/inscription`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const json = await response.json();
    return { status: response.status, data: json };
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    throw error;
  }
}

};
