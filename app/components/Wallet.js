// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Wallet.css';
import routes from '../constants/routes';
import wallet from '../../dAppJS/ethWallet';
import web3 from '../../dAppJS/web3';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manager: '',
      participate_amount: '0.01',
      message: '',
      total_amount: ''
    };
  }

  async componentDidMount() {
    // get the public address of the managers
    const manager = await wallet.methods.manager().call();
    console.log(manager);
    this.setState({ manager });
    const total_amount = await web3.eth.getBalance(wallet.options.address);
    this.setState({ total_amount });
  }

  onSubmit = async event => {
    const { participate_amount } = this.state;
    const { getAccounts } = web3.eth;
    const { toWei } = web3.utils;
    const { enterLottery } = wallet.methods;

    event.preventDefault();
    const accounts = await getAccounts();
    if (participate_amount < 0.01) {
      return alert('Amount must be greater than 0.01');
    }
    this.setState({ message: 'Please wait .....' });
    const enter_lottery = await enterLottery().send({
      from: accounts[0],
      value: toWei(participate_amount, 'ether')
    });
    this.setState({ message: 'You have been added to the wallet!' });
  };

  onClick = async () => {
    const { getAccounts } = web3.eth;
    const { pickWinner } = wallet.methods;

    this.setState({ message: 'Please wait .....' });
    const accounts = await getAccounts();
    const winner = await pickWinner().send({
      from: accounts[0]
    });
    this.setState({ message: 'Payment sent to winner' });
  };

  render() {
    const { participate_amount, total_amount, message, manager } = this.state;

    return (
      <div>
        <h1>
          Total wallet pool is {web3.utils.fromWei(total_amount, 'ether')}
        </h1>
        <form onSubmit={this.onSubmit}>
          <input
            value={participate_amount}
            onChange={event =>
              this.setState({
                participate_amount: event.target.value
              })
            }
          />
          <button type="submit">Participate </button>
        </form>
        <p> {message} </p>
        <hr /> <br /> <hr />
        <p> The Wallet Manager is {manager}</p>
        <button type="button" onClick={this.onClick}>
          Pick Winner
        </button>
      </div>
    );
  }
}
