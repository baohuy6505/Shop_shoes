class UserController {
    index(req, res){
        res.render('../views/index.hbs');
    }
}
module.exports = new UserController;