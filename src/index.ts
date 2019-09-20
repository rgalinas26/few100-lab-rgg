
import './styles.css';

const billInput = document.getElementById('billInput') as HTMLInputElement; // aliasing gave me .value intelesense for billinput.
const tenPercent = document.getElementById('tenPercent') as HTMLButtonElement;
const fifteenPercent = document.getElementById('fifteenPercent') as HTMLButtonElement;
const twentyPercent = document.getElementById('twentyPercent') as HTMLButtonElement;
const listBillAmount = document.getElementById('listBillAmount');
const listTipPercentage = document.getElementById('listTipPercentage');
const listTipAmount = document.getElementById('listTipAmount');
const listTotal = document.getElementById('listTotal');
const tipMessage = document.getElementById('tipMessage');
let tipPercent = .10;

billInput.addEventListener('keyup', function () {
    calculate();
});

tenPercent.addEventListener('click', () => {
    tipPercent = .10;
    calculate();
    tenPercent.disabled = true;
    fifteenPercent.disabled = false;
    twentyPercent.disabled = false;
    tipMessage.innerText = 'You are now tipping 10%.';
});
fifteenPercent.addEventListener('click', () => {
    tipPercent = .15;
    calculate();
    tenPercent.disabled = false;
    fifteenPercent.disabled = true;
    twentyPercent.disabled = false;
    tipMessage.innerText = 'You are now tipping 15%.';
});
twentyPercent.addEventListener('click', () => {
    tipPercent = .20;
    calculate();
    tenPercent.disabled = false;
    fifteenPercent.disabled = false;
    twentyPercent.disabled = true;
    tipMessage.innerText = 'You are now tipping 20%.';
});

function calculate() {
    if (billInput.valueAsNumber < 0) {
        billInput.classList.add('error');
        listTotal.innerText = 'Enter a non-negative number.';
    } else if (billInput.valueAsNumber === 0 || billInput.value === '') {
        listTipAmount.innerText = `Amount of tip : $0.00`;
        listBillAmount.innerText = `Bill Cost Before Tip: $0.00`;
        listTotal.innerText = `Cost of the Bill Including Tip: $0.00`;
        billInput.classList.remove('error');
    } else {
        const tip = (Math.round((billInput.valueAsNumber * tipPercent)).toFixed(2));
        const total = (parseInt(tip) + billInput.valueAsNumber).toFixed(2);
        listTipAmount.innerText = `Amount of tip : $${tip}`;
        listBillAmount.innerText = `Bill Cost Before Tip: $${billInput.value}`;
        listTotal.innerText = `Cost of the Bill Including Tip: $${total}`;
        billInput.classList.remove('error');
    }
}




// billInput.addEventListener('keyup', function () {
//     const listBillAmount = document.getElementById('listBillAmount');
//     // Sets a defualt tip amount to 15%
//     if (tenPercent.disabled !== true && fifteenPercent.disabled !== true && twentyPercent.disabled !== true) {
//         listTipPercentage.innerText = 'Tip Percentage: 15%';
//         tipMessage.innerText = 'You are tipping 15%';
//         tenPercent.disabled = false;
//         fifteenPercent.disabled = true;
//         twentyPercent.disabled = false;
//         const calcTip = parseInt(billInput.value) * .15;
//         const billTotal = calcTip + parseInt(billInput.value);
//         if (isNaN(calcTip) && isNaN(billTotal)) {
//             listTipAmount.innerText = 'Amount of Tip: 0';
//             listTotal.innerText = 'Total to be paid: 0';
//         } else {
//             listTipAmount.innerText = `; Amount; of; Tip: $; { calcTip; } `;
//             listTotal.innerText = `; Total; to; be; paid: $; { billTotal; } `;
//         }
//     }
//     listBillAmount.innerText = `; Bill; Amount: $; { billInput.value; } `;
// });
// const tenTipVal = parseInt(tenPercent.value, 10);
// const fifteenTipVal = parseInt(fifteenPercent.value, 10);
// const twentyTipVal = parseInt(twentyPercent.value, 10);


// tenPercent.addEventListener('click', function () {
//     listTipPercentage.innerText = 'Tip Percentage: 10%';
//     tipMessage.innerText = 'You are tipping 10%';
//     tenPercent.disabled = true;
//     fifteenPercent.disabled = false;
//     twentyPercent.disabled = false;
//     const calcTip = parseInt(billInput.value) * .10;
//     const billTotal = calcTip + parseInt(billInput.value);
//     if (isNaN(calcTip) && isNaN(billTotal)) {
//         listTipAmount.innerText = 'Amount of Tip: 0';
//         listTotal.innerText = 'Total to be paid: 0';
//     } else {
//         listTipAmount.innerText = `; Amount; of; Tip: $; { calcTip; } `;
//         listTotal.innerText = `; Total; to; be; paid: $; { billTotal; } `;
//     }
// });
// fifteenPercent.addEventListener('click', function () {
//     listTipPercentage.innerText = 'Tip Percentage: 15%';
//     tipMessage.innerText = 'You are tipping 15%';
//     tenPercent.disabled = false;
//     fifteenPercent.disabled = true;
//     twentyPercent.disabled = false;
//     const calcTip = parseInt(billInput.value) * .15;
//     const billTotal = calcTip + parseInt(billInput.value);
//     if (isNaN(calcTip) && isNaN(billTotal)) {
//         listTipAmount.innerText = 'Amount of Tip: 0';
//         listTotal.innerText = 'Total to be paid: 0';
//     } else {
//         listTipAmount.innerText = `; Amount; of; Tip: $; { calcTip; } `;
//         listTotal.innerText = `; Total; to; be; paid: $; { billTotal; } `;
//     }
// });
// twentyPercent.addEventListener('click', function () {
//     listTipPercentage.innerText = 'Tip Percentage: 20%';
//     tipMessage.innerText = 'You are tipping 20%';
//     tenPercent.disabled = false;
//     fifteenPercent.disabled = false;
//     twentyPercent.disabled = true;
//     const calcTip = parseInt(billInput.value) * .20;
//     const billTotal = calcTip + parseInt(billInput.value);
//     if (isNaN(calcTip) && isNaN(billTotal)) {
//         listTipAmount.innerText = 'Amount of Tip: 0';
//         listTotal.innerText = 'Total to be paid: 0';
//     } else {
//         listTipAmount.innerText = `; Amount; of; Tip: $; { calcTip; } `;
//         listTotal.innerText = `; Total; to; be; paid: $; { billTotal; } `;
//     }
// });



