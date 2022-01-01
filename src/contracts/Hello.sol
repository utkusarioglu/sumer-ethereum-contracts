// SPDX-License-Identifier: MIT

pragma solidity 0.8.4;

error ValueTooShort();
error ValueTooLong();

contract Hello {
  string private _message = "";

  event SetMessage(address setter, string newMessage);

  modifier checkMessageLength(string memory __message) {
    checkLength(__message);
    _;
  }

  constructor(string memory __message) {
    _message = __message;
  }

  function getMessage() external view returns (string memory) {
    return _message;
  }

  function checkLength(string memory __message) internal pure {
    if (bytes(__message).length < 4) {
      revert ValueTooShort();
    }
    if (bytes(__message).length > 10) {
      revert ValueTooLong();
    }
  }

  function setMessage(string memory __message)
    external
    checkMessageLength(__message)
  {
    _message = __message;
    emit SetMessage(msg.sender, _message);
  }
}
