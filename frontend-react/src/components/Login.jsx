import React, { useState, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = { username, password };
    console.log("userData => ", userData);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/token/",
        userData
      );
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      console.log("Login succesful");
      setIsLoggedIn(true);
      navigate("/dashboard");
    } catch (error) {
      console.error("Invalid credentials");
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-6 bg-light-dark p-5 rounded">
            <h3 className="text-light text-center mb-4">Login to our Portal</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control mb-1"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <small className="text-danger text-center">{error}</small>
              )}
              <div className="d-flex justify-content-center">
                {loading ? (
                  <button
                    type="submit"
                    className="btn btn-info d-block mx-auto"
                    disabled
                  >
                    <FontAwesomeIcon icon={faSpinner} spin />
                    Logging in...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-info d-block mx-auto"
                  >
                    Login
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

export default Login;
