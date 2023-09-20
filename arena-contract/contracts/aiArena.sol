// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract AIArena is Initializable{

    address public owner;
    uint8 public TicketPerEther;
    uint8 public WinMultiplier;

    function initialize() public initializer {
        TicketPerEther = 5;
        WinMultiplier = 2;
        owner = tx.origin;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    mapping(address => uint256) public ticket;
    mapping(address => uint256) public deposit;


   function Deposit(uint amount) public payable {
        require(amount > 0, "Amount must be greater than 0");
        require(address(msg.sender).balance >= amount, "Insufficient balance");
        require(msg.value == amount, "Sent ether does not match the specified amount");

        deposit[msg.sender] += amount;
        uint temp = amount * TicketPerEther / 1 ether;
        ticket[msg.sender] += temp;

    }

    function setTicketPerEther(uint8 _TicketPerEther) public onlyOwner{
        TicketPerEther = _TicketPerEther;
    }


    function setWinMultiplier(uint8 _WinMultiplier) public onlyOwner{
        WinMultiplier = _WinMultiplier;
    }


    /// @notice Don't be a fu*king stupid by trying to waste your own ticket.

    function Play(uint _ticket,bool result) public {
        require(_ticket > 0, "Ticket must be greater than 0");
        require(_ticket <= ticket[msg.sender], "Insufficient ticket");
        TicketUsed(msg.sender,_ticket);
        if(result) ticket[msg.sender] += _ticket*WinMultiplier;
     
    }

    function TicketUsed(address player,uint tickets) internal {
        require(ticket[player] > 0, "You don't have any ticket");
        ticket[player] -= tickets;
    }

    function Claim(address user) public {
        require(ticket[user] > 0, "You don't have any ticket");
        uint amount = (ticket[user] * 1 ether) / TicketPerEther ;
        require(address(this).balance >= amount, "Insufficient balance");
        ticket[user] = 0;
        payable(user).transfer(amount);
    }

    function getRemovalReward(address user) public view returns(uint){
        require(ticket[user] > 0, "You don't have any ticket");
        return ticket[user] * 1 ether / TicketPerEther;
    }

    function Withdraw(uint amount) public payable onlyOwner{
        require(amount > 0, "Amount must be greater than 0");
        require(address(this).balance >= amount, "Insufficient balance");
        require(msg.value == amount, "Sent ether does not match the specified amount");
        payable(msg.sender).transfer(amount);
    }

    function WithdrawAll() public payable onlyOwner{
        require(address(this).balance > 0, "Insufficient balance");
        payable(msg.sender).transfer(address(this).balance);
    }

}


