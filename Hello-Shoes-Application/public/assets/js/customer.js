let customersList = [];
const customerBtnLoadingAnimation = $("#customerBtnLoadingAnimation");
const customerAddBtn = $("#addCustomerBtn");
const cFld = $(".cFld");
const customerAlertMessage = $("#alert")
const customerSuccessMessage = $("#success")
let customerPageNumber = 0;
$("#customerPageCountFld").text(customerPageNumber + 1)

$("#showCustomerAddForm").click(function () {
    if (window.localStorage.getItem("role") === "USER") {
        $("#alertDescription").text("You are not authorized to add a customer");
        customerAlertMessage.removeClass("right-[-100%]")
        customerAlertMessage.addClass("right-0")
        setTimeout(() => {
            customerAlertMessage.addClass("right-[-100%]")
            customerAlertMessage.removeClass("right-0")
        }, 3000);
        return;
    }
    $("#addCustomer").removeClass("hidden");
});

$("#closeCustomerAddForm").click(function () {
    $("#addCustomer").addClass("hidden");

    $("#customerCodeFld").val("");
    $("#customerNameFld").val("");
    $("#customerLaneFld").val("");
    $("#customerCityFld").val("");
    $("#customerStateFld").val("");
    $("#customerPostalCodeFld").val("");
    $("#customerContactFld").val("");
    $("#customerEmailFld").val("");
    $("#customerDojFld").val("");
    $("#customerLevelFld").val("");
    $("#customerPointsFld").val("");
    $("#customerRecentPurchaseDateAndTimeFld").val("");

});

$("#alertCloseBtn").click(function () {
    customerAlertMessage.removeClass("right-0")
    customerAlertMessage.addClass("right-[-100%]")
})

$("#successCloseBtn").click(function () {
    customerAlertMessage.removeClass("right-0")
    customerAlertMessage.addClass("right-[-100%]")
})

$("#searchCustomerBtn").click(function () {
    const val = $("#customerSearchFld").val();
    if (val.trim() === "") {
        setCustomerAlertMessage("Please enter a valid search value");
        return;
    }

    /*Ajax call to search for supplier*/
    $("#customerTableLoadingAnimation").removeClass("hidden")
    console.log(val);
    $.ajax({
        url: BASEURL + "/customers?pattern=" + val, method: "GET", headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, success: function (response) {
            console.log(response);
            customersList = response;
            setCustomerTable()
            $("#customerTableLoadingAnimation").addClass("hidden")
        }, error: function (response) {
            console.log(response);
            $("#customerTableLoadingAnimation").addClass("hidden")

            let message = "Error searching for customer"
            if (response.responseJSON) {
                message = response.responseJSON.message;
            }
            setCustomerAlertMessage(message)
        }
    });
})

const setCustomerTable = () => {
    $("#customerTableBody").empty();
    customersList.forEach(customer => {
        console.log(customer)
        const doj = customer.doj[0] + "-" + customer.doj[1] + "-" + customer.doj[2]
        const recentDateAndTime = customer.recentPurchaseDateAndTime[0] + "-" + customer.recentPurchaseDateAndTime[1] + "-" + customer.recentPurchaseDateAndTime[2] + " " + customer.recentPurchaseDateAndTime[3] + ":" + customer.recentPurchaseDateAndTime[4]
        $("#customerTableBody").append(`<tr class="odd:bg-white even:bg-gray-50 hover:bg-blue-200 font-light">
                        <td class="m-1 p-2">${customer.customerId.toUpperCase()}</td>
                        <td class="m-1 p-2 capitalize">${customer.name}</td>
                        <td class="m-1 p-2 capitalize">${customer.gender}</td>
                        <td class="m-1 p-2 capitalize">${customer.lane}</td>
                        <td class="m-1 p-2 capitalize">${customer.city}</td>
                        <td class="m-1 p-2 capitalize">${customer.state}</td>
                        <td class="m-1 p-2">${customer.postalCode}</td>
                        <td class="m-1 p-2">${customer.contact}</td>
                        <td class="m-1 p-2">${customer.email}</td>
                        <td class="m-1 p-2">${doj}</td>
                        <td class="m-1 p-2">${customer.totalPoints}</td>
                        <td class="m-1 p-2">${customer.level}</td>
                        <td class="m-1 p-2">${recentDateAndTime}</td>
                        
                        <td class="m-1 p-2">
                            <button value="${customer.customerId}" id="customerEditBtn" class="text-blue-600 font-bold m-1 p-1 hover:border-b-2 border-blue-600">Edit</button>
                            <button value="${customer.customerId}" id="customerDeleteBtn" class="duration-300 text-red-600 font-bold m-1 p-1 hover:border-b-2 border-red-600">Delete</button>
                        </td>
                    </tr>`);
    })
}

