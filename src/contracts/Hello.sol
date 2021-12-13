// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

contract Hello {
  string private _message = "";

  event SetMessage(address setter, string newMessage);

  constructor(string memory __message) {
    _message = __message;
  }

  function getMessage() external view returns (string memory) {
    return _message;
  }

  function setMessage(string memory __message) external {
    _message = __message;
    emit SetMessage(msg.sender, _message);
  }
}
