import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import toast from "react-hot-toast";
import adminServices from "../../Services/admin.services";
import Footer from "../Footer";

function AdminProfile() {
    const [isDisabled, setIsDisabled] = useState(true);
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [userName, setUserName] = useState("");
const [Name, setName] = useState("")
//const [user, setUser] = useState('');
const navigate = useNavigate();

useEffect(() => {  init();
}, []);
const init = () => {
    var val = localStorage.getItem("user-token");
    var object = JSON.parse(val);
    setUserName(object.userName);
    adminServices
        .GetAdminDetail(object.userName)
        .then((response) => {
            console.log("Object",object)
            // setUser(response.data[0]);
            setPassword(object[0].password);
            setUserName(object[0].userName);
            setEmail(object[0].email);
            setName(object[0].name);
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error);
        });
};



    const updateProfile = () => {
        setIsDisabled(false);
    };

    const updateUser = () => {
        if (email === "" || password === "" || userName === "" || Name === "" ) {
            console.log("Empty");
            toast.error("Something went wrong!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            return;
        }

        const data = { email, password, userName ,Name};
        adminServices
            .UpdateAdmin(userName, data)
            .then((response) => {
                console.log("User Updated", response.data);
                toast.success("Profile Updated! Log-In Again...", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                setTimeout(() => {
                    navigate("/");
                }, 2500);
            })
            .catch((error) => {
                console.log("Something went wrong", error);
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
            <AdminNavBar />
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xl-8 col-md-8 col-12 col-sm-12">
                        <div className="card shadow-lg mt-5">
                            <div className="card-body px-5 pt-5">
                                <h1 className="fs-4 card-title fw-bold mb-4 text-center text-primary">
                                    Admin Profile
                                </h1>
                                <hr />

                                <div className="row g-3">
                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="userName">
                                             UserName
                                        </label>
                                        <input
                                            id="userName"
                                            type="text"
                                            className="form-control"
                                            name="userName"
                                            required
                                            value={userName}
                                            disabled={isDisabled}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </div>

                                    {/* <div className="col mb-3">
                                            <label className="mb-2 text-muted" htmlFor="lastname">Last Name</label>
                                            <input id="lastname" type="text" className="form-control" name="lastname" required
                                                value={lastname} disabled={isDisabled}
                                                onChange={(e) => setLastname(e.target.value)}
                                            />
                                        </div> */}
                                </div>

                                <div className="row g-3">
                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="email">
                                            E-Mail Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            required
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            value={email}
                                            disabled={isDisabled}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="password">
                                            Password
                                        </label>
                                        <input
                                            id="Password"
                                            type="text"
                                            className="form-control"
                                            name="Password"
                                            required
                                            value={password}
                                            disabled={isDisabled}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="Name">
                                            Name
                                        </label>
                                        <input
                                            id="Name"
                                            type="text"
                                            className="form-control"
                                            name="Name"
                                            required
                                            value={Name}
                                            disabled={isDisabled}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>                                                                                                                                    
                                </div>

                                <div className="align-items-center d-flex">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onClick={() => navigate("/admin")}
                                    >
                                        Go Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-success ms-auto"
                                        onClick={() => updateProfile()}
                                    >
                                        Update Profile
                                    </button>

                                    <button
                                        type="submit"
                                        className="btn btn-success ms-auto"
                                        onClick={() => updateUser()}
                                    >
                                        Save Data
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminProfile;
