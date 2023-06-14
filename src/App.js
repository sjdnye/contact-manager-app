import './App.css';
import {COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW} from "./helpers/colors";
import {Navbar, Contacts, AddContact, EditContact, ViewContact, Contact} from "./components";
import {createContact, getAllContacts, getAllGroups, deleteContact, updateContact} from "./services/contactService"
import {ContactContext} from "./context/contactContext";

import {useState, useEffect} from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import {confirmAlert} from 'react-confirm-alert'

const App = () => {
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [groups, setGroups] = useState([]);
    const [contact, setContact] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        fetchDataFromJsonServer();
    }, [])

    const fetchDataFromJsonServer = () => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();
                setContacts(contactsData);
                setFilteredContacts(contactsData)
                setGroups(groupsData);
                setLoading(false)
            } catch (err) {
                setLoading(false)
                console.log(err)
                setContacts([])
            }
        }

        fetchData();
    }

    const onContactChange = (event) => {
        setContact({...contact, [event.target.name]: event.target.value})
    }

    const createContactForm = async (event) => {
        event.preventDefault();
        try {
            setLoading((prevLoading) => !prevLoading)
            const {status, data} = await createContact(contact)
            if (status === 201) {
                setContact({});
                const allContacts = [...contacts, data]
                setContacts(allContacts);
                setFilteredContacts(allContacts)
                setLoading((prevLoading) => !prevLoading)
                navigate("/contacts")
            }
        } catch (e) {
            console.log(e.message())
            setLoading((prevLoading) => !prevLoading)
        }
    }


    const removeContact = async (contactId) => {
        const prevAllContacts = [...contacts]
        const newContactsList = contacts.filter(c => c.id !== parseInt(contactId))
        try {
            setLoading(true);
            setContacts(newContactsList)
            setFilteredContacts(newContactsList)
            const {status} = await deleteContact(contactId);
            if (status !== 200) {
                setContact(prevAllContacts)
                setFilteredContacts(prevAllContacts)
            }
            setLoading(false)
        } catch (e) {
            console.log(e.message())
            setContact(prevAllContacts)
            setFilteredContacts(prevAllContacts)
            setLoading(false)
        }
    }

    let filterTimeout;
    const contactSearch = (query) => {
        try {
            clearTimeout(filterTimeout);
            if(!query) return setFilteredContacts(([...contacts]))

            filterTimeout = setTimeout(() => {
                setFilteredContacts(
                    contacts.filter(c => {
                            return c.fullname
                                .toString()
                                .toLowerCase()
                                .includes(query.toLowerCase());
                        }
                    )
                )
            }, 1000)


        } catch (e) {
            console.log(e)
        }
    }
    const confirmDelete = (contactId, contactFullname) => {
        confirmAlert({
            customUI: ({onClose}) => {
                return (
                    <div
                        dir="rtl"
                        style={{
                            backgroundColor: CURRENTLINE,
                            border: `1px solid ${PURPLE}`,
                            borderRadius: "1em",
                        }}
                        className="p-4"
                    >
                        <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
                        <p style={{color: FOREGROUND}}>
                            مطمئنی که میخوای مخاطب {contactFullname} رو پاک کنی ؟
                        </p>
                        <button
                            onClick={() => {
                                removeContact(contactId);
                                onClose();
                            }}
                            className="btn mx-2"
                            style={{backgroundColor: PURPLE}}
                        >
                            مطمئن هستم
                        </button>
                        <button
                            onClick={onClose}
                            className="btn"
                            style={{backgroundColor: COMMENT}}
                        >
                            انصراف
                        </button>
                    </div>
                );
            },
        });
    };

    return (
        <ContactContext.Provider value={{
            loading: loading,
            setLoading: setLoading,
            contact: contact,
            setContact: setContact,
            contacts: contacts,
            setContacts: setContacts,
            filteredContacts: filteredContacts,
            setFilteredContacts: setFilteredContacts,
            groups: groups,
            onContactChange: onContactChange,
            deleteContact: confirmDelete,
            createContact: createContactForm,
            contactSearch: contactSearch
        }}>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Navigate to="/contacts"/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/contacts/add" element={<AddContact/>}/>
                    <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                    <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
                </Routes>
            </div>

        </ContactContext.Provider>
    )
        ;
}

export default App;
