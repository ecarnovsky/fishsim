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
        
        let checkboxes = document.querySelectorAll('.fish-checkbox')

        let idsOfSelected = []

        for (let i = 0; i < checkboxes.length; i++){
            if (checkboxes[i].checked){
                let id = checkboxes[i].parentNode.dataset.fishid
                idsOfSelected.push(id)
            }
        }

        let valueOfFish = idsOfSelected.length * 3   // $3 per fish

        let wantsToContinue = confirm(`Are you sure you want to sell these fish for $${valueOfFish}?`)

        if (!wantsToContinue){
        return 
        }


        try {
            const response = await fetch('/tank/sellFish',{
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    valueOfFish: valueOfFish,
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