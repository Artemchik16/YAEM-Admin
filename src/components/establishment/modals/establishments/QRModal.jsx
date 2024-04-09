import React from "react";
import QRCode from "qrcode.react";
import { MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';

function QRModal({ open, establishmentUrl, onClose }) {
    return (
        <MDBModal open={open} tabIndex="-1" staticBackdrop>
            <MDBModalDialog>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>QR Code для-{establishmentUrl}</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="text-center">
                        <QRCode value={`http://127.0.0.1:8000/${establishmentUrl}/menu`} />
                    </MDBModalBody>
                    <MDBModalBody className="text-center">
                        <a href={`http://127.0.0.1:8000/${establishmentUrl}/menu`} target="_blank">меню нах</a>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='secondary' onClick={onClose}>
                            Закрыть
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default QRModal;
