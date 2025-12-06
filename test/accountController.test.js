const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const { expect } = chai;
chai.use(sinonChai.default);
const User = require("../models/userModel");
const AccountController = require("../controllers/AccountController");
describe("AccountController Unit Tests", () => {
  let sandbox;
  let mockReq;
  let mockRes;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    mockReq = {
      body: {},
      flash: sandbox.stub(),
      session: {},
    };
    mockRes = {
      redirect: sandbox.stub(),
      render: sandbox.stub(),
    };
  });
  afterEach(() => {
    sandbox.restore();
  });
  // kiểm tra đăng ký
  describe("RegisterUser", () => {
    it("should đăng ký thành công và redirect về /Login", async () => {
      mockReq.body = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      sandbox.stub(User, "findOne").resolves(null);
      const saveStub = sandbox.stub(User.prototype, "save").resolves();
      await AccountController.RegisterUser(mockReq, mockRes);
      expect(User.findOne).to.have.been.calledWith({
        email: "test@example.com",
      });
      expect(saveStub).to.have.been.called;
      expect(mockReq.flash).to.have.been.calledWith(
        "success",
        "Đăng kí thành công!"
      );
      expect(mockRes.redirect).to.have.been.calledWith("/Login");
    });

    it("should báo lỗi và redirect về /Account/Register nếu email đã tồn tại", async () => {
      mockReq.body = {
        username: "existinguser",
        email: "existing@example.com",
        password: "password123",
      };
      sandbox.stub(User, "findOne").resolves({ email: "existing@example.com" });
      const saveStub = sandbox.stub(User.prototype, "save");

      // Act
      await AccountController.RegisterUser(mockReq, mockRes);

      expect(User.findOne).to.have.been.calledWith({
        email: "existing@example.com",
      });
      expect(saveStub).to.not.have.been.called;
      expect(mockReq.flash).to.have.been.calledWith(
        "error",
        "Email đã được sử dụng."
      );
      expect(mockRes.redirect).to.have.been.calledWith("/Account/Register");
    });

    it("should báo lỗi và redirect về /Account/Register nếu có lỗi lúc save", async () => {
      // Arrange
      mockReq.body = {
        username: "testuser",
        email: "test@example.com",
        password: "password123",
      };
      const dbError = new Error("Lỗi database");

      sandbox.stub(User, "findOne").resolves(null);
      sandbox.stub(User.prototype, "save").rejects(dbError);
      sandbox.stub(console, "error");
      await AccountController.RegisterUser(mockReq, mockRes);

      // Assert
      expect(mockReq.flash).to.have.been.calledWith(
        "error",
        "Đăng kí thất bại: " + dbError.message
      );
      expect(mockRes.redirect).to.have.been.calledWith("/Account/Register");
    });
  });
  // kiểm thử hàm đăng nhập
  describe("LoginUser", () => {
    let mockUser;

    beforeEach(() => {
      mockUser = {
        _id: "mongoId123",
        username: "testuser",
        email: "test@example.com",
        role: "user",
        comparePassword: sandbox.stub(),
      };
    });

    it("should đăng nhập thành công, gán session và redirect về /", async () => {
      // Arrange
      mockReq.body = { email: "test@example.com", password: "correctpassword" };
      const selectStub = sandbox.stub().resolves(mockUser);
      sandbox.stub(User, "findOne").returns({ select: selectStub });
      mockUser.comparePassword.resolves(true);

      // Act
      await AccountController.LoginUser(mockReq, mockRes);

      // Assert
      expect(User.findOne).to.have.been.calledWith({
        email: "test@example.com",
      });
      expect(selectStub).to.have.been.calledWith("+password");
      expect(mockUser.comparePassword).to.have.been.calledWith(
        "correctpassword"
      );
      expect(mockReq.flash).to.have.been.calledWith(
        "success",
        "Đăng nhập thành công!"
      );
      expect(mockRes.redirect).to.have.been.calledWith("/");
      expect(mockReq.session.user).to.deep.equal({
        id: "mongoId123",
        username: "testuser",
        email: "test@example.com",
        role: "user",
      });
    });

    it("should báo lỗi và redirect về /Login nếu email không tồn tại", async () => {
      // Arrange
      mockReq.body = { email: "notfound@example.com", password: "password" };
      const selectStub = sandbox.stub().resolves(null);
      sandbox.stub(User, "findOne").returns({ select: selectStub });

      // Act
      await AccountController.LoginUser(mockReq, mockRes);

      // Assert
      expect(mockReq.flash).to.have.been.calledWith(
        "error",
        "Email không tồn tại."
      );
      expect(mockRes.redirect).to.have.been.calledWith("/Login");
      expect(mockReq.session.user).to.be.undefined;
    });

    it("should báo lỗi và redirect về /Login nếu mật khẩu không đúng", async () => {
      // Arrange
      mockReq.body = { email: "test@example.com", password: "wrongpassword" };
      const selectStub = sandbox.stub().resolves(mockUser);
      sandbox.stub(User, "findOne").returns({ select: selectStub });
      mockUser.comparePassword.resolves(false);
      await AccountController.LoginUser(mockReq, mockRes);
      expect(mockUser.comparePassword).to.have.been.calledWith("wrongpassword");
      expect(mockReq.flash).to.have.been.calledWith(
        "error",
        "Mật khẩu không đúng."
      );
      expect(mockRes.redirect).to.have.been.calledWith("/Login");
      expect(mockReq.session.user).to.be.undefined;
    });
  });
});
