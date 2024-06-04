// Import react
import React from "react";
// Import QR library
import QRCode from "qrcode.react";
// Import MDB
import { MDBModal, MDBInputGroup, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalTitle, MDBModalBody, MDBModalFooter, MDBBtn } from 'mdb-react-ui-kit';

export default function QRModal({ open, establishmentName, establishmentUrl, onClose }) {

    // Convert qr code to png and download this
    const handleDownloadQR = () => {
        const canvas = document.getElementById("QR-code");
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${establishmentName}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    // HTML block
    return (
        // Modal
        <MDBModal open={open} tabIndex="-1" staticBackdrop>
            <MDBModalDialog centered>
                <MDBModalContent>
                    <MDBModalHeader>
                        {/* Name */}
                        <MDBModalTitle>Онлайн QR код <span className="yaem-color">{establishmentName}</span></MDBModalTitle>
                        {/* Close handler */}
                        <MDBBtn className='btn-close' color='none' onClick={onClose}></MDBBtn>
                    </MDBModalHeader>
                    <MDBModalBody className="">
                        {/* Generate QR code block */}
                        <QRCode id='QR-code' size={250} value={`https://yaem.kz/${establishmentUrl}/menu`} />
                        <p>Отсканируйте / скачайте QR код для просмотра меню</p>
                        <MDBInputGroup className='mb-3'>
                            {/* URL */}
                            <input className='form-control' value={`https://yaem.kz/${establishmentUrl}/menu`} type='text' disabled />
                            <MDBBtn color="success" className="btn-success btn-animate">
                                {/* Redirect to main menu page */}
                                <a className="text-light" href={`https://yaem.kz/${establishmentUrl}/menu`} target="_blank">
                                    Перейти в меню</a>
                            </MDBBtn>
                        </MDBInputGroup>
                        <p className="text-start my-1 fw-bold note note-secondary">*Настольные QR коды предоставляются в Тарифах "Серебро" / "Золото"</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        {/* Png download */}
                        <button
                            className="btn btn-outline-dark btn-animate btn-sm mx-2 py-2"
                            onClick={handleDownloadQR}
                        >
                            <i class="fas fa-download mx-1"></i>
                            Скачать png
                        </button>
                        {/* Close handler */}
                        <MDBBtn color='danger' onClick={onClose}>
                            Закрыть
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModalContent>
            </MDBModalDialog>
        </MDBModal>
    );
}
