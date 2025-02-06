import axios from "axios";

export const getData = async (url, setState) => {
    const response = await axios.get(url)
    setState(response.data)
    return
}