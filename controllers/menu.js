const menu = require("../models/menu");

exports.getMenu = (req, res) =>{ 
    let filter={restaurantName:req.params.rName}
        menu.find(filter)
        .then(result=>{
            console.log(result)
            res.status(200).json({
                message: `menu`,
                data: result
            })
        })
        .catch((error) => {
          res.status(404).json({ message: "error in db" });
        });
    }
    