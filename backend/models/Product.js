import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    short_description: { type: String, required: true },
    story_description: { type: String, required: true },
    category: { type: String, required: true },
    era: { type: String, required: true },
    condition: { type: String, required: true },
    authenticity_note: { type: String },
    images: { type: [String], default: [] },
    status: { type: String, enum: ['available', 'reserved', 'sold'], default: 'available' }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create text index for search
productSchema.index({ title: 'text', category: 'text', era: 'text' });

const Product = mongoose.model('Product', productSchema);
export default Product;
