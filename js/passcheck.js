var input;
var result_page;

$("#password_input").keyup(value_check);

function init() {
	input = $("#password_input").val();
	charInput = input.split("");
	result_page = $("result");
}

function value_check() {
	init();
	result_page.html(charInput).addClass("default");
	
}