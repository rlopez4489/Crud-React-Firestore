import React, {useEffect, useState} from 'react'
import LinkForm from './LinkForm'
import {db} from '../firebase'
import {toast} from 'react-toastify'

const Links = () => {

    const [links, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const addOrEditLink = async (linkObject) => {
        try{ 
            if (currentId === '') {
                await db.collection('links').doc().set(linkObject)
                toast('New link added', {
                    type: "success"
                })
            } else {
                await db.collection('links').doc(currentId).update(linkObject)
                toast('Link update succesfully', {
                    type: "info",
                    autoClose: 2000
                })
                setCurrentId('');     
            }
        } catch (error) {
            console.error(error)
        }
    }

    const onDeleteLink = async id => {
        if (window.confirm("Are you sure you want delete this link?")) {
            await db.collection('links').doc(id).delete();
            toast('Link removed successfuly', {
                type: "error",
                autoClose: 2000
            })
        }
        
    }

    const getLinks = () => {
        db.collection('links').onSnapshot((querySnashot) => {
            const docs = [];
            querySnashot.forEach(doc => {
                docs.push({...doc.data(), id: doc.id});
            })
            setLinks(docs);
        });
    }

    useEffect(() =>{
        getLinks()
    }, []);
    return (
        <React.Fragment>
            <LinkForm {...{addOrEditLink, currentId, links}}/>
            <div className="mt-3">
                {links.map(link => (
                   <div key={link.id} className="card mb-1">
                       <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h4>{link.name}</h4>
                                <div>
                                    <i className="material-icons" onClick={() => setCurrentId(link.id)}>create</i>
                                    <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                </div>
                            </div>
                            <p>{link.description}</p>
                            <a href={link.url} target="_blank" rel="noreferrer">Go to website</a>
                       </div>
                   </div>
                ))}
            </div>
        </React.Fragment>
    )
}

export default Links