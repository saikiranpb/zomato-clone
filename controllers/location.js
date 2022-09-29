const location = require("../models/location.js");

exports.getLocation = (req, res) =>{
    
    location.find()
        .then(result=>{
            console.log(result)
            res.status(200).json({
                message: `location`,
                data: result
            })
        })
        .catch((error) => {
          res.status(404).json({ message: "error in db" });
        });
    }
    
