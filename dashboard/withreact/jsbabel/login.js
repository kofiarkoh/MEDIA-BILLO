$("#submit-btn").click(async function () {
    $(".loading").show()
    $("input").prop('disabled', true);
    var username = $("#username").val();
    var password = $("#password").val()
    var formdata = new FormData()
    formdata.append('username',username)
    formdata.append('password',password)
   

   
    try {
        var ur = "https://3689457c.ngrok.io"
        var response = await axios({
            method: "post",
            url: "/backend/adminresources/auth/login.php",//"/addEvent.php",
            data: formdata,
            header: {
                "Content-Type": "multipart/form-data",
            }

        })
        console.log(response.data)
        console.log(response)
        sessionStorage.setItem('token',response.data.token)
        document.cookie = response.data.token
        swal({

            text: "Event add succesffully",
            icon: "success",

        })
       
        $(".loading").hide()
        $("input").prop('disabled', false);
        window.location.href = './dashboard.html'
       


    }
    catch (error) {
        console.log(username,password)
       // console.log(error)
        swal({

            text: "" + error.response.data.message,
            icon: "warning",

        }) 
        $(".loading").hide()

        $("input").prop('disabled', false);
    } 

});
