import React from "react";
import QRCode from "qrcode.react";
import { MDBModal, MDBInput, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';

function QRModal({ open, establishmentName, establishmentUrl, onClose }) {
    return (
        <MDBModal open={open} tabIndex="-1" staticBackdrop>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle> QR код {establishmentName}</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="text-center">
                        <QRCode size={300} value={`https://yaem.kz/${establishmentUrl}/menu`}/>
                        <p>Отсканируйте QR код для просмотра меню</p>
                        <p>{`https://yaem.kz/${establishmentUrl}/menu`}</p>
                        <a href={`https://yaem.kz/${establishmentUrl}/menu`} target="_blank">
                            <MDBBtn className="btn-animate">Перейти в меню</MDBBtn>
                        </a>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn color='danger' onClick={onClose}>
                            Закрыть
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}

export default QRModal;
