let NftMarket = artifacts.require("NftMarket");
let Crowns = artifacts.require("CrownsToken");
let Nft = artifacts.require("SeascapeNft");


let accounts;

module.exports = async function(callback) {
    const networkId = await web3.eth.net.getId();
    let res = await init(networkId);
    callback(null, res);
};

let init = async function(networkId) {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);

    let nftMarket = await NftMarket.at("0x867d2b79db90a3e586FE2ef16C8DbEb0B1Cf9aa2");
    let nft     = await Nft.at("0x66D698881b8E650FC08f1e96EbBb9Ad2e7f8408b");
    let crowns  = await Crowns.at("0x9F65b1721c18FB1591058F77508Cbe32492e4D7f");


    //must fill correct nftId
    let nftId = 0;
    let approveAmount = web3.utils.toWei("0.1", "ether");

    let user = accounts[1];
    console.log(`Using ${user}`);

    //approve spending of crowns
    await crowns.approve(nftMarket.address, approveAmount, {from: user})
      .catch(console.error);


    // make sure that sale is correct
    let salesObject = await nftMarket.getSales(nftId, nft.address)
      .catch(console.error);
    console.log("Sale data:");
    console.log(salesObject);

    //execute buy
    let buy = await nftMarket.buy(nftId, nft.address, crowns.address, {from: user})
      .catch(console.error);
    console.log(`bought nft id ${nftId} with account ${user}`);


}.bind(this);
