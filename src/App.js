import './App.css';
import {Navbar, Contacts, AddContact, EditContact, ViewContact, Contact} from "./components";

import {useState} from "react";

const App = () => {
    let [contacts, setContacts] = useState([]);
    let [loading, setLoading] = useState(false)
    return (
        <div className="App">
            <Navbar/>
            <Contacts contacts={contacts} loading={loading}/>
        </div>
    );
}

export default App;
