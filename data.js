import bcrypt from "bcryptjs"
const data = {
  users: [
    {
      name: "Vaishali",
      email: "vaishnavi@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true
    },
    {
      name: "user",
      email: "user@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false
    }
  ],
  products: [
    {
      name: 'Silver Nackless',
      unique_indentity: 'silver Eastern Nackless',
      category: 'Neckless',
      image: 'https://th.bing.com/th/id/OIP.B7cqaJ_L9yOOi3kVhbsiWADYEg?w=140&h=186&c=7&r=0&o=5&dpr=1.3&pid=1.7', // 679px × 829px
      price: 500,
      countInStock: 10,
      brand: 'Giva',
      rating: 4.5,
      numReviews: 5,
      description: 'Giva Silver Eastern Nackless',
    },
    {
      name: 'Mirenda gold ring',
      unique_indentity: 'Mirenda gold ring',
      category: 'Ring',
      image: 'https://th.bing.com/th?id=OPA.3vsp%2fiKgm%2fi1UA474C474&w=200&h=220&rs=1&o=5&dpr=1.3&pid=21.1',
      price: 5560,
      countInStock: 0,
      brand: 'Mirenda',
      rating: 4.0,
      numReviews: 10,
      description: 'Gold Ring',
    },
    {
      // _id:'3',
      name: 'Diamond pended',
      unique_indentity: 'diamond patend',
      category: 'Neckpiece',
      image: 'https://th.bing.com/th/id/OPA.z7JWmIlGVFyh5Q474C474?w=198&h=198&rs=1&o=5&dpr=1.3&pid=21.1',
      price: 8906,
      countInStock: 15,
      brand: 'Evan',
      rating: 1,
      numReviews: 2,
      description: 'evan diamond pendend',
    },
    {
      // _id:'4',
      name: 'Gold bangles',
      unique_indentity: 'gold bangles',
      category: 'bangles.',
      image: 'https://th.bing.com/th/id/OIP._dp1kPI9ySlax1gs1oy_3QHaE8?pid=ImgDet&rs=1',
      price: 6565,
      countInStock: 5,
      brand: 'bahraini',
      rating: 4.5,
      numReviews: 7,
      description: 'bahraini golden bangles',
    },
    {
      // _id:'5',
      name: 'Diamond Ring',
      unique_indentity: 'diamond Ring',
      category: 'Ring',
      image: 'https://th.bing.com/th/id/OPA.WLiFRSjIYaalow474C474?o=5&pid=21.1&w=160&h=192&dpr=1.3',
      price: 65890,
      countInStock: 5,
      brand: 'Yana',
      rating: 4.5,
      numReviews: 9,
      description: 'Yana Diamond Ring',
    },
    {
      // _id:'5',
      name: 'Neckless Gold',
      unique_indentity: 'Neckles Gold',
      category: 'Neckless',
      image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Gold-jewellery-jewel-henry-designs-terabass.jpg',
      price: 65890,
      countInStock: 5,
      brand: 'Marogold',
      rating: 4.5,
      numReviews: 19,
      description: 'Golden Marigold Floral Nackepiece',
    },
    {
      // _id:'5',
      name: 'Diamond Choker Neckles',
      unique_indentity: 'Diamond Choker Neckles',
      category: 'Neckless',
      image: 'https://th.bing.com/th/id/OIP.0_K3UmQGlxSOd-F25cDLVAHaHf?pid=ImgDet&w=178&h=179&c=7&dpr=1.3',
      price: 76900,
      countInStock: 5,
      brand: 'Kohls',
      rating: 4.0,
      numReviews: 34,
      description: 'Diamond Kohls Choker Neckless',
    },
    {
      // _id:'5',
      name: 'Bangle Gold',
      unique_indentity: 'gold bangles design',
      category: 'Neckless',
      image: 'https://th.bing.com/th/id/OIP.hi0oDFCCfSqeqrgf_kR5_wHaE8?pid=ImgDet&rs=1',
      price: 99900,
      countInStock: 5,
      brand: 'Kyra',
      rating: 3.8,
      numReviews: 26,
      description: 'Gold Kyra Bangles',
    },
    {
      // _id:'5',
      name: 'Hemal Gold Bangles',
      unique_indentity: 'gold bangles',
      category: 'Neckless',
      image: 'https://3.bp.blogspot.com/-UGssHi1dvls/WSR7mr6KnYI/AAAAAAAATxo/iCOUVjIUy0E5N0gm5Pky4MT21Q0LJKKmQCLcB/s1600/Wedding-bracelets-and-font-b-bangles-b-font-real-gold-plated-Cubic-zirconia-luxury-font-b.jpg',
      price: 67900,
      countInStock: 5,
      brand: 'Hemal',
      rating: 4.1,
      numReviews: 20,
      description: 'Hemal Gold Bangles',
    },
  ],
};
export default data;