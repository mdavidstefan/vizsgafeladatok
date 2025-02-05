import axios from "axios";

export const getData = async ({ queryKey }) => {
    const response = await axios.get(queryKey[1])
    return response.data
}

export const updateData = async (url, data) => {
    const response = await axios.put(url, data)
    return response.data

}