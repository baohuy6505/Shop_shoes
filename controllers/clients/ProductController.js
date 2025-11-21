const Category = require("../../models/categoryModel");
const Product = require("../../models/productModel");
const ProductVariant = require("../../models/productvariantsModel");
class ProductController {
    async index(req, res) { 
        try {
        const itemPerPage = 12;
        const page = parseInt(req.query.page) || 1;
        const skip = (page - 1) * itemPerPage;
        const getDataProduct = await Product.find({}).skip(skip).limit(itemPerPage).lean();
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / itemPerPage);

        let pages = [];
            for(let i = 1; i <= totalPages; i++) {
                pages.push({
                    val: i,
                    isActive: i === page
                });
            }

        return res.render("clients/product/index", {
            products: getDataProduct,
            pagination: {             // Object này dùng để render thanh phân trang
                    pages: pages,
                    currentPage: page,
                    hasPrev: page > 1,
                    prevPage: page - 1,
                    hasNext: page < totalPages,
                    nextPage: page + 1
                }
        });
                    }
        catch (error) {
            console.error("Error fetching products:", error);
            return res.status(500).send("Internal Server Error");
        }
    }
    // async detail(req, res) {
    //     const id = req.params.id;
    //     if (id == null || id == undefined) {
    //         req.flash("error", "Sản phẩm không tồn tại!");
    //         return res.redirect("/Products");
    //     }
    //     const getProduct = await Product.findById(id).lean();
    //     return res.render("clients/product/detail", {
    //         product: getProduct
    //     });
    // }
    async detail(req, res) {
        try {
            const id = req.params.id;

            // 1. Kiểm tra ID có hợp lệ không (tránh lỗi server crash nếu ID linh tinh)
            if (!id) {
                req.flash("error", "Sản phẩm không tồn tại!");
                return res.redirect("/Products");
            }

            // 2. Lấy thông tin sản phẩm gốc
            const product = await Product.findById(id).lean();
            
            if (!product) {
                req.flash("error", "Không tìm thấy sản phẩm!");
                return res.redirect("/Products");
            }

            // 3. QUAN TRỌNG: Lấy tất cả biến thể (Size/Màu) của sản phẩm này
            const variants = await ProductVariant.find({ product: id }).lean();

            // 4. Lọc danh sách Size duy nhất và sắp xếp tăng dần
            // Ví dụ database có: [40, 40, 41, 42] -> Kết quả: [40, 41, 42]
            const uniqueSizes = [...new Set(variants.map(v => v.size))].sort((a, b) => a - b);

            const uniqueColors = [...new Set(variants.map(v => v.color))];

            return res.render("clients/product/detail", {
                product: product,
                sizes: uniqueSizes,   
                colors: uniqueColors  
            });

        } catch (error) {
            console.error("Lỗi chi tiết sản phẩm:", error);
            res.status(500).redirect("/"); 
        }
    }
}

module.exports = new ProductController();
