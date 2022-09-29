const mealTypes = require("../models/mealTypes");

exports.getMealTypes = (req, res) =>{
    
        mealTypes.find()
        .then(result=>{
            console.log(result)
            res.status(200).json({
                message: `mealTypes`,
                data: result
            })
        })
        .catch((error) => {
          res.status(404).json({ message: "error in db" });
        });
    }
    
