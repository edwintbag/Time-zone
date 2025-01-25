document.addEventListener("DOMContentLoaded", () => {
    const fromSelect = document.getElementById("fromTimeZone");
    const toSelect = document.getElementById("toTimeZones");

    const timeZones = Intl.supportedValuesOf("timeZone");

    timeZones.forEach(tz => {
        let option = new Option(tz, tz);
        fromSelect.add(option.cloneNode(true));
        toSelect.add(option.cloneNode(true));
    });

    // Initialize Select2 for searchable dropdowns
    $("#fromTimeZone, #toTimeZones").select2({
        width: "100%",
        placeholder: "Select a time zone",
        allowClear: true
    });
});

function convertTime() {
    const inputTime = document.getElementById("datetime").value;
    const fromTimeZone = document.getElementById("fromTimeZone").value;
    const toTimeZones = $("#toTimeZones").val(); 

    if (!inputTime || !fromTimeZone || !toTimeZones.length) {
        alert("Please fill all fields.");
        return;
    }

    const date = new Date(inputTime);
    const convertedList = document.getElementById("result");
    convertedList.innerHTML = ""; 

    toTimeZones.forEach(toTimeZone => {
        const convertedTime = new Date(date.toLocaleString("en-US", { timeZone: toTimeZone }));
        const formattedTime = convertedTime.toLocaleString("en-US", { timeZone: toTimeZone });

        let listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = `${toTimeZone}: ${formattedTime}`;
        convertedList.appendChild(listItem);
    });
}

setInterval(() => {
    if (document.getElementById("datetime").value) {
        convertTime();
    }
}, 1000);