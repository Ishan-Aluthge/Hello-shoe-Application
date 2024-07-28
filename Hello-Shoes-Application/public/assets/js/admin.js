let disabledItemsList = []
let orderList = []
let disabledItemTablePageNumber = 0;
let orderTablePageNumber = 0;

const itemTableBody = $("#deactivatedItemTableBody")
const orderTableBody = $("#adminOrderTableBody")

const loadOrderTable = (page, limit) => {
    $("#adminOrderTableLoadingAnimation").removeClass("hidden")
    $.ajax({
        url: BASEURL + "/sales?page=" + page + "&limit=" + limit,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        method: "GET",
        success: function (res) {
            console.log(res)
            orderList = res;
            $("#adminOrderTableLoadingAnimation").addClass("hidden")
            setOrderTableContent(orderList)
        },
        error: function (err) {
            $("#adminOrderTableLoadingAnimation").addClass("hidden")
            console.log(err)
        }
    })
}
const setOrderTableContent = (list) => {
    orderTableBody.empty()
    list.forEach((sale, index) => {
        const createdAt = sale.createdAt;
        const dateTime = createdAt[0]+"-"+createdAt[1]+"-"+createdAt[2]+" "+createdAt[3]+":"+createdAt[4]+":"+createdAt[5]
        orderTableBody.append(
            `<tr class="odd:bg-white even:bg-gray-50 hover:bg-blue-200 font-light" id=${index}>
                <td class="uppercase m-1 p-2">${sale.saleId}</td>
                <td class="capitalize m-1 p-2 ">${sale.paymentDescription}</td>
                <td class="m-1 p-2">${sale.cashierName}</td>
                <td class="capitalize m-1 p-2 ">${sale.customerId}</td>
                <td class="capitalize m-1 p-2">${dateTime}</td>
            </tr>
            `
        )
    })
}
const loadDisabledItemsTable = (page, limit) => {
    $("#dItemsTableLoadingAnimation").removeClass("hidden")
    $.ajax({
        url: BASEURL + "/inventory/items?availability=false&page=" + page + "&limit=" + limit,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        method: "GET",
        success: function (res) {
            console.log(res)
            disabledItemsList = res
            setDisabledItemsTableContent(disabledItemsList)
            $("#dItemsTableLoadingAnimation").addClass("hidden")
        },
        error: function (err) {
            $("#dItemsTableLoadingAnimation").addClass("hidden")
            console.log(err)
        }
    })
}
const setDisabledItemsTableContent = (list) => {
    itemTableBody.empty()
    list.forEach((item, index) => {
        itemTableBody.append(
            `<tr class="odd:bg-white even:bg-gray-50 hover:bg-blue-200 font-light" id=${index}>
                <td class="uppercase m-1 p-2">${item.itemId}</td>
                <td class="capitalize m-1 p-2 ">${item.description}</td>
                 <td class="capitalize m-1 p-2"><button value="${item.itemId}" class="text-blue-500 font-bold hover:text-blue-600 hover:border-b-2 border-blue-500" id="itemActivateBtn">Activate</button></td>
            </tr>
            `
        )
    })
}
itemTableBody.on("click", "#itemActivateBtn", function (e) {
    const res = confirm("Are you sure you want to activate this item?");
    if (!res) {
        return
    }
    const itemId = e.target.value.toString().toLowerCase()

    console.log(itemId)
    $.ajax({
        url: BASEURL + "/inventory/items/activate/" + itemId,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        method: "PUT",
        success: function (res) {
            console.log(res)
            loadDisabledItemsTable(disabledItemTablePageNumber, 20)
        },
        error: function (err) {
            console.log(err)
        }
    })
})
const setPopularItem = (res) => {
    $("#popularItemImg").attr("src", "data:image/jpeg;base64," + res.image)
    $("#popularItemNameFld").val(res.description)
    $("#popularItemIdFld").val(res.itemId)
    $("#popularItemSellingPriceFld").val(res.sellingPrice)
};
const getPopularItem = (range) => {
    $("#popularLoadingBtn").addClass("animate-spin")
    $.ajax({
        url: BASEURL + "/inventory/items/popular?range=" + range,
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        method: "GET",
        success: function (res) {
            console.log(res)
            $("#popularLoadingBtn").removeClass("animate-spin")
            setPopularItem(res)
        },
        error: function (err) {
            $("#popularItemImg").attr("src", "../assets/img/default_employee_avatar.png")
            $("#popularItemNameFld").val("")
            $("#popularItemIdFld").val("")
            $("#popularItemSellingPriceFld").val("")
            $("#popularLoadingBtn").removeClass("animate-spin")
            console.log(err)
        }
    })
};
$("#filterSelect").change(function (e) {
    getPopularItem(Number.parseInt(e.target.value))
});
$("#dItemsRefreshBtn").click(function (e) {
    loadDisabledItemsTable(disabledItemTablePageNumber, 20)
})

