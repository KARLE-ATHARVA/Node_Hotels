const express = require('express');
const router=express.Router();
const MenuItem=require('./../models/MenuItem')
router.post('',async(req,res)=>{
    try{
      const data =req.body;
    const newMenu= new MenuItem(data);
    const response= await newMenu.save()
    console.log('Data Saved')
    res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({error:'Internal Server Error.'});
    }
    })
 router.get('',async(req,res)=>{
      try{
       const data= await MenuItem.find();
       console.log('Data Fetched.')
       res.status(200).json(data)
      }
      catch(err){
       console.log(err)
       res.status(500).json({error:'Internal Server Error'})
        
      }
     })
router.get('/:tasteType',async(req,res)=>{
    try{
        const tasteType=req.params.tasteType;
        if(tasteType== 'Sweet' || tasteType== 'Spicy' ||tasteType== 'Sour' )
         {
           const response=await MenuItem.find({taste: tasteType});
           console.log('Response Fetched')
           res.status(200).json(response)
 
         } 
         else{
           res.status(404).json({error:'Invalid Work Type'})
         }    
       }
       catch(err){
         console.log(err)
        res.status(500).json({error:'Internal Server Error'})
       }
       })
router.put('/:id',async(req,res)=>{
        try{
            const MenuItemId=req.params.id;
            const updateMenuData=req.body
            const response=await MenuItem.findByIdAndUpdate(MenuItemId,updateMenuData,{
                new:true,
                runValidators:true,
            })
            if(!response){
                return res.status(404).json({error:'Invalid Id'})
            }    
            
            console.log('Data Updated.')
            res.status(200).json(response)
        }
        catch(err){
            console.log(err)
           res.status(500).json({error:'Internal Server Error'})
          }
    })
router.delete('/:id',async(req,res)=>{
        try{
            const MenuItemId=req.params.id;
            const response=await MenuItem.findByIdAndDelete(MenuItemId)
            if(!response){
                return res.status(404).json({error:'Invalid Id'})
            }    
            
            console.log('Data Deleted.')
            res.status(200).json(response)
        }
        catch(err){
            console.log(err)
           res.status(500).json({error:'Internal Server Error'})
          }
    })
module.exports=router