document.querySelector('#down-temperature').addEventListener('click', changeTemperature)
document.querySelector('#up-temperature').addEventListener('click', changeTemperature)

document.querySelector('#feed-fish').addEventListener('click', feedFish)

document.querySelector('#select-all').addEventListener('click', selectAll)

document.querySelector('#mass-action-button').addEventListener('click', massAction)

async function changeTemperature(){

    let changeInTemperature

    if (this.id == 'down-temperature'){
        changeInTemperature = 'decrease'
    } else {
        changeInTemperature = 'increase'
    }
   
    try {
        const response = await fetch('/tank/changeTemperature',{
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                changeInTemperature: changeInTemperature,
                tankId: window.location.pathname.substring(6)
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}


async function feedFish(){

    try {
        const response = await fetch('/tank/feedFish',{
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                tankId: window.location.pathname.substring(6)
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }
}

function selectAll(){
    
    let fishCheckboxes = document.querySelectorAll('.fish-checkbox')

    let changeToChecked 

    if (this.checked){
        changeToChecked = true
    } else {
        changeToChecked - false
    }

    for (let i = 0; i < fishCheckboxes.length; i++){
        fishCheckboxes[i].checked = changeToChecked
    }
}


async function massAction(){

    if (document.querySelector('#mass-action-menu').value === 'sell'){

        const priceOf4MO = 3
        const priceOf2MO = 1
        const priceOf0MO = 0

        let totalValue = 0
        
        let checkboxes = document.querySelectorAll('.fish-checkbox')

        let idsOfSelected = []

        for (let i = 0; i < checkboxes.length; i++){
            if (checkboxes[i].checked){
                let id = checkboxes[i].parentNode.dataset.fishid
                idsOfSelected.push(id)
                let age = checkboxes[i].parentNode.querySelector('.age').innerText.split(' ')[0]
                if(age >= 4){
                    totalValue += priceOf4MO
                } else if (age >= 2){
                    totalValue += priceOf2MO
                } else {
                    totalValue += priceOf0MO
                }
            }
        }

        let wantsToContinue = confirm(`Are you sure you want to sell these fish for a total of $${totalValue}?\n
        Please know that our prices are: \n
        0-1 month old guppies: $${priceOf0MO}\n
        2-3 month old guppies: $${priceOf2MO}\n
        4+  month old guppies: $${priceOf4MO}`)

        if (!wantsToContinue){
        return 
        }


        try {
            const response = await fetch('/tank/sellFish',{
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    valueOfFish: totalValue,
                    idsOfSelected: idsOfSelected
                })
            })
            const data = await response.json()
            console.log(data)
            location.reload()
        }
        catch(err){
            console.log(err)
        }
    }
}