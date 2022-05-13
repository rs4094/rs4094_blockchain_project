pragma solidity ^0.8.0;

contract RouletteWheel{

    //uint for positive values of roulette wheel numbers and positive denominations for betting
    uint[37] public roulette_values = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 32, 10, 5,
                                       24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29,
                                       7, 28, 12, 35, 3, 26]; //green, red, black, red, ...
    string[] public previous_colors;
    uint public number_of_spins = 0;
    uint public current_bet = 0;
    uint public min_bet = 1;
    uint public max_bet = 10;
    address public dealer;
    address public player = 0x7b0DEbAa7EefF2c321809aD702452a5eC6D97b8A;

    function Dealer() public {
       dealer = msg.sender;
    }

    struct Player{
        uint color_selected; //0 for black, 1 for red, 2 for green (0)
        uint bet;
        uint[] bet_history;
    }

    mapping(address => Player) public player_metadata;

   function place_bet(uint color) public payable {
       assert(color == 0 || color == 1 || color == 2);
       assert((msg.value >= min_bet) && (msg.value <= max_bet));
       
       player_metadata[msg.sender].color_selected = color;
       player_metadata[msg.sender].bet = msg.value;
       player_metadata[msg.sender].bet_history.push(msg.value);
       number_of_spins += 1;
       current_bet += msg.value;
       payable(dealer).transfer(msg.value); 
   }   

   function random() public view returns (uint) {
       uint randomHash = uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp)));
       return (randomHash % 37);
   }

    function spin_wheel() public {
        uint index = random();
        uint color_landed = 0;
        if (index == 0){
            color_landed = 0;
            previous_colors.push("Green");
        }
        else if (index % 2 == 1){
            color_landed = 1;
            previous_colors.push("Red");
        }
        else {
            color_landed = 2;
            previous_colors.push("Black");
        }
        payout(color_landed);
    }

    function payout(uint color_landed) public returns (uint) {
        if (player_metadata[msg.sender].color_selected == color_landed) {
            payable(msg.sender).transfer(2*player_metadata[msg.sender].bet);
        }
        delete player_metadata[msg.sender];
        current_bet = 0;
        return color_landed;
    }

    fallback() external payable {}
}