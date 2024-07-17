const defaultText = document.getElementById('default-text');
const calculationsContainer = document.getElementById('calculations-container');
const calculateButton = document.getElementById('calculate-btn')


document.querySelectorAll('.mortgage-type').forEach(input => {
    input.addEventListener('change', function() {
        document.querySelectorAll('.radio-input').forEach(div => {
            div.classList.remove('selected')
        })
        

        if(this.checked){
            this.parentElement.classList.add('selected')
        }
    })
})

calculateButton.addEventListener('click', () => {
    const amount = parseFloat(document.getElementById('mortgage-amount').value);
    const term = parseFloat(document.getElementById('mortgage-term').value);
    const rate = parseFloat(document.getElementById('interest-rate').value);

    const mortgageType = document.querySelector('input[name="mortgage-type"]:checked');

    let isValid = true;

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error')
    })

    if(isNaN(amount) || amount <= 0) {
        isValid = false;
        document.getElementById('amount-alert').style.display = 'block';
        document.getElementById('mortgage-amount-main').classList.add('error');
    } else {
        document.getElementById('amount-alert').style.display = 'none'
    }

    if(isNaN(term) || term <= 0) {
        isValid = false;
        document.getElementById('term-alert').style.display = 'block';
        document.getElementById('mortgage-term-main').classList.add('error');
    } else {
        document.getElementById('term-alert').style.display = 'none'
    }

    if(isNaN(rate) || term <= 0) {
        isValid = false;
        document.getElementById('interest-alert').style.display = 'block';
        document.getElementById('mortgage-interest-main').classList.add('error');
    } else {
        document.getElementById('interest-alert').style.display = 'none'
    }

    if(!mortgageType) {
        isValid = false;
        document.getElementById('type-alert').style.display = 'block';
        document.querySelectorAll('.radio-input').forEach(el => {
            el.classList.add('error')
        })
    } else {
        document.getElementById('type-alert').style.display = 'none';
        document.querySelectorAll('.radio-input').forEach(el => {
            el.classList.remove('eroor')
        })
    }
 
    if(isValid) {
        let monthlyPayment = 0;
        let totalRePayment= 0;

        defaultText.classList.add('hide');
        calculationsContainer.classList.add('show');

        if(mortgageType.value === 'repayment') {
            const monthlyRate = rate / 12
            const n = term * 12
            monthlyPayment = (amount * monthlyRate) / (1 - Math.pow((1 + monthlyRate), - n));

            totalRePayment = monthlyPayment * n
        } else if(mortgageType.value === 'interest-only') {
            monthlyPayment = (amount * rate) /12
            totalRePayment = monthlyPayment * term * 12
        }

        document.getElementById('result').innerText = `$${monthlyPayment.toFixed(2)}`;
        document.getElementById('term-result').innerText = `$${totalRePayment.toFixed(2)}`;
    } else {
        document.getElementById('result').innerText = '';
        document.getElementById('term-result').innerText = '';
    }
})

document.getElementById('clear-btn').addEventListener('click', () => {
    document.getElementById('mortgage-form').reset();
    document.getElementById('result').innerText = '';
    document.getElementById('term-result').innerText = '';
    document.querySelectorAll('.form-alert').forEach(alert => {
        alert.style.display = 'none';
    })
    defaultText.classList.remove('hide');
    calculationsContainer.classList.remove('show');

    document.querySelectorAll('.form-flex').forEach(el => {
        el.classList.remove('error')
    })
})

document.querySelectorAll('.form-alert').forEach(alert => {
    alert.style.display = 'none';
})