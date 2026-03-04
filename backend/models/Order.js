import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ProductId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    payment_status: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    shipping_status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
