$("#submit-btn").click(async function () {
  var username = $("#username").val();
  var password = $("#password").val();
  var name = $("#name").val();
  if (username == "" || password == "" || name == "") {
    swal({
      text: "All fields are required",
      icon: "warning",
    });
    return;
  }
  $(".loading").show();
  $("input").prop("disabled", true);
  var formdata = new FormData();
  formdata.append("username", username);
  formdata.append("password", password);
  formdata.append("name", name);

  try {
    var ur = "http://192.168.8.100:3000";
    var response = await axios({
      method: "post",
      url: "/adminresources/auth/signup.php",
      data: formdata,
      header: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    console.log(response.data.token);
    console.log(response);
    sessionStorage.setItem("token", response.data.token);
    document.cookie = response.data.token;
    swal({
      text: "Event add succesffully",
      icon: "success",
    });

    $(".loading").hide();
    $("input").prop("disabled", false);
  } catch (error) {
    console.log(username, password);
    console.log(error.response);
    swal({
      text: "" + error.response.data.message,
      icon: "warning",
    });
    $(".loading").hide();

    $("input").prop("disabled", false);
  }
});
