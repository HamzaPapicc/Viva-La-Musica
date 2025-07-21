function checkSetLanguage()
{
    if (!sessionStorage.getItem("languageSetter"))
    {
        sessionStorage.setItem("languageSetter", "sr");
        for (let i = 0; i < document.getElementsByName("en").length; i++)
        {
            document.getElementsByName("en")[i].style.display = "none";
        }
    }
    if (sessionStorage.getItem("languageSetter") == "sr")
    {
        for (let i = 0; i < document.getElementsByName("sr").length; i++)
        {
            document.getElementsByName("en")[i].style.display = "none";
            document.getElementsByName("sr")[i].style.display = "block";
        }
    }
    else
    {
        for (let i = 0; i < document.getElementsByName("en").length; i++)
        {
            document.getElementsByName("sr")[i].style.display = "none";
            document.getElementsByName("en")[i].style.display = "block";
        }
    }
    for (let i = 0; i < document.getElementsByName("toLogIn").length; i++)
    {
        document.getElementsByName("toLogIn")[i].style.display = "block"
        document.getElementsByName("loggedIn")[i].style.display = "none";
    }
}

function changeLanguage()
{
    if (!sessionStorage.getItem("languageSetter"))
    {
        checkSetLanguage();
    }
    if (sessionStorage.getItem("languageSetter") == "sr")
    {
        for (let i = 0; i < document.getElementsByName("sr").length; i++)
        {
            document.getElementsByName("sr")[i].style.display = "none";
            document.getElementsByName("en")[i].style.display = "block";
        }
        if (document.getElementById("contactTitleInput") != undefined && document.getElementById("contactMessageInput") != undefined)
        {
            document.getElementById("contactTitleInput").placeholder = "Title";
            document.getElementById("contactMessageInput").placeholder = "Your message";
        }
        sessionStorage.setItem("languageSetter", "en");
    }
    else
    {
        for (let i = 0; i < document.getElementsByName("en").length; i++)
        {
            document.getElementsByName("en")[i].style.display = "none";
            document.getElementsByName("sr")[i].style.display = "block";
        }
        if (document.getElementById("contactTitleInput") != undefined && document.getElementById("contactMessageInput") != undefined)
        {
            document.getElementById("contactTitleInput").placeholder = "Naslov";
            document.getElementById("contactMessageInput").placeholder = "Vaša poruka";
        }
        sessionStorage.setItem("languageSetter", "sr");
    }
}

function hashFunction(thingToHash)
{
    let thingInUnicode = '';
    let hashedThing = '';
    for (let i = 0; i < thingToHash.length; i++)
    {
        thingInUnicode = thingInUnicode + thingToHash.charCodeAt(i);
    }

    for (let i = 0; i < thingInUnicode.length; i++)
    {
        if (thingInUnicode[i+1] != undefined)
        {
            if (thingInUnicode[i] != '0')
            {
                let temp = thingInUnicode[i] + thingInUnicode[i+1];
                if (temp < 15)
                {
                    let hexedNumber = parseInt(temp).toString(16).toUpperCase();
                    hashedThing = hashedThing + hexedNumber;
                }
                else
                {
                    hashedThing = hashedThing + thingInUnicode[i];
                }
            }
            else
            {
                hashedThing = hashedThing + thingInUnicode[i];
                
            }
        }
        else
        {
            hashedThing = hashedThing + thingInUnicode[i];
        }
    }
    return hashedThing;
}

