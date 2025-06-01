const API_ADDRESS = import.meta.env.VITE_API_ADDRESS;

export const etapeService = {
  findAll: async (token: string) => {
    try {
      const response = await fetch(`${API_ADDRESS}etape/protected/`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },
  create: async (etapeInput: any, token: string) => {
    try {
      const response = await fetch(`${API_ADDRESS}etape/protected/create`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          etapeInput: etapeInput,
        }),
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },

  findById: async (id: number, token: string) => {
    try {
      const response = await fetch(`${API_ADDRESS}etape/protected/${id}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },
  findByChasseId: async (chasseId: number, token: string) => {
    try {
      console.log(chasseId);
      const response = await fetch(
        `${API_ADDRESS}etape/protected/chasse/${chasseId}`,
        {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },
};
