import axios from "axios";

export const getData = async ({ queryKey }) => {
  //console.log('axios kérés:',queryKey);
  const url = queryKey[1];
  const resp = await axios.get(url);
  return resp.data;
};
export const postData = async (url, newData) => {
  console.log("client:", newData, url);

  const response = await axios.post(url, newData);
  return response;
};
