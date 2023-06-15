import './App.css';
import {COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW} from "./helpers/colors";
import {contactSchema} from "./validations/contactValidation"
import {Navbar, Contacts, AddContact, EditContact, ViewContact, Contact} from "./components";
import {createContact, getAllContacts, getAllGroups, deleteContact, updateContact} from "./services/contactService"
import {ContactContext} from "./context/contactContext";

import {useState, useEffect} from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import {confirmAlert} from 'react-confirm-alert'
import _ from 'lodash'
import {useImmer} from 'use-immer'
import {ToastContainer, toast} from 'react-toastify'

const App = () => {
    const [loading, setLoading] = useImmer(false);
    const [contacts, setContacts] = useImmer([]);
    const [filteredContacts, setFilteredContacts] = useImmer([]);
    const [groups, setGroups] = useImmer([]);
    // const [errors, setErrors]  =useState([]);

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

    const createContactForm = async (values) => {
        try {
            // setLoading((prevLoading) => !prevLoading)

            //Immer approach
            setLoading(draft => !draft)

            // await contactSchema.validate(contact, {
            //     abortEarly: false
            // })
            const {status, data} = await createContact(values)
            if (status === 201) {
                toast.dark("contact added successfully");
                // const allContacts = [...contacts, data]
                // setContacts(allContacts);
                // setFilteredContacts(allContacts)

                //Immer approach
                setContacts(draft => {
                    draft.push(data)
                })
                setFilteredContacts(draft => {
                    draft.push(data)
                })

                // setLoading((prevLoading) => !prevLoading)
                //Immer approach
                setLoading(draft => !draft)
                navigate("/contacts")
            }
        } catch (e) {
            console.log(e.message);
            // console.log(e.inner);
            // setErrors(e.inner);
            // setLoading((prevLoading) => !prevLoading);

            //Immer approach
            setLoading(draft => !draft)
        }
    }


    const removeContact = async (contactId) => {
        const prevAllContacts = [...contacts]
        // const newContactsList = contacts.filter(c => c.id !== parseInt(contactId))
        try {
            setLoading(true);
            // setContacts(newContactsList)
            // setFilteredContacts(newContactsList)

            setContacts(draft => draft.filter(c => c.id !== parseInt(contactId))
            )
            setFilteredContacts(draft => draft.filter(c => c.id !== parseInt(contactId))
            )

            const {status} = await deleteContact(contactId);
            if (status !== 200) {
                toast.error("something went wrong!!")
                setContacts(prevAllContacts)
                setFilteredContacts(prevAllContacts)
            }
            setLoading(false)
            toast.dark("contact has been remove successfully")
        } catch (e) {
            console.log(e.message())
            setContacts(prevAllContacts)
            setFilteredContacts(prevAllContacts)
            setLoading(false)
        }
    }

    // let filterTimeout;
    const contactSearch = _.debounce((query) => {
        try {
            // clearTimeout(filterTimeout);
            if (!query) return setFilteredContacts(([...contacts]))

            // filterTimeout = setTimeout(() => {
            setFilteredContacts(draft =>
                draft.filter(c =>
                    c.fullname
                        .toString()
                        .toLowerCase()
                        .includes(query.toLowerCase())
                )
            )
            // }, 1000)
        } catch (e) {
            console.log(e)
        }
    }, 1000)
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
            contacts: contacts,
            setContacts: setContacts,
            filteredContacts: filteredContacts,
            setFilteredContacts: setFilteredContacts,
            groups: groups,
            // errors: errors,
            deleteContact: confirmDelete,
            createContact: createContactForm,
            contactSearch: contactSearch
        }}>
            <div className="App">
                <ToastContainer
                    rtl={true}
                    position="top-right"
                    theme="dark"
                />
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
