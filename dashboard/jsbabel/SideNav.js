
class SideNav extends React.Component {
    render() {
        return (
            <div className="scrollbar-inner">
              {/* <!-- Brand --> */}
              <div className="sidenav-header  align-items-center">
                <a className="navbar-brand" href="javascript:void(0)">
                  <img src="../assets/img/billologo.png" width="500px" height="500px"  className="navbar-brand-img" alt="logo here"/>
                </a>
              </div>
              <div className="navbar-inner">
                {/* <!-- Collapse --> */}
               
                <div className="collapse navbar-collapse" id="sidenav-collapse-main">
                 {/*  <!-- Nav items --> */}
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      
                      <a className="nav-link active" href="dashboard.html">
                        <i className="ni ni-tv-2 text-primary"></i>
                        <span className="nav-link-text">Dashboard</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="addevent.html">
                        <i className="ni ni-planet text-blue"></i>
                        <span className="nav-link-text">Add Event</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="addcontestant.html">
                        <i className="ni ni-planet text-blue"></i>
                        <span className="nav-link-text">Add Contestant</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="eventlist.html">
                        <i className="ni  ni-bullet-list-67 text-blue"></i>
                        <span className="nav-link-text">Events</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="contestants.html">
                        <i className="ni ni-single-02 text-blue"></i>
                        <span className="nav-link-text">Contestants</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="adduser.html">
                        <i className="ni ni-single-02 text-blue"></i>
                        <span className="nav-link-text">Add Another User</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link active" href="history.html">
                        <i className="ni ni-single-02 text-blue"></i>
                        <span className="nav-link-text">History</span>
                      </a>
                    </li>
                   
                  </ul>
                 {/*  <!-- Divider --> */}
                  <hr className="my-3"/>
                  
                
                </div>
              </div>
            </div>
        )
    }
}

const sidenav = React.createElement;
const domContainer = document.getElementById("sidenav-main");
ReactDOM.render(sidenav(SideNav), domContainer);