const supplierAlertMessage = $("#alert")
const supplierSuccessMessage = $("#success")
const supplierBtnLoadingAnimation = $("#supplierBtnLoadingAnimation")
const sFld = $(".sFld")
const addSupplierBtn = $("#addSupplierBtn")
let supplierPageNumber = 0;

$("#supplierPageCountFld").text(supplierPageNumber + 1)

let suppliersList = [];

$("#showSupplierAddForm").click(
    function () {
        if (window.localStorage.getItem("role") === "USER") {
            setSupplierAlertMessage("You do not have permission to add supplier")
            return
        }
        $("#addSupplier").removeClass("hidden");
    }
);

$("#closeSupplierAddForm").click(
    function () {
        $("#addSupplier").addClass("hidden");
        $("#supplierCodeFld").val("");
        $("#supplierNameFld").val("");
        $("#supplierEmailFld").val("");
        $("#supplierContact1Fld").val("");
        $("#supplierContact2Fld").val("");
        $("#supplierLaneFld").val("");
        $("#supplierCityFld").val("");
        $("#supplierStateFld").val("");
        $("#supplierCountryFld").val("");
        $("#supplierPostalCodeFld").val("");

    }
);

$("#searchSupplierBtn").click(function () {
    const val = $("#supplierSearchFld").val();
    const alert = $("#alert");
    const tableLoadingAnimation = $("#supplierTableLoadingAnimation");
    if (val.trim() === "") {
        setSupplierAlertMessage("Please enter a search value")
        return;
    }
    $.ajax(BASEURL + "/suppliers?pattern=" + val, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        success: function (data) {
            console.log(data);
            suppliersList = data;
            setSupplierTableContent()
            tableLoadingAnimation.addClass("hidden");
        },
        error: function (error) {
            console.log(error);
            tableLoadingAnimation.addClass("hidden");
            alert.removeClass("right-[-100%]")
            alert.addClass("right-0")
            $("#alertDescription").text("An error occurred while searching for supplier");

            setTimeout(() => {
                alert.addClass("right-[-100%]")
                alert.removeClass("right-0")
            }, 3000);
        }

    })
});

$("#alertCloseBtn").click(function () {
    const alert = $("#alert");
    alert.removeClass("right-0")
    alert.addClass("right-[-100%]")
})

$("#successCloseBtn").click(function () {
    const success = $("#success");
    success.removeClass("right-0")
    success.addClass("right-[-100%]")
})

