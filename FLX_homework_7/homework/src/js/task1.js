const userLogin = prompt("Please, enter your login");
const time = new Date().getHours();
if (userLogin === '' || userLogin === null) {
    alert("Canceled");
} else {
    if (userLogin.length >= 4) {
        if (userLogin === "User" || userLogin === "Admin") {
            const userPass = prompt("Please, enter your password");
            if (userPass === "" || userPass === undefined) {
                alert("Canceled");
            } else {
                if ((userLogin === "User" && userPass === "UserPass") ||
                    (userLogin === "Admin" && userPass === "RootPass")) {
                    if (time < 20) {
                        alert(`Good day, dear ${userLogin}`);
                    } else {
                        alert(`Good evening, dear ${userLogin}`);
                    }
                } else {
                    alert("Wrong password")
                }
            }
        } else {
            alert("I don’t know you");
        }
    } else {
        alert("I don't know any users having name length less than 4 symbols");
    }
}
