
class TopNav extends React.Component {
    render() {
        return (
            <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         
         
         {/*  <!-- Navbar links --> */}
          
          <ul className="navbar-nav align-items-center  ml-auto ml-md-0 ">
            <li className="nav-item dropdown">
              <div className="pr-3 sidenav-toggler sidenav-toggler-dark"  data-action="sidenav-pin" data-target="#sidenav-main">
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                  <i className="sidenav-toggler-line"></i>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
        )
    }
}

const topnav = React.createElement;
const navContainer = document.getElementById("topnav-main");
ReactDOM.render(topnav(TopNav), navContainer);