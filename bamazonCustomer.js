const inquirer = require('inquirer');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password: '',
    database: 'bamazon'

});

function start (){
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        console.log('Welcome to Bamazon');
        console.log('____________________________________________');
        for(var i = 0; i<res.length;i++){
            console.log("ID: " + res[i].item_id + " | " +  "Product: " + res[i].product_name + " | " + "Department: " + res[i].department_name + " | " + "Price: " + res[i].price + " | " + "Quantity " + res[i].stock_quantity);
            console.log('____________________________________________');
        }

        console.log(' ');
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "Please select and item ID that you would like to purchase.",
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
                message: "Please indicate the amount you would like to purchase.",
                
            }
        ])
    })
}