$("#adminOrderRefreshBtn").click(function (e) {
    loadOrderTable(orderTablePageNumber, 20)
})
getPopularItem(0)
const getDayOverView = () => {
    $("#overViewRefreshBtn").addClass("animate-spin")
    $.ajax({
        url: BASEURL + "/sales/overview",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        },
        method: "GET",
        success: function (res) {
            console.log(res)
            $("#overViewRefreshBtn").removeClass("animate-spin")
            $("#totalSaleFld").val(res.totalSales)
            $("#billCountFld").val(res.totalBills)
            $("#totalProfitFld").val(res.totalProfit)
        },
        error: function (err) {
            $("#overViewRefreshBtn").removeClass("animate-spin")
            console.log(err)
        }
    })
};
$("#overViewRefreshBtn").click(function (e) {
    getDayOverView()
})
const navigateDisabledItemTable = (where) => {
    if (where === "next") {
        disabledItemTablePageNumber++
        if (disabledItemsList.length === 0) {
            disabledItemTablePageNumber = 0
            $("#adminPageCountFld").text(disabledItemTablePageNumber + 1)
            loadDisabledItemsTable(disabledItemTablePageNumber, 20)
        }
        $("#adminPageCountFld").text(disabledItemTablePageNumber + 1)
        loadDisabledItemsTable(disabledItemTablePageNumber, 20)
    } else if (where === "prev") {
        disabledItemTablePageNumber--
        if (disabledItemTablePageNumber < 0) {
            disabledItemTablePageNumber = 0
            $("#adminPageCountFld").text(disabledItemTablePageNumber + 1)
            loadDisabledItemsTable(disabledItemTablePageNumber, 20)
        }
        $("#adminPageCountFld").text(disabledItemTablePageNumber + 1)
        loadDisabledItemsTable(disabledItemTablePageNumber, 20)
    }
    loadDisabledItemsTable(disabledItemTablePageNumber, 20)
}
const navigateOrderTable = (where) => {
    if (where === "next") {
        orderTablePageNumber++
        if (orderList.length === 0) {
            orderTablePageNumber = 0
            $("#adminOrderPageCountFld").text(orderTablePageNumber + 1)
            loadOrderTable(orderTablePageNumber, 20)
        }
        $("#adminOrderPageCountFld").text(orderTablePageNumber + 1)
        loadOrderTable(orderTablePageNumber, 20)
    } else if (where === "prev") {
        orderTablePageNumber--
        if (orderTablePageNumber < 0) {
            orderTablePageNumber = 0
            $("#adminOrderPageCountFld").text(orderTablePageNumber + 1)
            loadOrderTable(orderTablePageNumber, 20)
        }
        $("#adminOrderPageCountFld").text(orderTablePageNumber + 1)
        loadOrderTable(orderTablePageNumber, 20)
    }
    loadOrderTable(orderTablePageNumber, 20)
}
$("#orderSearchBtn").click(function (e) {
    const searchValue = $("#orderSearchFld").val().toString().toLowerCase()
    if(searchValue.trim().length < 1){
        setAlert("Search field cannot be empty")
        return
    }
    $("#adminOrderTableLoadingAnimation").removeClass("hidden")
    $.ajax({
        url: BASEURL + "/sales?search=" + searchValue,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        method: "GET",
        success: function (res) {
            console.log(res)
            orderList = res
            $("#adminOrderTableLoadingAnimation").addClass("hidden")
            setOrderTableContent(orderList)
        },
        error: function (err) {
            $("#adminOrderTableLoadingAnimation").addClass("hidden")
            console.log(err)
        }
    })
})
getDayOverView()
loadOrderTable(orderTablePageNumber, 20)
loadDisabledItemsTable(disabledItemTablePageNumber, 20)