// tests/AccountController.test.js
const AccountController = require('../controllers/clients/AccountController');
const User = require('../models/userModel');

jest.mock('../models/userModel');//tạo đối tượng model giả lập

describe('AccountController', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, flash: jest.fn(), session: {} };
    res = { render: jest.fn(), redirect: jest.fn() };
  });

  afterEach(() => jest.clearAllMocks());
  describe('Login', () => {
    it('should render login view', () => {
      AccountController.Login(req, res);
      expect(res.render).toHaveBeenCalledWith('clients/account/login');
      //expect(hàm) có công dụng là nhận vào hàm giả lập (Mock Function)
      //sau đó sử dụng .toHaveBeenCalledWith(tham số) để kiểm tra hành vi
      //dùng để kiểm tra xem hàm giả lập res.render có được gọi với tham số là tên view đó hay không.
    });
  });

  describe('Register', () => {
    it('should render register view', () => {
      AccountController.Register(req, res);
      expect(res.render).toHaveBeenCalledWith('clients/account/register.hbs');
    });
  });

  describe('RegisterUser', () => {
    it('should register new user and redirect to login on success', async () => {
      req.body = { username: 'test', email: 'test@example.com', password: 'pass' };
      User.findOne.mockResolvedValue(null);

      //được dùng để giả lập thành công quá trình lưu một người dùng mới vào cơ sở dữ liệu.
      const saveMock = jest.fn().mockResolvedValue({});
      //Dòng code này là bước chuẩn bị để kiểm tra hành động lưu vào database mà không cần database thật
      User.mockImplementation(() => ({ save: saveMock }));

      await AccountController.RegisterUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(saveMock).toHaveBeenCalled();
      expect(req.flash).toHaveBeenCalledWith('success', 'Đăng kí thành công!');
      expect(res.redirect).toHaveBeenCalledWith('/Login');
    });

    it('should flash error and redirect if email exists', async () => {
      req.body = { username: 'test', email: 'test@example.com', password: 'pass' };
      User.findOne.mockResolvedValue({});

      await AccountController.RegisterUser(req, res);

      expect(req.flash).toHaveBeenCalledWith('error', 'Email đã được sử dụng.');
      expect(res.redirect).toHaveBeenCalledWith('/Account/Register');
    });
  });

  describe('LoginUser', () => {
    it('should login user and set session on success', async () => {
      req.body = { email: 'test@example.com', password: 'pass' };

      const userMock = {
        _id: '123',
        username: 'test',
        email: 'test@example.com',
        role: 'user',
        comparePassword: jest.fn().mockResolvedValue(true),
      };

      const queryMock = { select: jest.fn().mockResolvedValue(userMock) };
      User.findOne.mockReturnValue(queryMock);

      await AccountController.LoginUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(queryMock.select).toHaveBeenCalledWith('+password');
      expect(userMock.comparePassword).toHaveBeenCalledWith('pass');
      expect(req.session.user).toEqual({
        id: '123',
        username: 'test',
        email: 'test@example.com',
        role: 'user',
      });
      expect(req.flash).toHaveBeenCalledWith('success', 'Đăng nhập thành công!');
      expect(res.redirect).toHaveBeenCalledWith('/');
    });

    it('should flash error if user not found', async () => {
      req.body = { email: 'test@example.com', password: 'pass' };

      const queryMock = { select: jest.fn().mockResolvedValue(null) };
      User.findOne.mockReturnValue(queryMock);

      await AccountController.LoginUser(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(queryMock.select).toHaveBeenCalledWith('+password');
      expect(req.flash).toHaveBeenCalledWith('error', 'Email không tồn tại.');
      expect(res.redirect).toHaveBeenCalledWith('/Login');
    });
  });
});