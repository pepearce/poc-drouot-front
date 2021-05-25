import React from 'react'

const Help = () => {
    return(
        <div>
                <button type="button" className="btn" data-toggle="modal" data-target="#exampleModal">
                <i className="far fa-question-circle"></i>
                </button>
                <div className="modal fade " id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title d-flex" id="exampleModalLabel">Help</h5>
                        
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-6"></div>
                            <p>Drouot Online est un site d'annonces.
                                Les ventes aux enchères sont organisées par des maisons de vente en France ou à l'étranger.
                            </p>
                            <p>
                                Si vous avez une question sur une vente ou sur un lot,
                                merci de contacter la maison de vente. Ses coordonnées sont disponibles sur le catalogue en ligne dans la rubrique "Opérateur de vente"
                            </p>
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div> */}
                    </div>
                </div>
                </div>
            </div>
            )
}

export default Help