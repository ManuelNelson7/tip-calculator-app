const bill = document.getElementById('bill-input');
const btnTips = document.querySelectorAll('.btn-tip');
const custom = document.getElementById('custom');
const people = document.getElementById('person');
const errorMsg = document.querySelector('.error-msg');
const results = document.querySelectorAll('.t-value');
const resetBtn = document.getElementById('reset');


bill.addEventListener('input', setBillValue);
btnTips.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
custom.addEventListener('input', setcustomValue);
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

    custom.value = '';

    calculateTip();

}

function setcustomValue(){
    if(!validateInt(custom.value)){
        custom.value = custom.value.substring(0, custom.value.length-1);
    }
    
    tipValue = parseFloat(custom.value/100);

    btnTips.forEach(btn => {
        btn.classList.remove('tip_pressed');
    });

    if(custom.value !== ''){
        calculateTip();
    }
    
}

function setPeopleValue(){
    if(!validateInt(people.value)){
        people.value = people.value.substring(0, people.value.length-1);
    }

    peopleValue = parseFloat(people.value);

    if(peopleValue <= 0){
        errorMsg.classList.add('show-error-msg');
        setTimeout(function(){
            errorMsg.classList.remove('show-error-msg');
        }, 3000);
    }

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