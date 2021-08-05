import React, { Component } from 'react';
import './App.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const options = ['CSE', 'MBA', 'OTHER'];
const defaultOption = options[0];
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })
const memeHash1 = null
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      memeHash: 'QmSPdpN8PrnB6jMcVnptzPSiSySbm4XqAzHFcvY8EbyyFL',
      count: 0,
      list: '',
      url: 'https://api.qrserver.com/v1/create-qr-code/?data=https://ipfs.infura.io/ipfs/',
      url2: '&amp',
      name: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }



  captureFile = (event) => {
    event.preventDefault()
    //process file for ipfs
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
  }
  handleChange(event) {
    this.setState({ name: event.target.value });
  }


  onSubmit = (event) => {
    event.preventDefault()
    console.log("submitting the form....")

    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      const newItem = {
        name: this.state.name
      };
      console.log(newItem)
      const memeHash = result[0].hash
     
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.state.name,
          hash: memeHash
        })
      };
      fetch('http://localhost:3001/api/certificate', requestOptions)
        .then(response => response.json());


      this.setState({
        count: this.state.count + 1,
        list: this.state.list + "\n" + (this.state.count) + "." + " " + (this.state.memeHash),

      });
      console.log(memeHash)
      this.setState({ memeHash })
      if (error) {
        console.error(error)
        return
      }

    }
    )

  }

  render() {
    return (

      <div className='background' >
        <div>
          <div className='background' >
            <nav className="navbar navbar-dark fixed-center bg-dark flex-md-nowrap p-0 shadow">


            </nav>
            <br></br>
            <div className="container-fluid mt-5">
              <div style={{
              }
              }>
                <main role="main" className="col-lg-12 d-flex text-left">
                  <div className="content mr-auto ml-auto">

                    <a>
                      <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`} />
                    </a>
                    <p></p>


                    <a
                      className="navbar-brand col-sm-3 col-md-2 mr-0"
                      href="http://www.cutm.ac.in"
                      target="_blank"
                      rel="noopener noreferrer"
                    ><b>
                        CENTURION BLOCKCHAIN DRIVE
           </b>

                    </a><br></br>

                    <h1> DECENTRALIZE FILE STORAGE QR-DAPP</h1>
                    <h3></h3>
                    <p></p>
                    <br></br>
                    <br></br>


                    <form onSubmit={this.onSubmit}>

                      <p></p>
                      <input type='file' onChange={this.captureFile} />

                      <label htmlFor="name">
                        <h3 className='Hashblock'> Enter You File Name:</h3>
                      </label>
                      <input type='text'
                        id="name"
                        onChange={this.handleChange}
                        value={this.state.text}
                      /><p>     </p>
                       <label htmlFor="name">
                        <h3 className='Hashblock'> Select Branch Name:</h3>
                      </label>
                     <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />;

                      <label htmlFor="name">
                        <h3 className='Hashblock'> Enter You User Name:</h3>
                      </label>
                      
                      <input type='text'
                        id="user"
                        onChange={this.handleChange}
                        value={this.state.text}
                      /><p>     </p>
                      <div>
                        <input class="button" type='submit' />
                      </div>
                      <p></p>

                      <div className='textbox'>
                        <h3 className='Hashblock'>Hash Of Recent Block</h3>
                        <textarea rows="4" cols="50" type='text' value={this.state.memeHash} />
                        <br></br>

                        <img className='qr' src={this.state.url + this.state.memeHash + this.state.url2}
                          alt=""
                          title="QR CODE()"
                          width="150"
                          height="150"
                          align="right" />
                        <h3 className='Hashblock' >Numbers Of Validated Records</h3>
                        <textarea rows="4" cols="50" type='text' value={this.state.count} />
                        <h3 className='Hashblock'>Hash Of Validated Records</h3>
                        <textarea rows="4" cols="50" type='text' value={this.state.list} />

                        <p></p>
                      </div>
                    </form>


                  </div>
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App