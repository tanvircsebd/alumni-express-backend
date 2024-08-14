const asyncHandler = require("express-async-handler");
//const Alumni = require("../models/alumniModel");
const Alumni = require("../models/alumniModel");

//@desc Get All alumnis
//@route GET /api/alumnis
//@access private

const getAlumnis = asyncHandler(async (req, res)=>{
    // console.log("here I am",req.user.id);
    const alumnis = await Alumni.find({user_id: req.user.id});
    res.status(200).json(alumnis);

    // console.log("The request body is: ", req.body);
    // const {name, email, phone} = req.body;
    // if(!name || !email || !phone){
    //     res.status(400);
    //     throw new Error("All fields are mandatory");
    // }
   // res.status(200).json({message: "Get All Alumis"});    
})


//@desc Create New alumni
//@route POST /api/alumnis
//@access private

const createAlumni = asyncHandler(async (req, res)=>{
    console.log("Clicked")
    console.log("The request body is: ", req.body);
    const {name, email, phone, nNumber, department, session} = req.body;
    if(!name || !email || !phone || !nNumber|| !department|| !session){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const alumni = await Alumni.create({
        name,
        email,
        phone,
        nNumber,
        department,
        session,
        user_id: req.user.id
    });
    res.status(201).json(alumni);    
})

//@desc Get an alumni
//@route GET /api/alumnis/:id
//@access private

const getAlumni = asyncHandler(async(req, res)=>{
    const alumni = await Alumni.findById(req.params.id);
    if(!alumni){
        res.status(404);
        throw new Error("Alumni not found");
    }
    // res.status(200).json({message: `Get Alumi for ${req.params.id}`});
    
    res.status(200).json(alumni);    
})

//@desc Update an alumni
//@route PUT /api/alumnis/:id
//@access private

const updateAlumni = asyncHandler(async(req, res)=>{
    const alumni = await Alumni.findById(req.params.id); 
    // console.log(alumni);
    if(!alumni){
        res.status(404);
        throw new Error("Alumni not found");
    }

    if(alumni.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other alumnis");
    }
    const updatedAlumni = await Alumni.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedAlumni);    
    //const alumni = await Alumni.findById(req.params.id);

})

//@desc Delete an alumni
//@route DELETE /api/alumnis/:id
//@access private

const deleteAlumni = asyncHandler(async (req, res) => {
    // Find the alumni by ID
    const alumni = await Alumni.findById(req.params.id);

    if (!alumni) {
        res.status(404);
        throw new Error("Alumni not found");
    }

    // Check if the logged-in user is authorized to delete this alumni
    if (alumni.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete other alumni");
    }

    // Delete the specific alumni record
    await Alumni.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Deleted successfully" });
});

// const deleteAlumni = asyncHandler(async (req, res)=>{
//     console.log("tets")
//    if(alumni.user_id.toString() !== req.user.id){
//         res.status(403);
//         throw new Error("User don't have permission to update other alumnis");
//     }
//    //needs change 
//    //const alumni =  await Alumni.findByIdAndDelete(req.params.id);
//     //console.log("The request body for delete is: ", Alumni.findById(req.params.id));
//     console.log("here it is: ", alumni);
//     // if (!alumni) {
//     //     res.status(404);
//     //     throw new Error("not found");
//     // }
//     await Alumni.findOneAndDelete(req.params.id, {_id: req.params.id});
//     res.status(200).json({ message: "deleted successfully" });

//     // if(alumni){
//     //     await Alumni.remove();
//     //     res.status(200).json(alumni);
//     // }else{
//     //     res.status(404);
//     //     throw new Error("Alumni not found");
//     // }

    
// })

// const deleteAlumni = asyncHandler(async(req, res)=>{
//     const alumni = await Alumni.findById(req.params.id); 
//     if(!alumni){
//         res.status(404);
//         throw new Error("Alumni not found");
//     }
//     Alumni.remove();
//     res.status(200).json(alumni);    
//     // res.status(200).json(updatedAlumni);    
//     //const alumni = await Alumni.findById(req.params.id);

// })

module.exports = {
    getAlumnis, 
    createAlumni, 
    getAlumni, 
    updateAlumni, 
    deleteAlumni
};