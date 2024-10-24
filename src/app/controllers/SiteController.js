const Order = require("../models/Order");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const Product = require("../models/Product");
const Rating = require("../models/Rating");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const cloudinary = require("cloudinary").v2;

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: "dlkm9tiem",
  api_key: "778982786272933",
  api_secret: "fTrhzosPAPmkI__Lj6qcyPljDeQ",
});

class SiteController {
  async home(req, res, next) {
    const productsImage = [
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715619497/yj5ya4u0yeh92a3gnzen.png",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715585909/ita3qa2qphxlqorrirua.png",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715614315/n2xklchaq8z9g2fckfjm.png",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715615639/nkwhopkcp4crq5mf6rzp.png",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715616830/axpt6vgkiiomazsafkzc.png",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715618759/nnoqioemhjkfuyodmxh1.png",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715618758/z4kbyonwjvbsg3fjk63i.png",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715694966/pivkp2zrlaes8i4hf6yd.jpg",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695175/jlfnqxhdfyocc27yloyw.jpg",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715532647/clax0wysy6la355peige.jpg",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715532647/pfbuplzx5gdnexw6egtz.jpg",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715532648/zs5ejdbebqnordkt3d05.jpg",
      "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715532650/tfrc7pdkwioxdjen91f7.jpg",
    ];
    const product = [
      {
        image:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715532647/clax0wysy6la355peige.jpg",
        color: "Xanh",
        price: "125k",
      },
      {
        image:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715532647/pfbuplzx5gdnexw6egtz.jpg",
        color: "Đen",
        price: "125k",
      },
      {
        image:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715532648/zs5ejdbebqnordkt3d05.jpg",
        color: "Trắng",
        price: "125k",
      },
      {
        image:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715532650/tfrc7pdkwioxdjen91f7.jpg",
        color: "Cam",
        price: "125k",
      },
      {
        image:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715713361/lfbuapotwtcsnrvbmprw.jpg",
        color: "Combo 2 quạt (màu tự chọn)",
        price: "189k",
      },
    ];

    const comment = [
      {
        avatar:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715696411/ltwg9mdpsw4k1fueavsf.jpg",
        color: "trắng",
        username: "hi***y7",
        content:
          "Mình nhận được quạt rồi. Với số tiền đó thì k đòi hỏi thời gian được lâu. Nhưng mình có thêm cục sạc dự phòng nữa nên tha hồ đi chơi dùng cho con. Còn bình thường thì được 2 tiếng nếu quạt liên tục.",
        image: [
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695593/x9s8qnxnwcw1u310ih8u.jpg",
        ],
      },
      {
        avatar:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1713437777/wdoecxbaro6aqmxq8llz.jpg",
        color: "xanh, hồng",
        username: "na***tl",
        content:
          "Quạt rất mát và êm, nên mua. Dùng được tầm 2 tiếng. Với giá này ổn mn nên mua dùng khi cúp điện",
        image: [
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695600/r97ccanmsmztyf6wiqxp.jpg",
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695599/cvmr0t6thchzalksxau6.jpg",
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695599/gtupemppyavwashklbhw.jpg",
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695598/lsuzz2iuyajspvu4bbm0.jpg",
        ],
      },
      {
        avatar:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715696412/s7ar7bn9nwnljdz511nk.jpg",
        color: "trắng",
        username: "an***nn",
        content:
          "Sản phẩm tốt, quạt rất mát kẹp ở mấy cái bàn hoặc mấy thanh kim loại nhỏ cũng được",
        image: [
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695597/h3v6nb3cp7afbwg3utfy.jpg",
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695595/pxolah5fc8bjafewc1vg.jpg",
        ],
      },
      {
        avatar:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715696410/nrzir9drzbp82drubql5.jpg",
        color: "trắng",
        username: "ng***x7",
        content:
          "Sản phẩm này mình rất ưng. Nhỏ gọn, kẹp được nhiều vị trí, không ồn, quạt mát. Thằng cu nhà mình rất thích.",
        image: [
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695594/tt4yf5qxint1aijyxz62.jpg",
        ],
      },
      {
        avatar:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1713437778/bf05zraye3nlohnic2hh.jpg",
        color: "xanh",
        username: "hu**99",
        content:
          "Shop giao đúng như quảng cáo, quạt có 3 chế độ, nhỏ mà có võ nhé, rất mát nha mn nên mua, lại được freeship nữa. Cho shop 5 sao",
        image: [
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695594/eqk5qmehmcwhgzdpeb0w.jpg",
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695593/mi6mhkqdfiseovgfahit.jpg",
        ],
      },
      {
        avatar:
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1713437781/ish7i4vyewnr6tg09lhb.jpg",
        color: "trắng",
        username: "lo***97",
        content:
          "Giao hàng siêu nhanh. Mới đặt mua hôm qua mà nay đã có hàng rồi, quạt dùng oke nha",
        image: [
          "https://res.cloudinary.com/dlkm9tiem/image/upload/v1715695592/o1uldllbuawfbrnl7mnk.jpg",
        ],
      },
    ];
    try {
      // Extract the slug from request params
      const { slug } = req.body;
      console.log(slug);

      // Find the product by slug
      const product = await Product.findOne({ slug });

      // If no product is found, return a 404 response
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // If the product is found, return it as a JSON response
      return res.status(200).json({ data: { product } });
    } catch (error) {
      // Handle any errors that occur during the query
      return res.status(500).json({ message: "An error occurred", error });
    }
    res.json({ cssPath: "home.css", comment, product, productsImage });
  }

