class TopNav extends React.Component {
  render() {
    return React.createElement("div", {
      className: "container-fluid"
    }, React.createElement("div", {
      className: "collapse navbar-collapse",
      id: "navbarSupportedContent"
    }, React.createElement("ul", {
      className: "navbar-nav align-items-center  ml-auto ml-md-0 "
    }, React.createElement("li", {
      className: "nav-item dropdown"
    }, React.createElement("div", {
      className: "pr-3 sidenav-toggler sidenav-toggler-dark",
      "data-action": "sidenav-pin",
      "data-target": "#sidenav-main"
    }, React.createElement("div", {
      className: "sidenav-toggler-inner"
    }, React.createElement("i", {
      className: "sidenav-toggler-line"
    }), React.createElement("i", {
      className: "sidenav-toggler-line"
    }), React.createElement("i", {
      className: "sidenav-toggler-line"
    })))))));
  }

}

const topnav = React.createElement;
const navContainer = document.getElementById("topnav-main");
ReactDOM.render(topnav(TopNav), navContainer);