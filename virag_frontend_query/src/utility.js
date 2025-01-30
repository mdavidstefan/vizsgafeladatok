import axios from "axios";

export const getData = async ({ queryKey }) => {
    const response = await axios.get(queryKey[1])   
    return response.data
}

export const updateData = async (url, data, setState) => {
    const response = await axios.put(url, data)
    setState(response.data)
    return
}