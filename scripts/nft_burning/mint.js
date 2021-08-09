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

    let nftBurning = await NftBurning.at("0xf4E5C4088B1b02901fF356BCbe863B791c65C7B0");
    let crowns  = await Crowns.at("0x9F65b1721c18FB1591058F77508Cbe32492e4D7f");
    let factory  = await Factory.at("0x2651c8E1958c18B7457aBE89c8FA8788fDdb40D6");
    let nft     = await Nft.at("0x66D698881b8E650FC08f1e96EbBb9Ad2e7f8408b");


    // global variables
    let user = accounts[0];
    let owner = accounts[0];
    let imgId = 1;
    let quality = 3;
    let depositInt = "1";
    let depositAmount = web3.utils.toWei(depositInt, "ether");
    let ether = 1000000000000000000;



    // return current account and sessionId
    console.log(`Using ${user}`);
    let sessionId = await nftBurning.lastSessionId.call();
    sessionId = parseInt(sessionId);
    console.log("current session id: " ,sessionId);


    // return user totalStaked balance per sessionId
    let totalStaked = parseInt(await nftBurning.totalStakedBalanceOf(sessionId, user)).toString();
    console.log(`User staked ${totalStaked / ether} CWS in session ${sessionId}`);


    // fetch nftIds
    let nftIds = new Array(5);
    console.log(`Fetching the nft Ids:`);
    for(let index = 0; index < 5; index++){
      let tokenId = await nft.tokenOfOwnerByIndex(user, index);
      nftIds[index] = parseInt(tokenId.toString());
      //.catch(console.error);
      console.log(`Nft at index ${index} has id ${nftIds[index]}`);
    }

    // or set values manually
    // let sessionId = 1;
    // let totalStaked = web3.utils.toWei("1000", "milli");
    // let nftIds = [1565, 1265, 1126, 1125, 1124];


    // approve transfer of nfts
    console.log("approving nftBurning to spend nfts...")
    await nft.setApprovalForAll(nftBurning.address, true, {from: user})
      .catch(console.error);
    // check if nfts are approved
    console.log("Checking if Nfts are approved ?")
    let approved = await nft.isApprovedForAll(user, nftBurning.address);
    console.log(approved);


    // approve transfer of crowns and check allowance
    console.log("approving nftBurning to spend crowns...")
    await crowns.approve(nftBurning.address, depositAmount, {from:user})
    .catch(console.error);
    console.log("checking if crowns are approved ?")
    let allowance = await crowns.allowance(user, nftBurning.address);
    allowance = parseInt(allowance).toString() / ether;
    console.log(`nftBurning was approved to spend ${allowance} crowns`);


    // signature part
    console.log("making signature..");
    let bytes32 = web3.eth.abi.encodeParameters(
      ["uint256", "uint256", "uint256", "uint256", "uint256", "uint256", "uint256"],
      [nftIds[0], nftIds[1], nftIds[2], nftIds[3], nftIds[4], totalStaked, imgId]);

      let bytes1 = web3.utils.bytesToHex([quality]);
	    let str = bytes32 + bytes1.substr(2);
	    let data = web3.utils.keccak256(str);

      let hash = await web3.eth.sign(data, owner);
      console.log("hash: " ,hash);

      let r = hash.substr(0,66);
      let s = "0x" + hash.substr(66,64);
      let v = parseInt(hash.substr(130), 16);
      if (v < 27) {
        v += 27;
      }


    // mint
    console.log("calling the mint function...");
    let minted = await nftBurning.mint(
        sessionId,
        nftIds,
        quality,
        imgId,
        v,
        r,
        s,
	    {from: user})
      .catch(console.error);
    console.log("New token was minted");


}.bind(this);
