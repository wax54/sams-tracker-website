import React from 'react';
import Header from '../Header';
import Dashboard from '../Dashboard';
const Home = () => {
    return (

        <div className="container-fluid p-2 align-items-center justify-content-around">
            <div className="row border m-3 p-4 rounded shadow justify-content-center">
            <Header />
            <Dashboard />
            </div>
        </div>
    )
};

export default Home