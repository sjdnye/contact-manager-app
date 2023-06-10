import {Fragment} from 'react'
import {CURRENTLINE, CYAN, ORANGE, PINK, PURPLE, RED} from "../../helpers/colors";
import Contact from "./Contact";
import Spinner from "../Spinner";

const Contacts = ({contacts, loading}) => {
    return (
        <>
            <section className="container mt-2">
                <div className="grid">
                    <div className="row">
                        <div className="col-3">
                            <p className="h3">
                                <button className="btn mx-2" style={{backgroundColor: PINK}}>
                                    ساخت مخاطب جدید
                                    <i className="fa fa-plus-circle mx-2"/>
                                </button>
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
                                contacts.length > 0 ? contacts.map(contact => (
                                        <Contact key={contact.id} contact={contact}/>
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