const express = require("express");
const router = express.Router();
const siteController = require("../app/controllers/SiteController");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");

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

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: "Token không được cung cấp" });
  }

  const token = authHeader.split(" ")[1]; // Tách lấy token sau "Bearer"
  console.log(token);
  // Tiến hành xác thực token (nếu cần)
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    req.user = decoded; // Lưu thông tin người dùng vào req
    next(); // Gọi next để tiếp tục đến controller
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
}

router.post("/signup", siteController.createAccount);
router.post("/login", siteController.login);
router.get("/product/:slug", siteController.getProduct);
router.post("/order/:slug", siteController.order);
router.put("/user/order/:id", authenticateToken, siteController.updateOrder);
router.delete("/user/order/:id", siteController.deleteOrder);
router.get("/user/list-order", siteController.getListOrder);
router.get("/user/product/:id/comment", siteController.getListComment);
router.post(
  "/user/product",
  authenticateToken,
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
