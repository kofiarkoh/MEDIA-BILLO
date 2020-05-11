function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

$("#submit-btn").click( /*#__PURE__*/_asyncToGenerator(function* () {
  $(".loading").show();
  $("input").prop('disabled', true);
  var username = $("#username").val();
  var password = $("#password").val();
  var formdata = new FormData();
  formdata.append('username', username);
  formdata.append('password', password);

  try {
    var ur = "http://192.168.8.100:3000";
    var response = yield axios({
      method: "post",
      url: ur + "/adminresources/auth/login.php",
      //"/addEvent.php",
      data: formdata,
      header: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(response.data);
    console.log(response);
    sessionStorage.setItem('token', response.data.token);
    document.cookie = response.data.token;
    swal({
      text: "Login Successful",
      icon: "success"
    });
    $(".loading").hide();
    $("input").prop('disabled', false);
    window.location.href = './dashboard.html';
  } catch (error) {
    console.log(username, password); // console.log(error)

    swal({
      text: "" + error.response.data.message,
      icon: "warning"
    });
    $(".loading").hide();
    $("input").prop('disabled', false);
  }
}));