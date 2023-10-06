import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/Card.js";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    actions.getAgenda();
  }, []);

  return (
    <div className="text-center mt-3">
      <div
        className="container d-flex justify-content-end mb-4"
        style={{ width: "82%" }}
      >
        <Link to="/demo">
          <button className="btn btn-success">Add new contact</button>
        </Link>
      </div>
      <div className="container">
        {store.agenda.map((contact, index) => (
          <Card data={contact} key={index} />
        ))}
      </div>
    </div>
  );
};
