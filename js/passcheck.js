var strInput;
var charInput;
var results;

var session_score = 0;

var score = {};
score.base = 10;
score.current_upper = 0;
score.current_lower = 0;
score.current_digit = 0;
score.diff = 0;

var passCheck = {};
passCheck.minimum = 8;

function init() {
	strInput = $("#password_input").val();
	charInput = strInput.split("");
	
	score.current_upper = 0;
	score.current_lower = 0;
	score.current_digits = 0;
	score.diff = 0;
}

function value_checkNumberOfUppers(value){
	if (value.match(/[A-Z]/g)) {
			score.current_upper++;
	}
}

function value_checkNumberOfLowers(value){
	if (value.match(/[a-z]/g)) {
			score.current_lower++;
	}
}

function value_checkNumberOfDigits(value){
	if (value.match(/[0-9]/g)) {
			score.current_digit++;
	}
}

function calculate_score(){
	if (charInput.length >= passCheck.minimum) {
		session_score = score.base;
		
		score.diff = charInput.length - passCheck.minimum;
		session_score += (score.diff * score.diff) - 1;
	} else {
		session_score = 0;
	}
	
	for (i = 0; i < charInput.length; i++){
		value_checkNumberOfUppers(charInput[i]);
		value_checkNumberOfLowers(charInput[i]);
		value_checkNumberOfDigits(charInput[i]);
	}
	
	if (score.current_upper > 0 && score.current_lower > 0 && score.current_digit > 0){
		session_score += 130;
	} else if ((score.current_upper > 0 && score.current_lower > 0) || (score.current_lower > 0 && score.current_digits > 0) || (score.current_upper > 0 && score.current_digits > 0)){
		session_score += 35;
	}
}

function display_result() {
	results = $('#session_results');
	
	if (charInput.length < passCheck.minimum){
		results.html("Should be more than 8");
	} else if (session_score <= 50){
		results.html("Weak");
	} else if (session_score > 50 && session_score <= 140){
		results.html("Not bad");
	} else {
		results.html("Good");
	}
	$('#session_details').html("score: " + session_score + " length: " + charInput.length);
}

function main() {
	init();
	
	calculate_score();
	
	display_result();
}