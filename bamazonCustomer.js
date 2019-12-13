const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password: 'password',
    database: 'bamazon'

});

function displayProducts(){
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        console.log("Welcome to Bamazon, can I take your order?")
        console.log("-------------------------------------------------------------------------------")

        for(var i = 0; i<res.length;i++){
            console.log("ID: " + res[i].item_id + " | " + "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity: " + res[i].stock_quantity);
            console.log("------------------------------------------------------------------------------------------") 
        }

        console.log(' ');
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Please enter the ID of the product you would like to purchase.",
                validate: function(value){
                    if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                        return true;
                      } else{
                        return false;
                      }
                }
            },
            {
                type: "input",
                name: "qty",
                message: "Please enter the amount you would like to purchase.",
                validate: function(value){
                    if(isNaN(value)){
                    return false;
                    } else{
                    return true;
                    }
                }
            }
        ]).then(function(answers){
            const quantityNeeded = answers.qty;
            const idRequested = answers.id;
            purchaseOrder(idRequested, quantityNeeded);
        });
    });

    function purchaseOrder(id, amtNeeded){
        connection.query('SELECT * FROM products WHERE item_id = ' + id, function(err, res){
            if(err){console.log(err)};
            if(amtNeeded <= res[0].stock_quantity){
                const totalCost = res[0].price * amtNeeded;
                console.log("Your order is in stock!");
                console.log("Your total cost for " + amtNeeded + " " + res[0].product_name + " is " + totalCost);
                connection.query('UPDATE products SET stock_quantity = stock_quantity - ' + amtNeeded + " WHERE item_id = " + id);
            } else{
                console.log("Quantity not in stock.  Please make another order");
            };
            displayProducts();
        });
    };
};

displayProducts();