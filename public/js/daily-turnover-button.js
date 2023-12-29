document.querySelector('#daily-turnover-button').addEventListener('click', dailyTurnover)

async function dailyTurnover() {

    try {
        const response = await fetch('dailyturnover', {
            method: 'put'
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err){
        console.log(err)
    }

}
