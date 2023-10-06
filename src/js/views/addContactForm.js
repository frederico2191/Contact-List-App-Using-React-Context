import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { urlApiContact } from "../component/url";

const AddContactForm = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      fetch(urlApiContact + params.id)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener contacto");
          }
          return response.json();
        })
        .then((data) => {
          setFullName(data.full_name);
          setEmail(data.email);
          setPhone(data.phone);
          setIsEditing(true);
        })
        .catch((error) => console.error(error));
    }
  }, [params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = isEditing ? urlApiContact + params.id : urlApiContact;
    const method = isEditing ? "PUT" : "POST";

    const newContact = {
      full_name: fullName,
      email: email,
      agenda_slug: "my_super_agenda",
      address: address,
      phone: phone,
    };

    setFullName("");
    setPhone("");
    setEmail("");

    fetch(url, {
      method: method,
      body: JSON.stringify(newContact),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw Error(response.statusText);
        return response.json();
      })
      .then((response) => {
        console.log("Success:", response);
        alert("created OK");
        navigate("/");
      })
      .catch((error) => alert(error));
  };

  return (
    <form className="EditContactForm mx-5" onSubmit={handleSubmit}>
      <div className="form-group row mb-1">
        <label htmlFor="fullName" className="col-sm-2 col-form-label">
          Full Name
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row mb-1">
        <label htmlFor="phone" className="col-sm-2 col-form-label">
          Phone
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row mb-1">
        <label htmlFor="email" className="col-sm-2 col-form-label">
          Email
        </label>
        <div className="col-sm-10">
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group row mb-1">
        <label htmlFor="address" className="col-sm-2 col-form-label">
          Address
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <button type="submit" className="btn btn-success mt-3">
        {isEditing ? "Edit Contact" : "Add Contact"}
      </button>
    </form>
  );
};

export default AddContactForm;
