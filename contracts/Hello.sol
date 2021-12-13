// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

contract Hello {
  string private _message = "";

  constructor(string memory __message) {
    _message = __message;
  }
}
