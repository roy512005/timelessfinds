export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    era: string;
    image: string;
    gallery: string[];
    description: string;
    history: string;
    condition: string;
    dimensions: string;
}

export const products: Product[] = [
    {
        id: "1",
        name: "19th Century French Gilded Mirror",
        category: "Decor",
        price: 3500,
        era: "19th Century",
        image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&q=80"
        ],
        description: "An authentic late 19th-century French Louis Philippe style mirror. Featuring its original gold leaf gilding and gently foxed mercury glass that reflects a soft, ambient light into your luxurious space.",
        history: "Originally acquired from a private estate in Bordeaux, this mirror weathered the transition of epochs, witnessing generations of French artisanal refinement. Its hand-carved floral crest bears the distinctive hallmark of Parisian makers of the period.",
        condition: "Excellent antique condition. Original glass shows natural age-related foxing which adds to its authenticity. The frame has minor wear consistent with age, validating its history.",
        dimensions: "H 120cm x W 85cm"
    },
    {
        id: "2",
        name: "Victorian Brass Telescope",
        category: "Collectibles",
        price: 1850,
        era: "Victorian",
        image: "https://images.unsplash.com/photo-1596720230232-a5e12ca6fc0a?auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1596720230232-a5e12ca6fc0a?auto=format&fit=crop&q=80"
        ],
        description: "A precision-crafted Victorian era navigational telescope with original leather wrapping and solid brass fittings. A true artifact of early exploration.",
        history: "This piece was historically utilized aboard merchant vessels navigating the treacherous routes between the British Isles and the New World. It tells a story of intrepid sailors mapping the unmapped.",
        condition: "Fully functional optical lenses. The brass has developed a rich, warm patina. Original leather grip is intact but shows signs of historic use.",
        dimensions: "L 85cm (extended) / 30cm (collapsed)"
    },
    {
        id: "3",
        name: "Midnight Ceramic Vessel",
        category: "Decor",
        price: 1200,
        era: "Mid-Century",
        image: "https://images.unsplash.com/photo-1616215359781-a4b52ab72eaf?auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1616215359781-a4b52ab72eaf?auto=format&fit=crop&q=80"
        ],
        description: "A striking mid-century ceramic vessel with a deep, textured midnight glaze. It stands as a monolithic sculptural element for modern brutalist or vintage minimal spaces.",
        history: "Crafted by an unknown studio potter in the late 1950s, pieces of this texture and glaze are incredibly rare, capturing the transition from post-war to abstract artistic expression in European pottery.",
        condition: "Perfect structural condition. No chips or cracks. The glaze retains its original matte profundity.",
        dimensions: "H 45cm x D 22cm"
    },
    {
        id: "4",
        name: "Art Deco Desk Lamp",
        category: "Industrial",
        price: 850,
        era: "1930s",
        image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80"
        ],
        description: "A bold, geometric Art Deco desk lamp combining unlacquered brass and cast iron. It casts a warm, focused light, bringing profound cinematic ambiance to any study.",
        history: "Rescued from a historic architectural firm in Chicago, this lamp illuminated the drafting tables where early skyscrapers were born during the zenith of the Deco movement.",
        condition: "Rewired to modern safety standards using period-correct cloth cord. Brass bears authentic patina.",
        dimensions: "H 40cm x W 25cm"
    },
    {
        id: "5",
        name: "Classic Leica M3 Camera",
        category: "Rare Finds",
        price: 2800,
        era: "1950s",
        image: "https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&q=80"
        ],
        description: "The legendary Leica M3 rangefinder camera, an icon of 20th-century photojournalism. Celebrated for its mechanical perfection and unmatched tactile feedback.",
        history: "This particular unit accompanied a renowned European photojournalist during the culturally explosive 1960s. It has witnessed history unfold through its unparalleled optical viewfinder.",
        condition: "Mechanically overhauled and fully operational. Cosmetically, it wears the 'brassing' on its edges—a badge of honor for a camera that has truly lived.",
        dimensions: "Standard M3 Dimensions"
    },
    {
        id: "6",
        name: "Tufted Leather Chesterfield",
        category: "Vintage",
        price: 4500,
        era: "Edwardian",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80"
        ],
        description: "An authentic, deeply tufted leather Chesterfield sofa from the Edwardian era. The leather has aged into a mesmerizing, mottled mahogany tone.",
        history: "Once the centerpiece of a private gentleman's club in London, it has hosted countless whispered conversations over cigars and scotch. Its presence transforms an entire room.",
        condition: "The leather is supple and regularly conditioned. Some historical scuffs exist, contributing exclusively to its antique charm. Springs have been historically retied.",
        dimensions: "L 210cm x D 95cm x H 75cm"
    }
];
