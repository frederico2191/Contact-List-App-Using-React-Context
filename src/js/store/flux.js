const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      agenda: [],
      newContact: {
        full_name: "",
        email: "",
        agenda_slug: "juana",
        address: "",
        phone: "",
      },
    },
    actions: {
      getAgenda: async () => {
        try {
          const response = await fetch(
            "https://playground.4geeks.com/apis/fake/contact/agenda/my_super_agenda"
          );
          if (response.status != 200) {
            console.log("Error fetching. Code: ", response.status);
          }
          const body = await response.json();
          setStore({ agenda: body });
        } catch (error) {
          console.log(error);
        }
      },
      newContact: async (newContactData) => {
        try {
          const API_URL = "https://playground.4geeks.com/apis/fake/contact/";
          const requestConfig = {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(newContactData),
          };
          const response = await fetch(API_URL, requestConfig);
          if (response.status != 201) {
            console.log("Error en la solicitud. Code: ", response.status);
          }
          const body = await response.json();
          setStore({ newContact: body });
        } catch (error) {
          console.log(error);
        }
      },
      deleteContact: async (contactId) => {
        try {
          const API_URL = `https://playground.4geeks.com/apis/fake/contact/${contactId}`;
          const requestConfig = {
            method: "DELETE",
          };
          const response = await fetch(API_URL, requestConfig);

          if (response.status === 201) {
            console.log("Contacto eliminado con éxito.");

            actions.getAgenda();
          } else {
            console.log("Error en la solicitud. Code: ", response.status);
          }
        } catch (error) {
          console.log(error);
        }
      },
      getContactById: async (contactId) => {
        try {
          const API_URL = `https://playground.4geeks.com/apis/fake/contact/${contactId}`;
          const response = await fetch(API_URL);

          if (response.status === 204) {
            const contactData = await response.json();
            return contactData;
          } else {
            throw new Error(`Error al obtener el contacto con ID ${contactId}`);
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
      updateContact: async (contactId, updatedContactData) => {
        try {
          const API_URL = `https://playground.4geeks.com/apis/fake/contact/${contactId}`;
          const requestConfig = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedContactData),
          };

          const response = await fetch(API_URL, requestConfig);

          if (response.status === 204) {
            console.log("Contacto actualizado con éxito.");
          } else {
            throw new Error(
              `Error al actualizar el contacto con ID ${contactId}`
            );
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    },
  };
};

export default getState;
