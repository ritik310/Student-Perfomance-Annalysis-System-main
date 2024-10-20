import { useNavigate } from "react-router-dom";
import AdminNavBar from "./AdminNavBar";
import Footer from '../Footer';

function Admin() {
    const navigate = useNavigate();

    const divStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundImage: 'url(http://getwallpapers.com/wallpaper/full/3/c/4/368396.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
    };

    const contentStyle = {
        flexGrow: 1,
    };

    return (
        <div style={divStyle}>
            <AdminNavBar />
            <div style={contentStyle}>
                {/* Your admin content goes here */}
            </div>
            <Footer />
        </div>
    );
}

export default Admin;
