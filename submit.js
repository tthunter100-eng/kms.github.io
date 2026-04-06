//test
console.log("Current Storage:", localStorage.getItem('libraryInventory'));

//grabbing data
let inventory = JSON.parse(localStorage.getItem('libraryInventory')) || [];

//personal information section
const personalInfo = document.createElement("div");
personalInfo.innerHTML = `
    <div style="height: 100px; width: 100%; top: 0; display: flex; flex-direction: row; position: absolute; gap: 28px;">
        <img src="personalicon.png" style="height: 45%; width: 8%; margin-top: 25px; margin-left: 15px;">
        <span style="font-size: 28px; font-weight: normal; text-align: left; justify-content: center; align-content: center; margin: 0;">Personal Information</span>
    </div>
    <div style="box-sizing: border-box; margin-top: 50px; height: 100%; width: 100%; position: relative; display: flex; flex-direction: column; padding: 20px 20px;">
        <form>
            <label for="personname" style="font-size: 15px;">Full Name:</label><span style="color: red; font-weight: bold;">*</span><br>
            <input id="person-name" style="height: 20px; width: 100%; background-color: #ffffff; border: none;" required><br><br>
            <label for="personrole" style="font-size: 15px;">Role in School:</label><span style="color: red; font-weight: bold;">*</span><br>
            <select id="person-role" style="transition: 0.1s ease; height: 30px; min-width: 150px; background-color: transparent; border: 2px solid blue;" required><br><br>
                <option value="" disabled selected>Select a role</option>
                <option value="student">Student</option>
                <option value="staff">Staff</option>
                <option value="guest">Guest</option>
            </select><br><br>
            <label for="studentnumber" style="font-size: 15px;">Student Number (if applicable):</label><span id="sym-num" style="color: red; font-weight: bold;">/</span><br>
            <input value="N/A" id="student-number" style="height: 20px; width: 100%; background-color: #d1d1d1; border: none;" disabled><br><br>
            <label for="studentprogram" style="font-size: 15px;">Program (if applicable):</label><span id="sym-prog" style="color: red; font-weight: bold;">/</span><br>
            <input value="N/A" id="student-program" style="height: 20px; width: 100%; background-color: #d1d1d1; border: none;" disabled><br><br>
            <label for="persondept" style="font-size: 15px;">Department (if applicable):</label><span id="sym-dept" style="color: red; font-weight: bold;">/</span><br>
            <input value="N/A" id="person-dept" style="height: 20px; width: 100%; background-color: #d1d1d1; border: none;"disabled><br><br>
            <label for="email" style="font-size: 15px;">Email Address:</label><span style="color: red; font-weight: bold;">*</span><br>
            <input id="email" style="height: 20px; width: 100%; background-color: #ffffff; border: none;" required><br><br>
            <label for="identification" style="font-size: 15px;">School ID/COR/Staff ID/Government ID for Verification:</label><span style="color: red; font-weight: bold;">*</span><br>
            <input type="file" accept="image/*" id="identification" style="height: 30px; width: 100%; border: none;" required><br><br>
        </form>
    </div>
`;
Object.assign(personalInfo.style, {
    height: "80%",
    width: "45%",
    left: "0",
    backgroundColor: "#eff0f2",
    margin: "30px",
    gap: "50px",
    border: "3px solid #c1c7d7",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    boxSizing: "border-box",
    padding: "40px 20px",
});
document.querySelector(".div-container").appendChild(personalInfo);

//select option logic
const roleSelect = document.getElementById("person-role");
const studentNum = document.getElementById("student-number");
const studentProg = document.getElementById("student-program");
const deptInput = document.getElementById("person-dept");

roleSelect.addEventListener("change", () => {
    const role = roleSelect.value;
    
    disabledField(studentNum, document.getElementById("sym-num"));
    disabledField(studentProg, document.getElementById("sym-prog"));
    disabledField(deptInput, document.getElementById("sym-dept"));

    if (role === "student") {
        enabledField(studentNum, document.getElementById("sym-num"));
        enabledField(studentProg, document.getElementById("sym-prog"));
    }
    else if (role === "staff") {
        enabledField(deptInput, document.getElementById("sym-dept"));
    }
});

function enabledField(input, symbolSpan) {
    input.value = "";
    input.disabled = false;
    input.required = true;
    input.style.backgroundColor = "#ffffff";
    input.style.color = "#000000";
    if (symbolSpan) symbolSpan.innerText = "*";
}

function disabledField(input, symbolSpan) {
        input.value = "N/A";
        input.disabled = true;
        input.required = false;
        input.style.backgroundColor = "#d1d1d1";
        input.style.color = "#757575";
        if (symbolSpan) symbolSpan.innerText = "/";
}

