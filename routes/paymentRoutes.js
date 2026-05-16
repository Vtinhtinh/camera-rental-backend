const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/auth');

// Protected routes - User
router.post('/create', protect, paymentController.createPayment);
router.post('/generate-qr', protect, paymentController.generateQRCode);
router.post('/vietqr/create', protect, paymentController.createVietQRPayment);
router.get('/info/:paymentId', protect, paymentController.getPaymentInfo);
router.get('/booking/:bookingId', protect, paymentController.getPaymentByBooking);
router.post('/confirm/:paymentId', protect, paymentController.confirmPayment);
router.post('/cancel/:paymentId', protect, paymentController.cancelPayment);
router.get('/my-payments', protect, paymentController.getUserPayments);

// Protected routes - Admin
router.get('/all', protect, admin, paymentController.getAllPayments);
router.get('/vietqr/all', protect, admin, paymentController.getAllVietQRPayments);
router.get('/stats', protect, admin, paymentController.getPaymentStats);
router.post('/confirm/:paymentId', protect, admin, paymentController.adminConfirmPayment);

// Payment expiration routes
router.post('/expire', paymentController.expirePayments); // Can be called by cron with secret
router.get('/expiring', protect, admin, paymentController.getExpiringPayments);

// VNPay routes
router.post('/vnpay/create', protect, paymentController.createVNPayPayment);
router.get('/vnpay/return', paymentController.vnpayReturn);
router.get('/vnpay/ipn', paymentController.getVNPayIpn);

module.exports = router;
