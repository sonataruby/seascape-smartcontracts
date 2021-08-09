let LpMining = artifacts.require("LpMining");
let LpToken = artifacts.require("LpToken");
let Crowns = artifacts.require("CrownsToken");
let Nft = artifacts.require("SeascapeNft");
let Factory = artifacts.require("NftFactory");

let accounts;
let reward = web3.utils.toWei("20", "ether");  // cws
let period = 3600 * 24 * 1;
let generation = 1;

/**
 * For test purpose, starts a game session
 */
module.exports = async function(callback) {
    const networkId = await web3.eth.net.getId();
    let res = init(networkId);
    
    callback(null, res);
};

let init = async function(networkId) {
    accounts = await web3.eth.getAccounts();
    console.log(accounts)

	let lpMining        = await LpMining.at("0xBAe84dBB9f0A21c38BceaeA6d5f28f9CE41892c3");
	let factory         = await Factory.at("0x2651c8E1958c18B7457aBE89c8FA8788fDdb40D6");
	let crowns          = await Crowns.at("0x9F65b1721c18FB1591058F77508Cbe32492e4D7f");	
    let lpTokenAddress  = "0xBAe84dBB9f0A21c38BceaeA6d5f28f9CE41892c3";

    console.log("Set the contracts");

    //await factory.addStaticUser(lpMining.address).catch(console.error);
    //console.log("Profit Circus contract got a permission to mint nfts");

    // should transfer reward amount to contract
    await crowns.transfer(lpMining.address, reward, {from: accounts[0]});
    console.log("Crowns for session were transferred to the Lp Mining smartcontract");

    let startTime = Math.floor(new Date().getTime()/1000) + 30;
    await lpMining.startSession(lpTokenAddress, reward, period, startTime, generation);
    console.log("Session started");

    let sessionId = await lpMining.lastSessionIds.call(lpTokenAddress);
    console.log(sessionId +" session id for "+lpTokenAddress);
    
    return true;
}.bind(this);

