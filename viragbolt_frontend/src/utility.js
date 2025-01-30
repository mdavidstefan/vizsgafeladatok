import axios from "axios";

export const getData = async (url, setState) => {
    const response = await axios.get(url)
    setState(response.data)
    return
}

export const getSingleData = async (url, setState) => {
    const response = await axios.get(url)
    setState(response.data[0])
    return
}

export const updateData = async (url, data, setState) => {
    const response = await axios.put(url, data)
    setState(response.data)
    return
}