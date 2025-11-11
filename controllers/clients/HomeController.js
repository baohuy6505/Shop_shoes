const Product = require("../../models/productModel");
const Category = require("../../models/categoryModel");
const ProductVariant = require("../../models/productvariantsModel");

class HomeController {
    async index(req, res) {
        try {
            const products = await Product.find().populate("category").lean();

            const productVariants = await ProductVariant.find().lean();

            const variantsByProduct = {};
            productVariants.forEach(variant => {
                const pid = variant.product.toString();
                if (!variantsByProduct[pid]) variantsByProduct[pid] = [];
                variantsByProduct[pid].push(variant);
            });

            const productsWithVariants = products.map(product => ({
                ...product,
                variants: variantsByProduct[product._id.toString()] || []
            }));

            const categories = await Category.find().lean();

            const featuredProducts = await Product.find().limit(20).populate("category").lean();

            const featuredProductsWithVariants = featuredProducts.map(product => ({
                ...product,
                variants: variantsByProduct[product._id.toString()] || []
            }));

            res.render("clients/index", {
                products: productsWithVariants,
                categories: categories,
                featuredProducts: featuredProductsWithVariants,
                layout: "userLayout"
            });
        } catch (err) {
            console.error("Lỗi lấy danh sách sản phẩm:", err);
            res.status(500).send("Lỗi tải danh sách sản phẩm: " + err.message);
        }
    }

    async productDetail(req, res) {
            // Bảng ánh xạ tên màu sang mã màu hex
            const colorMap = {
                "Đen": "#000000",
                "Trắng": "#FFFFFF",
                "Xám": "#808080",
                "Xanh Navy": "#001F3F",
                "Đỏ": "#FF0000",
                "Be": "#F5F5DC"
            };

        try {
            const productId = req.params.id;
            // Lấy thông tin sản phẩm và loại sản phẩm
            const product = await Product.findById(productId).populate("category").lean();
            if (!product) {
                return res.status(404).render("clients/product/productDetail", {
                    layout: "userLayout",
                    error: "Không tìm thấy sản phẩm",
                });
            }


            // Lấy tất cả biến thể của sản phẩm này và bổ sung mã màu
            let variants = await ProductVariant.find({ product: productId }).lean();
            variants = variants.map(v => ({
                ...v,
                colorHex: colorMap[v.color] || "#CCCCCC"
            }));

            // Lấy các sản phẩm liên quan (cùng loại, loại trừ sản phẩm hiện tại)
            let relatedProducts = [];
            if (product.category && product.category._id) {
                relatedProducts = await Product.find({
                    category: product.category._id,
                    _id: { $ne: productId }
                }).limit(8).lean();
            }

            // Lấy tất cả loại sản phẩm (nếu cần cho dropdown, filter...)
            const categories = await Category.find().lean();

            res.render("clients/product/productDetail", {
                layout: "userLayout",
                product,
                variants,
                relatedProducts,
                categories
            });
        } catch (err) {
            console.error("Lỗi productDetail (client):", err);
            res.status(500).render("clients/product/productDetail", {
                layout: "userLayout",
                error: "Lỗi tải chi tiết sản phẩm: " + err.message,
            });
        }
    }
}

module.exports = new HomeController();

