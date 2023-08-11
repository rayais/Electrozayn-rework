const { connection } = require("../databaseconfig/config");
const { usermail } = require("./EmailTouser");
const { nodmail } = require("./email");

module.exports = {
  CreateOrder: (req, res) => {
    const {
      FirstName,
      Email,
      address,
      PhoneNumber,
      country,
      Zip,
      total_price,
      products,
    } = req.body;
    const user_id = req.params.id;
    const validate_add_or_not = false;

    console.log(req.body)

    const query = `
      INSERT INTO userorder (validate_add_or_not, FirstName, Email, address, PhoneNumber, country, Zip, total_price, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(
      query,
      [
        validate_add_or_not,
        FirstName,
        Email,
        address,
        PhoneNumber,
        country,
        Zip,
        total_price,
        user_id,
      ],
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          const orderId = result.insertId; // Get the newly inserted order ID

          // Save order items in the order_items table
          const orderItemsQuery = `
          INSERT INTO order_items (order_id, product_name, product_quantity, product_price)
          VALUES ?`;
        const orderItemsValues = products.map((product) => [
          orderId,
          product.name,
          product.quantity,
          product.cuttedPrice > 0
            ? Number(product.cuttedPrice) * Number(product.quantity)
            : Number(product.price) * Number(product.quantity),
        ]);
        
        connection.query(orderItemsQuery, [orderItemsValues], (err) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            } else {
              const updateUserQuery = `
                UPDATE user
                SET FirstName = ?, Address = ?, country = ?, Zip = ?
                WHERE id = ?
              `;
              const updateUserValues = [
                FirstName,
                address,
                country,
                Zip,
                user_id,
              ];

              connection.query(
                updateUserQuery,
                updateUserValues,
                (err, result) => {
                  if (err) {
                    res.status(500).send(err);
                  } else {
                    res.status(201).send("user updated and order created");
                  }
                }
              );
            }
          });
        }
      }
    );
  },
  getAllOrder: (req, res) => {
    const query = 'SELECT * FROM userorder';

    // Execute the query to fetch all orders
    connection.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },
  updateOrder: (req, res) => {
    const { id } = req.params;
    const { validate_add_or_not } = req.body;

    const query = `
        UPDATE userorder
        SET validate_add_or_not = ?
        WHERE id = ?
    `;

    // Execute the query to update the order status
    connection.query(query, [validate_add_or_not, id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while updating the order status');
        } else {
            res.status(200).send('Order status updated');
        }
    });
    // const { id } = req.params;
    // const { FirstName, Email, PhoneNumber, country, Zip } = req.body;

    // const query = `
    //       UPDATE userorder
    //       SET FirstName = ?, Email = ?, PhoneNumber = ?, country = ?, Zip = ?
    //       WHERE id = ?
    //     `;

    // Execute the query to update the order
    // connection.query(query, [FirstName, Email, PhoneNumber, country, Zip, id], (err, result) => {
    //   if (err) {
    //     console.error(err);
    //     res.status(500).send('An error occurred while updating the order');
    //   } else {
    //     res.status(200).send('info order updated');
    //   }
    // });
  },
  deleteOrder: (req, res) => {
    const { id } = req.params;

    const query = `
          DELETE FROM userorder
          WHERE id = ?
        `;

    // Execute the query to delete the order
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err)
      } else {
        res.status(200).send("order deleted");
      }
    });
  },
  confirmOrder: async (req, res) => {
    const { id } = req.params;

    const query = `
          UPDATE userorder
          SET validate_add_or_not = true
          WHERE id = ?
        `;

    // Execute the query to confirm the order
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        if(req.body){
          usermail(req.body)
          nodmail(req.body)
          res.status(200).send("order confirmed");

        }
        
        
      }
    });

  
  },
  getAllOrderUser: (req, res) => {
    const query = `SELECT * FROM userorder WHERE user_id = ${req.params.id}`;

    // Execute the query to fetch all orders
    connection.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },

  /*changed this api to fetch the order of every user*/
  
getOrderItems:((req,res)=>{
  const query=`SELECT uo.*, oi.product_name, oi.product_quantity, oi.product_price
  FROM userorder uo
  LEFT JOIN order_items oi ON uo.id = oi.order_id`
  connection.query(query,(err,result)=>{
    err ? res.status(500).send(err):res.status(200).send(result)
  })
})




}