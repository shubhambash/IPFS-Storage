

import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment'
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css'
import addIcon from '../addIcon1.png'
import decryptIcon from '../decryptIcon.png'

function Main(props) {

  const [uploadIcons, setUploadIcons] = useState(true)
  const [decryptIcons, setDecryptIcons] = useState(true)
  var fileDescription = ""
  return (
    <div className="container-fluid mt-5 text-center">
    <div className="row">
      <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px' }}>
        <div className="content">
          <p>&nbsp;</p>
          {/* <div className="card mb-3 mx-auto bg-dark" style={{ maxWidth: '512px' }}>
            <h2 className="text-white text-monospace bg-dark"><b><ins>Share File</ins></b></h2>
              
          </div> */}

          <div className='wrapper'>

          

          <div id="uploadWrapper" onClick={(e) => {setUploadIcons(false)}}>

            {uploadIcons ? 
            
            (<>

            <div className = "uploadIcons">
              <h2>Upload File</h2>
            </div>
            <div className = "uploadIcons">
              <img src={addIcon} id="addIcon"/>
            </div>
              

            </>) 
            
            : 
            
            (<>
            
            <form className='uploadForm' onSubmit={(event) => {
                event.preventDefault()
                const description = fileDescription.value
             props.uploadFile(description)
              }} >
                  <div className="uploadWrapper form-group">
                    <br></br>

                    <input type="file" onChange={props.captureFile} className="fileInput text-monospace mb-3"/>
                    
                      <input
                        id="fileDescription"
                        type="text"
                        ref={(input) => { fileDescription = input }}
                        className="fileDescInpt text-monospace"
                        placeholder="add description"
                        required />
                  </div>
                
                <button type="submit" className="uploadBtn btn-block" onClick={(e) => {setUploadIcons(true)}}><b>Upload!</b></button>
              </form>
            
            </>)}


            

          </div>


          <div id="uploadWrapper" onClick={(e) => {setDecryptIcons(false)}}>
          

          {decryptIcons ? 
            
            (<>

            <div className = "uploadIcons">
              <h2>Decrypt File</h2>
            </div>
            <div className = "uploadIcons">
              <img src={decryptIcon} id="addIcon"/>
            </div>
              

            </>) 
            
            : 
            
            (<>
            
            {/* <form className='uploadForm' onSubmit={(event) => {
                event.preventDefault()
                console.log("uploadform1")
                props.uploadFile1()
              }} >
                  <div className="uploadWrapper form-group">
                    <br></br>

                    <input type="file" onChange={props.captureFile1} className="fileInput text-monospace mb-3"/>
                    
                  </div>
                
                <button type="submit" className="uploadBtn btn-block" onClick={(e) => {setDecryptIcons(true)}}><b>Decrypt</b></button>
              </form>
             */}
            </>)}

          </div>

          </div>
          <p>&nbsp;</p>
          <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
            <thead style={{ 'fontSize': '15px' }}>
              <tr className="bg-dark text-white">
                <th scope="col" style={{ width: '10px'}}>s.no.</th>
                <th scope="col" style={{ width: '200px'}}>name</th>
                <th scope="col" style={{ width: '230px'}}>description</th>
                <th scope="col" style={{ width: '120px'}}>type</th>
                <th scope="col" style={{ width: '90px'}}>size</th>
                <th scope="col" style={{ width: '90px'}}>date</th>
  
                <th scope="col" style={{ width: '120px'}}>share link</th>
              
              </tr>
            </thead>
            { props.files.map((file, key) => {
              return(
                <thead style={{ 'fontSize': '12px' }} key={key}>
                  <tr>
                    <td>{file.fileId}</td>
                    <td>{file.fileName}</td>
                    <td>{file.fileDescription}</td>
                    <td>{file.fileType}</td>
                    <td>{convertBytes(file.fileSize)}</td>
                    <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                 
                    <td>
                      <a
                      style={{color : "green"}}
                        href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                        rel="noopener noreferrer"
                        target="_blank">
                        {file.fileHash.substring(0,10)}...
                      </a>
                    </td>
               
                  </tr>
                </thead>
              )
            })}
          </table>
        </div>
      </main>
    </div>
  </div>
  )
}

export default Main


