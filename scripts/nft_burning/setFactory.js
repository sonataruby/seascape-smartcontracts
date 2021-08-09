let NftBurning = artifacts.require("NftBurning");
let Crowns = artifacts.require("CrownsToken");
let Nft = artifacts.require("SeascapeNft");
let Factory = artifacts.require("NftFactory");


let accounts;

module.exports = async function(callback) {
    const networkId = await web3.eth.net.getId();
    let res = await init(networkId);
    callback(null, res);
};

let init = async function(networkId) {
    accounts = await web3.eth.getAccounts();
    console.log(accounts);

    // contracts
    let nftBurning = await NftBurning.at("0xf4E5C4088B1b02901fF356BCbe863B791c65C7B0");
    let crowns  = await Crowns.at("0x9F65b1721c18FB1591058F77508Cbe32492e4D7f");
    let factory  = await Factory.at("0x2651c8E1958c18B7457aBE89c8FA8788fDdb40D6");
    let nft     = await Nft.at("0x66D698881b8E650FC08f1e96EbBb9Ad2e7f8408b");


    // global variables
    let user = accounts[0];
    console.log(`Using ${user}`);

    console.log("attemping to set the factory...");
    // let isGiven = false;
    // try{
    //   isGiven = await factory.isGenerator(nftBurning.address);
    // }catch(err){
    //   console.log(err);
    // };
    // console.log(isGiven);
    // if (!isGiven) {
    await factory.addGenerator(nftBurning.address).catch(console.error);
    console.log("factory was set")
// }

}.bind(this);
