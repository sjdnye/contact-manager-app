import {createContext} from "react"

export const ContactContext = createContext({
    loading: false,
    setLoading: () => {
    },
    contact: {},
    setContact: () => {
    },
    contacts: [],
    setContacts: () => {
    },
    filteredContacts: [],
    setFilteredContacts: () => {
    },
    groups: [],
    errors: [],
    onContactChange: () => {
    },
    createContact: () => {
    },
    contactSearch: () => {
    }
});