
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BootstrapModal(props) {

    const [tempData, setTempData] = useState([]);

    useEffect(() => {
        if (props.allData) {
            setTempData(props.allData);
        }
        else if (props.nonExisting) {
            setTempData(props.nonExisting);
        }
    }, []);

    const data = [];

    // if (tempData) {
    //     if (tempData.length) {
    //         for (let i = 0; i < tempData.length; i++) {
    //             data.push({ id: tempData[i].id, name: tempData[i].name, url: tempData[i].url, search: tempData[i].search })
    //         }
    //     }

    // }

    console.log('data is: ', data);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Show List of URLs
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>List of URLs</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    {/* {data.map((ele) => ( */}
                    {tempData.map((ele) => (
                        
                        // <div key={ele.id}>{ele.url}</div>
                        <div key={ele.id}>{ele.page}</div>
                    ))}
                    
                </Modal.Body>

                <Modal.Footer>
                <a href='http://localhost:3000/utilities' target='_blank'>
                        <Button variant="secondary">
                            Utilities
                        </Button>
                    </a>

                    {/* <a href='http://localhost:3000/processEmails' target='_blank'> */}
                    <a href='http://localhost:3000/processEmails2' target='_blank'>
                        <Button variant="secondary">
                            Extract Emails
                        </Button>
                    </a>

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {/* <Button variant="primary">Understood</Button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default BootstrapModal;