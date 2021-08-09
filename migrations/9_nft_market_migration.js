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
          var feesReciever = "0x77732a57F6Dd9D6a61d1052831755e513214061b";

          deployer.deploy(NftMarket, feesReciever, tipsFeeRate)
           .then(function(){
              console.log("Log, Market contract was deployed at address: "+NftMarket.address);
          });
        }
};
