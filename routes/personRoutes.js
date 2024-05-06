const express = require('express');
const router=express.Router();
const {jwtAuthMiddleware,generateToken}=require('./../jwt')
const person=require('./../models/person')

router.post('/signup',async(req,res)=>{
    try{
      const data =req.body;
    const newPerson= new person(data);
    const response= await newPerson.save()
    console.log('Data Saved')
    const payload={
      id: response.id,
      username: response.username
    }
    const token = generateToken(response.username)
   console.log("Token is:",token)
   console.log("The Payload is:",payload)
    res.status(200).json({response: response, token:token});
    }
    catch(err){
      console.log(err); 
      res.status(500).json({error:'Internal Server Error.'});
    }
    })

    router.post('/login',async(req,res)=>{
      try{
           const{username,password}=req.body;
           const user=await person.findOne({username :username})
           if(!user || !(await user.comparePassword(password) ) ){
             return res.status(401).json({error:'Invalide usernname or password'})
           }
           const payload={
            id: user.id,
            username:user.username
           }
           const token=generateToken(payload)
           res.json({token})
      }
      catch(err){
        console.error(err)
        res.status(500).json({error:'Internal Server Error'})

      }
    })
    
    router.get('/',jwtAuthMiddleware,async(req,res)=>{
     try{
      const data= await person.find();
      console.log('Data Fetched.')
      res.status(200).json(data)
     }
     catch(err){
      console.log(err)
      res.status(500).json({error:'Internal Server Error'})
       
     }
    })

  router.get('/profile',jwtAuthMiddleware,async(req,res)=>{
    try{
      const userData =req.user;
      console.log("User Data",userData)
      const userId=userData.id
      const user = await person.findById(userId);
      res.status(200).json({user})
    }
    catch(err){
      console.error(err)
      res.status(500).json({error:'Intrenal Server error'})
    }
  })    
    router.get('/:workType',async (req,res)=>{
        try{
         const workType=req.params.workType;
         if(workType== 'chef' || workType== 'waiter' ||workType== 'manager' )
          {
            const response=await person.find({work: workType});
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
        const personId=req.params.id;
        const updatePersonData=req.body
        const response=await person.findByIdAndUpdate(personId,updatePersonData,{
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
        const personId=req.params.id;
        const response=await person.findByIdAndDelete(personId)
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