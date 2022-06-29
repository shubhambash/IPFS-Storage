import React, { Component } from 'react';
import Identicon from 'identicon.js';
import box from '../box.png'
import Tippy from '@tippyjs/react';

class Navbar extends Component {

  render() {
    return (
      // <nav className="navbar navbar-dark bg-dark p-0 text-monospace">
      //   <a
      //     className="navbar-brand col-sm-3 col-md-2 mr-0"
      //     href="http://www.dappuniversity.com/bootcamp"
      //     target="_blank"
      //     rel="noopener noreferrer"
      //   >
      //     <img src={box} width="30" height="30" className="align-top" alt="" />
      //     D$t0r@g3
      //   </a>
      //   <ul className="navbar-nav px-3">
      //     <li>
      //       <small id="account">
      //         <a target="_blank"
      //            alt=""
      //            className="text-white"
      //            rel="noopener noreferrer"
      //            href={"https://etherscan.io/address/" + this.props.account}>
      //           {this.props.account.substring(0,6)}...{this.props.account.substring(38,42)}
      //         </a>
      //       </small>
      //       { this.props.account
      //         ? <img
      //             alt=""
      //             className='ml-2'
      //             width='30'
      //             height='30'
      //             src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
      //           />
      //         : <span></span>
      //       }
      //     </li>
      //   </ul>
      // </nav>

      <nav class="navbar navbar-expand-lg navbar-dark ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">OpenRack</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">


        <li class="nav-item px-5">
          <a class="nav-link active" aria-current="page" href="#" disabled><b>Network Id:</b> {this.props.network}</a>
        </li>

        <li class="nav-item px-5">
        <Tippy content={<span style={{backgroundColor : "black", padding : 15, color : "white"}}>{this.props.account}</span>}>
        <a class="nav-link active" aria-current="page" href="#"><b>Address</b></a>
      </Tippy>
         
        </li>
  

        <li class="nav-item px-5">
          <a class="nav-link active" aria-current="page" href="/about"><b>About</b></a>
        </li>
  
  
        
      </ul>
     
    </div>
  </div>
</nav>
    );
  }
}

export default Navbar;