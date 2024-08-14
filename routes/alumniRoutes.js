const express = require("express");
const router = express.Router();
const {
    getAlumnis, 
    createAlumni, 
    getAlumni, 
    updateAlumni, 
    deleteAlumni
} = require("../controllers/alumniController");
const validateToken = require("../middleware/validateTokenHandler");

// router.route("/").get(getAlumnis).post(createAlumni);
// router.route("/:id").get(getAlumni).put(updateAlumni).delete(deleteAlumni);

router.use(validateToken);
router.route("/").get(getAlumnis);
router.route("/").post(createAlumni);
router.route("/:id").get(getAlumni);
router.route("/:id").put(updateAlumni);
router.route("/:id").delete(deleteAlumni);


module.exports = router;















// const expres = require("express");
// const router = expres.Router();

// router.route("/").get((req, res)=>{
//     res.status(200).json({message: "Get All Alumis"});
// })


// module.exports = router;