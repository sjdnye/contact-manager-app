import SearchContacts from "./Contacts/SearchContacts";
import {PURPLE, BACKGROUND} from '../helpers/colors'

import {useLocation} from 'react-router-dom'

const Navbar = ({query, search}) => {
    const location = useLocation()
    return (
        <nav className="navbar navbar-dark navbar-expand-sm shadow-lg"
             style={{backgroundColor: BACKGROUND}}>
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <div className="navbar-brand">
                            <i className="fas fa-id-badge mx-2" style={{color: PURPLE}}/>
                            وب اپلیکیشن مدیریت {" "}
                            <span style={{color: PURPLE}}>مخاطبین</span>
                        </div>
                    </div>
                    {location.pathname === "/contacts" ?
                        <div className="col">
                            <SearchContacts query={query} search={search}/>
                        </div> : null
                    }

                </div>
            </div>
        </nav>
    )
}

export default Navbar;