import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserNavBar from "./UserNavBar"; // Assuming you have a StudentNavBar component
import toast from "react-hot-toast";
import Services from "../../Services/admin.services";
import Footer from "../Footer";

function StudentProfile() {
    const [isDisabled, setIsDisabled] = useState(true);
    const [studentId,setStudnetId]=useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [dob, setDob] = useState("");
    const [sex, setSex] = useState("");
    const [courseName, setCourseName] = useState("");
    const [batch, setBatch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        const val = localStorage.getItem("user-token");
        const object = JSON.parse(val);
        setStudnetId(object.studentId);
        Services
            .GetStudent(object.studentId) // Assuming GetStudentDetail fetches student details based on the user ID
            .then((response) => {
                const data = response.data;
                setStudnetId(object[0].studentId);
                setFirstName(object[0].firstName);
                setMiddleName(object[0].middleName);
                setLastName(object[0].lastName);
                setEmail(object[0].email);
                setMobile(object[0].mobile);
                setDob(object[0].dob);
                setSex(object[0].sex);
                setCourseName(object[0].courseName);
                setBatch(object[0].batch);
                
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
        if (firstName === "" || lastName === "" || email === "" || mobile === "" || dob === "" || sex === "" || courseName === "" || batch === "") {
            toast.error("Please fill in all fields.", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            return;
        }

       
          
    };

    return (
        <div>
            {/* <UserNavBar /> */}
            <div className="container h-100">
                <div className="row justify-content-sm-center h-100">
                    <div className="col-xl-8 col-md-8 col-12 col-sm-12">
                        <div className="card shadow-lg mt-5">
                            <div className="card-body px-5 pt-5">
                                <h1 className="fs-4 card-title fw-bold mb-4 text-center text-primary">
                                    Student Profile
                                </h1>
                                <hr />

                                <div className="row g-3">
                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="firstName">
                                            First Name
                                        </label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            required
                                            value={firstName}
                                            disabled={isDisabled}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="middleName">
                                            Middle Name
                                        </label>
                                        <input
                                            id="middleName"
                                            type="text"
                                            className="form-control"
                                            name="middleName"
                                            required
                                            value={middleName}
                                            disabled={isDisabled}
                                            onChange={(e) => setMiddleName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="lastName">
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            required
                                            value={lastName}
                                            disabled={isDisabled}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
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
                                        <label className="mb-2 text-muted" htmlFor="mobile">
                                            Mobile
                                        </label>
                                        <input
                                            id="mobile"
                                            type="tel"
                                            className="form-control"
                                            name="mobile"
                                            required
                                            value={mobile}
                                            disabled={isDisabled}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>
                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="dob">
                                            Date of Birth
                                        </label>
                                        <input
                                            id="dob"
                                            type=""
                                            className="form-control"
                                            name="dob"
                                            required
                                            value={dob}
                                            disabled={isDisabled}
                                            onChange={(e) => setDob(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="row g-3">
                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="sex">
                                            Sex
                                        </label>
                                        <input
                                            id="sex"
                                            type="text"
                                            className="form-control"
                                            name="sex"
                                            required
                                            value={sex}
                                            disabled={isDisabled}
                                            onChange={(e) => setSex(e.target.value)}
                                        />
                                    </div>
                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="courseName">
                                            Course Name
                                        </label>
                                        <input
                                            id="courseName"
                                            type="text"
                                            className="form-control"
                                            name="courseName"
                                            required
                                            value={courseName}
                                            disabled={isDisabled}
                                            onChange={(e) => setCourseName(e.target.value)}
                                        />
                                    </div>
                                    <div className="col mb-3">
                                        <label className="mb-2 text-muted" htmlFor="batch">
                                            Batch
                                        </label>
                                        <input
                                            id="batch"
                                            type="text"
                                            className="form-control"
                                            name="batch"
                                            required
                                            value={batch}
                                            disabled={isDisabled}
                                            onChange={(e) => setBatch(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="align-items-center d-flex">
                                    <button
                                        type="button"
                                        className="btn btn-primary"
                                        onClick={() => navigate("/User")}
                                    >
                                        Go Back
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

export default StudentProfile;
