const restaurant = require("../models/restaurant");



exports.getRestaurantByCityID=(req,res)=>{

  let filter={ city : req.params.cID}
  restaurant.find(filter)
  .then(result=>{
    console.log(result)
      res.status(200).json({
      message:`Restaurants of city: fetched successfully`,
      data: result
    })
  })
  .catch((error) => {
    res.status(404).json({ message: "error in db" });
  });

}


exports.getRestaurantByName=(req,res)=>{

  let filter={ name : req.params.Name}
  restaurant.find(filter)
  .then(result=>{
    console.log(result)
      res.status(200).json({
      message:`Restaurant fetched successfully`,
      data: result
    })
  })
  .catch((error) => {
    res.status(404).json({ message: "error in db" });
  });

}

exports.getRestaurant = (req, res) => {
  let temp = {};

  if (req.body.city_id) {
    temp.city= req.body.city_id;
  }

  if (req.body.cuisine && req.body.cuisine.length > 0) {
    temp["Cuisine.name"] = { $in: req.body.cuisine };
  }
  // if(req.body.type && req.body.type.length>0){
  //   temp["type.name"]={ $in: req.body.type };
  // }

  if (req.body.lcost && req.body.hcost) {
    if (req.body.lcost == 0) {
      temp.cost = { $lte: req.body.hcost };
    } else {
      temp.cost = {
        $lt: req.body.hcost,
        $gt: req.body.lcost,
      };
    }
  }
  let sort = 1;
  if (req.body.sort) {
    sort = req.body.sort;
  }
  restaurant.find(temp).limit(2).skip(2 *(req.params.pageNo - 1)).sort({ cost: sort })
    .then((result) => {
      console.log(result);

      restaurant.find(temp).count((err,count)=>{
        if(err) console.log(err)
        else
          res.status(200).json({
            message: "Restaurant fetched",
            data: result,
            totalRecords:count
          });
      })
     
    })
    .catch((error) => {
      res.status(404).json({ message: "error in db" });
    });
};

