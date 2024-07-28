const employeeBtnLoadingAnimation = $("#employeeBtnLoadingAnimation")
const addEmployeeBtn = $("#addEmployeeBtn")
const eFld = $(".eFld")
const employeeAlertMessage = $("#alert")
const employeeSuccessMessage = $("#success")
const employeeTableLoadingAnimation = $("#employeeTableLoadingAnimation")
let employeeList = []
let employeePageNumber = 0;
$("#employeePageCountFld").text(employeePageNumber + 1)


$("#showEmployeeAddForm").click(
    function () {
        $("#addEmployee").removeClass("hidden");
    }
);

$("#closeEmployeeAddForm").click(
    function () {
        $("#addEmployee").addClass("hidden");
        eFld.val("");
        $("#employeeImgPreview").attr("src", "../assets/img/default_employee_avatar.png");
    }
);

$("#searchEmployeeBtn").click(function () {
    const searchEmployeeFld = $("#employeeSearchFld")
    const searchEmployeeValue = searchEmployeeFld.val().toString().trim()

    if (searchEmployeeValue.trim() === "") {
        setAlertMessage("Please enter a search value!")
        return
    }
    employeeTableLoadingAnimation.removeClass("hidden")
    employeeTableLoadingAnimation.addClass("flex")
    $.ajax({
        url: BASEURL + '/employees?pattern=' + searchEmployeeValue,
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
        },
        success: function (response) {
            employeeList = response
            console.log(response)
            employeeTableLoadingAnimation.removeClass("flex")
            employeeTableLoadingAnimation.addClass("hidden")
            setEmployeeTableContent()
        },
        error(error) {
            console.log(error)
            employeeTableLoadingAnimation.removeClass("flex")
            employeeTableLoadingAnimation.addClass("hidden")
            let message = "Employee not found!"
            if (error.responseJSON) {
                message = error.responseJSON.message
            }
            setEmployeeAlertMessage(message)
        }
    })
})
$("#employeeImg").change(
    function () {
        console.log(this.files)
        if (this.files[0].size > 3 * 1024 * 1024) {
            employeeAlertMessage("File size exceeds the limit of 3MB!");
            this.value = ""
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            $('#employeeImgPreview')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(this.files[0]);
    }
)

$("#addEmployeeForm").submit(function (evt) {
    evt.preventDefault();

    const code = evt.target.code.value.toString();
    const name = evt.target.name.value.toString();
    const email = evt.target.email.value.toString();
    const contact = evt.target.contact.value.toString();
    const lane = evt.target.lane.value.toString();
    const city = evt.target.city.value.toString();
    const state = evt.target.state.value.toString();
    const status = evt.target.status.value.toString();
    const dob = evt.target.dob.value.toString();
    const doj = evt.target.doj.value.toString();
    const designation = evt.target.designation.value.toString();
    const gContact = evt.target.gContact.value.toString();
    const gName = evt.target.gName.value.toString();
    const gender = evt.target.gender.value.toString();
    const role = evt.target.role.value.toString();
    const zip = evt.target.zip.value.toString();
    const branch = evt.target.branch.value.toString();

    if (!/^(?! )[A-Za-z0-9 ]{3,50}$/.test(name)) {
        $("#employeeNameFld").addClass("border-2 border-red-500")
    } else {
        $("#employeeNameFld").removeClass("border-2 border-red-500")
    }

    if (!/(?! )[A-Za-z0-9 ]{3,30}$/.test(lane)) {
        $("#employeeLaneFld").addClass("border-2 border-red-500")
    } else {
        $("#employeeLaneFld").removeClass("border-2 border-red-500")
    }

    if (!/^(?! )[A-Za-z]{3,30}$/.test(city)) {
        $("#employeeCityFld").addClass("border-2 border-red-500")
    } else {
        $("#employeeCityFld").removeClass("border-2 border-red-500")
    }

    if (!/^(?! )[A-Za-z ]{3,30}$/.test(state)) {
        $("#employeeStateFld").addClass("border-2 border-red-500")
    } else {
        $("#employeeStateFld").removeClass("border-2 border-red-500")
    }

    if (!/^(?! )[A-Za-z ]{3,30}$/.test(designation)) {
        $("#employeeDesignationFld").addClass("border-2 border-red-500")
    } else {
        $("#employeeDesignationFld").removeClass("border-2 border-red-500")
    }

    if (!/^(?! )[A-Za-z ]{3,30}$/.test(gName)) {
        $("#employeeGuardianNameFld").addClass("border-2 border-red-500")
    } else {
        $("#employeeGuardianNameFld").removeClass("border-2 border-red-500")
    }

    if (!/^[0-9]{10,12}$/.test(contact)) {
        $("#employeeContactFld").addClass("border-2 border-red-500")
    } else {
        $("#employeeContactFld").removeClass("border-2 border-red-500")
    }

    if (!/^[0-9]{10,12}$/.test(gContact)) {
        $("#employeeGuardianContactFld").addClass("border-2 border-red-500")
    } else {
        $("#employeeGuardianContactFld").removeClass("border-2 border-red-500")
    }

    if (!/^[0-9]{3,30}$/.test(zip)) {
        $("#employeePostalCodeFld").addClass("border-2 border-red-500")
    } else {
        $("#employeePostalCodeFld").removeClass("border-2 border-red-500")
    }

    if (!/^(?! )[A-Za-z0-9]{3,30}$/.test(branch)) {
        $("#employeeBranchFld").addClass("border-2 border-red-500")
    } else {
        $("#employeeBranchFld").removeClass("border-2 border-red-500")
    }

    if (!/^(?! )[A-Za-z ]{3,30}$/.test(name) || !/^(?! )[A-Za-z0-9 ]{3,30}$/.test(lane) || !/^(?! )[A-Za-z]{3,30}$/.test(city) || !/^(?! )[A-Za-z ]{3,30}$/.test(state) || !/^(?! )[A-Za-z ]{3,30}$/.test(designation) || !/^(?! )[A-Za-z ]{3,30}$/.test(gName) || !/^[0-9]{10,12}$/.test(contact) || !/^[0-9]{10,12}$/.test(gContact) || !/^[0-9]{4,10}$/.test(zip) || !/^(?! )[A-Za-z0-9]{3,30}$/.test(branch)) {
        return
    }

    let data = {
        employeeId: code,
        name: name,
        email: email,
        contact: contact,
        lane: lane,
        city: city,
        state: state,
        postalCode: zip,
        status: status,
        dob: dob,
        doj: doj,
        designation: designation,
        guardianContact: gContact,
        guardianName: gName,
        gender: gender,
        role: role,
        attachBranch: branch,
    }

    const file = $("#employeeImg")[0].files[0];
    const formData = new FormData();

    data = JSON.stringify(data);
    console.log(data)

    formData.append('image', file);
    formData.append('dto', data);

    console.log(formData.get('image'))
    console.log(formData.get('dto'))

    eFld.prop("disabled", true)
    eFld.removeClass("hover:border-2")
    employeeBtnLoadingAnimation.removeClass("hidden")
    employeeBtnLoadingAnimation.addClass("flex")
    addEmployeeBtn.addClass("cursor-not-allowed")
    if (code === "") {
        $.ajax({
            url: BASEURL + '/employees',
            type: 'POST',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response)

                $("#employeeImgPreview").attr("src", "../assets/img/default_employee_avatar.png");
                eFld.prop("disabled", false)
                eFld.addClass("hover:border-2")
                employeeBtnLoadingAnimation.removeClass("flex")
                employeeBtnLoadingAnimation.addClass("hidden")
                addEmployeeBtn.removeClass("cursor-not-allowed")
                evt.target.reset();
                loadEmployeeTable(employeePageNumber, 20)
                setEmployeeSuccessMessage("Employee added successfully!")
            },
            error: function (error) {

                console.log(error);
                eFld.prop("disabled", false)
                eFld.addClass("hover:border-2")
                employeeBtnLoadingAnimation.removeClass("flex")
                employeeBtnLoadingAnimation.addClass("hidden")
                addEmployeeBtn.removeClass("cursor-not-allowed")

                let message = "Error adding employee!"
                if (error.responseJSON) {
                    message = error.responseJSON.message;
                }
                setEmployeeAlertMessage(message);
            }
        });
    } else {
        $.ajax({
            url: BASEURL + '/employees/' + code.toLowerCase(),
            type: 'PUT',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response)

                $("#employeeImgPreview").attr("src", "../assets/img/default_employee_avatar.png");
                eFld.prop("disabled", false)
                eFld.addClass("hover:border-2")
                employeeBtnLoadingAnimation.removeClass("flex")
                employeeBtnLoadingAnimation.addClass("hidden")
                addEmployeeBtn.removeClass("cursor-not-allowed")
                evt.target.reset();
                loadEmployeeTable(employeePageNumber, 20)
                setEmployeeSuccessMessage("Employee added successfully!")
            },
            error: function (error) {

                console.log(error);
                eFld.prop("disabled", false)
                eFld.addClass("hover:border-2")
                employeeBtnLoadingAnimation.removeClass("flex")
                employeeBtnLoadingAnimation.addClass("hidden")
                addEmployeeBtn.removeClass("cursor-not-allowed")

                let message = "Error adding employee!"
                if (error.responseJSON) {
                    message = error.responseJSON.message;
                }
                setEmployeeAlertMessage(message);
            }
        });
    }

})
const loadEmployeeTable = (page, limit) => {
    employeeTableLoadingAnimation.removeClass("hidden")
    employeeTableLoadingAnimation.addClass("flex")

    $.ajax({
        url: BASEURL + '/employees' + `?page=${page}&limit=${limit}`,
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),

        },
        success: function (response) {
            console.log(response)
            employeeList = response
            employeeTableLoadingAnimation.removeClass("flex")
            employeeTableLoadingAnimation.addClass("hidden")
            setEmployeeTableContent()
        },
        error: function (error) {
            console.log(error)
            employeeTableLoadingAnimation.removeClass("flex")
            employeeTableLoadingAnimation.addClass("hidden")
            setEmployeeAlertMessage("Error loading employees!")
        }
    })
}
const setEmployeeTableContent = () => {
    const employeeTableBody = $("#employeeTableBody")
    employeeTableBody.empty()
    employeeList.forEach((employee) => {
        const doj = employee.doj[0] + "-" + employee.doj[1] + "-" + employee.doj[2]
        const dob = employee.dob[0] + "-" + employee.dob[1] + "-" + employee.dob[2]
        employeeTableBody.append(
            `<tr class="odd:bg-white even:bg-gray-50 hover:bg-blue-200 font-light">
                        <td class="m-1 p-2">${employee.employeeId.toUpperCase()}</td>
                        <td class="m-1 p-2"><img class="bg-cover rounded-full p-1 shadow-custom w-[8rem] h-[8rem]" src="data:image/jpeg;base64,${employee.image}" alt="employeeImg"></td>
                        <td class="m-1 p-2 capitalize">${employee.name}</td>
                        <td class="m-1 p-2 capitalize">${employee.status}</td>
                        <td class="m-1 p-2 capitalize">${employee.gender}</td>
                        <td class="m-1 p-2 capitalize">${dob}</td>
                        <td class="m-1 p-2 capitalize">${employee.lane}</td>
                        <td class="m-1 p-2 capitalize">${employee.city}</td>
                        <td class="m-1 p-2 capitalize">${employee.state}</td>
                        <td class="m-1 p-2">${employee.postalCode}</td>
                        <td class="m-1 p-2">${employee.contact}</td>
                        <td class="m-1 p-2">${employee.email}</td>
                        <td class="m-1 p-2 capitalize">${employee.attachBranch}</td>
                        <td class="m-1 p-2">${doj}</td>
                        <td class="m-1 p-2 capitalize">${employee.designation}</td>
                        <td class="m-1 p-2">${employee.role}</td>
                         <td class="m-1 p-2 capitalize">${employee.guardianName}</td>
                        <td class="m-1 p-2">${employee.guardianContact}</td>
                        <td class="m-1 p-2">
                            <button value="${employee.employeeId}" id="employeeEditBtn" class="text-blue-600 font-bold m-1 p-1 hover:border-b-2 border-blue-600">Edit</button>
                            <button value="${employee.employeeId}" id="emloyeeDeleteBtn" class="duration-300 text-red-600 font-bold m-1 p-1 hover:border-b-2 border-red-600">Delete</button>
                        </td>
                    </tr>`
        )
    })
}
$([document]).on("click", "#emloyeeDeleteBtn", function (e) {
    if (window.localStorage.getItem("role") === "USER") {
        setCustomerAlertMessage("You do not have permission to delete employee")
        return
    }
    const deleteEm = confirm("Are you sure you want to delete employee?");
    if (!deleteEm) {
        return
    }
    const id = e.target.value;
    console.log(id);
    $.ajax({
        url: BASEURL + "/employees/" + id, method: "DELETE", headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }, success: function (response) {
            console.log(response);
            loadEmployeeTable(employeePageNumber, 20)
            setEmployeeSuccessMessage("Employee deleted successfully!");
        }, error: function (response) {
            console.log(response);
            let message = "Error deleting employees"
            if (response.responseJSON) {
                message = response.responseJSON.message;
            }
            loadCustomerTable();
            setCustomerAlertMessage(message)
        }
    })
})


