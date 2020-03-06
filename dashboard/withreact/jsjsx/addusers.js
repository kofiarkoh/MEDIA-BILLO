function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

$("#submit-btn").click( /*#__PURE__*/_asyncToGenerator(function* () {
  var username = $("#username").val();
  var password = $("#password").val();
  var name = $('#name').val();

  if (username == '' || password == '' || name == '') {
    swal({
      text: "All fields are required",
      icon: "warning"
    });
    return;
  }

  $(".loading").show();
  $("input").prop('disabled', true);
  var formdata = new FormData();
  formdata.append('username', username);
  formdata.append('password', password);
  formdata.append('name', name);

  try {
    var ur = "https://3689457c.ngrok.io";
    var response = yield axios({
      method: "post",
      url: "/backend/adminresources/auth/signup.php",
      data: formdata,
      header: {
        "Content-Type": "multipart/form-data",
        "Authorization": "Bearer " + sessionStorage.getItem('token')
      }
    });
    console.log(response.data.token);
    console.log(response);
    sessionStorage.setItem('token', response.data.token);
    document.cookie = response.data.token;
    swal({
      text: "Event add succesffully",
      icon: "success"
    });
    $(".loading").hide();
    $("input").prop('disabled', false);
  } catch (error) {
    console.log(username, password);
    console.log(error.response);
    swal({
      text: "" + error.response.data.message,
      icon: "warning"
    });
    $(".loading").hide();
    $("input").prop('disabled', false);
  }
}));