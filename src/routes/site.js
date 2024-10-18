const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'uploads', // Tên thư mục trên Cloudinary
//         allowed_formats: ['jpg', 'png', 'jpeg'], // Các định dạng cho phép
//     },
// });

// const storage = multer.diskStorage({
//     destination: function (req, files, cb) {
//         cb(null, 'uploads');
//     },
//     filename: function (req, files, cb) {
//         cb(null, Date.now() + files.originalname);
//     },
// });
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Optional folder name in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"], // Allowed image formats
  },
});

const upload = multer({ storage: storage });

router.get("/product/:slug", siteController.getProduct);
router.post("/order", siteController.order);
router.put("/user/order/:id", siteController.updateOrder);
router.delete("/user/order/:id", siteController.deleteOrder);
router.get("/user/manage-order", siteController.getListOrder);
router.post("/user/product/:id/comment", siteController.postComment);
router.get("/user/product/:id/comment", siteController.getListComment);
router.post(
  "/user/product/:id",
  upload.fields([
    { name: "imageProducts[]", maxCount: 10 },
    { name: "imagesComment1[]", maxCount: 4 },
    { name: "imagesComment2[]", maxCount: 4 },
    { name: "imagesComment3[]", maxCount: 4 },
    { name: "imagesComment4[]", maxCount: 4 },
    { name: "imagesComment5[]", maxCount: 4 },
    { name: "imagesComment6[]", maxCount: 4 },
  ]),
  siteController.postProduct
);
// router.post('/user/product/:id', upload.array('imagesComment[]', 10), siteController.postProduct);

// router.post('/user/product/:id', siteController.postProduct);

router.get("/", siteController.home);

module.exports = router;
