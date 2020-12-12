const url = "http://localhost:3001/api/v1/orders";
export const getOrders = async () => {
  let response = await fetch(url);
  return response.json();
};
// post request to the server
export const postOrder = async (name, ingredients, total) => {
  try {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, ingredients: ingredients, total: total }),
    }).then((response) => response.json());
  } catch (err) {
    console.error("Error from the server: ", err);
  }
};