$([document]).on("click", "#employeeEditBtn", function (e) {
    if (window.localStorage.getItem("role") === "USER") {
        setCustomerAlertMessage("You do not have permission to edit employee")
        return
    }

    const id = e.target.value;
    console.log(id);
    const employee = employeeList.find(employee => employee.employeeId === id);
    let doj = employee.doj[0] + "-" + employee.doj[1] + "-" + employee.doj[2]
    doj = new Date(doj).toISOString()
    let dob = employee.dob[0] + "-" + employee.dob[1] + "-" + employee.dob[2]
    dob = new Date(dob).toISOString()

    console.log(employee);
    $("#addEmployee").removeClass("hidden");

    $("#employeeCodeFld").val(employee.employeeId);
    $("#employeeNameFld").val(employee.name);
    $("#employeeLaneFld").val(employee.lane);
    $("#employeeCityFld").val(employee.city);
    $("#employeeStateFld").val(employee.state);
    $("#employeePostalCodeFld").val(employee.postalCode);
    $("#employeeContactFld").val(employee.contact);
    $("#employeeEmailFld").val(employee.email);
    document.getElementById("employeeDateOfJoinedFld").valueAsDate = new Date(doj);
    document.getElementById("employeeDOBFld").valueAsDate = new Date(dob);
    $("#employeeAccessRoleFld").val(employee.role);
    $("#civilStatusSelect").val(employee.status);
    $("#employeeGenderSelect").val(employee.gender);
    $("#employeeGuardianContactFld").val(employee.guardianContact);
    $("#employeeGuardianNameFld").val(employee.guardianName);
    $("#employeeBranchFld").val(employee.attachBranch);
    $("#employeeDesignationFld").val(employee.designation);
    $("#employeeImgPreview").attr("src", "data:image/jpeg;base64," + employee.image);
})
const setEmployeeSuccessMessage = (message) => {
    $("#successDescription").text(message)
    employeeSuccessMessage.removeClass("right-[-100]")
    employeeSuccessMessage.addClass("right-[0]")
    setTimeout(() => {
        employeeSuccessMessage.addClass("right-[-100]")
        employeeSuccessMessage.removeClass("right-[0]")
    }, 5000)
}