//item information section
const itemInfo = document.createElement("div");
itemInfo.innerHTML = `
    <div style="height: 100px; width: 100%; top: 0; display: flex; flex-direction: row; position: absolute; gap: 28px;">
        <img src="itemicon.png" style="height: 50%; width: 9%; margin-top: 25px; margin-left: 30px;">
        <span style="font-size: 28px; font-weight: normal; text-align: left; justify-content: center; align-content: center; margin: 0;">Item Information</span>
    </div>
    <div style="box-sizing: border-box; margin-top: 90px; height: 100%; width: 100%; position: relative; display: flex; flex-direction: column; padding: 20px 40px;">
        <form>
            <label for="itemcode" style="font-size: 15px;">Code:</label><span style="color: red; font-weight: bold;">*</span><br>
            <select id="item-code" style="transition: 0.1s ease; height: 30px; min-width: 150px; background-color: transparent; border: 2px solid blue;" required>
                <option value="" disabled selected>Select a code</option>
            </select><br><br>
            <label for="itemname" style="font-size: 15px;">Item Name:</label><span id="sym-itemname" style="color: red; font-weight: bold;">/</span><br>
            <input value="N/A" id="item-name" style="height: 20px; width: 100%; background-color: #d1d1d1; border: none;" disabled><br><br>
            <label for="itemdesc" style="font-size: 15px;">Item Description:</label><span id="sym-itemdesc" style="color: red; font-weight: bold;">/</span><br>
            <input value="N/A" id="item-desc" style="height: 20px; width: 100%; background-color: #d1d1d1; border: none;" disabled><br><br>
            <label for="features" style="font-size: 15px;">Distinguishing Features (optional):</label><br>
            <input id="features" style="height: 20px; width: 100%; background-color: #ffffff; border: none;"><br><br>
            <label for="lastknownloc" style="font-size: 15px;">Last Known Location:</label><span style="color: red; font-weight: bold;">*</span><br>
            <input id="last-loc" style="height: 20px; width: 100%; background-color: #ffffff; border: none;" required><br><br>
            <label for="lostdate" style="font-size: 15px;">Date Lost:</label><br>
            <input type="date" id="lost-date" style="height: 20px; width: 100%; background-color: #ffffff; border: none;"><br><br>
            <label for="itempic" style="font-size: 15px;">Picture of the item (optional):</label><br>
            <input type="file" accept="image/*" id="item-pic" style="height: 30px; width: 100%; border: none;"><br><br>
        </form>
    </div>
`;
Object.assign(itemInfo.style, {
    height: "80%",
    width: "45%",
    right: "0",
    backgroundColor: "#eff0f2",
    margin: "30px",
    border: "3px solid #c1c7d7",
    display: "flex",
    position: "absolute",
    boxSizing: "border-box",
});
document.querySelector(".div-container").appendChild(itemInfo);

//code select logic
window.itemCodes = () => {
    const codeSelect = document.getElementById("item-code");

    if (!codeSelect) {return};

    const currentInventory = JSON.parse(localStorage.getItem('libraryInventory')) || [];
    itemCodeSelect.innerHTML = `<option value="" disabled selected>Select a code</option>`;
    
    currentInventory.forEach(item => {
        const option = document.createElement("option");
        option.value = item.code;
        option.textContent = item.code;
        itemCodeSelect.appendChild(option);
    });
};

const itemCodeSelect = document.getElementById("item-code");
itemCodeSelect.addEventListener("change", (e) => {
    const selectedCode = e.target.value;
    const currentInventory = JSON.parse(localStorage.getItem('libraryInventory')) || [];
    const matchedItem = currentInventory.find(item => item.code === selectedCode);
    const nameInput = document.getElementById("item-name");
    const descInput = document.getElementById("item-desc");

    if (matchedItem) {  
        enabledField(nameInput, document.getElementById("sym-itemname"));
        enabledField(descInput, document.getElementById("sym-itemdesc"));
        nameInput.value = matchedItem.name;
        descInput.value = matchedItem.desc;
    }
    else {
        disabledField(nameInput, document.getElementById("sym-itemname"));
        disabledField(descInput, document.getElementById("sym-itemdesc"));
    }
});

window.itemCodes = () => {
    const codeSelect = document.getElementById("item-code");

    if(!codeSelect) {return};

    const currentInventory = JSON.parse(localStorage.getItem('libraryInventory')) || [];

    codesSelect.innerHTML = `<option value="" disabled selected> Select a code</option>`;

    currentInventory.forEach(item => {
       const option = document.createElement("option");
       option.value = item.code;
       option.textContent = item.code;
       codeSelect.appendChild(option); 
    });
}; 