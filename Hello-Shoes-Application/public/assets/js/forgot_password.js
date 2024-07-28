const otpSendBtn = $("#otpSendBtn");
const alertMessage = $("#alert")
const successMessage = $("#success")
const btnLoadingAnimation = $("#btnLoadingAnimation")
const fld = $(".fld")
const otpFld = $("#otpFld")
const emailFld = $("#emailFld")
let isEmailVerified = false;
otpSendBtn.prop("disabled", true)
otpSendBtn.removeClass("hover:bg-red-500")


$("#resetForm").submit(function (event) {
    event.preventDefault();

    const email = event.target.email.value.toString().trim().toLocaleLowerCase();
    const password1 = event.target.password1.value.toString().trim();
    const password2 = event.target.password2.value.toString().trim();

    console.log("Email: " + email, "Password1: " + password1, "Password2: " + password2);

    if (isEmailVerified) {
        if ((password1.length > 8) && (password2.length > 8) && (password1 === password2)) {

            $("#password1Fld").removeClass("border-2 border-red-500")
            $("#password2Fld").removeClass("border-2 border-red-500")
            btnLoadingAnimation.removeClass("hidden")
            btnLoadingAnimation.addClass("flex")
            fld.prop("disabled", true)
            fld.removeClass("hover:border-2");
            $("#registerBtn").addClass("cursor-not-allowed")

            $.ajax(BASEURL + "/auth/users", {
                method: "PUT",
                contentType: "application/json",
                data: JSON.stringify({email: email, password: password1}),
                success: function (response) {
                    console.log(response);
                    event.target.reset();
                    btnLoadingAnimation.removeClass("flex")
                    btnLoadingAnimation.addClass("hidden")
                    fld.prop("disabled", false)
                    fld.addClass("hover:border-2");
                    $("#registerBtn").removeClass("cursor-not-allowed")
                    otpFld.addClass("hover:border-2")
                    otpSendBtn.prop("disabled", false)
                    isEmailVerified = false;
                    otpSendBtn.text("Send OTP")

                    setSuccessMessage("Password updated successfully")

                },
                error: function (error) {
                    console.log(error);
                    let message = "Error updating password!"
                    if (error.responseJSON) {
                        message = error.responseJSON.message;
                    }

                    btnLoadingAnimation.removeClass("flex")
                    btnLoadingAnimation.addClass("hidden")
                    fld.prop("disabled", false)
                    fld.addClass("hover:border-2");
                    $("#registerBtn").removeClass("cursor-not-allowed")
                    otpFld.prop("disabled", false)
                    otpFld.addClass("hover:border-2")
                    otpSendBtn.prop("disabled", false)
                    isEmailVerified = false;
                    otpSendBtn.text("Send OTP")

                    setAlertMessage(message)
                }
            });
        } else {
            $("#password1Fld").addClass("border-2 border-red-500")
            $("#password2Fld").addClass("border-2 border-red-500")

            setAlertMessage("Password must be at least 8 characters long and must match")
        }
    } else {
        setAlertMessage("Email not verified")
    }
});

emailFld.keyup(function (event) {
    const email = event.target.value;
    if (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        otpSendBtn.removeAttr("disabled")
        otpSendBtn.addClass("hover:bg-red-500")
    } else {
        otpSendBtn.attr("disabled", "disabled")
        otpSendBtn.removeClass("hover:bg-red-500")
    }
});

otpSendBtn.click(function () {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]+$/.test(emailFld.val().trim())) {
        return;
    }
    emailFld.attr("disabled", "disabled")
    emailFld.removeClass("hover:border-2")
    otpSendBtn.prop("disabled", true);
    otpSendBtn.removeClass("hover:bg-red-500")

    let countdown = 60;


    $.ajax(BASEURL + "/auth/users/forgot-password/" + emailFld.val().trim(), {
        method: "GET",
        success: function (response) {
            console.log(response)
            setSuccessMessage("OTP sent successfully")
            const interval = setInterval(function () {
                countdown--;
                $("#timerFld").text("Wait " + countdown + " seconds");
                if (countdown === 0) {
                    $("#timerFld").text("")
                    otpSendBtn.prop("disabled", false);
                    $("#otpFld").prop("disabled", false)
                    otpSendBtn.text("Resend OTP");
                    otpSendBtn.addClass("hover:bg-red-500")
                    clearInterval(interval);
                }else if(isEmailVerified){
                    $("#timerFld").text("")
                    otpSendBtn.text("Verified")
                    otpSendBtn.prop("disabled", true)
                    otpSendBtn.removeClass("hover:bg-red-500")
                    otpFld.prop("disabled", true)
                    otpFld.removeClass("hover:border-2")
                    clearInterval(interval)
                }
            }, 1000);
        },
        error: function (error) {
            $(this).prop("disabled", false);
            $(this).addClass("hover:bg-red-500")
            emailFld.prop("disabled", false)
            emailFld.addClass("hover:border-2")
            console.log(error)

            let message = "Error sending OTP"
            if (error.responseJSON) {
                message = error.responseJSON.message;
            }

            setAlertMessage(message)
        }
    })
});

otpFld.keyup(function (event) {
    const otp = event.target.value.toString().trim();
    console.log("OTP: " + otp);
    if (/^\d{4}$/.test(otp)) {
        $(this).prop("disabled", true)
        $.ajax(BASEURL + "/auth/users/otp/verify/" + otp, {
            method: "GET",
            success: function (response) {
                if (response === "verified") {
                    $("#otpFld").removeClass("border-2 border-red-500")
                    isEmailVerified = true;
                    otpSendBtn.text("Verified")
                    otpSendBtn.prop("disabled", true)
                    otpSendBtn.removeClass("hover:bg-red-500")
                    otpFld.prop("disabled", true)
                    otpFld.removeClass("hover:border-2")
                    $("#timerFld").text("")
                    console.log(response)
                } else {
                    isEmailVerified = false;
                    $("#otpFld").addClass("border-2 border-red-500")
                    otpFld.prop("disabled", false)
                    otpFld.addClass("hover:border-2")

                    console.log(response)
                }
            },
            error: function (error) {
                $(this).prop("disabled", false)
                console.log(error)
                let message = "Error verifying OTP"
                if(error.responseJSON) {
                    message = error.responseJSON.message
                }
                setAlertMessage(message)

            }
        })
    } else {
        $(this).prop("disabled", false)
    }
});

const setSuccessMessage = (message) => {
    successMessage.removeClass("right-[-100%]")
    successMessage.addClass("right-0")
    $("#successDescription").text(message)

    let count = 4;
    const setAlertTimer = setInterval(function () {
        count--;
        if (count === 0) {
            successMessage.removeClass("right-0")
            successMessage.addClass("right-[-100%]")
            clearInterval(setAlertTimer);
        }
    }, 1000);
}
const setAlertMessage = (message) => {
    $("#alertDescription").text(message)
    alertMessage.removeClass("right-[-100%]")
    alertMessage.addClass("right-0")
    let count = 4;
    const setAlertTimer = setInterval(function () {
        count--;
        if (count === 0) {
            alertMessage.removeClass("right-0")
            alertMessage.addClass("right-[-100%]")
            clearInterval(setAlertTimer);
        }
    }, 1000);
}
$("#alertCloseBtn").click(function () {
    alertMessage.removeClass("right-0");
    alertMessage.addClass("right-[-100%]");
})

$("#successCloseBtn").click(function () {
    successMessage.removeClass("right-0");
    successMessage.addClass("right-[-100%]");
})