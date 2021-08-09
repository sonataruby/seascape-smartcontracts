let Factory = artifacts.require("NftFactory");
let Nft = artifacts.require("SeascapeNft");

module.exports = async function(callback) {
    let res = init();

    callback(null, res);
};

let init = async function() {
    let accounts = await web3.eth.getAccounts();

    let nft = await Nft.deployed();

    let owner = "0x77732a57F6Dd9D6a61d1052831755e513214061b";

    let balance = await nft.balanceOf(accounts[0]);
    console.log(`Balance: ${balance}`);

    // later on the server, set the image id to clowns.
    for(var i=1; i<=balance; i++) {
        let id = await nft.tokenOfOwnerByIndex(accounts[0], i);
        console.log(`#${i} id: ${id}`);

        let res = await nft.safeTransferFrom(accounts[0], owner, id);
        console.log(`Txid    : ${res.tx}`);
        console.log();
    }
};