$("#addCustomerForm").submit(function (e) {
    e.preventDefault();
    const code = e.target.code.value;
    const name = e.target.name.value;
    const email = e.target.email.value;
    const contact = e.target.contact.value;
    const lane = e.target.lane.value;
    const state = e.target.state.value;
    const city = e.target.city.value;
    const zip = e.target.zip.value;
    const doj = e.target.doj.value;
    const gender = e.target.gender.value;

    const level = e.target.level.value;
    const points = e.target.points.value;

    if (!/^(?! )[A-Za-z0-9 ]{3,50}$/.test(name)) {
        $("#customerNameFld").addClass("border-2 border-red-500");
    } else {
        $("#customerNameFld").removeClass("border-2 border-red-500");
    }

    if (!/^[0-9]{10}$/.test(contact)) {
        $("#customerContactFld").addClass("border-2 border-red-500");
    } else {
        $("#customerContactFld").removeClass("border-2 border-red-500");
    }

    if (!/^(?! )[A-Za-z0-9 ]{3,50}$/.test(lane)) {
        $("#customerLaneFld").addClass("border-2 border-red-500");
    } else {
        $("#customerLaneFld").removeClass("border-2 border-red-500");
    }

    if (!/^(?! )[A-Za-z0-9 ]{3,50}$/.test(city)) {
        $("#customerCityFld").addClass("border-2 border-red-500");
    } else {
        $("#customerCityFld").removeClass("border-2 border-red-500");
    }

    if (!/^[0-9]{4,8}$/.test(zip)) {
        $("#customerPostalCodeFld").addClass("border-2 border-red-500");
    } else {
        $("#customerPostalCodeFld").removeClass("border-2 border-red-500");
    }

    if (!/^(?! )[A-Za-z0-9 ]{3,50}$/.test(state)) {
        $("#customerStateFld").addClass("border-2 border-red-500");
    } else {
        $("#customerStateFld").removeClass("border-2 border-red-500");
    }

    if (!/^(?! )[A-Za-z0-9 ]{3,50}$/.test(name) || !/^[0-9]{10}$/.test(contact) || !/^(?! )[A-Za-z0-9 ]{3,50}$/.test(lane) || !/^(?! )[A-Za-z0-9 ]{3,50}$/.test(city) || !/^[0-9]{4,8}$/.test(zip)) {
        return;
    }

    let data = {
        name: name,
        email: email,
        contact: contact,
        lane: lane,
        city: city,
        doj: doj,
        gender: gender,
        level: level,
        totalPoints: points,
        state: state,
        postalCode: zip
    }
    data = JSON.stringify(data);
    console.log(data);

    if (code.trim() !== "" || code.trim().length !== 0) {

        customerAddBtn.add("cursor-not-allowed");
        customerBtnLoadingAnimation.removeClass("hidden");
        customerBtnLoadingAnimation.addClass("flex")
        cFld.prop("disabled", true);
        cFld.removeClass("hover:border-2")

        $.ajax({
            url: BASEURL + "/customers/" + code, method: "PUT", contentType: "application/json", headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }, data: data, success: function (response) {
                console.log(response);

                customerAddBtn.removeClass("cursor-not-allowed");
                customerBtnLoadingAnimation.addClass("hidden");
                customerBtnLoadingAnimation.removeClass("flex")
                cFld.prop("disabled", false);
                cFld.addClass("hover:border-2")
                e.target.reset();


                loadCustomerTable(customerPageNumber, 20);
                setCustomerSuccessMessage("Customer updated successfully!")
            }, error: function (response) {
                console.log(response);

                customerAddBtn.removeClass("cursor-not-allowed");
                customerBtnLoadingAnimation.addClass("hidden");
                customerBtnLoadingAnimation.removeClass("flex")
                cFld.prop("disabled", false);
                cFld.addClass("hover:border-2")

                let message = "Error updating customer";
                if (response.responseJSON) {
                    message = response.responseJSON.message;
                }
                setCustomerAlertMessage(message)
            }
        })
    } else {

        customerAddBtn.add("cursor-not-allowed");
        customerBtnLoadingAnimation.removeClass("hidden");
        customerBtnLoadingAnimation.addClass("flex")
        cFld.prop("disabled", true);
        cFld.removeClass("hover:border-2")

        $.ajax({
            url: BASEURL + "/customers", method: "POST", contentType: "application/json", headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }, data: data, success: function (response) {
                console.log(response);

                customerAddBtn.removeClass("cursor-not-allowed");
                customerBtnLoadingAnimation.addClass("hidden");
                customerBtnLoadingAnimation.removeClass("flex")
                cFld.prop("disabled", false);
                cFld.addClass("hover:border-2")

                e.target.reset();
                $("#addCustomer").addClass("hidden");
                loadCustomerTable(customerPageNumber, 20)
                setCustomerSuccessMessage("Customer added successfully!")
            }, error: function (response) {
                console.log(response);

                customerAddBtn.removeClass("cursor-not-allowed");
                customerBtnLoadingAnimation.addClass("hidden");
                customerBtnLoadingAnimation.removeClass("flex")
                cFld.prop("disabled", false);
                cFld.addClass("hover:border-2")

                let message = "Error adding customer";
                if (response.responseJSON) {
                    message = response.responseJSON.message;
                }
                setCustomerAlertMessage(message)
            }
        });
    }
});

