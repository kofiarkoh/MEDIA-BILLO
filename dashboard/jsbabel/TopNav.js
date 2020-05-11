
class TopNav extends React.Component {
    render() {
        return (
            <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
         
         
         {/*  <!-- Navbar links --> */}
          
          <ul className="navbar-nav align-items-center  ml-auto ml-md-0 " style={{display:'block',position:'fixed',right:0,visibility:'visible'}}>
            <li className="nav-item dropdown" style={{margin:'20px'}}>
              <div className="pr-3 sidenav-toggler sidenav-toggler-dark"style={{height:'20px'}}   data-action="sidenav-pin" data-target="#sidenav-main">
                <div className="sidenav-toggler-inner">
                  <i className="sidenav-toggler-line"style={{margin:'5px'}}></i>
                  <i className="sidenav-toggler-line" style={{margin:'5px'}}></i>
                  <i className="sidenav-toggler-line" style={{margin:'5px'}}></i>
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