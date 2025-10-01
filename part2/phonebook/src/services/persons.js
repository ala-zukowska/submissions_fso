import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/persons'

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

const update = (id, newContact) => {
    const url = `${baseUrl}/${id}`
    return axios
    .put(url, newContact)
    .then(response => response.data)
}

export default { getAll, create, remove, update }