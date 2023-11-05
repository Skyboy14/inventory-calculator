// apiService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

export const fetchproducts = async () => {
    return axios.get(`${apiUrl}/products`)
};

export const createproducts = async (item) => {
    return axios.post(`${apiUrl}/product`,
        {
            categoryName: item.baseCategory,
            product: item.productName,
            installation: item.install,
            unInstallation: item.uninstall,
            hauloff: item.hauloff,
        })
        .then((data) => {
            item.setValidated(true)
            return data
        })
        .catch((err) => console.log(err))
};

export const updateproduct = async (item) => {
    return axios.put(`${apiUrl}/product`,
        {
            categoryName: item.baseCategory,
            product: item.productName,
            installation: item.install,
            unInstallation: item.uninstall,
            hauloff: item.hauloff,
        })
        .then((data) => {
            item.setValidated(true)
            return data
        })
        .catch((err) => console.log(err))
};

