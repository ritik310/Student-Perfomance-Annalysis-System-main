
import Footer from '../Footer';
import UserNavBar from "./UserNavBar";

function User() {
    return (
        <div>
            <UserNavBar/>
       
           <div style={{
            backgroundImage: `url(https://wallpapercave.com/wp/wp9467046.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
        }}></div>


            <Footer />
        </div>
    );
}

export default User;