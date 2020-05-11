class SideNav extends React.Component {
  render() {
    return React.createElement("div", {
      className: "scrollbar-inner"
    }, React.createElement("div", {
      className: "sidenav-header  align-items-center"
    }, React.createElement("a", {
      className: "navbar-brand",
      href: "javascript:void(0)"
    }, React.createElement("img", {
      src: "../assets/img/billologo.png",
      width: "500px",
      height: "500px",
      className: "navbar-brand-img",
      alt: "logo here"
    }))), React.createElement("div", {
      className: "navbar-inner"
    }, React.createElement("div", {
      className: "collapse navbar-collapse",
      id: "sidenav-collapse-main"
    }, React.createElement("ul", {
      className: "navbar-nav"
    }, React.createElement("li", {
      className: "nav-item"
    }, React.createElement("a", {
      className: "nav-link active",
      href: "dashboard.html"
    }, React.createElement("i", {
      className: "ni ni-tv-2 text-primary"
    }), React.createElement("span", {
      className: "nav-link-text"
    }, "Dashboard"))), React.createElement("li", {
      className: "nav-item"
    }, React.createElement("a", {
      className: "nav-link active",
      href: "addevent.html"
    }, React.createElement("i", {
      className: "ni ni-planet text-blue"
    }), React.createElement("span", {
      className: "nav-link-text"
    }, "Add Event"))), React.createElement("li", {
      className: "nav-item"
    }, React.createElement("a", {
      className: "nav-link active",
      href: "addcontestant.html"
    }, React.createElement("i", {
      className: "ni ni-planet text-blue"
    }), React.createElement("span", {
      className: "nav-link-text"
    }, "Add Contestant"))), React.createElement("li", {
      className: "nav-item"
    }, React.createElement("a", {
      className: "nav-link active",
      href: "eventlist.html"
    }, React.createElement("i", {
      className: "ni  ni-bullet-list-67 text-blue"
    }), React.createElement("span", {
      className: "nav-link-text"
    }, "Events"))), React.createElement("li", {
      className: "nav-item"
    }, React.createElement("a", {
      className: "nav-link active",
      href: "contestants.html"
    }, React.createElement("i", {
      className: "ni ni-single-02 text-blue"
    }), React.createElement("span", {
      className: "nav-link-text"
    }, "Contestants"))), React.createElement("li", {
      className: "nav-item"
    }, React.createElement("a", {
      className: "nav-link active",
      href: "adduser.html"
    }, React.createElement("i", {
      className: "ni ni-single-02 text-blue"
    }), React.createElement("span", {
      className: "nav-link-text"
    }, "Add Another User")))), React.createElement("hr", {
      className: "my-3"
    }))));
  }

}

const sidenav = React.createElement;
const domContainer = document.getElementById("sidenav-main");
ReactDOM.render(sidenav(SideNav), domContainer);