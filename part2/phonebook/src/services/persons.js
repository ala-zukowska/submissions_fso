import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = newContact => {
    return axios
    .post(baseUrl, newContact)
    .then(response => response.data)
}

const remove = id => {
    const url = `${baseUrl}/${id}`
    return axios
    .delete(url)
}

export default { getAll, create, remove }