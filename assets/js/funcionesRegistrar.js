{ /******************* REGISTRAR USUARIOS ***********************/

    // validaciones campos 
    $("#formularioReg").validate({
        onkeyup: false,
        onfocusin: false,
        rules: {
            id: {
                required: true,
            },
            identification: {
                required: true,
                minlength: 3,
                maxlength: 20,
            },
            name: {
                required: true,
                minlength: 3,
                maxlength: 80,
            },
            address: {
                required: true,
                minlength: 3,
                maxlength: 80,
            },
            cellPhone: {
                required: true,
                minlength: 3,
                maxlength: 15,
            },
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
            },
            password_confirm: {
                required: true,
                minlength: 6,
                maxlength: 50,
                equalTo: "#password",
            },
            zone: {
                required: true,
                minlength: 3,
                maxlength: 30,
            },
            type: {
                required: true
            },
        }
    })
    $("#registrar").click(function () {
        if ($("#formularioReg").valid() == false) {
            return;
        }
        let id = $("#id").val()
        let identification = $("#identification").val()
        let name = $("#name").val()
        let address = $("#address").val()
        let cellPhone = $("#cellPhone").val()
        let email = $("#email").val()
        let password = $("#password").val()
        let password_confirm = $("#password_confirm").val()
        let zone = $("#zone").val()
        let type = $("#type").val()
    })// fin validaciones campos


    /* funciones tabla usuarios*/
    function tablaUsuarios() {
        console.log("Carga de todos los usuarios cantidad:");
        $.ajax({
            url: "http://localhost:8080/api/user/all",
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                pintaTablaUsuario(respuesta);
            }
        });
    }
    function pintaTablaUsuario(respuesta) {

        let myTable = "<table>";
        for (i = 0; i < respuesta.length; i++) {
            myTable += "<tr>";

            myTable += "<td>" + respuesta[i].id + "</td>";
            myTable += "<td>" + respuesta[i].identification + "</td>";
            myTable += "<td>" + respuesta[i].name + "</td>";
            myTable += "<td>" + respuesta[i].address + "</td>";
            myTable += "<td>" + respuesta[i].cellPhone + "</td>";
            myTable += "<td>" + respuesta[i].email + "</td>";
            myTable += "<td>" + respuesta[i].password + "</td>";
            myTable += "<td>" + respuesta[i].zone + "</td>";
            myTable += "<td>" + respuesta[i].type + "</td>";
            myTable += "<td> <button onclick='editarUsuario(" + JSON.stringify(respuesta[i].id) + ")'><i class='fas fa-user-edit'></i></button>";
            myTable += "<td> <button onclick='borrarUsuario(" + JSON.stringify(respuesta[i].id) + ")'><i class='fas fa-trash-alt'></i></button>";
            myTable += "</tr>";
        }
        myTable += "</table>";
        $("#resultadoTablaUsuario").html(myTable);
    } /* fin tabla */


    //// Guardar usuario
    function guardarUsuarios() {
        /* Valida existencia Email*/
        let email = $("#email").val()
        $.ajax({
            url: "http://localhost:8080/api/user/emailexist/" + email,
            type: "GET",
            datatype: "JSON",
            success: function (response) {
                console.log(response)
                if (response == true) {

                    swal.fire({
                        title: "El usuario ya existe",
                        text: "Valide el Correo electronico y/o ID Usuario que va a registrar",
                        icon: "error",
                        showConfirmButton: true,
                        confirmButtonColor: "#242729",
                        confirmButtonText: "Aceptar"
                    });  /* FIN Valida existencia Email*/

                    /* Almacena la información del usuario */
                } else {
                    let var1 = {
                        id: $("#id").val(),
                        identification: $("#identification").val(),
                        name: $("#name").val(),
                        address: $("#address").val(),
                        cellPhone: $("#cellPhone").val(),
                        email: $("#email").val(),
                        password: $("#password").val(),
                        password_confirm: $("#password_confirm").val(),
                        zone: $("#zone").val(),
                        type: $("#type").val(),
                    };
                    $.ajax({
                        type: 'POST',
                        contentType: "application/json; charset=utf-8",
                        dataType: 'JSON',
                        data: JSON.stringify(var1),
                        url: "http://localhost:8080/api/user/new",
                        success: function (response) {
                            console.log(response);
                            console.log("Se guardo correctamente");
                            tablaUsuarios();
                            swal.fire({
                                title: "Cuenta creada de forma correcta",
                                text: "Bienvenido " + response.name,
                                icon: "success",
                                showConfirmButton: false,
                                allowOutsideClick: true,
                                backdrop: true,
                                footer: "<a href='pasarelaAdmin.html'>Ingresar <i class='fas fa-sign-in-alt heart'></i></a>"
                            });
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema", "Validación Incorrecta", "error");
                        }
                    });/* FIN Almacena la información del usuario */
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema", "Validación Incorrecta", "error");
            }
        });
    } //// fin guardar usuario

    //// Eliminar usuario
    function borrarUsuario(id) {
        let var1 = {
            id: id
        };
        $.ajax({
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var1),

            url: "http://localhost:8080/api/user/" + id,


            success: function (response) {
                console.log(response);
                tablaUsuarios();
                console.log("Se elimino correctamente");
                swal.fire({
                    title: "Usuario eliminado correctamente",
                    text: "El usuario " + response.name + " fue eliminado del sistema",
                    icon: "success",
                    showConfirmButton: false,
                    allowOutsideClick: true,
                    backdrop: true
                });

            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se elimino, por favor valide");
            }
        });
    }//// Fin DELETE

    //// PUT
    function editarUsuario(id) {
        let var3 = {
            id: id,
            identification: $("#identification").val(),
            name: $("#name").val(),
            address: $("#address").val(),
            cellPhone: $("#cellPhone").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            password_confirm: $("#password_confirm").val(),
            zone: $("#zone").val(),
            type: $("#type").val(),
        };

        console.log(var3);
        let dataToSend = JSON.stringify(var3);
        $.ajax({
            url: "http://localhost:8080/api/user/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (response) {
                $("#resultadoTablaUsuario").empty();
                $("#identification").val("");
                $("#name").val("");
                $("#address").val("");
                $("#cellPhone").val("");
                $("#email").val("");
                $("#password").val("");
                $("#password_confirm").val("");
                $("#zone").val("");
                $("#type").val("");
                tablaUsuarios();
                alert("se ha actualizado correctamente")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se actualizó, validar");
            }
        });
    }//// Fin PUT

}


