import './App.css';
import {Navbar, Contacts, AddContact, EditContact, ViewContact, Contact} from "./components";

import {useState} from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'

const App = () => {
    let [contacts, setContacts] = useState([]);
    let [loading, setLoading] = useState(false)
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
