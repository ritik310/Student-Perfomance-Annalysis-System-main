 import { useState } from "react";
import adminService from "../Services/admin.services";
import { useNavigate } from "react-router-dom";
 import  { Toaster } from "react-hot-toast";
// import Footer from "./Footer";

function LoginForm() {
  const [UserName, setUsername] = useState("");
  const [StudentId,setStudnetId] = useState("")
  const [Password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const loginUser = (e) => {
    e.preventDefault();
    const user = { UserName, Password };

    if (role === "Admin") {
      adminService
        .login(user,"adminLogin")
        .then((response) => {
          localStorage.setItem("user-token", JSON.stringify(response.data));
          navigate("/admin");
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    } else if (role === "User") {
      console.log(role)
      setStudnetId(UserName)
      const newuser = {StudentId,Password}
      adminService
        .login(newuser,"studentLogin")
        .then((response) => {
          localStorage.setItem("user-token", JSON.stringify(response.data));
          console.log(response.data)
          navigate("/User");
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://blog.schoolspecialty.com/wp-content/uploads/2015/10/office-1200x624.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 2200,
        }}
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6">
            <div className="card shadow-lg border border-primary">
              <div className="card-body p-5">
                <h1 className="fs-4 card-title fw-bold mb-4 text-center text-primary">
                  Login
                </h1>
                <form onSubmit={(e) => loginUser(e)}>
                  <div className="mb-4">
                    <input
                      id="userName"
                      type="text"
                      className="form-control"
                      name="userName"
                      required
                      autoFocus
                      value={UserName}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="UserName"
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      name="password"
                      required
                      value={Password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                  <div className="mb-4">
                    <select
                      id="myDropdown"
                      name="Role"
                      className="form-control"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select Option</option>
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div className="d-flex align-items-center">
                    <button
                      type="submit"
                      className="btn btn-primary form-control"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default LoginForm;