const loadCustomerTable = (page, limit) => {
    $("#customerTableLoadingAnimation").removeClass("hidden")
    $.ajax({
        url: BASEURL + "/customers?page=" + page + "&limit=" + limit, method: "GET", headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        }, success: function (response) {
            console.log(response);
            customersList = response;
            setCustomerTable()
            $("#customerTableLoadingAnimation").addClass("hidden")
        }, error: function (response) {
            console.log(response);
            let message = "Error loading customers"
            if (response.responseJSON) {
                message = response.responseJSON.message;
            }
            $("#customerTableLoadingAnimation").addClass("hidden")
            setCustomerAlertMessage(message)
        }
    });
}
$("#customerTableRefreshBtn").click(function () {
    loadCustomerTable(customerPageNumber, 20);
})

$([document]).on("click", "#customerDeleteBtn", function (e) {
    if (window.localStorage.getItem("role") === "USER") {
        setCustomerAlertMessage("You do not have permission to delete customer")
        return
    }
    const deleteCus = confirm("Are you sure you want to delete customer?");
    if (!deleteCus) {
        return
    }
    const id = e.target.value;
    console.log(id);
    $.ajax({
        url: BASEURL + "/customers/" + id, method: "DELETE", headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }, success: function (response) {
            console.log(response);
            loadCustomerTable(customerPageNumber, 20)
            setCustomerSuccessMessage("Customer deleted successfully!");
        }, error: function (response) {
            console.log(response);
            let message = "Error deleting customer"
            if (response.responseJSON) {
                message = response.responseJSON.message;
            }
            loadCustomerTable(customerPageNumber, 20);
            setCustomerAlertMessage(message)
        }
    })
})

$([document]).on("click", "#customerEditBtn", function (e) {
    if (window.localStorage.getItem("role") === "USER") {
        setCustomerAlertMessage("You do not have permission to edit customer")
        return
    }

    const id = e.target.value;
    console.log(id);
    const customer = customersList.find(customer => customer.customerId === id);
    let doj = customer.doj[0] + "-" + customer.doj[1] + "-" + customer.doj[2]
    doj = new Date(doj).toISOString()
    const recentDateAndTime = customer.recentPurchaseDateAndTime[0] + "-" + customer.recentPurchaseDateAndTime[1] + "-" + customer.recentPurchaseDateAndTime[2] + " " + customer.recentPurchaseDateAndTime[3] + ":" + customer.recentPurchaseDateAndTime[4]

    console.log(customer);
    $("#addCustomer").removeClass("hidden");

    $("#customerCodeFld").val(customer.customerId);
    $("#customerNameFld").val(customer.name);
    $("#customerLaneFld").val(customer.lane);
    $("#customerCityFld").val(customer.city);
    $("#customerStateFld").val(customer.state);
    $("#customerPostalCodeFld").val(customer.postalCode);
    $("#customerContactFld").val(customer.contact);
    $("#customerEmailFld").val(customer.email);
    document.getElementById("dojFld").valueAsDate = new Date(doj);
    $("#customerLevelFld").val(customer.level);
    $("#customerPointsFld").val(customer.totalPoints);
    $("#customerGenderFld").val(customer.gender);
    $("#customerRecentPurchaseDateAndTimeFld").val(recentDateAndTime);
})

const setCustomerAlertMessage = (message) => {
    $("#alertDescription").text(message)
    customerAlertMessage.removeClass("right-[-100%]")
    customerAlertMessage.addClass("right-0")
    setTimeout(() => {
        customerAlertMessage.addClass("right-[-100%]")
        customerAlertMessage.removeClass("right-0")
    }, 3000);
}
const setCustomerSuccessMessage = (message) => {
    $("#successDescription").text(message);
    customerSuccessMessage.removeClass("right-[-100%]")
    customerSuccessMessage.addClass("right-0")
    setTimeout(() => {
        customerSuccessMessage.addClass("right-[-100%]")
        customerSuccessMessage.removeClass("right-0")
    }, 3000);
}
const navigateCustomerTable = (where) => {
    if (where === "next") {
        customerPageNumber++;
        if (customersList.length === 0) {
            customerPageNumber = 0;
            $("#customerPageCountFld").text(customerPageNumber + 1)
            loadCustomerTable(customerPageNumber, 20)
            return;
        }
        $("#customerPageCountFld").text(customerPageNumber + 1)
        loadCustomerTable(customerPageNumber, 20)
    } else if (where === "prev") {
        customerPageNumber--;
        if (customerPageNumber < 0) {
            customerPageNumber = 0;
            $("#customerPageCountFld").text(customerPageNumber + 1)
            loadCustomerTable(customerPageNumber, 20)
            return;
        }
        $("#customerPageCountFld").text(customerPageNumber + 1)
        loadCustomerTable(customerPageNumber, 20)
    }
}
loadCustomerTable(customerPageNumber, 20);