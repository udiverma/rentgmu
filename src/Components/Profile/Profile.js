import React from 'react';
import emptypfp from './emptypfp.png';

const ProfilePage = () => { 
    return (
    <>
    <div className = "profile-header-container">
        <h1 className="profile-header-title">RENTGMU</h1>
        <nav className="profile-nav">
        <a className="profile-a" href="#home">Home</a>
        <a className="profile-a" href="#rent">Rent</a>
        <a className="profile-a" href="#contact">Contact Us</a>
      </nav>
    </div>
    <div className = "profile-container">
        <img src={emptypfp} width={200} height={200} alt='' className='profile-image'/>
        <div className="profile-name">
            <h1>Shaan Ahmed</h1>
        </div>
        <div className='profile-contact-info'>
            <p>Email Address: [EMAIL]</p>
            <p>Listings: </p>
        </div>
    </div>
    </>
    
);
}

export default ProfilePage;