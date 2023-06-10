import axios from 'axios'

const SERVER_URL = "http://localhost:9000"

// @desc Get  All Contact
// @route GET http://localhost:9000/contacts
export const getAllContacts = async() => {
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
}

// @desc Get Contact With Contact ID
// @route GET http://localhost:9000/contacts/:contactId
export const getContact = async (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.get(url)
}

// @desc Get  All Groups
// @route GET http://localhost:9000/groups
export const getAllGroups = async () => {
    const url = `${SERVER_URL}/groups`
    return axios.get(url)
}

// @desc Get  Group With groupId
// @route GET http://localhost:9000/groups/:groupId
export const getGroup = async (groupId) => {
    const url = `${SERVER_URL}/groups/${groupId}`
    return axios.get(url)
}

// @desc Create Contact
// @route POST http://localhost:9000/contacts
export const createContact = (contact) => {
    const url = `${SERVER_URL}/contacts`
    return axios.post(url, contact)
}

// @desc Update  Contact By contactId
// @route GET http://localhost:9000/contacts/:contactId
export const updateContact = (contact,contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.put(url, contact)
}

// @desc Delete Contact
// @route Delete http://localhost:9000/contacts/:contactId
export const deleteContact = (contactId) => {
    const url = `${SERVER_URL}/contacts/${contactId}`
    return axios.delete(url)
}

