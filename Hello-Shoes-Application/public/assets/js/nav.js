const role = window.localStorage.getItem("role");

const setUserAuthorization = () => {
    $("#adminBtn").addClass("hidden")
}

$("#logoutBtn").click(function (evt) {
    $("#logOutDialog").removeClass("hidden");
});
$("#logoutConfirmBtn").click(function (evt) {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("role");
    window.location.href = "/"
})
$("#logoutCancelBtn").click(function (evt) {
    $("#logOutDialog").addClass("hidden");
});

if (role === "USER") {
    setUserAuthorization();
} else if (role === "ADMIN") {

} else {
    window.location.replace("/Unauthorized.html");
}

const navigationOnClick = (value) => {
    switch (value) {
        case "admin":
            $("#adminSection").removeClass("hidden");

            $("#inventorySection").addClass("hidden");
            $("#employeeSection").addClass("hidden");
            $("#supplierSection").addClass("hidden");
            $("#customerSection").addClass("hidden");
            $("#orderSection").addClass("hidden")
            break;
        case "order":
            $("#orderSection").removeClass("hidden");

            $("#inventorySection").addClass("hidden");
            $("#employeeSection").addClass("hidden");
            $("#supplierSection").addClass("hidden");
            $("#customerSection").addClass("hidden");
            $("#adminSection").addClass("hidden");
            break;
        case "inventory":
            $("#inventorySection").removeClass("hidden");

            $("#orderSection").addClass("hidden");
            $("#employeeSection").addClass("hidden");
            $("#supplierSection").addClass("hidden");
            $("#customerSection").addClass("hidden");
            $("#adminSection").addClass("hidden");
            break;
        case "employee":
            $("#employeeSection").removeClass("hidden");

            $("#orderSection").addClass("hidden");
            $("#inventorySection").addClass("hidden");
            $("#supplierSection").addClass("hidden");
            $("#customerSection").addClass("hidden");
            $("#adminSection").addClass("hidden");
            break;
        case "supplier":
            $("#supplierSection").removeClass("hidden");

            $("#orderSection").addClass("hidden");
            $("#inventorySection").addClass("hidden");
            $("#employeeSection").addClass("hidden");
            $("#customerSection").addClass("hidden");
            $("#adminSection").addClass("hidden");
            break;
        case "customer":
            $("#customerSection").removeClass("hidden");

            $("#orderSection").addClass("hidden");
            $("#inventorySection").addClass("hidden");
            $("#employeeSection").addClass("hidden");
            $("#supplierSection").addClass("hidden");
            $("#adminSection").addClass("hidden");
            break;

        default:
            break;
    }
}

const setLiveDateAndTime = ()=>{
    const date = new Date();
    document.querySelector("#dateFld").textContent = date.toLocaleDateString();
    document.querySelector("#timeFld").textContent = date.toLocaleTimeString();
};

setInterval(setLiveDateAndTime, 1000);