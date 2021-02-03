function Prato(id, quantity) {
    this.id = id;
    this.quantity = quantity;
}

var pratosPedidos = [];

$(function () {
    $(".transparent-inputs").hide();
    $(".btnRemove").hide();
})

//Aumenta quantidade de um item
$(".btnAdd").click(function () {
    var quantity = Number($(this).siblings(".transparent-inputs").val());
    var newQuantity = Number($(this).siblings(".transparent-inputs").val()) + 1;
    let idPrato = $(this).parent().attr("value");
    var divPrato = $("#prato-" + idPrato);

    //When it's 0 before the click and then it shows this elements
    if (!quantity) {
        $(this).siblings(".transparent-inputs").show();
        $(this).siblings(".btnRemove").show();

        let newItem = $(".hidden-li").clone().prop("value", idPrato).removeClass("hidden-li").addClass("d-flex");
        $("#pratos-list").append(newItem);
        newItem.find(".spanName").text(divPrato.find(".nome-prato").text());
    }


    $(this).siblings(".transparent-inputs").val(newQuantity);

    //Atualiza a lista do pedido
    $(".pratos-item").each(function () {
        if ($(this).attr("value") == idPrato) {
            $(this).find(".spanQuantity").text("x" + newQuantity);
            $(this).find(".spanPrice").text("R$ " + (divPrato.find(".preço-prato").text().slice(2).replace(",", ".") * newQuantity).toFixed(2).replace(".", ",")); //talvez precise colocar 3 no lugar do 2 dependendo se tem espaço ou não no preço
        }
    })

    //Atualiza o objeto que será enviado para o db
    let hasFound = false;

    for (let i = 0; i < pratosPedidos.length && !hasFound; i++) {
        if (pratosPedidos[i].id == idPrato) {
            pratosPedidos[i].quantity = newQuantity;
            hasFound = true;
        }
    }

    if (!hasFound) {
        pratosPedidos.push(new Prato(idPrato, newQuantity));
    }

    atualizaPrecoTotal();
})

//Diminui quantidade de um item
$(".btnRemove").click(function () {
    var quantity = Number($(this).siblings(".transparent-inputs").val());
    var newQuantity = Number($(this).siblings(".transparent-inputs").val()) - 1;
    let idPrato = $(this).parent().attr("value");


    //When it's 0 after the click and then it hides this elements
    if (quantity == 1) {
        $(this).siblings(".transparent-inputs").hide();
        $(this).siblings(".btnRemove").hide();
    }



    //Doesn't go below 0
    if (quantity) {
        $(this).siblings(".transparent-inputs").val(newQuantity);

        //Atualiza a lista do pedido
        $(".pratos-item").each(function () {
            if ($(this).attr("value") == idPrato) {
                if (quantity == 1) {
                    $(this).remove();
                }
                else {
                    $(this).find(".spanQuantity").text("x" + newQuantity)
                    $(this).find(".spanPrice").text("R$ " + ($("#prato-" + idPrato).find(".preço-prato").text().slice(2).replace(",", ".") * newQuantity).toFixed(2).replace(".", ","));
                }
            }
        })

        let hasFound = false;

        for (let i = 0; i < pratosPedidos.length && !hasFound; i++) {
            if (pratosPedidos[i].id == idPrato) {
                pratosPedidos[i].quantity = newQuantity;
                hasFound = true;
            }
        }
    }

    atualizaPrecoTotal();
})

function atualizaPrecoTotal() {
    let newPrice = 0;
    $(".spanPrice").each(function () {
        newPrice += Number($(this).text().slice(2).replace(",", "."));
    })
    

    newPrice = "R$ " + newPrice.toFixed(2).replace(".", ",");

    $("#preço-total").text(newPrice);
}

//TODO quando submeter, conferir apenas os pratos com quantidade maior que 0