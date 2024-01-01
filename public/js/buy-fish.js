let buyFishButtons = document.querySelectorAll('.buy-fish-button')

for (let i = 0; i < buyFishButtons.length; i++){
    buyFishButtons[i].addEventListener('click', buyFish)
}

async function buyFish(){
    
    let newTankId = this.parentNode.querySelector('.tank-selection').value

    let fishId = this.parentNode.dataset.fishid


    try {
        const response = await fetch('/buyFish',{
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                newTankId: newTankId,
                fishId: fishId,
                seller: 'fishshop',
                sellerId: undefined
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