const bill = document.getElementById('bill-input');
const btnTips = document.querySelectorAll('.bt-tip') ;

bill.addEventListener('input', setBillValue);
let billValue= 0.0; //Default 0



function validateFloat(s){
    var admittedValues = /^[0-9]*\.?[0-9]*$/;
    return s.match(admittedValues);
}

function setBillValue(){
    if (bill.value.includes(",")){
        bill.value = bill.value.replace(',', '.');
    }

    if(validateFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.lenght -1);

    billValue = parseFloat(bill.value);
    console.log(bill.value);}
}


function handleClick(event){
    btnTips.forEach(btn => {
        btn.classList.remove('.tip-pressed');

        
    })
}

