import React from "react";
import QRCode from "qrcode.react";
import { MDBModal,MDBInputGroup, MDBInput, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';

function QRModal({ open, establishmentName, establishmentUrl, onClose }) {
    return (
        <MDBModal open={open} tabIndex="-1" staticBackdrop>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        <MDBModalTitle>Онлайн QR код <span className="yaem-color">{establishmentName}</span></MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="">
                        <QRCode size={300} value={`https://yaem.kz/${establishmentUrl}/menu`}/>
                        <p>Отсканируйте / скачайте QR код для просмотра меню</p>
                        <MDBInputGroup className='mb-3'>
                            <input className='form-control' value={`https://yaem.kz/${establishmentUrl}/menu`} type='text' disabled/>
                                <MDBBtn color="success" className="btn-success btn-animate">
                                <a className="text-light" href={`https://yaem.kz/${establishmentUrl}/menu`} target="_blank">
                                Перейти в меню</a>
                                </MDBBtn>
                        </MDBInputGroup>
{/*                         <a href={`https://yaem.kz/${establishmentUrl}/menu`} target="_blank"> */}
{/*                             <MDBBtn className="btn-success btn-animate">Перейти в меню</MDBBtn> */}
{/*                         </a> */}
                        <p className="text-start mt-3 fw-bold note note-secondary">*Настольные QR коды предоставляются в Тарифах "Серебро" / "Золото"</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                    <button className="btn btn-outline-dark btn-animate btn-sm mx-2 py-2"><i class="fas fa-download mx-1"></i> Скачать png</button>
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
