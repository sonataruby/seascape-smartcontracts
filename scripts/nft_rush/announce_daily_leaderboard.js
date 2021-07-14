/**
 * @description This scripts announces the daily leaderboard winners.
 * It uses https://gelato.network/ for executing the smartcontracts at certain time.
 */

//const ethers = require("ethers");
const GelatoCoreLib = require("@gelatonetwork/core");
const bre = require("@nomiclabs/buidler");
const { ethers } = bre;

const conditionAddress = "0x63129681c487d231aa9148e1e21837165f38deaf"
const conditionAbi = ["function timeCheck(uint256 _timestamp) view returns(string memory)"]
const iFace = new ethers.utils.Interface(conditionAbi)
const futureTimestamp = 1599800000

// #### Create the condition object

const condition = new GelatoCoreLib.Condition({
    inst: conditionAddress,
    data: iFace.encodeFunctionData("timeCheck", [
        futureTimestamp
    ]),
})

// Address of NftBrawl
const actionAddress = process.env.NFT_BRAWL_ADDRESS;
const actionAbi = [
    "function announceDailySpentWinners(\
        uint256 _sessionId, \
        address[10] calldata _winners, \
        uint8 _winnersAmount\
    ) external onlyOwner"
]
const iFace = new ethers.utils.Interface(actionAbi)

// We need to get the actual data from the network.

// #### Create the action object
const action = new GelatoCoreLib.Action({
    addr: actionAddress,
    data: iFace.encodeFunctionData("announceDailySpentWinners", [
        1000000000000000,
        5000000000000000,
        [
            "0x6B175474E89094C44Da98b954EedeAC495271d0F",
            "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        ],
        "0x2464e6E2c963CC1810FAF7c2B3205819C93833f7",
        1599800000
    ]),
    operation: GelatoCoreLib.Operation.Call,
    dataFlow: GelatoCoreLib.DataFlow.None,
    value: 0,
    termsOkCheck: false
});

const task = new GelatoCoreLib.Task({
    conditions: [condition],
    actions: [action],
    selfProviderGasLimit: 0,
    selfProviderGasPriceCeil: 0
})

// Gelato User Proxy
const gelatoUserProxyAddress = "YOUR_PROXY_ADDRESS"
const providerModuleGelatoUserProxy = "0x4372692C2D28A8e5E15BC2B91aFb62f5f8812b93"


// Gelato provider object
const gelatoProvider = new GelatoCoreLib.GelatoProvider({
    addr: gelatoUserProxyAddress,
    module: providerModuleGelatoUserProxy
})

gelatoUserProxy = await ethers.getContractAt(
      GelatoCoreLib.GelatoUserProxy.abi,
      gelatoUserProxyAddress
);

// Submit reapting task
await gelatoUserProxy.submitTaskCycle(
      gelatoProvider, 
      [task], 
      expiryData, 
      numOfCycle
)