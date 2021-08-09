let Nft = artifacts.require("SeascapeNft");

let accounts;
let uri = "http://167.179.83.185/api/ntf/";

module.exports = async function(callback) {
    let res = init();

    callback(null, res);
};

let init = async function() {
    web3.eth.getAccounts(function(err,res) {accounts = res;});

    let nft = await Nft.deployed();
    console.log("Nft to use: "+nft.address);

    // should set the base uri
    let res = await nft.setBaseUri(uri);
    console.log("base uri was set "+uri);
    
    let tokenURI = await nft.tokenURI(1);
    console.log("Token uri: "+tokenURI);
}
