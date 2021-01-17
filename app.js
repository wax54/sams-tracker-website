
const currShifts = [];
const records = {
};
store = updateStorage.bind(records, 'records');
retrieve = updateFromStorage.bind(records, 'records');
add = addRecord.bind(records);

//retrieve from localStorage
retrieve();

//add an updator for the progress bars
const updater = setInterval(updateProgressBars, 3000);


//setup listeners
document.getElementById('new-shift')
    .addEventListener('submit', (e) => {
        e.preventDefault();
        submitNewShift();
    });
document.getElementById('current-shifts')
    .addEventListener('click', clockOut);

function addProgressBar(category, hoursSpent, percetage) {

    const progressBarSection = document.getElementById('hours-spent-dashboard');

    const row = document.createElement('div');
    row.className = "row";

    const col = document.createElement('div');
    col.className = "col mb-3";

    const title = document.createElement('div');
    title.className = "display-6";
    title.innerText = category + ' ' + hoursSpent;

    const barContainer = document.createElement('div');
    barContainer.className = "progress";

    const bar = document.createElement('div');
    bar.className = "progress-bar";
    bar.style.width = percetage + '%';

    barContainer.append(bar);
    col.append(title, barContainer);
    row.append(col);
    progressBarSection.append(row);
}
function updateProgressBars() {
    clearProgressBars();
    const hours = getHours();
    const total = hours.total;
    for (category in hours) {
        if (category == 'total') continue;
        const catHours = round(hours[category].total);
        const percent = round(catHours / total);
        addProgressBar(category, catHours + 'Hrs', percent);
    }
}
function clearProgressBars() {
    const progressBarSection = document.getElementById('hours-spent-dashboard');
    progressBarSection.innerHTML = '';
}

function getHours() {
    //     let Hours = {
    //         total:0,
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
    const newShift = new Shift(new Date(), type, category);

    add(newShift);
    store();

}

function clockOut(evt) {
    //unWanted click, return
    if (evt.target.nodeName !== "BUTTON") return;

    const li = evt.target.parentElement;
    const currType = li.querySelector('.type').innerText;
    const currCategory = li.querySelector('.category').innerText;

    const shiftIndex = currShifts.findIndex(({ type, category }) => {
        return type === currType && category === currCategory;
    });
    if (shiftIndex !== -1) {
        currShifts[shiftIndex].clockOut();
        currShifts.splice(shiftIndex, 1);
        li.remove();
        store();
    } else {
        throw new Error('shift not found in currShifts');
    }
}

function currShiftExists(newType, newCategory) {
    for ({ type, category } of currShifts) {
        if (type === newType) {
            if (category === newCategory) {
                return true;
            }
        }
    }
    return false;
}


function addRecord(shift) {
    if (!(shift instanceof Shift)) {
        shift = new Shift(shift.start, shift.type, shift.category, shift.end);
    }
    type = shift.type;
    category = shift.category;

    if (!this[category]) {
        this[category] = {};
    }
    if (!this[category][type]) {
        this[category][type] = [];
    }

    records[category][type].push(shift);
    //shift doesn't have a clock out, add to current shifts

    if (!shift.end) {
        currShifts.push(shift)
        addCurrShift(shift);
    }
}

function addCurrShift({ type, category }) {
    const currShiftList = document.getElementById('current-shifts');

    const li = document.createElement('li');
    li.className = "row text-end";

    const div = document.createElement('div');
    div.className = "col display-6";

    const typeSpan = document.createElement('span');
    typeSpan.className = 'type';
    typeSpan.innerText = type;

    const categorySpan = document.createElement('span');
    categorySpan.className = 'category';
    categorySpan.innerText = category;

    div.append(typeSpan, ' for ', categorySpan);

    const btn = document.createElement('button');
    btn.className = "col-3 btn btn-primary";
    btn.innerText = 'Clock Out';

    li.append(div, btn);

    currShiftList.append(li);

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
    const parent = document.getElementById(inputId).parentElement;
    const alert = document.createElement('div');
    alertId = Math.random() + '-alert';
    alert.id = alertId;
    alert.className = 'alert bg-warning';
    alert.innerText = msg;
    parent.append(alert);
    setTimeout(() => {
        document.getElementById(alertId).remove();
    }, 3000);
}


function clearInputAlerts() {
    const alerts = document.querySelectorAll('#new-shift .row .col .alert');

    //if there are alerts, remove them
    if (alerts.length) {
        for (let element of alerts.values()) {
            element.remove();
        }
    }
}

function getFromDOM(DOMId) {
    const value = document.getElementById(DOMId).value.toLowerCase();
    if (value == '') return false;
    return value;
}


function updateStorage() {
    const shifts = [];
    for (let category in this) {
        for (let type in this[category]) {
            for (let shift of this[category][type]) {
                shifts.push(shift);
            }
        }
    }

    localStorage.records = JSON.stringify(shifts);
}
function updateFromStorage(variable) {
    if (localStorage[variable]) {
        let temp = JSON.parse(localStorage[variable]);
        if (temp[0]) {
            for (shift of temp) {
                add(shift);
            }
        }
        return true;
    }
    return false;
}
