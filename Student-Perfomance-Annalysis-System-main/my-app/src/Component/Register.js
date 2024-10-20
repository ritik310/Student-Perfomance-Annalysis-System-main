import { useState } from "react";
import adminServices from "../Services/admin.services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Footer from "./Footer";

function Register() {
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [mobile, setMobileNo] = useState("");
  const [dob, setDOB] = useState("");
  const [sex, setSex] = useState("");
  const [batch, setBatch] = useState("");
  const [courseName, setCourseName] = useState("");

 

  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    const user = {
      email,
      //password,
      firstname,
      lastname,
      mobile,
      middleName,
      dob,
      sex,
      batch,
      courseName,
    };

    adminServices
      .registerStudent(user)
      .then((response) => {
        console.log("User Registered", response.data);
        
        toast.success("User Registered! Auto-Redirecting....", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },  
         
        });
        setTimeout(() => {
          console.log("User Registered");
          navigate("/admin/StudentList");
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
                  "https://tse1.mm.bing.net/th?id=OIP.XElBsQ-eRCwW_3RRv3_rQQAAAA&pid=Api&P=0&h=180"
                }
                alt="lmage"
                width="100"
                style={{ borderRadius: "50px" }}
              />
            </div>
            <div className="card shadow-lg border border-primary">
              <div className="card-body px-5 pt-5">
                <h1 className="fs-4 card-title fw-bold mb-1 text-center text-primary">
                  Register
                </h1>
                <hr />
                <form onSubmit={(e) => registerUser(e)}>
                  <div className="row g-3 mt-0">
                    <div className="col-xl-6 col-md-6 col-12 col-sm-12 mb-1">
                      <input
                        id="firstname"
                        type="text"
                        className="form-control"
                        name="firstname"
                        required
                        autoFocus
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-xl-6 col-md-6 col-12 col-sm-12 mb-1">
                      <input
                        id="middleName"
                        type="text"
                        className="form-control"
                        name="middleName"
                        required
                        autoFocus
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                        placeholder="Middle Name"
                      />
                    </div>
                    <div className="col-xl-6 col-md-6 col-12 col-sm-12 mb-1">
                      <input
                        id="lastname"
                        type="text"
                        className="form-control"
                        name="lastname"
                        required
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="col-xl-6 col-md-6 col-12 col-sm-12 mb-1">
                      <input
                        id="email"
                        type="text"
                        className="form-control"
                        name="email"
                        required
                        ///pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="E-Mail Address"
                      />
                    </div>
                    {/* <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
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
                    </div> */}
                    <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-2">
                      <input
                        id="MobileNo"
                        type="text"
                        className="form-control"
                        name="MobileNo"
                        required
                        //pattern="[0-9]{10}"
                        value={mobile}
                        onChange={(e) => setMobileNo(e.target.value)}
                        placeholder="Mobile No"
                      />
                    </div>
                    <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
                      <input
                        id="DOB"
                        type="date"
                        className="form-control"
                        name="dob"
                        required
                        value={dob}
                        onChange={(e) => setDOB(e.target.value)}
                        placeholder="DOB"
                      />
                    </div>
                    <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
                      <input
                        id="sex"
                        type="text"
                        className="form-control"
                        name="sex"
                        required
                        value={sex}
                        onChange={(e) => setSex(e.target.value)}
                        placeholder="Sex"
                      />
                    </div>
                    <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
                      <input
                        id="batch"
                        type="text"
                        className="form-control"
                        name="batch"
                        required
                        value={batch}
                        onChange={(e) => setBatch(e.target.value)}
                        placeholder="Batch"
                      />
                    </div>
                    <div className="col-xl-6 col-12 col-md-6 col-sm-12 mb-1">
                      <input
                        id="courseName"
                        type="text"
                        className="form-control"
                        name="courseName"
                        required
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        placeholder="Course Name"
                      />
                    </div>
                  </div>

                  <p className="form-text text-center text-muted mb-3">
                    By registering you agree with our terms and condition.
                  </p>

                  <div className="align-items-center d-flex">
                    <button
                      type="submit"
                      className="btn btn-primary form-control"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
