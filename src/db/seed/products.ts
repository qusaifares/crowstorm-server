const products = [
  {
    ratingData: {
      ratings: []
    },
    images: [
      'https://crowstorm.s3.amazonaws.com/products/5f6bdcf42ade665bb10552c1_1600904436167_236.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6bdcf42ade665bb10552c1_1600904436187_33.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6bdcf42ade665bb10552c1_1600904436183_440.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6bdcf42ade665bb10552c1_1600904436185_648.jpeg'
    ],
    _id: '5f6bdcf42ade665bb10552c1',
    color: 'Red',
    title: 'Red Printed T-Shirt',
    description:
      'An iconic tee, with clean lines and a classic crew neck. The fabric is a midweight, durable organic cotton that gets softer over time.',
    productType: 'Shirts',
    price: 24.99,
    quantity: 85,
    createdAt: new Date('2020-09-23T23:40:36.147Z')
  },
  {
    ratingData: {
      ratings: []
    },
    images: [
      'https://crowstorm.s3.amazonaws.com/products/5f6be7647044365c274f2a60_1600907108372_167.png',
      'https://crowstorm.s3.amazonaws.com/products/5f6be7647044365c274f2a60_1600907108348_954.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6be7647044365c274f2a60_1600907108369_44.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6be7647044365c274f2a60_1600907108366_728.jpeg'
    ],
    _id: '5f6be7647044365c274f2a60',
    color: 'Orange',
    title: 'Smart Band 4',
    description:
      'Get fit and stay healthy with the Smart Band 4. This fitness tracker provides you with a variety of fitness and health tracking options, as well as practical functionality.',
    productType: 'Watches',
    price: 49.99,
    quantity: 85,
    createdAt: new Date('2020-09-24T00:25:08.286Z')
  },
  {
    ratingData: {
      ratings: []
    },
    images: [
      'https://crowstorm.s3.amazonaws.com/products/5f6bf60f89c0d45cbb515bd3_1600910864014_326.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6bf60f89c0d45cbb515bd3_1600910864018_621.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6bf60f89c0d45cbb515bd3_1600910864021_659.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6bf60f89c0d45cbb515bd3_1600910864023_664.jpeg'
    ],
    _id: '5f6bf60f89c0d45cbb515bd3',
    title: 'Cotton Wool Cardigan',
    description:
      "Step up your cozy style with this double-breasted cardigan. This versatile sweater blazer can be dressed up or down but ensures you'll always look polished.",
    productType: 'Sweaters',
    color: 'Gray',
    price: 29.99,
    quantity: 85,
    createdAt: new Date('2020-09-24T01:27:43.999Z')
  },
  {
    ratingData: {
      ratings: []
    },
    images: [
      'https://crowstorm.s3.amazonaws.com/products/5f6bf73189c0d45cbb515bd4_1600911153025_127.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6bf73189c0d45cbb515bd4_1600911153028_437.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6bf73189c0d45cbb515bd4_1600911153022_181.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6bf73189c0d45cbb515bd4_1600911153031_633.jpg'
    ],
    _id: '5f6bf73189c0d45cbb515bd4',
    title: 'Merino Wool Sweater',
    description:
      'This super-soft sweater is made out of a luxe merino wool-blend that will keep you warm on the chilliest of days.',
    productType: 'Sweaters',
    color: 'Black',
    price: 55,
    quantity: 85,
    createdAt: new Date('2020-09-24T01:32:33.014Z')
  },
  {
    ratingData: {
      ratings: []
    },
    images: [
      'https://crowstorm.s3.amazonaws.com/products/5f6c24d289c0d45cbb515bd5_1600922834678_339.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6c24d289c0d45cbb515bd5_1600922834686_937.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6c24d289c0d45cbb515bd5_1600922834683_74.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6c24d289c0d45cbb515bd5_1600922834681_899.jpeg'
    ],
    _id: '5f6c24d289c0d45cbb515bd5',
    title: 'Straight Stretch Classic Jeans',
    description:
      'A classic pair of straight jeans with our highest level of stretch and extremely durable, tear-resistant fabric. These ones are perfect for everyday wear.',
    productType: 'Pants',
    color: 'Blue',
    price: 40,
    quantity: 85,
    createdAt: new Date('2020-09-24T04:47:14.608Z')
  },
  {
    ratingData: {
      ratings: []
    },
    images: [
      'https://crowstorm.s3.amazonaws.com/products/5f6c593a7ab4a46311894b77_1600936250490_33.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6c593a7ab4a46311894b77_1600936250497_330.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6c593a7ab4a46311894b77_1600936250495_916.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6c593a7ab4a46311894b77_1600936250472_815.jpeg'
    ],
    _id: '5f6c593a7ab4a46311894b77',
    title: "Men's Fashion Watch",
    description:
      'This black ultra-slim watch carries a bold 23mm round case and fastens by a black-plated stainless steel bracelet.',
    productType: 'Watches',
    color: 'Black',
    price: 30,
    quantity: 85,
    createdAt: new Date('2020-09-24T08:30:50.379Z')
  },
  {
    ratingData: {
      ratings: []
    },
    images: [
      'https://crowstorm.s3.amazonaws.com/products/5f6c5ede08672c6380a6f5d2_1600937694543_86.webp',
      'https://crowstorm.s3.amazonaws.com/products/5f6c5ede08672c6380a6f5d2_1600937694561_110.webp',
      'https://crowstorm.s3.amazonaws.com/products/5f6c5ede08672c6380a6f5d2_1600937694569_373.webp',
      'https://crowstorm.s3.amazonaws.com/products/5f6c5ede08672c6380a6f5d2_1600937694565_250.webp'
    ],
    _id: '5f6c5ede08672c6380a6f5d2',
    title: 'Black Wide Fit Boots',
    description:
      'Wide fit lace-up boots available in black. Carefully crafted from quality materials for a long lasting effect.',
    productType: 'Footwear',
    color: 'Black',
    price: 65,
    quantity: 85,
    createdAt: new Date('2020-09-24T08:54:54.522Z')
  },
  {
    ratingData: {
      ratings: []
    },
    images: [
      'https://crowstorm.s3.amazonaws.com/products/5f6c606508672c6380a6f5d3_1600938085950_840.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6c606508672c6380a6f5d3_1600938085953_937.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6c606508672c6380a6f5d3_1600938085959_179.jpeg',
      'https://crowstorm.s3.amazonaws.com/products/5f6c606508672c6380a6f5d3_1600938085956_614.jpeg'
    ],
    _id: '5f6c606508672c6380a6f5d3',
    title: 'Gray Training Socks',
    description:
      "Men's Running & Gym Training Socks designed with an elasticized leg to fit securely so you don't worry about them slipping down while you run.",
    productType: 'Socks',
    color: 'Gray',
    price: 25,
    quantity: 85,
    createdAt: new Date('2020-09-24T09:01:25.872Z')
  }
];

export default products;
