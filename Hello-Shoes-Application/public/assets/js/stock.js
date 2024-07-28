const stockTableLoadingAnimation = $("#stockTableLoadingAnimation");
const stockSuccessMessage = $("#success");
const stockAlertMessage = $("#alert");

let stockPageNumber = 0;
let stocksList = [];
console.log(window.localStorage.getItem("token"))

$('#stockSearchFld').on('keypress', function (e) {
    if (e.which === 13) {
        searchStocks()
    }
});
$("#stockSearchBtn").click(function (e) {
    searchStocks()
})

$("#stocksRefreshBtn").click(function (e) {
    loadStockTable(stockPageNumber, 20)
})

const searchStocks = () => {
    const value = $("#stockSearchFld").val();
    if (value === "") {
        setStockAlertMessage("Please enter a value to search")
        return;
    }

    stockTableLoadingAnimation.removeClass("hidden");
    stockTableLoadingAnimation.addClass("flex");
    $.ajax({
        url: BASEURL + "/inventory/items/stocks/filter/" + value,
        method: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (res) {
            stocksList = res;
            stockTableLoadingAnimation.removeClass("flex");
            stockTableLoadingAnimation.addClass("hidden");
            setStockTableContent();
        },
        error: function (error) {
            console.log(error);
        }
    })
}
const loadStockTable = (page, limit) => {
    stockTableLoadingAnimation.removeClass("hidden");
    stockTableLoadingAnimation.addClass("flex");
    $.ajax({
        url: BASEURL + "/inventory/items/stocks" + `?page=${page}&limit=${limit}`,
        method: "GET",
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (res) {
            stocksList = res;
            setStockTableContent();
            stockTableLoadingAnimation.removeClass("flex");
            stockTableLoadingAnimation.addClass("hidden");
        },
        error: function (error) {
            console.log(error);
        }
    })

}

const setStockTableContent = () => {
    $("#stockTableBody").empty();
    stocksList.forEach((stock) => {
        $("#stockTableBody").append(
            `<tr class="odd:bg-white even:bg-gray-50 hover:bg-blue-200 font-light" id="${stock.stockId}">
                        <td class="m-1 p-2 uppercase">${stock.stockId}</td>
                        <td class="m-1 p-2 uppercase">${stock.supplierId}</td>
                        <td class="m-1 p-2 capitalize">${stock.supplierName}</td>
                        <td class="m-1 p-2 uppercase">${stock.itemId}</td>
                        <td class="m-1 p-2 capitalize">${stock.description}</td>
                        <td class="m-1 p-2 "><input class="w-[5rem] sizeFld bg-slate-100 p-2 rounded-md" type="number" value="${stock.size40}" id="size40Fld${stock.stockId}"} ></td>
                        <td class="m-1 p-2 "><input class="w-[5rem] sizeFld bg-slate-100 p-2 rounded-md" type="number" value="${stock.size41}" id="size41Fld${stock.stockId}"></td>
                        <td class="m-1 p-2 "><input class="w-[5rem] sizeFld bg-slate-100 p-2 rounded-md" type="number" value="${stock.size42}" id="size42Fld${stock.stockId}"></td>
                        <td class="m-1 p-2 "><input class="w-[5rem] sizeFld bg-slate-100 p-2 rounded-md" type="number" value="${stock.size43}" id="size43Fld${stock.stockId}"></td>
                        <td class="m-1 p-2 "><input class="w-[5rem] sizeFld bg-slate-100 p-2 rounded-md" type="number" value="${stock.size44}" id="size44Fld${stock.stockId}"></td>
                        <td class="m-1 p-2 "><input class="w-[5rem] sizeFld bg-slate-100 p-2 rounded-md" type="number" value="${stock.size45}" id="size45Fld${stock.stockId}"></td>
                        <td class="m1- p-2">
                            <button value="${stock.stockId}" id="stockEditBtn" class="text-blue-600 font-bold m-1 p-1 hover:border-b-2 border-blue-600">Update</button>
                        </td>
            </tr>`
        )
    })

}

$([document]).on("click", "#stockEditBtn", function (e) {
    if (window.localStorage.getItem("role") === "USER") {
        setStockAlertMessage("You do not have permission to update stocks")
        return
    }

    const stockId = e.target.value;
    const size40 = Number.parseInt($("#size40Fld" + stockId).val());
    const size41 = Number.parseInt($("#size41Fld" + stockId).val());
    const size42 = Number.parseInt($("#size42Fld" + stockId).val());
    const size43 = Number.parseInt($("#size43Fld" + stockId).val());
    const size44 = Number.parseInt($("#size44Fld" + stockId).val());
    const size45 = Number.parseInt($("#size45Fld" + stockId).val());


    let data = {
        stockId: stockId,
        size40: size40,
        size41: size41,
        size42: size42,
        size43: size43,
        size44: size44,
        size45: size45
    }

    data = JSON.stringify(data)
    console.log(data)

    $.ajax({
        url: BASEURL + "/inventory/items/stocks/" + e.target.value.toLowerCase(),
        method: "PUT",
        contentType: "application/json",
        processData: false,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("token")
        },
        data: data,
        success: function (response) {
            console.log(response)
            loadStockTable(stockPageNumber, 20)
            stockTableLoadingAnimation.removeClass("flex")
            stockTableLoadingAnimation.addClass("hidden")
            setStockSuccessMessage("Stock updated successfully")
        },
        error: function (error) {
            console.log(error)
            let message = "Error updating Stock!"
            if (error.responseJSON) {
                message = error.responseJSON.message
            }
            stockTableLoadingAnimation.removeClass("flex")
            stockTableLoadingAnimation.addClass("hidden")
            setStockAlertMessage(message)
        }
    })
})

const setStockSuccessMessage = (message) => {
    $("#successDescription").text(message)
    stockSuccessMessage.removeClass("right-[-100]")
    stockSuccessMessage.addClass("right-[0]")
    setTimeout(() => {
        stockSuccessMessage.addClass("right-[-100]")
        stockSuccessMessage.removeClass("right-[0]")
    }, 5000)
}

const setStockAlertMessage = (message) => {
    $("#alertDescription").text(message)
    stockAlertMessage.removeClass("right-[-100]")
    stockAlertMessage.addClass("right-[0]")
    setTimeout(() => {
        stockAlertMessage.addClass("right-[-100]")
        stockAlertMessage.removeClass("right-[0]")
    }, 5000)
}
const navigateStockTable = (where) => {
    if (where === "next") {
        stockPageNumber++
        if (stocksList.length === 0) {
            stockPageNumber = 0
            $("#stockPageNumber").text(stockPageNumber)
            loadStockTable(stockPageNumber, 20)
            return
        }
        $("#stockPageNumber").text(stockPageNumber)
        loadStockTable(stockPageNumber, 20)
    } else if (where === "prev") {
        stockPageNumber--
        if (stockPageNumber < 0) {
            stockPageNumber = 0
            $("#stockPageNumber").text(stockPageNumber)
            loadStockTable(stockPageNumber, 20)
            return
        }
        $("#stockPageNumber").text(stockPageNumber)
        loadStockTable(stockPageNumber, 20)
    }
}
loadStockTable(stockPageNumber, 20);