import { useState } from "react";
import adminServices from "../Services/admin.services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "./Footer";

function RegisterAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const RegisterAdmin = (e) => {
    e.preventDefault();

    const adminData = {
      userName,
      name,
      email,
      password,
    };

    adminServices
      .RegisterAdmin(adminData)
      .then((response) => {
        console.log("Admin Registered", response.data);
        
        toast.success("Admin Registered! Auto-Redirecting....", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },  
         
        });
        setTimeout(() => {
          console.log("Admin Registered");
          navigate("/admin/AdminList");
        }, 2500);
      })
      .catch((error) => {
        console.log("Something Went Wrong", error);
        toast.error("Something went wrong!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  return (
    <div>
      <div className="container h-100">
        <div className="row">
          <div className="col-xl-2"></div>
          <div className="col-xl-8">
            <div className="text-center my-3">
              <div className="align-items-center d-flex">
                <button
                  type="button"
                  className="btn btn-info mb-3 "
                  onClick={() => {
                    navigate("/admin");
                  }}
                >
                  <i className="fa fa-home" aria-hidden="true"></i> Go To Back
                  Page
                </button>
              </div>
              <img
                src={
                  "https://images3.alphacoders.com/165/thumb-1920-165265.jpg"
                }
                alt="lmage"
                width="100"
                style={{ borderRadius: "50px" }}
              />
            </div>
            <div className="card shadow-lg border border-primary">
              <div className="card-body px-5 pt-5">
                <h1 className="fs-4 card-title fw-bold mb-1 text-center text-primary">
                  Register Admin
                </h1>
                <hr />
                <form onSubmit={(e) => RegisterAdmin(e)}>
                  <div className="row g-3 mt-0">
                    <div className="col-xl-6 col-md-6 col-12 col-sm-12 mb-1">
                      <input
                        id="userName"
                        type="text"
                        className="form-control"
                        name="userName"
                        required
                        autoFocus
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                      />
                    </div>
                    <div className="col-xl-6 col-md-6 col-12 col-sm-12 mb-1">
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="name"
                        required
                        autoFocus
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                      />
                    </div>
                    <div className="col-xl-6 col-md-6 col-12 col-sm-12 mb-1">
                      <input
                        id="email"
                        type="text"
                        className="form-control"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-Mail Address"
                      />
                    </div>
                    <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </div>
                  </div>

                  <div className="align-items-center d-flex">
                    <button
                      type="submit"
                      className="btn btn-primary form-control"
                    >
                      Register Admin
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegisterAdmin;
