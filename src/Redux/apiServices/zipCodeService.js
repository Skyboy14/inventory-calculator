// apiService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

export const fetchZipCode = async () => {
    return axios.get(`${apiUrl}/zips`)
};

export const createZipCode = async (item) => {
    return axios.post(`${apiUrl}/createPart`,
        {
            zip: item.zipCode,
            city: item.city,
            miles: item.miles

        })
        .then((data) => {
            item.setValidated(true)
            return data
        })
        .catch((err) => console.log(err))
};

export const updatezipCode = async (item) => {
    return axios.put(`${apiUrl}/updatePart`,
        {
            partName: item.partName,
            partPrice: item.partPrice,
            installation: item.install,
            unInstallation: item.uninstall,
            haulOff: item.hauloff,
        })
        .then((data) => {
            item.setValidated(true)
            return data
        })
        .catch((err) => console.log(err))
};

