## IPFS and Blockchain based file storage

This application  allows users to upload any file to the Inter Planetary File System and store the associated hash key on the blockchain. This decentralized way of storing the files/ data on IPFS and ethereum blockchain ensures data security, transparency and fast data load speeds and costless data storage.

## Tech-Stack used

 - React (UI)
 - Solidity (For writing the smart contracts)
 - Ganache (Local Ethereum setup)
 - Truffle (For compiling Solidity programs)

## Libraries Used 
- web3.js : web3. js is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.
- truffle : Simple development framework for Ethereum
- bootstrap : CSS Framework for developing responsive and mobile-first websites.
- @tippyjs/react : Used for adding tooltips in the UI

## Installation
Clone project

    git clone https://github.com/shubhambash/IPFS-Storage.git

Start frontend dev server

    npm run start

Start Ganache local Ethereum Environment the add `truffle-config.js` to projects
Compile solifity files `truffle migrate --reset` 
Add a provider, e.g. , Metamask wallet chrome extension. Add Ganache local etheruem network to Metamask and import account from Ganache.
