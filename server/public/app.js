const BUTTONNOW = 'NOW';
const BUTTON15AGO = '-15';
const REFRESH_INTERVAL_MS = 1000;


const records = new ShiftCollection();
const updateStorage = () => {
    localStorage.records = JSON.stringify(records.shifts);
 };
const retrieveRecords = () => {
    if (localStorage.records) {
        const recordsArray = JSON.parse(localStorage.records);
        records.add(...recordsArray);
        for (shift of records.getCurrShifts().shifts) {
            addCurrShiftToDOM(shift);
        }
        return true;
    }
    return false;
}


//retrieve from localStorage
retrieveRecords();

//add an updator for the progress bars
updateProgressBars();
const updaterRef = setInterval(updateProgressBars, REFRESH_INTERVAL_MS);//every REFRESH_INTERVAL_MS ms update the progress bars

//setup listeners
document.getElementById('new-shift')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        submitNewShift();
    });

document.getElementById('current-shifts')
    .addEventListener('click', handleClockOutClick);


function addProgressBar(container_id, label, hoursSpent, percetage) {

    const categoryContainer = document.getElementById(container_id);


    const row = document.createElement('div');
    row.className = "row";

    const col = document.createElement('div');
    col.className = "col mb-3";

    const title = document.createElement('div');
    title.className = "display-6";
    title.innerText = label + ' ' + hoursSpent;

    const barContainer = document.createElement('div');
    barContainer.className = "progress";

    const bar = document.createElement('div');
    bar.className = "progress-bar";
    bar.style.width = percetage + '%';

    barContainer.append(bar);
    col.append(title, barContainer);
    row.append(col);
    categoryContainer.append(row);
}
function addBarContainer(label, hours) {
    const progressBarSection = document.getElementById('hours-spent-dashboard');

    const title = document.createElement('div');
    title.className = "display-4";
    title.innerText = `${label} - ${hours}`;

    const barContainer = document.createElement('div');
    barContainer.className = "container-fluid";
    barContainer.id = label

    progressBarSection.append(title, barContainer);
}
function updateProgressBars() {
    updateCurrShiftLength()

    clearProgressBars();
    const recordCutOff = hoursFrom(-24 * 7) //24hrs * 7days = 1 Week
    const shifts = records.getShiftsAfter(recordCutOff)
    const total = shifts.getTotalHours();

    //const total = records.getTotalHours();
    for (category of shifts.getCategories()) {

        const categoryShifts = shifts.category(category);
        const categoryHours = categoryShifts.getTotalHours();
        const formattedCatHours = timeFormatFromHours(categoryHours, 2);

        addBarContainer(category, formattedCatHours)

        for (type of categoryShifts.getTypes()) {
            const catTypeHours = categoryShifts.type(type).getTotalHours()
            const percent = round(catTypeHours / total);
            const formattedHours = timeFormatFromHours(catTypeHours, 2);
            addProgressBar(category, type, formattedHours, percent * 100);
        }
    }
}

function updateCurrShiftLength() {
    currShifts = records.getCurrShifts()
    for (let shift of currShifts.shifts) {
        const el = document.getElementById(shift.category + '-' + shift.type)
        el.innerText = timeFormatFromHours(shift.getHours(), 2)
    }
}

function clearProgressBars() {
    const progressBarSection = document.getElementById('hours-spent-dashboard');
    progressBarSection.innerHTML = '';
}
//old implementation
function getHours() {
    //     let Hours = {
    //         total: 0,
    //         fun: {
    //             total:0,
    //             coding: [
    //                 0,
    //                 1.5
    //             ]
    //             }
    //         }
    //     };

    let hours = {
        total: 0
    };

    for (let category in records) {
        //to filter out the functions
        if (!records[category].length) {
            hours[category] = { total: 0 };
            for (let type in records[category]) {
                const currSection = hours[category][type] = [0];
                let i = 1;
                for (let shift of records[category][type]) {
                    const shiftLength = shift.getHours();
                    currSection[0] += shiftLength;
                    currSection[i] = shiftLength;
                    i++;
                }
                hours[category].total += currSection[0];
            }
            hours.total += hours[category].total;
        }
    }
    return hours;
}

function submitNewShift() {
    clearInputAlerts();

    const type = getFromDOM('type');
    const category = getFromDOM('category');

    if (!type || !category) {
        if (!type) inputAlert('type');
        if (!category) inputAlert('category');
        return;
    }

    if (currShiftExists(type, category)) {
        inputAlert('category', 'Current Shift of Type/Category already exists!');
        return;
    }
    resetDOMValue('type');
    resetDOMValue('category');
    const newShift = new Shift(new Date(), type, category);

    addCurrShiftToDOM(newShift);
    records.add(newShift);
    updateStorage();

}

