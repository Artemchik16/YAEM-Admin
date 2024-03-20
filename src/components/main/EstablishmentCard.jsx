import React from "react";


function EstablishmentCard({ establishments }) {


    return (
        <div>
            <h1>List with establishment cards</h1>
            {/* for loop in establishments backend dict */}
            {Object.keys(establishments).map((key) => (
                <div key={key} className="">
                    {/* getting data */}
                    <span className="">{establishments[key].name}</span>
                    <span className="">{establishments[key].address}</span>
                    <span className="">{establishments[key].description}</span>
                    <div className="">
                        {/* Add buttons or actions here */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default EstablishmentCard;
