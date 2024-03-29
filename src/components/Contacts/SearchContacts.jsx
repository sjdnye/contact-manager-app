import {PURPLE} from '../../helpers/colors'
import {useContext} from "react";
import {ContactContext} from "../../context/contactContext";
const SearchContacts = () => {
    const {contactSearch} =  useContext(ContactContext);
    return (
        <div className="input-group mx-2 w-75" dir="ltr">
            <span className="input-group-text" id="basic-addon1" style={{backgroundColor: PURPLE}}>
                <i className="fas fa-search"/>
            </span>
            <input dir="rtl" type="text"
                   onChange={event => contactSearch(event.target.value)}
                   className="form-control"
                   placeholder="search user"
                   aria-label="Search"
                   aria-describedby="basic-addon1"/>
        </div>
    )
}

export default SearchContacts;