
import './App.css';
import {Navbar, Contacts, AddContact, EditContact, ViewContact, Contact} from "./components";
import {getAllContacts, getAllGroups } from "./services/contactService"

import {useState, useEffect} from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import axios from "axios"

const App = () => {
    let [contacts, setContacts] = useState([]);
    let [loading, setLoading] = useState(false);
    const [getGroups, setGroups] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const {data : contactsData} = await getAllContacts();
                const { data: groupsData} = await getAllGroups();
                setContacts(contactsData);
                setGroups(groupsData);
                setLoading(false)
            }catch (err){
                setLoading(false)
                console.log(err)
                setContacts([])
            }
        }

        fetchData();
    }, [])
    return (
        <div className="App">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Navigate to="/contacts"/>}/>
                <Route path="/contacts" element={<Contacts contacts={contacts} loading={loading} />} />
                <Route path="/contacts/add" element={<AddContact/>}/>
                <Route path="/contacts/:contactId" element={<ViewContact/>}/>
                <Route path="/contacts/edit/:contactId" element={<EditContact/>}/>
            </Routes>
            {/*<Contacts contacts={contacts} loading={loading}/>*/}
        </div>
    );
}

export default App;
