import DStorage from '../abis/DStorage.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import './App.css';

const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https',apiPath: '/ipfs/api/v0' }) // leaving out the arguments will default to these values

class App extends Component {

  async componentWillMount() {
    console.log("1")
    await this.loadWeb3()
    console.log("2")
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      
      window.web3 = new Web3(window.ethereum)
   
      window.ethereum.enable().then(console.log("done")).catch(e => console.log(e));

    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    console.log("in")
    const web3 = window.web3
    console.log("web3", web3)
    // Load account
    
    const accounts = await web3.eth.getAccounts()
    console.log("acc",accounts)
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DStorage.networks[networkId]
    this.setState({networkId})
    console.log("net id",networkId,"net data" ,networkData)
    if(networkData) {
      // Assign contract
      const dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)
      console.log("dstorage",dstorage)
      this.setState({ dstorage })
      // Get files amount
      const filesCount = await dstorage.methods.fileCount().call()
      this.setState({ filesCount })
      // Load files&sort by the newest
      for (var i = filesCount; i >= 1; i--) {
        const file = await dstorage.methods.files(i).call()
        this.setState({
          files: [...this.state.files, file]
        })
      }
    } else {
      window.alert('DStorage contract not deployed to detected network.')
    }
  }

  // Get file from user
  captureFile = event => {
    event.preventDefault()

    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      })
      
    }
  }



  uploadFile = async (description) => {
    console.log("Submitting file to IPFS...")
    let data = this.state.buffer
    console.log('buffer', data)



    function encrypt(text) {
      let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return { iv: iv.toString('hex'), encryptedData: Buffer(encrypted), encryptedData1 : encrypted.toString('hex') };
     }


     var test = iv.toString('hex')


  
    let endata = encrypt(data)
     console.log("ENCRYPTED DATA",endata)

     



    

    // Add file to the IPFS

    try{
      const result = await ipfs.add(data) 
      console.log("postResponse", result);

      this.setState({ loading: true })
      // Assign value for the file without extension
      if(this.state.type === ''){
        this.setState({type: 'none'})
      }
      this.state.dstorage.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
        this.setState({
         loading: false,
         type: null,
         name: null
       })
       window.location.reload()
      }).on('error', (e) =>{
        console.log(e)
        window.alert('Error here')
        this.setState({loading: false})
      })

    } catch(e){
      console.log("Error: ", e)
    }

  
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dstorage: null,
      files: [],
      loading: false,
      type: null,
      name: null
    }
    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} network={this.state.networkId}/>
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              files={this.state.files}
              captureFile={this.captureFile}
              uploadFile={this.uploadFile}
   
            />
        }
      </div>
    );
  }
}

export default App;