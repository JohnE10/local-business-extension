
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function BootstrapModal(props) {

    const tempData = props.nonExisting;
    const data = [];

    for (let i=0; i<tempData.length; i++) {
        // data.push({id: tempData[i].id, name: tempData[i].name, url: `'${tempData[i].url}',`, search: tempData[i].search})
        data.push({id: tempData[i].id, name: tempData[i].name, url: tempData[i].url, search: tempData[i].search})

    }

    // for(const ele in tempData) {
    //     console.log('ele is: ', ele)
    //     // data.push({id: ele.id, name: ele.name, url: ele.url, search: ele.search})
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

                    {data.map((ele) => (
                        <div key={ele.id}>{ele.url}</div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
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