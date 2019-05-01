const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const Mongoose = require("mongoose");

router.get("/items", (req, res, next)=>{
    //return all items
  const items = Item.find({}, (err, items)=>{
    if(err){
        console.log(err);
    }else{
        res.status(200).json({
            data: items
        });
    }
})
   
});

router.get("/item/:id", (req, res, next) => {
  
  let id = req.params.id;
 
  let item = Item.findById(id, (err, item) => {
    if(err){
      res.status(400).json({
        message: "There was an error fetching the document",
        errorMessage: err.errorMessage
      })
    }else{
      res.status(200).json({
        message: "Item found",
        item: item
      })
    }
  })

})


//add an item
router.post("/items", (req, res, next) => {
   console.log(req.body);

   let newitem = new Item({
     _id: new Mongoose.Types.ObjectId(),
     name :req.body["name"],
     image: req.body["image"],
     description: req.body["description"],
     amount: req.body["amount"]
   });
   
   newitem.save((err) => {
     if(err){
       res.status(400).json({
         message: "The Item was not saved",
         errorMessage : err.message
      })
     }else{
       res.status(201).json({
         message: "Item was saved successfully"   
      })
     }
   })

});

router.put("/item/:id", (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);
  let updatedItem = Item.findByIdAndUpdate(req.params.id, {$set : {
    name: req.body.name,
    description: req.body.description,
    amount: req.body.amount,
    image: req.body.image
  }}, (err, item) => {
    if(err){
      res.status(400).json({
        message: "The Item was not saved",
        errorMessage : err.message
     })
    }else{
      res.status(200).json({
        message: "Item was updated successfully",
        item: item   
     });
    }
  })

});

router.delete("/item/:id", (req, res, next) => {
 
  let id = req.body.id;
  console.log(id);
  
  
  let itemToDelete = Item.deleteOne({_id: id}, (err) => {
    if(err){
      res.status(404).json({
        message: "Item was not found",
      });
    }else{
      res.status(200).json({
        message: "Item was deleted successfully",
     
      });
    }
    
  })
   
 });

module.exports = router;