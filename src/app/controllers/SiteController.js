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
    const imageShop = req.files["imageShop"][0].path || null;
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
    const imageShopUrl = imageShop
      ? await cloudinary.uploader.upload(imageShop)
      : "";

    const commentImageUrls = uploadedCommentImages.map((set) =>
      set.map((img) => img.url)
    );

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
      userId: req.user.id,
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
      imageShop: imageShopUrl?.url,
      shop: req.body.nameShop,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
    });

    const avatarUrls = [
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949742/r1ukq8zpzf3m6zkthuta.jpg",
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949742/kig4vyryp1zqltnesqd2.jpg",
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949742/snmaziiot7yk7jgccafx.jpg",
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949741/jdiujo1py6nefrxvhzh2.jpg",
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949742/xj2qglt6gjk7joxets8v.jpg",
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949742/ap0b05vyzovu5akxiwzq.jpg",
    ];
    const usernames = ["N**g", "L**0", "H**e", "T**g", "P**5", "T**h"];

    const ratings = commentImageUrls.map((urls, index) => {
      return new Rating({
        productType: req.body[`productType${index + 1}`],
        comment: req.body[`comment${index + 1}`],
        imageRating1: urls[0],
        imageRating2: urls[1],
        imageRating3: urls[2],
        imageRating4: urls[3],
        avatar: avatarUrls[index],
        username: usernames[index],
        productId: product._id,
        createdAt: Date.now() + 7 * 60 * 60 * 1000,
      });
    });

    // Save all ratings
    await Promise.all([product.save(), Rating.insertMany(ratings)]);

    return res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      images: productImageUrls,
      imageShop: imageShop,
      commentImages: commentImageUrls,
    });
  }

  async editProduct(req, res, next) {
    const productOfMember = await Product.findOne({
      slug: req.params.slug,
      userId: req.user.id,
    });
    if (!productOfMember)
      return res.status(500).json({ message: "An error occurred" });
    const image1 = req.files["image1"]?.[0] || null;
    const image2 = req.files["image2"]?.[0] || null;
    const image3 = req.files["image3"]?.[0] || null;
    const image4 = req.files["image4"]?.[0] || null;
    const image5 = req.files["image5"]?.[0] || null;
    const image6 = req.files["image6"]?.[0] || null;
    const image7 = req.files["image7"]?.[0] || null;
    const image8 = req.files["image8"]?.[0] || null;
    const image9 = req.files["image9"]?.[0] || null;
    const image10 = req.files["image10"]?.[0] || null;
    const imageShop = req.files["imageShop"]?.[0] || null;
    const imagesComment1 = req.files["imagesComment1[]"] || [];
    const imagesComment2 = req.files["imagesComment2[]"] || [];
    const imagesComment3 = req.files["imagesComment3[]"] || [];
    const imagesComment4 = req.files["imagesComment4[]"] || [];
    const imagesComment5 = req.files["imagesComment5[]"] || [];
    const imagesComment6 = req.files["imagesComment6[]"] || [];
    const uploadImage = (image) => {
      if (!image) return "";
      return cloudinary.uploader.upload(image.path);
    };
    const [
      imageproduct1,
      imageproduct2,
      imageproduct3,
      imageproduct4,
      imageproduct5,
      imageproduct6,
      imageproduct7,
      imageproduct8,
      imageproduct9,
      imageproduct10,
      imageShopCloud,
      firstImageIncomment1,
      secondImageIncomment1,
      thirdImageIncomment1,
      fourthImageIncomment1,
      firstImageIncomment2,
      secondImageIncomment2,
      thirdImageIncomment2,
      fourthImageIncomment2,
      firstImageIncomment3,
      secondImageIncomment3,
      thirdImageIncomment3,
      fourthImageIncomment3,
      firstImageIncomment4,
      secondImageIncomment4,
      thirdImageIncomment4,
      fourthImageIncomment4,
      firstImageIncomment5,
      secondImageIncomment5,
      thirdImageIncomment5,
      fourthImageIncomment5,
      firstImageIncomment6,
      secondImageIncomment6,
      thirdImageIncomment6,
      fourthImageIncomment6,
    ] = await Promise.all([
      uploadImage(image1),
      uploadImage(image2),
      uploadImage(image3),
      uploadImage(image4),
      uploadImage(image5),
      uploadImage(image6),
      uploadImage(image7),
      uploadImage(image8),
      uploadImage(image9),
      uploadImage(image10),
      uploadImage(imageShop),
      uploadImage(imagesComment1?.[0]),
      uploadImage(imagesComment1?.[1]),
      uploadImage(imagesComment1?.[2]),
      uploadImage(imagesComment1?.[3]),
      uploadImage(imagesComment2?.[0]),
      uploadImage(imagesComment2?.[1]),
      uploadImage(imagesComment2?.[2]),
      uploadImage(imagesComment2?.[3]),
      uploadImage(imagesComment3?.[0]),
      uploadImage(imagesComment3?.[1]),
      uploadImage(imagesComment3?.[2]),
      uploadImage(imagesComment3?.[3]),
      uploadImage(imagesComment4?.[0]),
      uploadImage(imagesComment4?.[1]),
      uploadImage(imagesComment4?.[2]),
      uploadImage(imagesComment4?.[3]),
      uploadImage(imagesComment5?.[0]),
      uploadImage(imagesComment5?.[1]),
      uploadImage(imagesComment5?.[2]),
      uploadImage(imagesComment5?.[3]),
      uploadImage(imagesComment6?.[0]),
      uploadImage(imagesComment6?.[1]),
      uploadImage(imagesComment6?.[2]),
      uploadImage(imagesComment6?.[3]),
    ]);

    const product = {
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
      shop: req.body.shop,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
    };
    if (imageShopCloud) {
      product.imageShop = imageShopCloud.url;
    }
    if (imageproduct1) {
      product.image1 = imageproduct1.url;
    }
    if (imageproduct2) {
      product.image2 = imageproduct2.url;
    }
    if (imageproduct3) {
      product.image3 = imageproduct3.url;
    }
    if (imageproduct4) {
      product.image4 = imageproduct4.url;
    }
    if (imageproduct5) {
      product.image5 = imageproduct5.url;
    }
    if (imageproduct6) {
      product.image6 = imageproduct6.url;
    }
    if (imageproduct7) {
      product.image7 = imageproduct7.url;
    }
    if (imageproduct8) {
      product.image8 = imageproduct8.url;
    }
    if (imageproduct9) {
      product.image9 = imageproduct9.url;
    }
    if (imageproduct10) {
      product.image10 = imageproduct10.url;
    }

    await Product.updateOne({ slug: req.params.slug }, product);

    const comments = await Rating.find({ productId: productOfMember._id });
    const avatarUrls = [
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949742/r1ukq8zpzf3m6zkthuta.jpg",
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949742/kig4vyryp1zqltnesqd2.jpg",
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949742/snmaziiot7yk7jgccafx.jpg",
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949741/jdiujo1py6nefrxvhzh2.jpg",
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949742/xj2qglt6gjk7joxets8v.jpg",
      "http://res.cloudinary.com/dlkm9tiem/image/upload/v1730949742/ap0b05vyzovu5akxiwzq.jpg",
    ];
    const usernames = ["N**g", "L**0", "H**e", "T**g", "P**5", "T**h"];
    const rating1 = {
      productType: req.body.productType1,
      comment: req.body.comment1,
      avatar: avatarUrls[0],
      username: usernames[0],
    };
    if (imagesComment1.length) {
      rating1.imageRating1 = firstImageIncomment1.url || '';
      rating1.imageRating2 = secondImageIncomment1.url || '';
      rating1.imageRating3 = thirdImageIncomment1.url || '';
      rating1.imageRating4 = fourthImageIncomment1.url || '';
    }
    const rating2 = {
      productType: req.body.productType2,
      comment: req.body.comment2,
      avatar: avatarUrls[1],
      username: usernames[1],
    };
    if (imagesComment2.length) {
      rating2.imageRating1 = firstImageIncomment2.url || '';
      rating2.imageRating2 = secondImageIncomment2.url || '';
      rating2.imageRating3 = thirdImageIncomment2.url || '';
      rating2.imageRating4 = fourthImageIncomment2.url || '';
    }
    const rating3 = {
      productType: req.body.productType3,
      comment: req.body.comment3,
      avatar: avatarUrls[2],
      username: usernames[2],
    };
    if (imagesComment3.length) {
      rating3.imageRating1 = firstImageIncomment3.url || '';
      rating3.imageRating2 = secondImageIncomment3.url || '';
      rating3.imageRating3 = thirdImageIncomment3.url || '';
      rating3.imageRating4 = fourthImageIncomment3.url || '';
    }
    const rating4 = {
      productType: req.body.productType4,
      comment: req.body.comment4,
      avatar: avatarUrls[3],
      username: usernames[3],
    };
    if (imagesComment4.length) {
      rating4.imageRating1 = firstImageIncomment4.url || '';
      rating4.imageRating2 = secondImageIncomment4.url || '';
      rating4.imageRating3 = thirdImageIncomment4.url || '';
      rating4.imageRating4 = fourthImageIncomment4.url || '';
    }
    const rating5 = {
      productType: req.body.productType5,
      comment: req.body.comment5,
      avatar: avatarUrls[4],
      username: usernames[4],
    };
    if (imagesComment5.length) {
      rating5.imageRating1 = firstImageIncomment5.url || '';
      rating5.imageRating2 = secondImageIncomment5.url || '';
      rating5.imageRating3 = thirdImageIncomment5.url || '';
      rating5.imageRating4 = fourthImageIncomment5.url || '';
    }
    const rating6 = {
      productType: req.body.productType6,
      comment: req.body.comment6,
      avatar: avatarUrls[5],
      username: usernames[5],
    };
    if (imagesComment6.length) {
      rating6.imageRating1 = firstImageIncomment6.url || '';
      rating6.imageRating2 = secondImageIncomment6.url || '';
      rating6.imageRating3 = thirdImageIncomment6.url || '';
      rating6.imageRating4 = fourthImageIncomment6.url || '';
    }

    const updatePromises = [
      Rating.updateOne({ _id: comments?.[0]?._id }, rating1),
      Rating.updateOne({ _id: comments?.[1]?._id }, rating2),
      Rating.updateOne({ _id: comments?.[2]?._id }, rating3),
      Rating.updateOne({ _id: comments?.[3]?._id }, rating4),
      Rating.updateOne({ _id: comments?.[4]?._id }, rating5),
      Rating.updateOne({ _id: comments?.[5]?._id }, rating6),
    ];

    await Promise.all(updatePromises);

    return res.status(201).json({
      success: true,
      message: "Product edit successfully",
    });
  }

  async getProduct(req, res, next) {
    try {
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
      house,
      // quantity,
      // discount,
      // totalPrice,
      // typeProduct,
      // tiktokShopDiscount,
      option,
      sellerId,
    } = req.body;
    const product = await Product.findOne({ slug: slug });
    const order = new Order({
      productId: product._id,
      name,
      phone,
      city: selectedCity,
      address:
        house +
        ", " +
        selectedWard +
        ", " +
        selectedDistrict +
        ", " +
        selectedCity,
      sellerId,
      option,
      // quantity,
      // discount,
      // tiktokShopDiscount,
      // totalMonney: totalPrice,
      // typeProduct,
      createdAt: Date.now() + 7 * 60 * 60 * 1000,
    });
    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order successfully",
    });
  }
  async getListOrder(req, res, next) {
    const pageSize = 20;
    const pageIndex = req.query.pageIndex || 1;

    const totalOrders = await Order.countDocuments({ sellerId: req.user.id });
    const totalPages = Math.ceil(totalOrders / pageSize);
    const orders = await Order.find({ sellerId: req.user.id })
      .populate("productId")
      .sort({ createdAt: -1 })
      .skip((pageIndex - 1) * pageSize)
      .limit(pageSize);
    res.json({
      data: {
        success: true,
        orders: mutipleMongooseToObject(orders),
        currentPage: Number(pageIndex), // Trang hiện tại
        hasNextPage: pageIndex < totalPages, // Kiểm tra xem có trang tiếp theo không
        hasPreviousPage: pageIndex > 1, // Kiểm tra xem có trang trước đó không
        nextPage: +pageIndex + 1, // Trang tiếp theo
        previousPage: +pageIndex - 1, // Trang trước đó
        lastPage: totalPages, // Tổng số trang
      },
    });
  }

  async getListProduct(req, res, next) {
    const products = await Product.find({ userId: req.user.id });
    res.json({
      data: {
        success: true,
        products: mutipleMongooseToObject(products),
      },
    });
  }

  deleteOrder(req, res, next) {
    Order.deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }
  async updateOrder(req, res, next) {
    await Order.updateOne({ _id: req.params.id }, { status: req.body.status });
    return res.json({
      success: true,
    });
  }

  getListComment(req, res, next) {
    Rating.find({ productId: req.params.id }).then((cmt) => res.json(cmt));
  }

  async createAccount(req, res, next) {
    const { name, email, password } = req.body;
    // Check if user already exists
    const userExists = await User.findOne({ email: email });
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
      { email: user.email, role: user.role, id: user._id },
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

  async deleteImageProduct(req, res, next) {
    const productOfMember = await Product.findOne({
      slug: req.params.slug,
      userId: req.user.id,
    });
    if (!productOfMember)
      return res.status(500).json({ message: "An error occurred", error });
    const updateFields = {};

    const image = req.body.image;

    switch (image) {
      case 1:
        updateFields["image1"] = null;
        break;
      case 2:
        updateFields["image2"] = null;
        break;
      case 3:
        updateFields["image3"] = null;
        break;
      case 4:
        updateFields["image4"] = null;
        break;
      case 5:
        updateFields["image5"] = null;
        break;
      case 6:
        updateFields["image6"] = null;
        break;
      case 7:
        updateFields["image7"] = null;
        break;
      case 8:
        updateFields["image8"] = null;
        break;
      case 9:
        updateFields["image9"] = null;
        break;
      case 0:
        updateFields["image10"] = null;
        break;
      default:
        break;
    }

    // Thực hiện cập nhật nếu có trường để cập nhật
    if (Object.keys(updateFields).length > 0) {
      await Product.updateOne({ slug: req.params.slug }, updateFields);
    }

    // Thực hiện cập nhật nếu có trường để cập nhật
    if (Object.keys(updateFields).length > 0) {
      await Product.updateOne({ slug: req.params.slug }, updateFields);
    }
    return res.status(201).json({
      success: true,
      message: "successfully",
    });
  }
}

module.exports = new SiteController();
