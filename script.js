const bill = document.getElementById('bill-input');
const btnTips = document.querySelectorAll('.btn-tip');
const tipCustom = document.getElementById('custom');
const people = document.getElementById('person');
const errorMsg = document.querySelector('.error-msg');
const results = document.querySelectorAll('.t-value');
const resetBtn = document.getElementById('reset');


bill.addEventListener('input', setBillValue);
btnTips.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('nput', setTipCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);


let billValue = 0.0;
let tipValue = 0.15;
let peopleValue = 1; 

function validateFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx);
}

function setBillValue(){
    if (bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }

    if(!validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1);
    }

    billValue = parseFloat(bill.value);

    calculateTip();
}

function handleClick(event){
    btnTips.forEach(btn => {
        btn.classList.remove('tip_pressed');

        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('tip_pressed');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    });

    tipCustom.value = '';

    calculateTip();

}

function setTipCustomValue(){
    if(!validateInt(tipCustom.value)){
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length-1);
    }
    
    tipValue = parseFloat(tipCustom.value/100);

    btnTips.forEach(btn => {
        btn.classList.remove('tip_pressed');
    });

    if(tipCustom.value !== ''){
        calculateTip();
    }
    
}

function setPeopleValue(){
    if(!validateInt(people.value)){
        people.value = people.value.substring(0, people.value.length-1);
    }

    peopleValue = parseFloat(people.value);

    calculateTip();
}

function calculateTip(){
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

function reset(){
    bill.value = '0.0';
    setBillValue();

    btnTips[2].click();

    people.value = '1';
    setPeopleValue();
}