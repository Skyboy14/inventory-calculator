import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL


export const mapPart = async (item) => {
    return axios.post(`${apiUrl}/mapPartProduct`,
        {
            partName: item.partName,
            productName: item.productName,
        })
        .then((res) => {
            item.message(res.data.title)
            item.status(res.data.status)
        })
        .catch((err) => console.log(err))
};