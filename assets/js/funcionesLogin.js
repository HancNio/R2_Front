/*==================================            -               ===================================*/
/*==================================                            ===================================*/
/*================================== funciones formulario Login ===================================*/
/*==================================                            ===================================*/
/*==================================            -               ===================================*/

// validaciones campos login
$("#formulario").validate({
    rules: {
        email: {
            required: true,
            minlength: 3,
            maxlength: 50,
            email: true,
        },
        password: {
            required: true,
            minlength: 6,
            maxlength: 50,
        }
    }
})

$("#login").click(function () {
    if ($("#formulario").valid() == false) {
        return;
    }
    let email = $("#email").val()
    let password = $("#password").val()
})// fin validaciones

//// Loguearse 
function traerUsuarios() {
    var email = $("#email").val();
    var password = $("#password").val();

    $.ajax({
        url: "http://localhost:8080/api/user/emailexist/" + email,
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response)
            if (response == true) {
                $.ajax({
                    url: "http://localhost:8080/api/user/" + email + "/" + password,
                    type: "GET",
                    datatype: "JSON",
                    success: function (response) {
                        console.log(response)
                        if (response.id != null) {
                            swal.fire({
                                title: "Bienvenido " + response.name,
                                text: "Validación Correcta",
                                icon: "success",
                                showConfirmButton: false,
                                allowOutsideClick: true,
                                backdrop: true,
                                timer: 5000,
                                timerProgressBar: true,
                            });
                            if(response.type == "Administrador"){
                                window.location = "pasarelaAdmin.html"
                            }else{
                                window.location = "pasarelaUsu.html"
                            }
                        } else {
                            swal.fire({
                                title: "La combinación usuario/contraseña es incorrecta",
                                text: "Valide por favor",
                                icon: "error",
                                showConfirmButton: true,
                                confirmButtonColor: "#242729",
                                confirmButtonText: "Aceptar",
                                footer: "<a href='registrarUsuario.html'>o de clic aquí para recordar la contraseña</a>"
                            });
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema","Validación Incorrecta","error");
                    }
                });
            } else {
                swal.fire({
                    title: "El usuario no existe en el sistema",
                    text: "Comuniquese con el Administrador",
                    icon: "error",
                    showConfirmButton: true,
                    confirmButtonColor: "#242729",
                    confirmButtonText: "Aceptar"
                });
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema","Validación Incorrecta","error");
        }
    });
}//// fin Loguearse