$("#addSupplierForm").submit(function (e) {
    e.preventDefault();

    const id = e.target.code.value.toString();
    const name = e.target.name.value.toString();
    const email = e.target.email.value.toString();
    const contact1 = e.target.contact1.value.toString();
    const contact2 = e.target.contact2.value.toString();
    const lane = e.target.lane.value.toString();
    const city = e.target.city.value.toString();
    const state = e.target.state.value.toString();
    const country = e.target.country.value.toString();
    let zip = e.target.zip.value.toString()

    if (!/^(?! )[A-Za-z0-9 ]{3,50}$/.test(name)) {
        $("#supplierNameFld").addClass("border-2 border-red-500");
    } else {
        $("#supplierNameFld").removeClass("border-2 border-red-500");
    }

    if (!/^\d{10,12}$/.test(contact1)) {
        $("#supplierContact1Fld").addClass("border-2 border-red-500");
    } else {
        $("#supplierContact1Fld").removeClass("border-2 border-red-500");
    }

    if (!/^\d{10,12}$/.test(contact2)) {
        $("#supplierContact2Fld").addClass("border-2 border-red-500");
    } else {
        $("#supplierContact2Fld").removeClass("border-2 border-red-500");
    }

    if (!/^(?! )[A-Za-z0-9 ]{3,30}$/.test(lane)) {
        $("#supplierLaneFld").addClass("border-2 border-red-500");
    } else {
        $("#supplierLaneFld").removeClass("border-2 border-red-500");
    }

    if (!/^(?! )[A-Za-z ]{3,30}$/.test(city)) {
        $("#supplierCityFld").addClass("border-2 border-red-500");
    } else {
        $("#supplierCityFld").removeClass("border-2 border-red-500");
    }

    if (!/^(?! )[A-Za-z ]{3,30}$/.test(state)) {
        $("#supplierStateFld").addClass("border-2 border-red-500");
    } else {
        $("#supplierStateFld").removeClass("border-2 border-red-500");
    }

    if (!/^(?! )[A-Za-z ]{3,30}$/.test(country)) {
        $("#supplierCountryFld").addClass("border-2 border-red-500");
    } else {
        $("#supplierCountryFld").removeClass("border-2 border-red-500");
    }

    if (!/^\d{4,10}$/.test(zip)) {
        $("#supplierPostalCodeFld").addClass("border-2 border-red-500");
    } else {
        $("#supplierZPostalCodeFld").removeClass("border-2 border-red-500");
    }
    if (!/^(?! )[A-Za-z0-9 ]{3,50}$/.test(name) || !/^\d{10,12}$/.test(contact1) || !/^\d{10,12}$/.test(contact2) || !/^(?! )[A-Za-z0-9 ]{3,30}$/.test(lane) || !/^(?! )[A-Za-z ]{3,30}$/.test(city) || !/^(?! )[A-Za-z ]{3,30}$/.test(state) || !/^(?! )[A-Za-z ]{3,30}$/.test(country) || !/^\d{4,10}$/.test(zip)) {
        return;
    }
    let supplier = {
        name: name,
        email: email,
        contactNo1: contact1,
        contactNo2: contact2,
        lane: lane,
        city: city,
        state: state,
        country: country,
        postalCode: zip
    }
    supplier = JSON.stringify(supplier);
    console.log(supplier);

    if (id === null || id === "" || id === undefined) {

        sFld.removeClass("hover:border-2")
        sFld.prop("disabled", true)
        supplierBtnLoadingAnimation.removeClass("hidden")
        supplierBtnLoadingAnimation.addClass("flex")
        addSupplierBtn.addClass("cursor-not-allowed")

        $.ajax(BASEURL + "/suppliers", {
            method: "POST",
            contentType: "application/json",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            data: supplier,
            success: function (data) {
                console.log(data);
                e.target.reset();
                suppliersList = data
                sFld.prop("disabled", false)
                sFld.addClass("hover:border-2")
                supplierBtnLoadingAnimation.addClass("hidden")
                supplierBtnLoadingAnimation.removeClass("flex")
                addSupplierBtn.removeClass("cursor-not-allowed")

                loadSupplierTable(supplierPageNumber, 20);
                setSupplierSuccessMessage("Supplier added successfully")
            },
            error: function (error) {
                console.log(error);

                sFld.prop("disabled", false)
                sFld.addClass("hover:border-2")
                supplierBtnLoadingAnimation.addClass("hidden")
                supplierBtnLoadingAnimation.removeClass("flex")
                addSupplierBtn.removeClass("cursor-not-allowed")

                let message = "Error adding supplier";
                if (error.responseJSON) {
                    message = error.responseJSON.message;
                }
                setSupplierAlertMessage(message);
            }
        });
    } else {

        sFld.removeClass("hover:border-2")
        sFld.prop("disabled", true)
        supplierBtnLoadingAnimation.removeClass("hidden")
        supplierBtnLoadingAnimation.addClass("flex")
        addSupplierBtn.addClass("cursor-not-allowed")

        $.ajax(BASEURL + "/suppliers/" + id.toLowerCase(), {
            method: "PUT",
            contentType: "application/json",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            data: supplier,
            success: function (data) {
                console.log(data);
                e.target.reset();
                loadSupplierTable(supplierPageNumber, 20);
                setSupplierSuccessMessage("Supplier updated successfully")
            },
            error: function (error) {
                console.log(error);
                let message = "Error updating supplier";
                if (error.responseJSON) {
                    message = error.responseJSON.message;
                }
                setSupplierAlertMessage(message)
            }
        });
    }
})

const loadSupplierTable = (page, limit) => {
    const tableLoadingAnimation = $("#supplierTableLoadingAnimation")
    tableLoadingAnimation.removeClass("hidden");
    $.ajax(BASEURL + "/suppliers?page=" + page + "&limit=" + limit, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        success: function (data) {
            console.log(data);
            suppliersList = data;
            setSupplierTableContent()
            tableLoadingAnimation.addClass("hidden");
        },
        error: function (error) {
            tableLoadingAnimation.addClass("hidden");
            console.log(error);
            let message = "Error loading suppliers";
            if (error.responseJSON) {
                message = error.responseJSON.message;
            }
            setSupplierAlertMessage(message);
        }
    });
}
$([document]).on("click", "#supplierDeleteBtn", function (e) {
    if (window.localStorage.getItem("role") === "USER") {
        setSupplierAlertMessage("You do not have permission to delete supplier")
        return
    }

    const deleteSup = confirm("Are you sure you want to delete supplier?");
    if (!deleteSup) {
        return
    }

    const b = confirm("Are you sure you want to delete supplier");
    if (b) {
        $.ajax(BASEURL + "/suppliers/" + e.target.value, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: function (data) {
                console.log(data);
                setSupplierSuccessMessage("Supplier deleted successfully");
                loadSupplierTable(supplierPageNumber, 20)
            },
            error: function (error) {
                console.log(error);
                let message = "Error deleting supplier";
                if (error.responseJSON) {
                    message = error.responseJSON.message;
                }
                setSupplierAlertMessage(message);
            }
        });
    }
});