{ /******************* REGISTRAR PRODUCTOS ***********************/
    //validaciones campos
    $("#formularioRegPro").validate({
        onkeyup: false,
        onfocusin: false,
        rules: {
            reference: {
                required: true,
            },
            category: {
                required: true,
                minlength: 3,
                maxlength: 50,
            },
            description: {
                required: true,
                minlength: 3,
                maxlength: 250,
            },
            availability: {
                required: true,
            },
            price: {
                required: true,
                maxlength: 15,
            },
            quantity: {
                required: true,
                maxlength: 15,
            },
            photography: {
                required: true,
            }
        }
    })
    $("#registrarPro").click(function () {
        if ($("#formularioRegPro").valid() == false) {
            return;
        }
        let reference = $("#id").val()
        let category = $("#identification").val()
        let description = $("#name").val()
        let availability = $("#address").val()
        let price = $("#cellPhone").val()
        let quantity = $("#email").val()
        let photography = $("#password").val()
    })// fin validaciones 

    /* traer tabla productos */
    function tablaProductos() {
        console.log("Carga de todos los productos cantidad:");
        $.ajax({
            url: "http://localhost:8080/api/chocolate/all",
            type: "GET",
            datatype: "JSON",
            success: function (respuesta) {
                console.log(respuesta);
                pintaTablaProductos(respuesta);
            }
        });
    }
    function pintaTablaProductos(respuesta) {

        let myTable = "<table>";
        for (i = 0; i < respuesta.length; i++) {
            myTable += "<tr>";

            myTable += "<td>" + respuesta[i].reference + "</td>";
            myTable += "<td>" + respuesta[i].category + "</td>";
            myTable += "<td>" + respuesta[i].description + "</td>";
            myTable += "<td>" + respuesta[i].availability + "</td>";
            myTable += "<td>" + respuesta[i].price + "</td>";
            myTable += "<td>" + respuesta[i].quantity + "</td>";
            myTable += "<td>" + respuesta[i].photography + "</td>";
            myTable += "<td> <button onclick='editarProducto(" + JSON.stringify(respuesta[i].reference) + ")'><i class='fas fa-user-edit'></i></button>";
            myTable += "<td> <button onclick='borrarProducto(" + JSON.stringify(respuesta[i].reference) + ")'><i class='fas fa-trash-alt'></i></button>";
            myTable += "</tr>";
        }
        myTable += "</table>";
        $("#resultadoTablaProducto").html(myTable);
    } /* fin tabla */

    //// Guardar usuario
    function guardarProducto() {
        /* Valida existencia Email*/
        let var12 = {
            reference: $("#reference").val(),
            category: $("#category").val(),
            description: $("#description").val(),
            availability: $("#availability").val(),
            price: $("#price").val(),
            quantity: $("#quantity").val(),
            photography: $("#photography").val(),
        };
        $.ajax({
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var12),
            url: "http://localhost:8080/api/chocolate/new",
            success: function (response) {
                console.log(response);
                console.log("Se guardo correctamente");
                tablaProductos();
                swal.fire({
                    title: "Producto creado correctamente",
                    text: "Usted almaceno " + response.description + ", con una cantidad de: " + response.quantity,
                    icon: "success",
                    showConfirmButton: false,
                    allowOutsideClick: true,
                    backdrop: true
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema", "Validación Incorrecta", "error");
            }
        });/* FIN Almacena la información del usuario */
    } //// fin guardar usuario

    //// Eliminar usuario
    function borrarProducto(reference) {
        let var13 = {
            reference: reference
        };
        $.ajax({
            type: 'DELETE',
            contentType: "application/json; charset=utf-8",
            dataType: 'JSON',
            data: JSON.stringify(var13),
            url: "http://localhost:8080/api/chocolate/" + reference,

            success: function (response) {
                console.log(response);
                tablaProductos();
                console.log("Se elimino correctamente");
                swal.fire({
                    title: "Producto eliminado correctamente",
                    icon: "success",
                    showConfirmButton: true,
                    confirmButtonColor: "#242729",
                    confirmButtonText: "Aceptar",
                    allowOutsideClick: true,
                    backdrop: true
                });

            },

            error: function (jqXHR, textStatus, errorThrown) {
                swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema", "Validación Incorrecta", "error");
            }
        });
    }//// Fin DELETE

    //// PUT
    function editarProducto(reference) {
        let var14 = {
            reference: reference,
            category: $("#category").val(),
            description: $("#description").val(),
            availability: $("#availability").val(),
            price: $("#price").val(),
            quantity: $("#quantity").val(),
            photography: $("#photography").val(),
        };

        console.log(var14);
        let dataToSend = JSON.stringify(var14);
        $.ajax({
            url: "http://localhost:8080/api/chocolate/update",
            type: "PUT",
            data: dataToSend,
            contentType: "application/JSON",
            datatype: "JSON",
            success: function (response) {
                $("#resultadoTablaProducto").empty();
                $("#category").val("");
                $("#description").val("");
                $("#availability").val("");
                $("#price").val("");
                $("#quantity").val("");
                $("#photography").val("");
                tablaProductos();
                swal.fire({
                    title: "El Producto " + response.reference + " - " + response.description + " ha sido actualizado correctamente",
                    icon: "success",
                    showConfirmButton: false,
                    allowOutsideClick: true,
                    backdrop: true
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                swal.fire("Error en la aplicacion, comuniquese con el administrador del sistema", "Validación Incorrecta", "error");
            }
        });
    }//// Fin PUT

}