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


    let user = accounts[0];
    console.log(`Using ${user}`);

    // fetch nftId
    let nftId = await nft.tokenOfOwnerByIndex(user, 0)
      .catch(console.error);
    console.log(`First nft of ${user} is nft id ${nftId}`);

    // approve transfer of nft
    await nft.setApprovalForAll(nftMarket.address, true, {from: user})
      .catch(console.error);
    console.log("nftMarket was approved to spend nfts")

    //put nft for sale
    let price = web3.utils.toWei("1", "ether");
    let onSale = await nftMarket.sell(nftId, price, nft.address, crowns.address, {from: user})
      .catch(console.error);
    console.log(onSale.tx);
    console.log(`Nft id ${nftId} was put for sale`);

}.bind(this);