function logIn()
{
    let emailToLogIn = document.getElementById("logInEmailInput").value
    let passwordToLogIn = document.getElementById("logInPasswordInput").value
    let savedProfiles = JSON.parse(localStorage.getItem("SavedProfiles"));    
    if (!emailToLogIn || !passwordToLogIn) {
        if (sessionStorage.getItem("languageSetter") === "sr")
        {
            alert("Niste uneli sve podatke.");
            return;
        }
        else
        {
            alert("You haven't entered everything.");
            return;
        }
    }
    else if (!savedProfiles)
    {
        if (sessionStorage.getItem("languageSetter") === "sr")
        {
            alert("Niste registrovani.");
            document.getElementById("logInEmailInput").value = "";
            document.getElementById("logInPasswordInput").value = "";
            return;
        }
        else
        {
            alert("You aren't registered.");
            document.getElementById("logInEmailInput").value = "";
            document.getElementById("logInPasswordInput").value = "";
            return;
        }
    }
    for (let i = 0; i < savedProfiles.length; i++)
    {
        if (savedProfiles[i].email === emailToLogIn)
        {
            let passwordToCheck = savedProfiles[i].password;
            let checkingPassword = hashFunction(passwordToLogIn);
            if (passwordToCheck === checkingPassword)
            {
                sessionStorage.setItem("logInToken", hashFunction("youWereLoggedIn"));
                document.getElementById("logInEmailInput").value = "";
                document.getElementById("logInPasswordInput").value = "";
                for (let i = 0; i < document.getElementsByName("toLogIn").length; i++)
                {
                    document.getElementsByName("toLogIn")[i].style.display = "none";
                    document.getElementsByName("loggedIn")[i].style.display = "block";
                }
                return;
            }
            else
            {
                if (sessionStorage.getItem("languageSetter") == "sr")
                {
                    alert("Pogrešna lozinka.");
                    document.getElementById("logInPasswordInput").value = "";
                    return;
                }
                else
                {
                    alert("Incorrect passwrod.");
                    document.getElementById("logInPasswordInput").value = "";
                    return;
                }
            }
        }
        else
        {
        }
    }    
    if (sessionStorage.getItem("languageSetter") === "sr")
    {
        alert("Niste registrovani.");
        document.getElementById("logInEmailInput").value = "";
        document.getElementById("logInPasswordInput").value = "";
        return;
    }
    else
    {
        alert("You're not registered.");
        document.getElementById("logInEmailInput").value = "";
        document.getElementById("logInPasswordInput").value = "";
        return;
    }
}

function logOut()
{
    sessionStorage.removeItem("logInToken");
    for (let i = 0; i < document.getElementsByName("toLogIn").length; i++)
    {
        document.getElementsByName("toLogIn")[i].style.display = "block";
        document.getElementsByName("loggedIn")[i].style.display = "none";
    }
}

function registration()
{
    let emailToRegister = document.getElementById("registerEmailInput").value;
    let passwordToRegister = document.getElementById("registerPasswordInput").value;
    let passwordToRegisterConfirm = document.getElementById("registerPasswordInputConfirm").value;
    if (!emailToRegister || !passwordToRegister || !passwordToRegisterConfirm)
    {
        if (sessionStorage.getItem("languageSetter") === "sr")
        {
            alert("Niste uneli sve podatke.");
            return;
        }
        else
        {
            alert("You haven't entered everything.");
            return;
        }
    }
    else if (passwordToRegister != passwordToRegisterConfirm)
    {
        if (sessionStorage.getItem("languageSetter") === "sr")
        {
            alert("Lozinke se ne poklapaju.");
            document.getElementById("registerPasswordInputConfirm").value = "";
            return;
        }
        else
        {
            alert("The passwords don't match.");
            document.getElementById("registerPasswordInputConfirm").value = "";
            return;
        }
    }
    else
    {
        let currentSavedProfiles = JSON.parse(localStorage.getItem("SavedProfiles"));
        let currentSavedProfilesLength;
        if (!currentSavedProfiles) {
            currentSavedProfilesLength = 0;
        }
        else
        {
            currentSavedProfilesLength = JSON.parse(localStorage.getItem("SavedProfiles")).length;
        }
        for (let i = 0; i < currentSavedProfilesLength; i++) {
            if (JSON.parse(localStorage.getItem("SavedProfiles"))[i].email === emailToRegister)
            {
                if (sessionStorage.getItem("languageSetter") === "sr")
                {
                    alert("Ovaj mejl je već registrovan.");
                    document.getElementById("registerEmailInput").value = "";
                    document.getElementById("registerPasswordInput").value = "";
                    document.getElementById("registerPasswordInputConfirm").value = "";
                    return;
                }
                else
                {
                    alert("This mail is already registered.");
                    document.getElementById("registerEmailInput").value = "";
                    document.getElementById("registerPasswordInput").value = "";
                    document.getElementById("registerPasswordInputConfirm").value = "";
                    return;
                }
            }
        }
        let hashedPassword = hashFunction(passwordToRegister);
        const Profile = 
        {
            email : document.getElementById("registerEmailInput").value,
            password : hashedPassword
        }
        if (!localStorage.getItem("SavedProfiles"))
        {
            let tempArr = [Profile];
            localStorage.setItem("SavedProfiles", JSON.stringify(tempArr));
        }
        else
        {
            let savedProfiles = JSON.parse(localStorage.getItem("SavedProfiles"));
            savedProfiles[savedProfiles.length] = Profile;
            localStorage.setItem("SavedProfiles", JSON.stringify(savedProfiles));
        }
        document.getElementById("registerEmailInput").value = "";
        document.getElementById("registerPasswordInput").value = "";
        document.getElementById("registerPasswordInputConfirm").value = "";
    }
}

