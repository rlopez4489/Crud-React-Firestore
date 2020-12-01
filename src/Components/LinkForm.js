import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';
import { db } from '../firebase';

const LinkForm = (props) => {

    const initialStateValues = {
        url: '',
        name: '',
        description: ''
    };

    const [values,setValues] = useState(initialStateValues);

    const validURL = (str) => {
        var pattern = new RegExp(
            "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
            "i"
        ); // fragment locator
        return !!pattern.test(str);
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (!validURL(values.url)) {
            return toast('Invalid URL', {
                type: "warning",
                autoClose: 2000
            })
        }
        props.addOrEditLink(values);
        setValues({...initialStateValues})
    }

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({...values, [name]: value});
    }

    const getlinkById = async id => {
        const doc = await db.collection('links').doc(id).get();
        setValues({...doc.data()})
    }
    useEffect(() => {
        if(props.currentId === '') {
            setValues({...initialStateValues})
        } else {
            getlinkById(props.currentId);
        }
    }, [props.currentId]);

    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">insert_link</i>
                </div>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="https://someurl.com" 
                    name="url"
                    onChange={handleInputChange}
                    value={values.url}    
                    />
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light">
                    <i className="material-icons">create</i>
                </div>    
                <input 
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Website name"
                    onChange={handleInputChange}   
                    value={values.name}
                />
            </div>
            <div className="form-group">
                <textarea 
                    name="description" 
                    rows="3" 
                    className="form-control"
                    placeholder="Write a description" 
                    onChange={handleInputChange}   
                    value={values.description}
                >
                </textarea>
            </div>
            <button className="btn btn-primary btn-block">
                {props.currentId === '' ? 'Save' : 'Update'}
            </button>
        </form>
    )
}

export default LinkForm