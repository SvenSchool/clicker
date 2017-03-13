
$(document).ready(function() {
	$(".toggle-menu").on("click", function() {
		$(".menu").toggleClass("menu-shown");
	});

	$(".prevdef").on("click", function(e) {
		e.preventDefault();
	});

	$(".item").on("click", function(e) {
		Creator.buyItem($(this).data("item"));
	});

	$("#sprite").on("click", function() {
		Creator.clickButton();
	});

	Creator.startTimer();
});


// The game:
var Creator = {
	// Months
	monthDuration : 5000,
	month 				: 1,

	// Variables affected by gameplay
	money 				: 0.00,														// Revenue saved up. Spend to buy upgrades.
	views 				: 0,															// Views accumulated over time. Affect monthly revenue.
	revenue 			: 0.00,														// Last month's revenue earned.

	cursor : {
		vpc : 1
	},

	items : {
		"assist" : {
			name 						: "Assistent Producer",
			id 							: "assist",
			production			: 0.5,
			amount 					: 0,
			buy_cost 				: 15,
			type 						: "employee"
		},

		"editor" : {
			name 						: "Editor",
			id 							: "editor",
			production			: 2,
			amount 					: 0,
			buy_cost 				: 37.5,
			type 						: "employee"
		},

		"managr" : {
			name 						: "Manager",
			id 							: "managr",
			production			: 5.5,
			amount 					: 0,
			buy_cost 				: 125,
			type 						: "employee"
		},

		"audioq" : {
			name 						: "Audio Quality",
			id 							: "audioq",
			production			: 5.5,
			amount 					: 0,
			buy_cost 				: 50,
			type 						: "investment"
		},

		"videoq" : {
			name 						: "Video Quality",
			id 							: "videoq",
			production			: 5.5,
			amount 					: 0,
			buy_cost 				: 87.5,
			type 						: "investment"
		},

		"buyview" : {
			name 						: "Buy Views",
			id 							: "buyview",
			production			: 5.5,
			amount 					: 0,
			buy_cost 				: 500,
			type 						: "sellout"
		},
	},

	startTimer : function() {
		$("#prog")
			.css("width", "0px")
			.animate({
				width: "100%"
			}, Creator.monthDuration,
				"linear",
				function() {
					// Calculate revenue
					Creator.calcRev();

					// Re-initiate timer
					Creator.startTimer();
				});
	},

	clickButton : function() {
		Creator.change.views(Creator.cursor.vpc);
	},

	buyItem : function(item) {
		item = Creator.items[item];
		if (Creator.money >= item.buy_cost) {
			// User can buy selected item, increase cost + add amount + slightly lower production
			var num = $("[data-item='"+item.id+"']").parent().find("#cost > .number").text();
			console.log(num);
		} else {
			console.log("You need $"+(item.buy_cost - Creator.money).toFixed(2)+" more to buy "+item.name+"!");
		}
	},

	calcRev : function() {
		var cRev = (Creator.views / 100000) * (5.17 * 100);

		Creator.change.revenue(cRev);
		Creator.change.money(cRev);
	},

	change : {
		views : function(amount) {
			Creator.views += amount;
			Creator.update.views();
		},

		money : function(amount) {
			nMoney = parseFloat(Creator.money);

			var cMoney = amount + nMoney;

			Creator.money = cMoney;
			Creator.update.money();
			Creator.update.title();
		},

		revenue : function(rev) {
			Creator.revenue = rev.toFixed(2);
			Creator.update.revenue();
		}
	},

	update : {
		views : function() {
			$("#views .number").text(Creator.views);
		},

		money : function() {
			$("#income .number").text(Creator.money.toFixed(2));
		},

		revenue : function() {
			$("#revenue .number").text(Creator.revenue);
		},


		title : function() {
			document.title = "$" + Creator.money.toFixed(2) + " · Creator"
		}
	}
}