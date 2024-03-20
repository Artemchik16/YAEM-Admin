import React from "react";


function EstablishmentCard({ establishments }) {


    return (
        <div className="container">
        <div className="d-flex flex-wrap justify-content-evenly">
            {/* for loop in establishments backend dict */}
            {Object.keys(establishments).map((key) => (
//             <div class="card" style="width: 18rem;">
            //   <div class="card-body">
            //     <h5 class="card-title">Card title</h5>
            //     <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
            //     <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            //     <a href="#" class="card-link">Card link</a>
            //     <a href="#" class="card-link">Another link</a>
            //   </div>
            // </div>

                <div key={key} className="card mx-2 my-2" style={{width: '400px'}}>
                    <div className="card-body">
                        <h5 className="card-title">{establishments[key].name}</h5>
                        <p className="card-text text-muted">{establishments[key].address}</p>
                        <small className="card-text">{establishments[key].description}</small>
                        <hr/>
                        <div className="d-flex flex-wrap justify-content-evenly text-center">
                            <div className="btn btn-animate my-1" style={{width: '70px'}}><i className="fas fa-qrcode fa-lg"></i></div>
                            <div className="btn btn-animate my-1" style={{width: '70px'}}><i className="fas fa-book-open fa-lg"></i></div>
                            <div className="btn btn-animate my-1" style={{width: '70px'}}><i className="fas fa-pen fa-lg"></i></div>
                            <div className="btn btn-animate btn-outline-danger my-1" style={{width: '70px'}}><i className="fas fa-trash fa-lg"></i></div>
                        </div>
                    </div>
                </div>

            ))}
            </div>
        </div>
    );
}

export default EstablishmentCard;
