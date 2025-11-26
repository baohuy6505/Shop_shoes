const Product = require("../../models/productModel");
const ProductVariant = require("../../models/productvariantsModel");
const Cart = require("../../models/cartModel");
const Category = require("../../models/categoryModel");
class AdminController {
  async index(req, res) {
    var totalProductVariant = await ProductVariant.countDocuments({});
    var lowStockVariants = await ProductVariant.countDocuments({
      stockQuantity: { $lt: 5 },
    });
    var totalStockValueArray = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalValue: { $sum: { $multiply: ["$price"] } },
        },
      },
    ]);
    let totalStockValue = 0;
    if (totalStockValueArray && totalStockValueArray.length > 0) {
      totalStockValue = totalStockValueArray[0].totalValue;
    }
    var totalCart = await Cart.countDocuments({});
    var listCategory = await Category.aggregate([
      {
        $lookup: {
          from: "products", // tên collection trong MongoDB
          localField: "_id",
          foreignField: "category",
          as: "products",
        },
        //  { $unwind: '$categoryInfo' },
      },
      {
        $project: {
          categoryName: 1, //la true hoặc 1 de hien thi
          description: 1,
          productCount: { $size: "$products" }, //size de dem so luong trong mang products
        },
      },
    ]);
    var listProduct = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      { $unwind: "$categoryInfo" },

      // JOIN với ProductVariant
      {
        $lookup: {
          from: "productvariants",
          localField: "_id",
          foreignField: "product",
          as: "variants",
        },
      },
      {
        $project: {
          productName: 1,
          imageUrl: 1,
          price: 1,
          categoryName: "$categoryInfo.categoryName",
          variantCount: { $size: "$variants" },
          totalStock: { $sum: "$variants.stockQuantity" },
          status: {
            $cond: {
              if: { $gte: [{ $sum: "$variants.stockQuantity" }, 20] },
              then: "Còn Nhiều",
              else: {
                $cond: {
                  if: { $gte: [{ $sum: "$variants.stockQuantity" }, 15] },
                  then: "Còn Ít",
                  else: "Sắp Hết",
                },
              },
            },
          },
        },
      },
    ]);
    var listProductVariants = await ProductVariant.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productInfo",
        },
      },
      {
        $project: {
          size: 1,
          color: 1,
          stockQuantity: 1,
          productName: { $arrayElemAt: ["$productInfo.productName", 0] },
          status: {
            $cond: {
              if: { $gte: ["$stockQuantity", 15] },
              then: "Cần nhập",
              else: {
                $cond: {
                  if: { $gte: ["$stockQuantity", 5] },
                  then: "Còn Ít",
                  else: "Nguy cơ hết",
                },
              },
            },
          },
        },
      },
      {
        $match: {
          stockQuantity: { $lte: 15 }, // stockQuantity <= 15
        },
      },
    ]);
    var viewmodel = {
      totalProductVariant: totalProductVariant,
      lowStockVariants: lowStockVariants,
      totalStockValue: totalStockValue,
      totalCart: totalCart,
      listCategory: listCategory,
      listProduct: listProduct,
      listProductVariants: listProductVariants,
    };
    return res.render("admin/admin", {
      layout: "adminLayout.hbs",
      viewmodel: viewmodel,
    });
    //return res.json(viewmodel);
  }

  async ListOder(req, res) {
    const listOrder = await Cart.find({ status: "PLACED" }).populate("userId").sort({ createdAt: -1 }).lean();
    // return res.send(listOrder);
    const ordersToDisplay = listOrder.filter(
      (order) => order.status === "PLACED"
    );

    return res.render("admin/order/listOrder", {
      layout: "adminLayout.hbs",
      orders: ordersToDisplay,
    });
  }
}

module.exports = new AdminController();
