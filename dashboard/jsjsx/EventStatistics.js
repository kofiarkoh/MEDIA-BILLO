function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

class EventStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventstats: ""
    };
    this.render = this.render.bind(this);
  }

  fetchStats() {
    var _this = this;

    return _asyncToGenerator(function* () {
      var response = yield getEventStats();
      console.log("the response is ", response);

      _this.setState({
        eventstats: response
      });
    })();
  }

  componentDidMount() {
    this.fetchStats();
  }

  render() {
    console.warn(this.state.eventstats.length);

    if (this.state.eventstats.length === undefined || this.state.eventstats.length === 0) {
      return React.createElement("h1", null, "No data ");
    } else {
      return React.createElement(RowBuilder, {
        data: this.state.eventstats
      });
    }
  }

}

class RowBuilder extends React.Component {
  render() {
    console.log("the prop is ", this.props);
    return this.props.data.map((item, index) => {
      return React.createElement("tr", null, React.createElement("th", {
        scope: "row"
      }, item.eventname), React.createElement("td", null, item.numContestants), React.createElement("td", null, item.totalvotes), React.createElement("td", null, React.createElement("i", {
        class: "fas fa-arrow-up text-success mr-3"
      }), " ", item.amount));
    });
  }

}

function getEventStats() {
  return _getEventStats.apply(this, arguments);
}

function _getEventStats() {
  _getEventStats = _asyncToGenerator(function* () {
    try {
      var ur = "http://192.168.8.100:3000"; // console.log(sessionStorage.getItem('token'))

      var response = yield axios({
        method: "get",
        url: ur + "/adminresources/eventStats.php",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token")
        }
      });
      console.warn("response", response.data); //    eventStatus=='active'? $("#status"+id).html("Inactve") :$("#status"+id).html("Actve")
    } catch (error) {
      //console.log(error.status)
      swal({
        text: "df" + error,
        icon: "warning"
      });
    }

    return response.data;
  });
  return _getEventStats.apply(this, arguments);
}

const reactElement = React.createElement;
const eventstat = document.getElementById("stats-table");
ReactDOM.render(reactElement(EventStatistics), eventstat);