function sendForContact() {
    let CEI = document.getElementById("contactEmailInput").value;
    let CTI = document.getElementById("contactTitleInput").value;
    let CMI = document.getElementById("contactMessageInput").value;
    console.log(CEI, CTI, CMI);
    
    if (!CEI || !CTI || !CMI)
    {
        if (sessionStorage.getItem("languageSetter") === "sr")
        {
            alert("Niste popunili sva polja.");
            return;
        }
        else
        {
            alert("You haven't filled all fields.");
            return;
        }
    }
    document.getElementById("contactEmailInput").value = '';
    document.getElementById("contactTitleInput").value = '';
    document.getElementById("contactMessageInput").value = '';
    if (sessionStorage.getItem("languageSetter") === "sr")
    {
        alert(`Poslali ste poruku:\n${CTI},\n${CMI}`);
        return;
    }
    else
    { 
        alert(`You sent the message:\n${CTI},\n${CMI}`);
        return;
    }
}

function forgotPassword()
{
    let mailForPasswordReset;
    let newPassword;
    if (sessionStorage.getItem("languageSetter") === "sr")
    {
        mailForPasswordReset = prompt("Unesite vaš mejl");
    }
    else
    {
        mailForPasswordReset = prompt("Enter your mail");
    }
    for (let i = 0; i < JSON.parse(localStorage.getItem("SavedProfiles")).length; i++) {
        if (mailForPasswordReset === JSON.parse(localStorage.getItem("SavedProfiles"))[i].email)
        {
            if (sessionStorage.getItem("languageSetter") === "sr")
            {
                newPassword = prompt("Unesite novu lozinku");
            }
            else
            {
                newPassword = prompt("Enter new password")
            }
            
            let hashedPassword = hashFunction(newPassword);
            let savedProfiles = JSON.parse(localStorage.getItem("SavedProfiles"));
            savedProfiles[i].password = hashedPassword;
            localStorage.setItem("SavedProfiles", JSON.stringify(savedProfiles));
            return;
        }
    }
    if (sessionStorage.getItem("languageSetter") === "sr")
    {
        alert("Ovaj mejl nije registrovan.");
    }
    else
    {
        alert("This mail isn't registered.");
    }
}


function setMenu()
{
    if (window.innerWidth < 750)
    {
        document.getElementById("mainNavbar").style.display = "none";
        document.getElementById("dropdownNavbar").style.display = "block";
    }
    else
    {
        document.getElementById("mainNavbar").style.display = "block";
        document.getElementById("dropdownNavbar").style.display = "none";
    }
}

function enterComposers()
{
    if (!sessionStorage.getItem("logInToken"))
    {
        if (sessionStorage.getItem("languageSetter") === "sr")
        {
            alert("Morate se prijaviti kako bi pristupili stranici.");
        }
        else
        {
            alert("You have to be logged in to access this page.");
        }
    }
    else    
    {
        if (sessionStorage.getItem("logInToken") === hashFunction("youWereLoggedIn"))
        {
            window.location.href = "./kompozitori.html";
        }
    }
}

function checkLogIn()
{
    if (sessionStorage.getItem("logInToken") === hashFunction("youWereLoggedIn"))
    {
        for (let i = 0; i < document.getElementsByName("toLogIn").length; i++)
        {
            document.getElementsByName("toLogIn")[i].style.display = "none";
            document.getElementsByName("loggedIn")[i].style.display = "block";
        }
    }
}