const setEmployeeAlertMessage = (message) => {
    $("#alertDescription").text(message)
    employeeAlertMessage.removeClass("right-[-100]")
    employeeAlertMessage.addClass("right-[0]")
    setTimeout(() => {
        employeeAlertMessage.addClass("right-[-100]")
        employeeAlertMessage.removeClass("right-[0]")
    }, 5000)
}
$("#employeeTableRefreshBtn").click(() => {
    loadEmployeeTable(employeePageNumber, 20)
})
const navigateEmployeeTable = (where) => {
    if (where === "next") {
        employeePageNumber++
        if (employeeList.length === 0) {
            employeePageNumber = 0;
            $("#employeePageCountFld").text(employeePageNumber + 1)
            loadEmployeeTable(employeePageNumber, 20)
            return
        }
        $("#employeePageCountFld").text(employeePageNumber + 1)
        loadEmployeeTable(employeePageNumber, 20)
    } else if (where === "prev") {
        employeePageNumber --
        if (employeePageNumber < 0) {
            employeePageNumber = 0;
            $("#employeePageCountFld").text(employeePageNumber + 1)
            loadEmployeeTable(employeePageNumber, 20)
            return;
        }
        $("#employeePageCountFld").text(employeePageNumber + 1)
        loadEmployeeTable(employeePageNumber, 20)
    }
}
loadEmployeeTable(employeePageNumber, 20)