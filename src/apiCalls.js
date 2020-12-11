const url = 'http://localhost:3001/api/v1/orders'
export const getOrders = async () => {
  let response = await fetch(url)
  return response.json()
}
