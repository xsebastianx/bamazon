var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon"
});

connection.connect(function(err){
    if(err)throw err;
    console.log("Connected as id" + connection.threadId);    
});

var displayProducts = function(){
    const query = "SELECT * FROM products";
    connection.query(query, function(err, res){
        if(err) throw err;
        var displayTable = new Table ({
            head: ["Item ID", "Product", "Department", "Price", "Quantity"],
            colWidths: [10,25,25,10,14]
        });
        for(var i = 0; i < res.length; i++){
            displayTable.push(
                [res[i].item_id,res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity] 
            );
        }
        console.log(displayTable.toString());
        purchasePrompt();
    });
}

function purchasePrompt(){
    inquirer.prompt([
    {
        name: "ID",
        type: "input",
        message: "Enter ID of Item you would like to buy.",
        filter: Number
    },
    { 
        name:"Quantity",
		type:"input",
		message:"Enter quantity of item you would like to buy.",
		filter: Number
    },
    ]).then(function(answers){
        const quantityNeeded = answers.Quantity;
        const IDrequested = answers.ID;
        purchaseOrder(IDrequested, quantityNeeded)
    });
};

function purchaseOrder(ID, amtNeeded){
    connection.query('SELECT * FROM products WHERE item_id = ' + ID, function(err,res){
        if(err){console.log(err)};
        if(amtNeeded <= res[0].stock_quantity){
            var totalCost = res[0].price * amtNeeded;
            console.log("Order is in stock.");
            console.log("Total cost for " + amtNeeded + " " +res[0].product_name + " is " + totalCost);

            connection.query("UPDATE products SET stock_quantity = stock_quantity - " + amtNeeded + "WHERE item_id = " + ID);
        } else{
            console.log("Insufficient quantity, sorry we do not have enough " + res[0].product_name + "to complete your order.");     
        };
        displayProducts();
    });
};

displayProducts();
