// apiService.js
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL

export const fetchparts = async () => {
    return axios.get(`${apiUrl}/getParts`)
};

export const createparts = async (item) => {
    return axios.post(`${apiUrl}/createPart`,
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

export const updatepart = async (item) => {
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

