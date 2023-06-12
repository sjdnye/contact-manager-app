import {Fragment} from 'react'
import {CURRENTLINE, CYAN, ORANGE, PINK, PURPLE, RED} from "../../helpers/colors";
import Contact from "./Contact";
import Spinner from "../Spinner";
import {Link} from "react-router-dom";
import {useContext} from "react"
import {ContactContext} from "../../context/contactContext";

const Contacts = () => {
    const {filteredContacts, loading, deleteContact} = useContext(ContactContext)
    return (
        <>
            <section className="container mt-2">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3 float-end">
                                <Link to={"/contacts/add"} className="btn m-2" style={{backgroundColor: PINK}}>
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"/>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {loading ?
                (
                    <Spinner/>
                ) :
                (
                    <section className="container">
                        <div className="row">
                            {
                                filteredContacts.length > 0 ? filteredContacts.map(contact => (
                                        <Contact
                                            key={contact.id}
                                            contact={contact}
                                            confirmDelete={() => {
                                                deleteContact(contact.id, contact.fullName)
                                            }}/>
                                    )) :
                                    (
                                        <div className="text-center py-5" style={{backgroundColor: CURRENTLINE}}>
                                            <p className="h3" style={{color: ORANGE}}>
                                                مخاطب یافت نشد
                                            </p>
                                            <img src={require("../../assets/no-found.gif")} alt="not found"
                                                 className="w-25 img-fluid"/>
                                        </div>
                                    )
                            }
                        </div>
                    </section>
                )
            }
        </>
    )
}

export default Contacts;