const successAlert = $("#success");
const alert = $("#alert");

let isOrderIdVerified = false;
let isItemIdVerified = false;

$("#refundOrderIdFld").on('keypress', function (e) {
    if (e.which === 13) {
        if (e.target.value.toString().length < 8) return;
        const orderId = e.target.value.toString().toLowerCase();
        const token = "Bearer " + localStorage.getItem("token");
        console.log(token);
        $("#orderIdLoadingAnimation").removeClass("hidden");
        $.ajax({
            url: BASEURL + "/sales/" + orderId,
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: function (e) {
                $("#orderIdLoadingAnimation").addClass("hidden");
                $("#orderIdConfirmMark").removeClass("hidden");
                $("#refundOrderIdFld").removeClass("hover:border-2");
                isOrderIdVerified = true;
                console.log(e);
                $("#refundOrderIdFld").attr("disabled", true);
                $("#itemIdFld").attr("disabled", false);

            },
            error: function (e) {
                console.log(e);
                let message = "Error while verifying order!";
                if (e.responseJSON) {
                    message = e.responseJSON.message;
                }
                $("#orderIdLoadingAnimation").addClass("hidden");
                setAlert(message);
            }
        })
    }
});
$("#itemIdFld").on('keypress', function (e) {
    if (e.which === 13) {
        if (e.target.value.toString().length < 8) return;
        const itemId = e.target.value.toString().toLowerCase();
        const orderId = $('#refundOrderIdFld').val().toString().toLowerCase()
        $("#itemIdLoadingAnimation").removeClass("hidden");
        $.ajax({
            url: BASEURL + '/sales/items?itemId=' + itemId + '&orderId=' + orderId,
            type: 'GET',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: function (data) {
                console.log(data);
                $("#sizeSelect").val(data.size);
                $("#qtyFld").val(data.qty);
                $("#sizeSelect").attr("disabled", false);
                setSizes(data)

                $("#qtyFld").attr("disabled", false);
                $("#itemIdFld").attr("disabled", true);
                $("#itemIdFld").removeClass("hover:border-2");
                $("#itemIdLoadingAnimation").addClass("hidden");
                $("#itemIdConfirmMark").removeClass("hidden");
                isItemIdVerified = true;
            },
            error: function (err) {
                console.log(err);
                setAlert("Item not found!")
                $("#itemIdLoadingAnimation").addClass("hidden");
            }
        });
    }
});
const setSizes = (data) => {
    $("#sizeSelect").empty()
    data.forEach(item => {
        $("#sizeSelect").append(`<option value="${item.size}">${item.size}</option>`)
    })
}
$("#closeAdminVerifyDiv").click(function () {
    $("#adminVerifyDiv").addClass("hidden");
});
$("#proceedBtn").click(function () {
    const qty = Number.parseInt($("#qtyFld").val());
    const size = $("#sizeSelect").val();
    if (!isOrderIdVerified) {
        $("#refundOrderIdFld").addClass("border-red-500 border-2");
    } else {
        $("#refundOrderIdFld").removeClass("border-red-500 border-2");
    }

    if (!isItemIdVerified) {
        $("#itemIdFld").addClass("border-red-500 border-2");
    } else {
        $("#itemIdFld").removeClass("border-red-500 border-2");
    }

    if (qty < 1 || isNaN(qty)) {
        $("#qtyFld").addClass("border-red-500 border-2");
    } else {
        $("#qtyFld").removeClass("border-red-500 border-2");
    }

    if(size === null || size === undefined) {
        $("#sizeSelect").addClass("border-red-500 border-2");
        return
    }else {
        $("#sizeSelect").removeClass("border-red-500 border-2");
    }

    if (isOrderIdVerified && isItemIdVerified && qty > 0) {
        $("#adminVerifyDiv").removeClass("hidden");
    }
});

$("#userVerifyForm").submit(function (e) {
    e.preventDefault()

    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.trim().length < 8) {
        $("#passwordFld").addClass("border-red-500 border-2")
    } else {
        $("#passwordFld").removeClass("border-red-500 border-2")
    }
    let data =
        {
            email: email,
            password: password

        }
    data = JSON.stringify(data);
    $.ajax({
        url: BASEURL + "/auth/users/login",
        method: "POST",
        contentType: "application/json",
        data: data,
        success: function (data) {
            console.log(data);

            if (data.role[0].authority === "ADMIN") {
                issueARefund();
            } else {
                setAlert("You are not authorized to issue refund!")
            }
        },
        error: function (err) {
            let message = "Error while authenticating!";
            if (err.responseJSON) {
                message = err.responseJSON.message;
            }
            setAlert(message);
            console.log(err);
        }
    })
});
const issueARefund = () => {
    const itemId = $('#itemIdFld').val().toString().toLowerCase();
    const qty = Number.parseInt($("#qtyFld").val());
    const size = $("#sizeSelect").val().toString()
    const orderId = $('#refundOrderIdFld').val().toString().toLowerCase();

    let data = {
        orderId: orderId,
        itemId: itemId,
        qty: qty,
        size: size
    }
    data = JSON.stringify(data);
    $("#refundConfirmBtnLoadingAnimation").removeClass("hidden");
    $("#refundConfirmBtnLoadingAnimation").addClass("flex");
    $(".dFld").attr("disabled", true);
    $(".fld").removeClass("hover:border-2");
    $.ajax({
        url: BASEURL + "/sales/refund",
        method: "POST",
        contentType: "application/json",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        data: data,
        success: function (data) {
            console.log(data);
            $(".fld").attr("disabled", false);
            $(".fld").addClass("hover:border-2");
            $("#refundSuccessDiv").removeClass("hidden");
            $("#refundConfirmBtnLoadingAnimation").addClass("hidden");
            $("#refundConfirmBtnLoadingAnimation").removeClass("flex");
            $("#userVerifyForm").addClass("hidden");

            setSuccessAlert("Refund issued successfully!")
            setInterval(() => {
                window.location.reload();
            }, 3000);
        },
        error: function (err) {
            $(".fld").attr("disabled", false);
            $("#refundConfirmBtnLoadingAnimation").addClass("hidden");
            $("#refundConfirmBtnLoadingAnimation").removeClass("flex");
            setAlert("Error while issuing refund!")
            console.log(err);
        }
    });
}

const setSuccessAlert = (message) => {
    $("#successDescription").text(message);
    successAlert.removeClass("right-[-100%]");
    successAlert.addClass("right-0");

    setTimeout(() => {
        successAlert.removeClass("right-0");
        successAlert.addClass("right-[-100%]");
    }, 3000);

}

const setAlert = (message) => {
    $("#alertDescription").text(message);
    alert.removeClass("right-[-100%]");
    alert.addClass("right-0");

    setTimeout(() => {
        alert.removeClass("right-0");
        alert.addClass("right-[-100%]");
    }, 3000);
}

$("#successCloseBtn").click(function () {
    successAlert.removeClass("right-0");
    successAlert.addClass("right-[-100%]");
})
$("#alertCloseBtn").click(function () {
    alert.removeClass("right-0");
    alert.addClass("right-[-100%]");
});