  async uploadImagesToCloudinary(filesArray) {
    const uploadPromises = filesArray.map((file) =>
      cloudinary.uploader.upload(file.path)
    );
    return await Promise.all(uploadPromises);
  }

  async postProduct(req, res, next) {
    const productImages = req.files["imageProducts[]"] || [];
    const commentImages = [
      req.files["imagesComment1[]"] || [],
      req.files["imagesComment2[]"] || [],
      req.files["imagesComment3[]"] || [],
      req.files["imagesComment4[]"] || [],
      req.files["imagesComment5[]"] || [],
      req.files["imagesComment6[]"] || [],
    ];
    const uploadImagesToCloudinary = async (images) => {
      const uploadPromises = images.map((image) =>
        cloudinary.uploader.upload(image.path)
      );
      return await Promise.all(uploadPromises);
    };

    // Upload product images
    const uploadedProductImages =
      productImages.length > 0
        ? await uploadImagesToCloudinary(productImages)
        : [];
    const productImageUrls = uploadedProductImages.map((img) => img.url);

    // Upload comment images
    const uploadedCommentImages = await Promise.all(
      commentImages.map((images) =>
        images.length > 0 ? uploadImagesToCloudinary(images) : []
      )
    );

    const commentImageUrls = uploadedCommentImages.map((set) =>
      set.map((img) => img.url)
    );

    // Create the product
    const product = new Product({
      productName: req.body.productName,
      price: req.body.price,
      oldPrice: req.body.oldPrice,
      description: req.body.description,
      discount: req.body.discount,
      soldAmount: req.body.soldAmount,
      reviewCount: req.body.reviewCount,
      storeRevenue: req.body.storeRevenue,
      productCount: req.body.productCount,
      reviewCountStore: req.body.reviewCountStore,
      photoReviewCount: req.body.photoReviewCount,
      fiveStarCount: req.body.fiveStarCount,
      fourStarCount: req.body.fourStarCount,
      threeStarCount: req.body.threeStarCount,
      // userId: req.body.userId || product._id,
      image1: productImageUrls[0],
      image2: productImageUrls[1],
      image3: productImageUrls[2],
      image4: productImageUrls[3],
      image5: productImageUrls[4],
      image6: productImageUrls[5],
      image7: productImageUrls[6],
      image8: productImageUrls[7],
      image9: productImageUrls[8],
      image10: productImageUrls[9],
    });
    // await product.save();

    // Create ratings
    // const ratings = commentImageUrls.map((urls, index) => {
    //   return new Rating({
    //     productType: req.body[`productType${index + 1}`],
    //     comment: req.body[`comment${index + 1}`],
    //     imageRating1: urls[0],
    //     imageRating2: urls[1],
    //     imageRating3: urls[2],
    //     imageRating4: urls[3],
    //     productId: product._id,
    //     createdAt: Date.now() + 7 * 60 * 60 * 1000,
    //   });
    // });

    // Save all ratings
    // await Rating.insertMany(ratings);

    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      images: productImageUrls,
      commentImages: commentImageUrls,
    });
  }

  async getProduct(req, res, next) {
    try {
      console.log("hahah" + req.user);
      const { slug } = req.params;
      const product = await Product.findOne({ slug: slug });
      const comments = await Rating.find({ productId: product._id });

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      return res.status(200).json({ data: { product, comments } });
    } catch (error) {
      return res.status(500).json({ message: "An error occurred", error });
    }
  }

  async order(req, res, next) {
    const { slug } = req.params;
    const {
      name,
      phone,
      selectedCity,
      selectedDistrict,
      selectedWard,
      quantity,
      discount,
      totalPrice,
      typeProduct,
      tiktokShopDiscount,
    } = req.body;
    console.log(slug);
    const product = await Product.findOne({ slug: slug });
    console.log(req.body);
    const order = new Order({
      productId: product._id,
      name,
      phone,
      city: selectedCity,
      address: selectedWard + ", " + selectedDistrict + ", " + selectedCity,
      sellerId: "670e3a8cae0f3baeebf5de2c",
      quantity,
      discount,
      tiktokShopDiscount,
      totalPrice,
      typeProduct,
      createdAt: Date.now() + 7 * 60 * 60 * 1000,
    });
    console.log(order);
    // order
    //   .save()
    //   .then(() => res.redirect("/xac-nhan-dat-hang"))
    //   .catch(next);
    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
    });
  }
  getListOrder(req, res, next) {
    const perPage = 20; // Số lượng đơn hàng trên mỗi trang
    const page = req.query.page || 1; // Trang hiện tại, mặc định là trang 1

    // Đếm tổng số bản ghi trong cơ sở dữ liệu
    Order.countDocuments({ userAdmin: "Tiến" })
      .then((totalOrders) => {
        // Tính toán số lượng trang
        const totalPages = Math.ceil(totalOrders / perPage);
        // Tìm các đơn hàng trong trang hiện tại
        Order.find({ userAdmin: "Tiến" })
          .sort({ createdAt: -1 })
          .skip((page - 1) * perPage) // Bỏ qua (skip) các đơn hàng ở trang trước
          .limit(perPage) // Giới hạn số lượng đơn hàng trên mỗi trang
          .then((orders) => {
            res.render("admin/order", {
              orders: mutipleMongooseToObject(orders),
              currentPage: Number(page), // Trang hiện tại
              hasNextPage: page < totalPages, // Kiểm tra xem có trang tiếp theo không
              hasPreviousPage: page > 1, // Kiểm tra xem có trang trước đó không
              nextPage: +page + 1, // Trang tiếp theo
              previousPage: +page - 1, // Trang trước đó
              lastPage: totalPages, // Tổng số trang
            });
          })
          .catch(next);
      })
      .catch(next);
  }

  deleteOrder(req, res, next) {
    Order.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  updateOrder(req, res, next) {
    Order.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("back"))
      .catch(next);
  }

  getListComment(req, res, next) {
    Rating.find({ productId: req.params.id }).then((cmt) => res.json(cmt));
  }

  async createAccount(req, res, next) {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Check if user already exists
    const userExists = await User.findOne({ email: email });
    console.log(userExists);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    // Save user
    const newUser = new User({ name, email, password: hashedPassword }); // Tạo một instance mới
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email });
    console.log(user);

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    // Compare password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "30d", // Thay đổi thành 30 ngày
      }
    );

    const now = new Date(); // Thời gian hiện tại
    const expirationDate = new Date(now); // Tạo bản sao của thời gian hiện tại
    expirationDate.setDate(now.getDate() + 30);

    res.json({
      message: "Login successful",
      token,
      role: user.role,
      expiration: expirationDate.toISOString(),
    });
  }
}

module.exports = new SiteController();
