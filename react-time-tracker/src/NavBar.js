import React from 'react';

const NavBar = () => {
    return (
        <div className="navbar navbar-expand-sm navbar-dark bg-primary">
            <span className="navbar-brand px-4">Time Traker <i className="fas fa-chart-line fa-md"></i></span>

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navLinks">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse navbar-nav text-center justify-content-between mx-3" id="navLinks">

                <a href="index.html" className="nav-item nav-link active">Dashboard</a>
                {/* <!-- <a href="#" class="nav-item nav-link ">Modify Shifts</a>
                <a href="#" class="nav-item nav-link">Set Goals</a> --> */}
                {/* <!-- <a href="all-hours.html" class="nav-item nav-link">See Stats</a> --> */}

            </div>
        </div>
    )
};

export default NavBar
