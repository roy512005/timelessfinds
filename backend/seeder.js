import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { sequelize, User, Product, Reservation, Order } from './models/index.js';

dotenv.config();

const products = [
    {
        title: "19th Century French Gilded Mirror", category: "Decor", price: 3500, era: "19th Century",
        images: ["https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80"],
        short_description: "An authentic late 19th-century French Louis Philippe style mirror.",
        story_description: "Originally acquired from a private estate in Bordeaux, this mirror weathered the transition of epochs...", condition: "Excellent antique condition.", authenticity_note: "H 120cm x W 85cm", status: "available"
    },
    {
        title: "Victorian Brass Telescope", category: "Collectibles", price: 1850, era: "Victorian",
        images: ["https://images.unsplash.com/photo-1596720230232-a5e12ca6fc0a?auto=format&fit=crop&q=80"],
        short_description: "A precision-crafted Victorian era navigational telescope.",
        story_description: "This piece was historically utilized aboard merchant vessels...", condition: "Fully functional optical lenses.", authenticity_note: "L 85cm (extended)", status: "available"
    },
    {
        title: "Midnight Ceramic Vessel", category: "Decor", price: 1200, era: "Mid-Century",
        images: ["https://images.unsplash.com/photo-1616215359781-a4b52ab72eaf?auto=format&fit=crop&q=80"],
        short_description: "A striking mid-century ceramic vessel with a deep midnight glaze.",
        story_description: "Crafted by an unknown studio potter in the late 1950s...", condition: "Perfect structural condition.", authenticity_note: "H 45cm x D 22cm", status: "available"
    },
    {
        title: "Art Deco Desk Lamp", category: "Industrial", price: 850, era: "1930s",
        images: ["https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80"],
        short_description: "A bold, geometric Art Deco desk lamp combining unlacquered brass and cast iron.",
        story_description: "Rescued from a historic architectural firm in Chicago...", condition: "Rewired to modern safety standards.", authenticity_note: "H 40cm x W 25cm", status: "available"
    },
    {
        title: "Classic Leica M3 Camera", category: "Rare Finds", price: 2800, era: "1950s",
        images: ["https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80"],
        short_description: "The legendary Leica M3 rangefinder camera, an icon of photojournalism.",
        story_description: "Accompanied a renowned European photojournalist during the culturally explosive 1960s.", condition: "Mechanically overhauled.", authenticity_note: "Standard M3 Dimensions", status: "available"
    },
    {
        title: "Tufted Leather Chesterfield", category: "Vintage", price: 4500, era: "Edwardian",
        images: ["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80"],
        short_description: "An authentic, deeply tufted leather Chesterfield sofa from the Edwardian era.",
        story_description: "Once the centerpiece of a private gentleman's club in London...", condition: "Leather is supple and regularly conditioned.", authenticity_note: "L 210cm x D 95cm", status: "available"
    },
    {
        title: "Mid-Century Walnut Credenza", category: "Vintage", price: 2200, era: "1950s",
        images: ["https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&q=80"],
        short_description: "Minimalist walnut credenza showcasing superb craftsmanship.",
        story_description: "Sourced from a Danish modern estate, it epitomizes the golden era of Scandinavian design.", condition: "Restored finish.", authenticity_note: "L 180cm x H 75cm", status: "available"
    },
    {
        title: "Industrial Iron Gear End Table", category: "Industrial", price: 950, era: "Early 20th Century",
        images: ["https://images.unsplash.com/photo-1574062638847-b862562657e4?auto=format&fit=crop&q=80"],
        short_description: "Factory gear repurposed into a heavy industrial table.",
        story_description: "Reclaimed from a Detroit manufacturing plant before demolition.", condition: "Sealed raw iron finish.", authenticity_note: "W 50cm x H 60cm", status: "available"
    },
    {
        title: "Empire Style Chandelier", category: "Decor", price: 4200, era: "19th Century",
        images: ["https://images.unsplash.com/photo-1543330689-53e98cc86940?auto=format&fit=crop&q=80"],
        short_description: "Crystal adorned Empire style chandelier.",
        story_description: "Hung in a Parisian townhouse, reflecting the grandeur of the era.", condition: "Fully rewired.", authenticity_note: "H 110cm x D 60cm", status: "available"
    },
    {
        title: "Vintage Rolex Submariner", category: "Rare Finds", price: 12500, era: "1970s",
        images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80"],
        short_description: "Highly sought after vintage Rolex Submariner with faded bezel.",
        story_description: "Worn by a deep sea diver, the patina tells a story of adventure.", condition: "Serviced, keeping excellent time.", authenticity_note: "40mm Case", status: "available"
    },
    {
        title: "Antique Persian Rug", category: "Decor", price: 3100, era: "Late 19th Century",
        images: ["https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80"],
        short_description: "Hand-knotted Heriz rug displaying geometric motifs.",
        story_description: "Woven in the mountains of Persia, preserving ancient textile traditions.", condition: "Even wear, incredibly soft.", authenticity_note: "250cm x 350cm", status: "available"
    },
    {
        title: "Typewriter Underwood No. 5", category: "Collectibles", price: 650, era: "1920s",
        images: ["https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80"],
        short_description: "The classic Underwood model that defined early office typing.",
        story_description: "Used in a bustling New York newsroom during the Roaring Twenties.", condition: "Working condition with new ribbon.", authenticity_note: "Standard Typewriter", status: "available"
    },
    {
        title: "Eames Lounge Chair Auth.", category: "Vintage", price: 5500, era: "1960s",
        images: ["https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80"],
        short_description: "An authentic Herman Miller Eames lounge chair in rosewood.",
        story_description: "An icon of modern design architecture, sourced from an architect's personal collection.", condition: "Original leather with beautiful patina.", authenticity_note: "Standard Dimensions", status: "available"
    },
    {
        title: "Gothic Revival Armchair", category: "Vintage", price: 1750, era: "Victorian",
        images: ["https://images.unsplash.com/photo-1540574163026-643ea20abc46?auto=format&fit=crop&q=80"],
        short_description: "Carved oak armchair with distinctive Gothic arches.",
        story_description: "Commissioned for a sprawling English manor house.", condition: "Reupholstered in period-accurate velvet.", authenticity_note: "H 140cm", status: "available"
    },
    {
        title: "Cast Iron Apothecary Scale", category: "Industrial", price: 450, era: "19th Century",
        images: ["https://images.unsplash.com/photo-1598514981880-9276d47b74ba?auto=format&fit=crop&q=80"],
        short_description: "Traditional balance scale featuring solid brass weights.",
        story_description: "Once utilized in a French provincial pharmacy.", condition: "Beautifully preserved with authentic tarnish.", authenticity_note: "W 40cm", status: "available"
    },
    {
        title: "Astro-Compass Unit", category: "Collectibles", price: 1100, era: "1940s",
        images: ["https://images.unsplash.com/photo-1520085601670-ee14aa5fa3ca?auto=format&fit=crop&q=80"],
        short_description: "WWII era aviation astro-compass used for celestial navigation.",
        story_description: "Recovered from a decommissioned bomber, complete with wooden transit case.", condition: "All dials move freely.", authenticity_note: "Original Case Included", status: "available"
    },
    {
        title: "Baccarat Crystal Decanter", category: "Decor", price: 850, era: "1920s",
        images: ["https://images.unsplash.com/photo-1563200707-1b3ee74f3ff5?auto=format&fit=crop&q=80"],
        short_description: "Exquisite cut crystal decanter from Baccarat.",
        story_description: "Gracing the tables of the Parisian elite during the Gatsby era.", condition: "Flawless, no chips.", authenticity_note: "H 30cm", status: "available"
    },
    {
        title: "Art Nouveau Bronze Statue", category: "Rare Finds", price: 3400, era: "Edwardian",
        images: ["https://images.unsplash.com/photo-1564366601679-b141ab226ce4?auto=format&fit=crop&q=80"],
        short_description: "Flowing bronze sculpture signed by a notable French artist.",
        story_description: "Exhibiting the organic forms beloved by the Art Nouveau movement.", condition: "Striking green and brown patina.", authenticity_note: "H 45cm", status: "available"
    },
    {
        title: "Industrial Workshop Stool", category: "Industrial", price: 350, era: "1930s",
        images: ["https://images.unsplash.com/photo-1503602642458-1428a1c8b88d?auto=format&fit=crop&q=80"],
        short_description: "Adjustable height steel stool with a maple wood seat.",
        story_description: "Survived decades of use in an American textile mill.", condition: "Sturdy with heavy authentic wear.", authenticity_note: "Adjustable Height", status: "available"
    },
    {
        title: "Signed First Edition Novel", category: "Rare Finds", price: 1500, era: "1920s",
        images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80"],
        short_description: "A rare first edition Hemingway with author signature.",
        story_description: "A prized literary artifact capturing the Lost Generation.", condition: "Very good with original dust jacket fragments.", authenticity_note: "Protected Archival Sleeve", status: "available"
    }
];

const seedDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        console.log('Database synced. Old records wiped.');

        // Seed Admin User
        const salt = await bcrypt.genSalt(10);
        const adminPassword = await bcrypt.hash('12345', salt);
        await User.create({
            name: 'Admin User',
            email: 'aproy48@gmail.com',
            password: adminPassword,
            role: 'admin'
        });
        console.log('Admin user created: aproy48@gmail.com / 12345');

        await Product.bulkCreate(products);
        console.log('20 Rare Products Imported into PostgreSQL!');

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedDB();
