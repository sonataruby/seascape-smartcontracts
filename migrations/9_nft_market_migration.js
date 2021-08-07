var NftMarket = artifacts.require("./NftMarket.sol");



async function getAccount(id) {
    let accounts = await web3.eth.getAccounts();
    return accounts[id];
}


const tipsFeeRate = 100;	// 1 = 0.1%, 100 = 10%

module.exports = function(deployer, network) {
      if (network == "ganache") {
        var feesReciever = getAccount(3);
        deployer.deploy(NftMarket, feesReciever, tipsFeeRate)
         .then(function(){
            console.log("Market contract was deployed at address: "+NftMarket.address);
        });
      }
      else if (network == "bsc_testnet") {
          var feesReciever = "0x4D4e02a7bd99B69fB8d349632a73b7a852A99aa4";

          deployer.deploy(NftMarket, feesReciever, tipsFeeRate)
           .then(function(){
              console.log("Log, Market contract was deployed at address: "+NftMarket.address);
          });
        }
};
