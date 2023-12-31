document.querySelector('#down-temperature').addEventListener('click', changeTemperature)
document.querySelector('#up-temperature').addEventListener('click', changeTemperature)

document.querySelector('#feed-fish').addEventListener('click', feedFish)

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

