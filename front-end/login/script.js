var selected;

$("#select-tipo").change(function () {
    if ($(this).val() == "cliente") {
        $("#cliente-login").removeClass("hidden-things");
        $("#restaurante-login").addClass("hidden-things");

    }
    else if ($(this).val() == "restaurante") {
        $("#cliente-login").addClass("hidden-things");
        $("#restaurante-login").removeClass("hidden-things");
    }
    else {
        $("#cliente-login").addClass("hidden-things");
        $("#restaurante-login").addClass("hidden-things");
    }
})

$("#entrar-cliente").click(function () {

})