async function sellFishToPetShop(typeOfSell){

    const priceOf4MO = 3
    const priceOf2MO = 1
    const priceOf0MO = 0

    let totalValue = 0

    let idsOfSelected = []

    if(typeOfSell === 'mass action'){

        
        let checkboxes = document.querySelectorAll('.fish-checkbox')

    
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
    } else {
        const age = document.querySelector('.age').innerText.split(' ')[0]
        let id = document.querySelector('.fish-block-tank-view').dataset.fishid
        idsOfSelected.push(id)
        if(age >= 4){
            totalValue = priceOf4MO
        } else if (age >= 2){
            totalValue = priceOf2MO
        } else {
            totalValue + priceOf0MO
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
        if(typeOfSell === 'mass action'){
            location.reload()
        } else {
            window.location.replace('../tanks');
        }
        
    }
    catch(err){
        console.log(err)
    }
}



async function updateFishSaleStatus(){

    const fishId = document.querySelector('.fish-block-tank-view').dataset.fishid
    const fishForSale = document.querySelector('.sale-status').value === 'For Sale' ? true : false
    const price = document.querySelector('#price').value 

    try {
        const response = await fetch('/fish/updatesalestatus',{
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                fishId: fishId,
                fishForSale: fishForSale,
                price: price
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