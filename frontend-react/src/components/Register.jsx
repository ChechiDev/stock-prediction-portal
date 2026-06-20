import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [succes, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegistration = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      username,
      email,
      password,
    };
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/register/",
        userData
      );
      console.log("response data => ", response.data);
      setErrors({});
      setSuccess(true);
    } catch (error) {
      setErrors(error.response.data);
      console.error("Registration error: ", error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center mb-4">Create an account</h3>
            <form onSubmit={handleRegistration}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && (
                  <small className="text-danger text-center">
                    {errors.username}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control mb-1"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.username && (
                  <small className="text-danger text-center">
                    {errors.email}
                  </small>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.username && (
                  <small className="text-danger text-center:">
                    {errors.password}
                  </small>
                )}
              </div>
              {succes && (
                <div className="alert alert-success text-center mb-3">
                  Registration successful
                </div>
              )}
              <div className="d-flex justify-content-center">
                {loading ? (
                  <button
                    type="submit"
                    className="btn btn-info d-block mx-auto"
                    disabled
                  >
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Please wait...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-info d-block mx-auto"
                  >
                    Register
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
