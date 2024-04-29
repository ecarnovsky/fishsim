document.querySelector('.return-to-tank-btn').addEventListener('click', returnToTank)
document.querySelector('.sell-petshop-btn').addEventListener('click', sellFishToPetShop)
document.querySelector('.sell-player-btn').addEventListener('click', updateFishSaleStatus)

function returnToTank(){

    history.go(-1)

}