window.addEventListener("load", checkSetLanguage());
window.addEventListener("load", setMenu);
window.addEventListener("resize", setMenu);
window.addEventListener("load", checkLogIn)

if (document.URL.includes("kompozitori"))
{
    fetch("https://musicbrainz.org/ws/2/artist/?query=disambiguation:classical%20composer%20AND%20type:person&fmt=json")
    .then(response => response.json())
    .then(data =>
        {        
            let numberOfRows = 0
            let numberofColsInARow;
            for (let i = 0; i < data.artists.length; i++)
            {                
                if (data.artists[i].aliases)
                {                    
                    if (numberOfRows === 0 || numberofColsInARow === 3)
                    {
                        let newComposerName;
                        const mainComposerContainer = document.getElementById("mainComposerContainer");
                        const newRow = document.createElement("ul");
                        const newCol = document.createElement("li");
                        const newComposerDivContainer = document.createElement("div");
                        const newComposerPictureDiv = document.createElement("div");
                        const newComposerPicture = document.createElement("img");
                        const newComposerNameDiv = document.createElement("div");
                        const newComposerH3 = document.createElement("h3");
                        newRow.className = "list-unstyled row";
                        newCol.className = "container col-md";
                        newComposerDivContainer.className = "bg-secondary rounded-3 m-2";
                        newComposerPictureDiv.className = "w-100 bg-white border border-2 border-secondary rounded-3 d-flex justify-content-center";
                        newComposerPicture.className = "w-100 h-100 rounded-2"
                        newComposerNameDiv.className = "d-flex w-100 justify-content-center text-white";
                        if (data.artists[i].country === "RU")
                        {
                            newComposerName = data.artists[i].aliases[0].name;
                        }
                        else
                        {
                            newComposerName = data.artists[i].name;
                        }
                        newComposerPicture.src = `./material/Pictures/Portraits/${newComposerName}.jpg`;
                        const composerNameText = document.createTextNode(newComposerName);
                        newComposerH3.appendChild(composerNameText);
                        newComposerNameDiv.appendChild(newComposerH3);
                        newComposerPictureDiv.appendChild(newComposerPicture);
                        newComposerDivContainer.appendChild(newComposerPictureDiv);
                        newComposerDivContainer.appendChild(newComposerNameDiv);
                        newCol.appendChild(newComposerDivContainer);
                        newRow.appendChild(newCol);
                        mainComposerContainer.appendChild(newRow);
                        numberOfRows++;
                        numberofColsInARow = 0;
                    }
                    else
                    {
                        let newComposerName;
                        const ulRow = document.getElementById("mainComposerContainer").children[numberOfRows-1];
                        const newCol = document.createElement("li");
                        const newComposerDivContainer = document.createElement("div");
                        const newComposerPictureDiv = document.createElement("div");
                        const newComposerPicture = document.createElement("img");
                        const newComposerNameDiv = document.createElement("div");
                        const newComposerH3 = document.createElement("h3");
                        newCol.className = "container col-md";
                        newComposerDivContainer.className = "bg-secondary rounded-3 m-2";
                        newComposerPictureDiv.className = "w-100 bg-white border border-2 border-secondary rounded-3 d-flex justify-content-center";
                        newComposerPicture.className = "w-100 h-100 rounded-2"
                        newComposerNameDiv.className = "d-flex w-100 justify-content-center text-white";
                        if (data.artists[i].country === "RU")
                        {
                            newComposerName = data.artists[i].aliases[0].name;
                        }
                        else
                        {
                            newComposerName = data.artists[i].name;
                        }
                        newComposerPicture.src = `./material/Pictures/Portraits/${newComposerName}.jpg`;
                        const composerNameText = document.createTextNode(newComposerName);
                        newComposerH3.appendChild(composerNameText);
                        newComposerNameDiv.appendChild(newComposerH3);
                        newComposerPictureDiv.appendChild(newComposerPicture);
                        newComposerDivContainer.appendChild(newComposerPictureDiv);
                        newComposerDivContainer.appendChild(newComposerNameDiv);
                        newCol.appendChild(newComposerDivContainer);
                        ulRow.appendChild(newCol);
                        numberofColsInARow++;
                    }
                }
            }
        })
    .catch(error => {console.error(error)});
}