$([document]).on("click", "#supplierEditBtn", function (e) {
    if (window.localStorage.getItem("role") === "USER") {
        setSupplierAlertMessage("You do not have permission to edit supplier");
        return
    }
    const supplier = suppliersList.find(supplier => supplier.supplierId === e.target.value)
    if (supplier) {
        $("#supplierCodeFld").val(supplier.supplierId);
        $("#supplierNameFld").val(supplier.name);
        $("#supplierEmailFld").val(supplier.email);
        $("#supplierContact1Fld").val(supplier.contactNo1);
        $("#supplierContact2Fld").val(supplier.contactNo2);
        $("#supplierLaneFld").val(supplier.lane);
        $("#supplierCityFld").val(supplier.city);
        $("#supplierStateFld").val(supplier.state);
        $("#supplierCountryFld").val(supplier.country);
        $("#supplierPostalCodeFld").val(supplier.postalCode);
        $("#addSupplier").removeClass("hidden");
    }
});

setSupplierTableContent = () => {
    const table = $("#supplierTableBody");
    table.empty();
    suppliersList.forEach(supplier => {
        table.append(
            `<tr class="odd:bg-white even:bg-gray-50 hover:bg-blue-200 font-light""> 
                        <td class="m-1 p-2 capitalize">${supplier.supplierId.toUpperCase()}</td>
                        <td class="m-1 p-2 capitalize">${supplier.name}</td>
                        <td class="m-1 p-2 capitalize">${supplier.lane}</td>
                        <td class="m-1 p-2 capitalize">${supplier.city}</td>
                        <td class="m-1 p-2 capitalize">${supplier.state}</td>
                        <td class="m-1 p-2 ">${supplier.postalCode}</td>
                        <td class="m-1 p-2 ">${supplier.country.toUpperCase()}</t>
                        <td class="m-1 p-2 ">${supplier.contactNo1}</td>
                        <td class="m-1 p-2">${supplier.contactNo2}</td>
                        <td class="m-1 p-2">${supplier.email}</td>
                        <td class="m-1 p-2">
                            <button value="${supplier.supplierId}" id="supplierEditBtn" class="text-blue-600 font-bold m-1 p-1 hover:border-b-2 border-blue-600">Edit</button>
                            <button value="${supplier.supplierId}" id="supplierDeleteBtn" class="duration-300 text-red-600 font-bold m-1 p-1 hover:border-b-2 border-red-600">Delete</button>
                        </td>
                    </tr>`
        )
    });
}
const setSupplierAlertMessage = (message) => {
    $("#alertDescription").text(message)
    supplierAlertMessage.removeClass("right-[-100%]")
    supplierAlertMessage.addClass("right-0")
    setTimeout(() => {
        supplierAlertMessage.addClass("right-[-100%]")
        supplierAlertMessage.removeClass("right-0")
    }, 3000);
}
const setSupplierSuccessMessage = (message) => {
    $("#successDescription").text(message)
    supplierSuccessMessage.removeClass("right-[-100%]")
    supplierSuccessMessage.addClass("right-0")
    setTimeout(() => {
        supplierSuccessMessage.addClass("right-[-100%]")
        supplierSuccessMessage.removeClass("right-0")
    }, 3000);
}
$("#supplierTableRefreshBtn").click(function () {
    loadSupplierTable(supplierPageNumber, 20);
});
const navigateSupplierTable = (where) => {
    if (where === "next") {
        supplierPageNumber++;
        if (suppliersList.length === 0) {
            supplierPageNumber = 0;
            $("#supplierPageCountFld").text(supplierPageNumber + 1)
            loadSupplierTable(supplierPageNumber, 20)
            return;
        }
        $("#supplierPageCountFld").text(supplierPageNumber + 1)
        loadSupplierTable(supplierPageNumber, 20)
    } else if (where === "prev") {
        supplierPageNumber--;
        if (supplierPageNumber < 0) {
            supplierPageNumber = 0;
            $("#supplierPageCountFld").text(supplierPageNumber + 1)
            loadSupplierTable(supplierPageNumber, 20)
            return;
        }
        loadSupplierTable(supplierPageNumber, 20)
    }
    $("#supplierPageCountFld").text(supplierPageNumber + 1)
    loadSupplierTable(supplierPageNumber, 20)
}
loadSupplierTable(supplierPageNumber, 20)