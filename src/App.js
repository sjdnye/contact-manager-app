import './App.css';
import {COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW} from "./helpers/colors";
import {Navbar, Contacts, AddContact, EditContact, ViewContact, Contact} from "./components";
import {createContact, getAllContacts, getAllGroups, deleteContact} from "./services/contactService"

import {useState, useEffect} from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import {confirmAlert} from 'react-confirm-alert'

const App = () => {
    const [contacts, setContacts] = useState([]);
    const [forceRender, setForceRender] = useState(false)
    const [loading, setLoading] = useState(false);
    const [getGroups, setGroups] = useState([]);
    const [getContact, setContact] = useState({
        fullname: "",
        photo: "",
        mobile: "",
        email: "",
        job: "",
        group: ""
    })
    const [query, setQuery] = useState({text: ""})
    const [getFilteredContact, setFilteredContact] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        fetchDataFromJsonServer();
    }, [])

    useEffect(() => {
        fetchDataFromJsonServer()
    }, [forceRender])

    const setContactInfo = (event) => {
        setContact({...getContact, [event.target.name]: event.target.value})
    }

    const createContactForm = async (event) => {
        event.preventDefault();
        try {
            const {status} = await createContact(getContact)

            if (status === 201) {
                setContact({});
                setForceRender(!forceRender)
                navigate("/contacts")
            }

        } catch (e) {
            console.log(e.message())
        }

    }

    const confirm = (contactId, contactFullname) => {
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


    const removeContact = async (contactId) => {
        try {
            setLoading(true);
            const response = await deleteContact(contactId);
            if (response) {
                const {data: contactsData} = await getAllContacts()
                setContacts(contactsData)
                setLoading(false)
            }

        } catch (e) {
            console.log(e.message())
            setLoading(false)
        }
    }

    const fetchDataFromJsonServer = () => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data: contactsData} = await getAllContacts();
                const {data: groupsData} = await getAllGroups();
                setContacts(contactsData);
                setFilteredContact(contactsData)
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

    const searchContacts = (event) => {
        setQuery({...query, text: event.target.value});
        const filteredContacts = contacts.filter((contact) => {
            return contact.fullname
                .toLowerCase()
                .includes(event.target.value.toLowerCase())
        });
        setFilteredContact(filteredContacts);
    }

    return (
        <div className="App">
            <Navbar query={query} search={searchContacts}/>
            <Routes>
                <Route path="/" element={<Navigate to="/contacts"/>}/>
                <Route path="/contacts"
                       element={
                           <>
                               <Contacts contacts={getFilteredContact} loading={loading} confirmDelete={confirm}/>
                           </>
                       }
                />
                <Route path="/contacts/add"
                       element={
                           <AddContact
                               loading={loading}
                               setContactInfo={setContactInfo}
                               contact={getContact}
                               groups={getGroups}
                               createContactForm={createContactForm}
                           />
                       }
                />
                <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                <Route path="/contacts/edit/:contactId"
                       element={
                           <EditContact
                               setForceRender={setForceRender}
                               forceRender={forceRender}
                           />}
                />
            </Routes>
            {/*<Contacts contacts={contacts} loading={loading}/>*/
            }
        </div>
    )
        ;
}

export default App;
