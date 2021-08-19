import React from 'react';
const Header = () =>{
    return (
        <div class="container-fluid p-2 align-items-center justify-content-around">
            <div class="row border m-3 p-4 rounded shadow justify-content-center">
                <form id="new-shift" class="col-xl border m-3 p-4 rounded shadow ">
                    <div class="row align-items-center justify-content-around">
                        <h1 class="col-lg-3 col-xl-12 display-4 text-center">New Shift!</h1>

                        <div class="col-12 col-lg-2 col-xl-5 m-2 mb-3">
                            <label for="type" class="form-label">Work-Type</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="type" placeholder="Coding"/>
                            </div>
                        </div>
                        <div class=" col-lg-3 col-xl-5 m-2 mb-3">
                            <label for="category" class="form-label">Category</label>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">For </span>
                                </div>
                                <input type="text" class="form-control" id="category" placeholder="Fun" />
                            </div>
                        </div>

                        <div id="clockin-buttons" class="col m-2 mb-3">
                            <button type="submit" class="btn btn-secondary col-12 p-3 px-md-5 ">Clock In</button>
                        </div>
                    </div>
                </form>

                <div class="col-xl m-3 p-4 rounded shadow border">
                    <div class="row align-items-center justify-content-around">
                        <h1 class="display-4 text-center col-12 col-md-3 col-xl-12">Current Shifts</h1>

                        <ul id="current-shifts" class="col-12 col-md-9 col-xl-12">
                            {/* <!-- <li class="row p-3 justify-content-center">
                                <div class="col-7 text-center display-6">
                                    <span class="type">Coding</span> for <span class="category">Fun</span>
                                </div>
            //<button class="col-3 btn btn-light">Clock Out</button>
                                <div class="col-4 dropdown">
                                    <button class="btn btn-secondary dropdown-toggle text-center" data-bs-toggle="dropdown" aria-haspopup="true">Clock
                                        Out</button>
                                    <div class="dropdown-menu">
                                        <button data-referenece="now" class="btn">Now</button>
                                        <button data-referenece="-15" class="btn">15 Mins Ago</button>
                                        <button class="btn">At Specific time</button>
                                    </div>
                                </div>
                            </li> --> */}
                            {/* <!--
                            <li class="row p-3 justify-content-around">

                                <div class="col text-center display-6">
                                    <span class="type">Laundry</span> for <span class="category">The House</span>
                                </div>

                                <button class="col-3 btn btn-light">Clock Out</button>
                            </li> --> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Header