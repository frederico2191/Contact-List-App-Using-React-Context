import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Card = ({ data }) => {
  const { actions } = useContext(Context);

  const handleDeleteClick = () => {
    actions
      .deleteContact(data.id)
      .then(() => {
        actions.getAgenda();
      })
      .catch((error) => {
        console.log("Error al eliminar el contacto:", error);
      });
  };

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="card mb-3" style={{ width: "82%" }}>
        <div className="row g-0">
          <div className="col-md-3">
            <img
              src={`https://api.multiavatar.com/${data.full_name}.png`}
              className="img-fluid rounded-start"
              style={{ width: "70%" }}
              alt="..."
            />
          </div>
          <div className="col-md-7">
            <div className="card-body text-start">
              <h5 className="card-title">{data.full_name}</h5>
              <p className="card-text">
                <i className="fa-solid fa-location-dot me-3"></i>
                {data.address}
              </p>
              <p className="card-text">
                <i className="fa-solid fa-phone-flip me-3"></i>
                <small className="text-body-secondary">{data.phone}</small>
              </p>
              <p className="card-text">
                <i className="fa-solid fa-envelope me-3"></i>
                <small className="text-body-secondary">{data.email}</small>
              </p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="card-body text-end">
              <Link to={`/edit-form/${data.id}`}>
                <button className="btn btn-warning btn-block w-100 m-1">
                  Edit
                </button>
              </Link>
              <Link to={`/demo/edit?contactId=${data.id}`}>
                <i className="fa-solid fa-pen me-3"></i>
              </Link>
              <i
                className="fa-solid fa-trash-can me-2"
                onClick={handleDeleteClick}
                style={{ cursor: "pointer" }}
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