function handleClockOutClick(evt) {

    //unWanted click, return
    if (!evt.target.dataset.reference) return;

    const ref = evt.target.dataset.reference;
    const li = evt.target.parentElement.parentElement.parentElement;

    const currType = li.querySelector('.type').innerText.toLowerCase();
    const currCategory = li.querySelector('.category').innerText.toLowerCase();

    const shift = records.getCurrShifts().find({ type: currType, category: currCategory });

    if (shift) {
        if (ref === BUTTONNOW) {
            shift.clockOut();
        } else if (ref === BUTTON15AGO) {
            const clockOut = minsFrom(-15); //-15 minutes from now
            shift.clockOut(clockOut);

        }
        li.remove();
        updateStorage();
    } else {
        throw new Error('shift not found in records.currShifts()');
    }
}

function currShiftExists(type, category) {
    const currShifts = records.getCurrShifts();
    return currShifts.contains({ type, category });

}


function addCurrShiftToDOM({ type, category }) {
    const currShiftList = document.getElementById('current-shifts');

    const li = document.createElement('li');
    li.className = "row p-3 align-items-start justify-content-center";

    const div = document.createElement('div');
    div.className = "col-7 text-center h2";

    const typeSpan = document.createElement('span');
    typeSpan.className = 'type';
    typeSpan.innerText = type;

    const categorySpan = document.createElement('span');
    categorySpan.className = 'category';
    categorySpan.innerText = category;

    const shiftLengthSpan = document.createElement('span');
    shiftLengthSpan.className = 'shift-length';
    shiftLengthSpan.innerText = '0 Seconds';
    shiftLengthSpan.id = category + '-' + type;


    div.append(typeSpan, ' for ', categorySpan, ' ', shiftLengthSpan);

    const btn = makeClockOutDropDown();

    li.append(div, btn);

    currShiftList.append(li);


}

function makeClockOutDropDown() {
    const container = document.createElement('div');
        container.className = 'col-4 dropdown clockout';

    const mainButton = document.createElement('button');
        mainButton.className = 'btn btn-secondary dropdown-toggle text-center';
        mainButton.setAttribute('data-bs-toggle', 'dropdown');
        mainButton.innerText = 'Clock Out';

    const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-menu clock-out';

    const nowBtn = createBtn('Now', BUTTONNOW);
    const pastBtn = createBtn('15 Mins Ago', BUTTON15AGO);

    dropdown.append(nowBtn, pastBtn);
    container.append(mainButton, dropdown);

    return container;
}

function createBtn(str, dataValue) {
    const btn = document.createElement('button');
    btn.className = "btn";
    btn.innerText = str;
    btn.dataset.reference = dataValue;
    return btn;
}

function round(num, decimals = 2) {
    if (decimals < 1) {
        decimals = decimals * -1;
        const divider = 10 ** decimals;
        num = Math.round(num / divider) * divider;
    }
    const multiplier = 10 ** decimals;
    return Math.round(num * multiplier) / multiplier;
}

function inputAlert(inputId, msg = 'Input Must Be Filled') {
    const parent = document.getElementById(inputId).parentElement.parentElement;
    const alert = document.createElement('div');
    const alertId = Math.random() + '-alert';
    alert.id = alertId;
    alert.className = 'alert bg-warning';
    alert.innerText = msg;
    parent.append(alert);
    setTimeout(() => {
        document.getElementById(alertId).remove();
    }, 2500);
}


function clearInputAlerts() {
    const alerts = document.querySelectorAll('.alert');
    //if there are alerts, remove them
    if (alerts.length) {
        for (let element of alerts.values()) {
            element.remove();
        }
    }
}
function resetDOMValue(DOMId) {
    const value = document.getElementById(DOMId).value = '';
}
function getFromDOM(DOMId) {
    const value = document.getElementById(DOMId).value.toLowerCase();
    if (value == '') return false;
    return value;
}



// function addRecord(shift) {
//     if (!(shift instanceof Shift)) {
//         shift = new Shift(shift.start, shift.type, shift.category, shift.end);
//     }
//     type = shift.type;
//     category = shift.category;

//     if (!this[category]) {
//         this[category] = {};
//     }
//     if (!this[category][type]) {
//         this[category][type] = [];
//     }

//     records[category][type].push(shift);
//     //shift doesn't have a clock out, add to current shifts

//     if (!shift.end) {
//         currShifts.push(shift)
//         addCurrShift(shift);
//     }
// }



// function updateStorage() {
//     const shifts = [];
//     for (let category in this) {
//         for (let type in this[category]) {
//             for (let shift of this[category][type]) {
//                 shifts.push(shift);
//             }
//         }
//     }

//     localStorage.records = JSON.stringify(shifts);
// }

// function updateFromStorage(variable) {
//     if (localStorage[variable]) {
//         let temp = JSON.parse(localStorage[variable]);
//         if (temp[0]) {
//             for (shift of temp) {
//                 add(shift);
//             }
//         }
//         return true;
//     }
//     return false;
// }
