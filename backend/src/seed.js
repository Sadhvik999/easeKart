const prisma_n = require('./db/dbConfig');
const prisma = prisma_n.prisma;

// Prices converted to INR (1 USD = 83 INR)
const products = [
  {
    "name": "HP Chromebook 14 inch Laptop, HD Display, Intel Processor N100, 8 GB RAM, 128 GB UFS, Intel UHD Graphics, Chrome OS, Chalkboard Gray, 14a-nf0099nr",
    "price": 14109.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/714nDz6GxJL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Apple 2025 MacBook Air 13-inch Laptop with M4 chip: Built for Apple Intelligence, 13.6-inch Liquid Retina Display, 16GB Unified Memory, 256GB SSD Storage, 12MP Center Stage Camera, Touch ID; Midnight EPEAT",
    "price": 62167,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71cWZUr9SVL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.8
  },
  {
    "name": "Dell 15 Laptop DC15250-15.6-inch FHD 120Hz Display, Intel Core 3 Processor 100U Processor, 8GB DDR4 RAM, 512GB SSD, Intel UHD Graphics, Windows 11 Home, Onsite Service - Carbon Black",
    "price": 23239.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71d6CcN8Q5L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Overall Pick - 4K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Acer Aspire Go 15 AI Ready Laptop | 15.6&quot; FHD (1920 x 1080) IPS Display | Intel Core 3 Processor N355 | Intel Graphics | 8GB DDR5 | 128GB UFS | Wi-Fi 6 | Windows 11 Home in S Mode | AG15-32P-39R2",
    "price": 22409.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71H8XhwlwpL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Wed, Dec 10Or fastest delivery Tue, Dec 2Only 8 left in stock - order soon.",
    "rating": 4.4
  },
  {
    "name": "HP Ultrabook Laptop with Copilot AI &amp; Office 365 • Intel High Performance CPU • 8GB RAM • 1.3TB Storage (320GB SSD and 1TB OneDrive) • Windows 11 w/o Earbuds",
    "price": 21579.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71kHSZHz-dL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 300+ bought in past month - FREE delivery Tue, Dec 2",
    "rating": 5
  },
  {
    "name": "Apple 2025 MacBook Air 13-inch Laptop with M4 chip: Built for Apple Intelligence, 13.6-inch Liquid Retina Display, 16GB Unified Memory, 256GB SSD Storage, 12MP Center Stage Camera, Touch ID; Sky Blue EPEAT",
    "price": 62167,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/712dp0yAydL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.8
  },
  {
    "name": "Lenovo IdeaPad 3i Chromebook, 15.6” FHD Display, Intel Celeron N4500, 8GB RAM, 64GB eMMC, 1920x1080 px, 720p Camera, Chrome OS, Abyss Blue ENERGY STAR",
    "price": 15345.04,
    "Category": "Chromebook",
    "imageUrl": "https://m.media-amazon.com/images/I/71bwzCMcQvL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "7K+ bought in past month - FREE delivery Tue, Dec 2",
    "rating": 4.3
  },
  {
    "name": "HP 17.3 inch Laptop, HD+ Display, AMD Ryzen 5 7520U, 16 GB RAM, 512 GB SSD, AMD Radeon Graphics, Windows 11 Home, Natural Silver, 17-cp2199nr",
    "price": 35689.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71vhwzOkcvL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "Lenovo IdeaPad Laptop with Microsoft Office, 12GB RAM, 1.2TB(1TB Cloud &amp; 256GB Storage), Intel High Performance CPU, 11 Hour Battery, SD-Card Reader, Webcam + USB-C, WOWPC Recovery USB, Windows 11",
    "price": 20416.34,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71-IOTiMvGL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Dec 5 - 9Or fastest delivery Tue, Dec 2",
    "rating": 1
  },
  {
    "name": "HP 14 Laptop Student Business 2025 Flagship Computer, AI Copilot, 4-Core 13th Gen Intel CPU, 16GB RAM 628GB Storage (128GB UFS+500GB Ext) 1-Yr Office 365 Long Battery HubxcelAccessory Win 11S Lavender",
    "price": 24621.95,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71HOQvPw3sL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Dec 5 - 9Or fastest delivery Tue, Dec 2",
    "rating": 4.5
  },
  {
    "name": "HP 14 Laptop, Intel Celeron N4020, 4 GB RAM, 64 GB Storage, 14-inch Micro-edge HD Display, Windows 11 Home, Thin &amp; Portable, 4K Graphics, One Year of Microsoft 365 (14-dq0040nr, Snowflake White)",
    "price": 13813.69,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/815uX7wkOZS._AC_UY654_FMwebp_QL65_.jpg",
    "description": "6K+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.1
  },
  {
    "name": "ASUS Vivobook Go 15.6” FHD Slim Laptop, AMD Ryzen 3 7320U Quad Core Processor, 8GB DDR5 RAM, 256GB SSD, Windows 11 Home, Fast Charging, Webcam Shield, Military Grade Durability, Black, E1504FA-AB34 ENERGY STAR",
    "price": 21828.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71DhTegVuPL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.3
  },
  {
    "name": "15.6 Inch Laptop with Office 365, 4GB RAM, 128GB Storage Expandable 1TB, 5205U Processor, HD Display, Windows 11 Laptops Computer, Wi-Fi 5, BT4.2, Numpad, Type-C, for Business and Students.",
    "price": 18259.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71dxO5qXigL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 300+ bought in past month - FREE delivery Mon, Dec 8Or fastest delivery Tue, Dec 2Only 14 left in stock - order soon.",
    "rating": 4.4
  },
  {
    "name": "Dell Latitude 3190 11.6&quot; HD 2-in-1 Touchscreen Laptop Intel N5030 1.1Ghz 4GB Ram 128GB SSD Windows 11 Professional (Renewed)",
    "price": 9877,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51bDy5c3eJL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2",
    "rating": 4.1
  },
  {
    "name": "Dell Chromebook 11 3100 11.6&quot; Chromebook - 1366 x 768 - Celeron N4020-4 GB RAM - 16 GB Flash Memory - Chrome OS - Intel HD Graphics - English (US) Keyboard - Bluetooth (Renewed)",
    "price": 4897,
    "Category": "Chromebook",
    "imageUrl": "https://m.media-amazon.com/images/I/61zTekYPPRL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Thu, Dec 4",
    "rating": 4.1
  },
  {
    "name": "HP OmniBook 5 16 inch Next Gen AI PC, 2K Touchscreen, Snapdragon X Plus X1P-42-100, 16 GB RAM, 512 GB SSD, Qualcomm Adreno GPU, Windows 11 Home, Copilot+ PC, Glacier Silver, 16-fb0000nr",
    "price": 37349.17,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/71gpGCFdz-L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Phatom 15.6&quot; FHD Laptop Computers, Compatible with Windows 11, Pentium Gold (Beats Pentium, Celeron), Cooling Fan, 4GB RAM, 128GB SSD, Up to 2TB, HDMI, for Business, Student",
    "price": 14939.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71CaJNgo8TL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Mon, Dec 1",
    "rating": 5
  },
  {
    "name": "Acer Nitro V Gaming Laptop | Intel Core i5-13420H Processor | NVIDIA GeForce RTX 4050 Laptop GPU | 15.6&quot; FHD IPS 165Hz Display | 8GB DDR5 | 512GB Gen 4 SSD | Wi-Fi 6 | Backlit KB | ANV15-52-586Z",
    "price": 48139.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71gXelI8upL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Mon, Dec 1",
    "rating": 4.1
  },
  {
    "name": "Apple 2025 MacBook Air 15-inch Laptop with M4 chip: Built for Apple Intelligence, 15.3-inch Liquid Retina Display, 16GB Unified Memory, 256GB SSD Storage, 12MP Center Stage Camera, Touch ID; Sky Blue EPEAT",
    "price": 78767,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71FsB1FaZ7L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 5K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.8
  },
  {
    "name": "Laptop Computer, 8GB RAM 256GB SSD, Laptop with Gold 6500Y (Beat N5095, Up to 3.4GHz), 14 Inch FHD IPS Display, Type-C, HDMI, USB3.2, BT5.2, WiFi 5, Laptops",
    "price": 15769.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71zCo9r59iL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 300+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 5
  },
  {
    "name": "ASUS 15.6” Vivobook Go Slim Laptop, Thin &amp; Portable for Student Study, Intel Dual Core N4500, 4GB RAM, 128GB SSD, Windows 11, Star Black, L510KA-ES04",
    "price": 17347,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61KZBt8QeGL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Dec 4 - 8Or fastest delivery Wed, Dec 3Only 20 left in stock - order soon.",
    "rating": 3.9
  },
  {
    "name": "laptop 16-inch , 8GB DDR 256GB SSD portable laptop computer, expandable to 1TB, Pentium quad-core CPU up to 2.64 GHz, 9000mAh battery, interface, USB3.0 interface, dual-band WiFi, webcam, slim laptops",
    "price": 16599.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71SWGBdy56L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "New on Amazon in past month - FREE delivery Mon, Dec 8Or fastest delivery Tue, Dec 2",
    "rating": 4.8
  },
  {
    "name": "HP Chromebook 14 Laptop, Intel Celeron N4120, 4 GB RAM, 64 GB eMMC, 14&quot; HD Display, Chrome OS, Thin Design, 4K Graphics, Long Battery Life, Ash Gray Keyboard (14a-na0226nr, 2022, Mineral Silver)",
    "price": 13026.02,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71tXLOE7wIL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "5K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Dell 16 Laptop DC16256-16.0-inch 16:10 FHD+ Anti-Glare Non-Touch 300nits Display, AMD Ryzen 7 250, AMD Radeon Graphics, 16GB Memory, 1TB SSD, Backlit English Keyboard with Fingerprint Reader",
    "price": 45649.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/719ZdjMDwaL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "acer Gateway Chromebook 314 CBO314-1H-C476 Laptop | Intel Celeron N4500 | 14&quot; Full HD (1920 x 1080) Display | 4GB LPDDR4X | 64GB eMMC | Wi-Fi 5 802.11ac | Chrome OS | Star Black",
    "price": 13279.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61bKoTqjTZL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.1
  },
  {
    "name": "Lenovo IdeaPad Slim 3 Chromebook - 2024 - Lightweight Laptop - Waves MaxxAudio® Speakers - 14&quot; HD Display - HD 720p Camera - 4GB Memory - 64GB Storage - MediaTek Kompanio 520 - Abyss Blue ENERGY STAR",
    "price": 13694.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61BRKJYlOSL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "ASUS ROG Strix G16 (2025) Gaming Laptop, 16” ROG Nebula Display 16:10 2.5K 240Hz/3ms, NVIDIA® GeForce RTX™ 5070 Ti GPU, Intel® Core™ Ultra 9 275HX Processor, 32GB DDR5, 1TB SSD, Wi-Fi 7, Win11 Home",
    "price": 156039.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71WH7jtyWpL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Mon, Dec 1",
    "rating": 4.4
  },
  {
    "name": "ASUS TUF Gaming F16 Gaming Laptop, 16” FHD+ 144Hz IPS-Level 16:10 Display, Intel® Core™ 5 210H, NVIDIA® GeForce RTX™ 4050, 16GB DDR5, 512GB PCIe Gen4 SSD, Wi-Fi 6, Win11 Home, FX607VU-SS53",
    "price": 62249.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71ZEi4fMrzL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.6
  },
  {
    "name": "Acer Nitro V Gaming Laptop | Intel Core i7-13620H Processor | NVIDIA GeForce RTX 4050 Laptop GPU | 15.6&quot; FHD IPS 165Hz Display | 16GB DDR5 | 1TB Gen 4 SSD | Wi-Fi 6 | Backlit KB | ANV15-52-76NK",
    "price": 66399.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/719MpRszpCL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Lenovo 14 G4 - Laptop for Business - Intel Core i7-13620H - 14&quot; FHD Display - 8GB RAM (upgradable to 16GB) - 256GB Storage (upgradable to 1TB) - Windows 11 Home - Thin &amp; Portable - Business Black",
    "price": 29049.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71X5ikWiuoL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 400+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.3
  },
  {
    "name": "SGIN 15.6 Inch Laptop, 16GB RAM 1024GB SSD, Laptops Computers Celeron N5100, Win 11, Portable Notebook, 7000mAh, WiFi 6, 180° Open Angle, USB 3.2, for Business and Students ClimatePartner certified",
    "price": 27389.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71lw+7J6yJL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.8
  },
  {
    "name": "HP 15.6 inch Laptop, HD Touchscreen Display, AMD Ryzen 3 7320U, 8 GB RAM, 256 GB SSD, AMD Radeon Graphics, Windows 11 Home, Natural Silver, 15-fc0399nr",
    "price": 27389.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71XTCkgshfL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "Acer 315 15.6&quot; Chromebook Intel Celeron N4500 1.1GHz 4GB RAM 64GB Flash Chrome OS (Renewed)",
    "price": 8963.17,
    "Category": "Chromebook",
    "imageUrl": "https://m.media-amazon.com/images/I/71TY40i6T7L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Dec 9 - 11",
    "rating": 4.5
  },
  {
    "name": "Samsung 14&quot; Galaxy Chromebook Go Laptop PC Computer, Intel Celeron N4500 Processor, 4GB RAM, 64GB Storage, ChromeOS, XE340XDA-KA2US, Student Laptop, Silver",
    "price": 14027,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71pJuxRFm3L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "5K+ bought in past month - $14.50 delivery Thu, Dec 4Or fastest delivery Tue, Dec 2",
    "rating": 4
  },
  {
    "name": "HP Ultrabook Laptop with Copilot AI &amp; Office 365 • Intel 4-Core CPU • 1.1TB Storage (1TB OneDrive and 128GB SSD) • 8GB RAM • Windows 11 w/o Earbuds",
    "price": 22409.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71KLbSPDOsL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Tue, Dec 9Or fastest delivery Tue, Dec 2",
    "rating": 4.1
  },
  {
    "name": "HP Laptop in Pale Rose Gold • 8GB RAM • 1.1TB Storage (128GB SSD + 1TB Cloud) • Intel 4-Core Performance • Windows 11 • Office 365 • Portable Notebook for School &amp; Everyday Use",
    "price": 22409.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71DtU1z-xVL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Tue, Dec 9Or fastest delivery Tue, Dec 2",
    "rating": 5
  },
  {
    "name": "HP Ultrabook Laptop for Students and Business • Office 365 &amp; Copilot AI • Intel 4-Core CPU • 1.1TB Storage (1TB OneDrive and 64GB SSD) • 8GB RAM • Windows 11 w/o Mouse",
    "price": 21579.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71Voai0nShL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Tue, Dec 9Or fastest delivery Tue, Dec 2",
    "rating": 5
  },
  {
    "name": "HP 14&quot; Laptop 2025 Business Student Slim Computer, 1-Y Office 365, Copilot AI, Quad-Core Intel CPU, 16GB RAM, 128GB UFS &amp; 256GB SD Card, JQ2XzAccessory, Wi-Fi 6, Win 11 Pro, Sky Blue",
    "price": 31539.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71UxMsGJJlL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Tue, Dec 2",
    "rating": 4.4
  },
  {
    "name": "ASUS CX1500CNA Chromebook 15.6&quot; HD Laptop, Intel Celeron N3350 Processor, 4GB RAM, 64GB eMMC Flash Memory, Intel HD Graphics, HD Webcam, Stereo Speakers, Chrome OS, Black, (renewed)",
    "price": 9129.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/81qIxoqEaZL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Mon, Dec 1",
    "rating": 4.2
  },
  {
    "name": "Lenovo Flagship Chromebook, 14&#x27;&#x27; FHD Touchscreen Slim Thin Light Laptop Computer, 8-Core MediaTek Kompanio 520 Processor, 4GB RAM, 64GB eMMC, WiFi 6,Chrome OS, Abyss Blue",
    "price": 15055.37,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61KlKRdsQ7L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Dec 10 - 15Or fastest delivery Dec 10 - 12",
    "rating": 4.3
  },
  {
    "name": "jumper 16 inch Convertible Laptop, Laptop Computer with Quad Core N95 Processor (Up to 3.4GHz), 16GB DDR5 RAM 640GB Storage, 360 Degree Touchscreen, Backlit Keyboard, Fingerprint Reader, BT5.2, WiFi 6",
    "price": 33199.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71fmQewFppL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "New on Amazon in past month - FREE delivery Thu, Dec 4Or fastest delivery Tue, Dec 2Only 5 left in stock - order soon.",
    "rating": 5
  },
  {
    "name": "Lenovo IdeaPad 1 Student Laptop, Intel Dual Core Processor, 20GB RAM, 1TB SSD + 128GB eMMC, 15.6&quot; FHD Display, 1 Year Office 365, Windows 11 Home, Wi-Fi 6, Webcam, Bluetooth, SD Card Reader, Grey",
    "price": 31460.32,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/715Hn1Gcv7L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2",
    "rating": 4.1
  },
  {
    "name": "HP Latest Stream 14&quot; HD Laptop, Intel Celeron Processor, 4GB Memory, 64GB eMMC Storage, Fast Charge, HDMI, Up to 11 Hours Long Battery Life, Office 365 1-Year, Win 11 S, Microfiber Bundle, White",
    "price": 14442,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51qhN7a-AgL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Tue, Dec 2Only 19 left in stock - order soon.",
    "rating": 4.2
  },
  {
    "name": "HP 15.6 inch Laptop, HD Touchscreen Display, AMD Ryzen 5 7520U, 8 GB RAM, 512 GB SSD, AMD Radeon Graphics, Windows 11 Home, Natural Silver, 15-fc0499nr",
    "price": 39009.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71ffHcmP3KL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "Lenovo IdeaPad 1 Student Laptop, 15.6&quot; FHD Display, Intel Dual Core Processor, 12GB RAM, 512GB SSD + 128GB eMMC, 1 Year Office 365, Wi-Fi 6, Webcam, Bluetooth, SD Card Reader, Windows 11 Home, Grey",
    "price": 23916.45,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71MC0412PeL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.2
  },
  {
    "name": "Lenovo IdeaPad Laptop Computer 2025, 15.6&quot; Display, 12GB RAM, 1.1TB Storage (500GB SSD + 128GB eMMC + 500GB Ext), Intel Dual Core Processor, Long Battery, MarxsolAccessory, 1 Year Office 365, Win 11",
    "price": 24621.95,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71QP8+NusQL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 400+ bought in past month - FREE delivery Dec 8 - 10Or fastest delivery Tue, Dec 2",
    "rating": 4.2
  },
  {
    "name": "LETSUNG 14&quot; Itel Laptop Computer, Celeron N4000 (Dual-Core) | 4GB RAM | 256GB SSD | Ultra Slim Design | HDMI &amp; USB 3.2 | 2.4G/5G WiFi | Webcam | for Home",
    "price": 10959.32,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61NculL+QEL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Mon, Dec 1",
    "rating": 5
  },
  {
    "name": "HP 255 G10 Laptop for Home or Work - Lifetime Microsoft Office 365 for Web - 15.6&quot; Full HD - Ryzen 3 7330U (Beat Intel i5-1135G7) - 16GB RAM - 256GB SSD - HDMI - USB-C - Windows 11 w/o Mouse",
    "price": 33199.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71xKepygovL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Wed, Dec 3",
    "rating": 4.3
  },
  {
    "name": "2025 Laptop,15.6-inch IPS with Windows 11 PRO Laptop with Quad-Core N95(Up to 3.4GHz),16GB DDR4 512GB SSD,Metal Shell, BT5.0, 5G WiFi, USB3.2, Type_C, Webcam, 38Wh Battery",
    "price": 26808.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71NR-KZljTL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tue, Dec 2",
    "rating": 5
  },
  {
    "name": "Lenovo IdeaPad Slim 3X - 2025 - Everyday AI Laptop - Copilot+ PC - 15.3&quot; WUXGA Display - 16 GB Memory - 512 GB Storage - Qualcomm® Snapdragon® X - Luna Grey ENERGY STAR",
    "price": 37349.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71nYpJKrGNL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.1
  },
  {
    "name": "ASUS Vivobook Go 15.6” Slim Laptop, AMD Ryzen 5 7520U, 8GB, 512GB, Windows 11 Home, Cool Silver, Military Grade Durability, Fast Charging, Webcam Shield, E1504FA-AS54 ENERGY STAR",
    "price": 27389.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71Os2Kn40pL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.2
  },
  {
    "name": "HP Rose Gold Ultrabook 14 Laptop with Office 365, Intel 4-Core CPU, 1.1TB Storage (1TB OneDrive and 64GB Emmc), 8GB RAM, Windows 11, No Mouse",
    "price": 22076.34,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/712a0TdtYmL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Wed, Dec 3",
    "rating": 4.4
  },
  {
    "name": "win11 Laptop Computer, 8GB RAM 128GB ROM, Celeron Dual core Processors, 10&quot; Netbook Computer with WiFi, Webcam and Bluetooth, Mini Laptop with Bag, Mouse, Headphone and Mouse Pad",
    "price": 16599.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71Wti-9hbgL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "New on Amazon in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 5
  },
  {
    "name": "HP Pavilion 15.6&quot; Laptop | 13th Gen Intel Core i3 Processor | 16GB DDR4 RAM | 640GB Storage (128GB PCIe SSD + 512GB External) | AI-Enhanced Windows 11 | Privacy Webcam | Up to 11.5 Hrs Battery",
    "price": 33199.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71sOBdoj5KL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 200+ bought in past month - FREE delivery Tue, Dec 2",
    "rating": 4.6
  },
  {
    "name": "Laptop Computer, Laptop with Gold 6500Y (Beat N5095, Up to 3.4GHz), 16GB RAM 256GB SSD, 14-Inch FHD IPS Display, Bluetooth, WiFi, HDMI, Type-C PD, 38Wh Battery, Thin &amp; Portable Laptops",
    "price": 17304.67,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71Av2Me0Q3L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Mon, Dec 1",
    "rating": 5
  },
  {
    "name": "15.6&quot; Laptop Computer Notebook, 4-Core N95 Processor, FHD Display, Backlit Keyboard, Fingerprint, Webcam, Bluetooth, WiFi, Win 11 Pro, 10TB Upgradeable, T152A, 16GB RAM, 1TB NVMe SSD, Silver Global Recycled Standard",
    "price": 22865.67,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71ODA-bZNnL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "Latest 2025 Upgraded Android Tablet 10.1 Inch with IPS HD Touch Screen, Dual Camera, 64GB Storage 1TB Expansion, 8 in 1 Tablets Kit with Keyboard, Protective Case, Mouse, Stylus, BT 5.4, WiFi 6",
    "price": 5809.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71iMgJI7qtL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "ASUS Chromebook CX15 Laptop, 15.6&quot; FHD Anti-Glare Display, Intel Celeron N4500 Processor, 128GB Storage, 8GB RAM, ChromeOS, Pure Grey, CX1505CKA-AS88F-PG ENERGY STAR EPEAT",
    "price": 18259.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71SP8bVXbNL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.3
  },
  {
    "name": "HP Chromebook 14 Laptop, Intel Celeron N4000 Processor, 4 GB RAM, 32 GB eMMC, 14” HD Display, Chrome, Lightweight Computer with Webcam and Dual Mics, Home, School, Music, Movies (14a-na0021nr, 2021)",
    "price": 13778,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/81b6IIclRfS._AC_UY654_FMwebp_QL65_.jpg",
    "description": "300+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PMOnly 16 left in stock - order soon.",
    "rating": 4.4
  },
  {
    "name": "Dell Inspiron 15 3530 Touchscreen Laptop Computer for Business &amp; Student, 32GB RAM, 1TB SSD, Win 11 Pro, Intel 10-Core i5-1334U, 15.6&quot; WVA LED FHD Anti-Glare Display, AI Copilot, w/Accessories",
    "price": 63079.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/712fc0USPuL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - New on Amazon in past month - FREE delivery Tue, Dec 2",
    "rating": 5
  },
  {
    "name": "Lenovo 15.6&quot; FHD Chromebook-Intel Quad-Core N4120(&gt; N4020) 4GB RAM,128GB Storage,(64GB eMMC+64GB SD Card),Home &amp; Student Laptop,with Privacy Camera,Wi-Fi6,HDMI1.4,Chrome OS,Artic Grey",
    "price": 14886.05,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51u9bnMVlVL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 300+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Wed, Dec 3",
    "rating": 4.6
  },
  {
    "name": "HP 14&quot; LED Business Laptop Computer, 16GB RAM 320GB Storage (64GB eMMC+256GB SD Card), Intel Quad-Core N4120, Windows 11 S Laptop with 1-Year Microsoft Office 365, PLUSERA Earphones, Silver",
    "price": 21869.67,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71liMr0u75L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 400+ bought in past month - FREE delivery Wed, Dec 3",
    "rating": 4.2
  },
  {
    "name": "ASUS Vivobook Laptop 2025 Ultra Portable Business Computer, 14&quot; FHD Display, 16GB RAM, 1TB Storage (512GB SSD + 500GB Ext), 6-Core Intel i3-1315U, MarxsolAccessory, Win 11 Pro, Lifetime Office 2024",
    "price": 30971.45,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/81A1QeoicML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 400+ bought in past month - FREE delivery Dec 8 - 10Or fastest delivery Tue, Dec 2",
    "rating": 4.2
  },
  {
    "name": "HP Ultra Slim Laptop for Students and Business | 1 Year Office 365 | 1.1TB Storage (1TB Cloud and 64GB Hard Drive) | Intel Quad-Core, 8GB RAM | Windows 11 Home w/o Earbuds",
    "price": 21579.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71gtx6JxDrL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Wed, Dec 3",
    "rating": 4.3
  },
  {
    "name": "Dell Inspiron 15 3000 Laptop Computer, 15.6&quot; FHD Business Laptop, Intel Core i7 (10-Cores) | Windows 11 Pro | 64GB RAM 2TB SSD | 10-Key Number Pad | Wi-Fi 6",
    "price": 207499.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71BUzVH8B9L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Tue, Dec 9Or fastest delivery Wed, Dec 3Only 3 left in stock - order soon.",
    "rating": 4.7
  },
  {
    "name": "Acer Aspire 14 AI Copilot+ PC | 14&quot; WUXGA Display | Intel Core Ultra 5 Processor 226V | NPU: Up to 40 Tops - GPU: Up to 53 Tops | Intel ARC 130V | 16GB LPDDR5X | 512GB SSD | Wi-Fi 6E | A14-52M-51S1",
    "price": 36519.17,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/712S6q+GQjL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "HP Stream 14&quot; HD BrightView Laptop, Intel Processor N150, 16GB RAM, 416GB Storage (128GB eMMC + 288GB Docking Station Set), Intel UHD Graphics, 720p Camera, Wi-Fi, 1 Year Office 365, Win 11 S, Gold",
    "price": 24817,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71wVOooh9pL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Mon, Dec 1",
    "rating": 4.5
  },
  {
    "name": "Lenovo Ideapad 1i 14” Laptop with 1-Yr Office 365 (4GB RAM,128GB Storage(64GB eMMC + 64GB SD Card), Intel Dual-Core) for Business, Student, Home, Webcam, Anti-Glare, Wi-Fi 6, Win 11 Home in S",
    "price": 13403.67,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71oTEPLpgoL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Tue, Dec 2",
    "rating": 4.2
  },
  {
    "name": "Acer Aspire 16 AI Copilot+ PC | 16&quot; WUXGA 120Hz Multi-Touch Display | Snapdragon X | NPU: 45 Tops - GPU: Up to 1.7 TFLOPs | 16GB LPDDR5X | 512GB PCIe Gen 4 SSD | Wi-Fi 7 | A16-11MT-X669",
    "price": 43907,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/71NoF2JV5oL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Mon, Dec 1Only 3 left in stock - order soon.",
    "rating": 4.6
  },
  {
    "name": "HP Chromebook 11A G8 Education Edition AMD A4-9120C 4GB DDR4-1866 SDRAM, 32GB eMMC 11.6-inch WLED HD Webcam Chrome OS (Renewed)",
    "price": 5720.36,
    "Category": "Chromebook",
    "imageUrl": "https://m.media-amazon.com/images/I/81LUKMXGZJL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Tue, Dec 9Or fastest delivery Dec 2 - 3Only 1 left in stock - order soon.",
    "rating": 4.1
  },
  {
    "name": "Samsung 15.6&quot; Galaxy Book5 360 Copilot+ PC, AI Business Laptop, Windows 11 Pro, Intel Core Ultra 5 Processor 226V, FHD AMOLED Touchscreen, 16GB/512GB, 2025 Model, NP754QHA-KA1US, Gray",
    "price": 82999.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71XaaBonXVL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "ASUS Vivobook 16 Laptop, 16” WUXGA 60Hz Display, Intel Core i5-13420H, Intel Iris Xᵉ Graphics, 16GB Memory, 512GB Storage, Windows 11, Cool Silver, F1605VA-ES56 ENERGY STAR",
    "price": 35689.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71H08DfcnPL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.2
  },
  {
    "name": "HP 17t Laptop Computer, 17.3&quot; FHD(1920×1080), Intel 10-Core i5-1334U, Backlit KB, Fingerprint, Window 11 Pro Laptop for Business &amp; Students, Redragon Patent Kit, 32GB RAM, 1TB SSD",
    "price": 71379.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71bccqAu2KL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - New on Amazon in past month - FREE delivery Tue, Dec 2",
    "rating": 4.5
  },
  {
    "name": "HP High-Performance 17.3&quot; Laptop, 17.3&quot; HD+ Touchscreen, 8-Cores Intel i3-N305, 32GB RAM, 128GB eMMC + 1TB PCIe SSD, Webcam, HDMI, Numeric Keypad, Wi-Fi 6, Windows 11 Pro, Silver",
    "price": 51172.82,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71Is5wdWysL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2",
    "rating": 4.3
  },
  {
    "name": "HP 14&quot; Ultral Light Laptop for Students and Business, Intel Quad-Core, 8GB RAM, 192GB Storage(64GB eMMC+128GB Ghost Manta SD Card), 1 Year Office 365, USB C, Win 11 S",
    "price": 22234.04,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71pC5a07lyL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "400+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.1
  },
  {
    "name": "Dell Inspiron 15 3530 Business Laptop, 15.6&quot; FHD Touchscreen, 16GB RAM 512GB PCIe SSD Intel 10-Core i5-1334U (Beat i7-1250U), Computer for Student-Home Copilot AI WiFi 6 Win 11 Pro w/GM Accessory",
    "price": 41499.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71sdSJz7GtL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Fri, Dec 5Or fastest delivery Tue, Dec 2",
    "rating": 4.5
  },
  {
    "name": "Lenovo IdeaPad Slim 3 Touchscreen Laptop (15.3&quot; FHD+, AMD Ryzen 5 8540U (&gt; Intel i7-1355U), 16GB RAM, 512GB SSD) for Business, Home, 1080p IR Webcam, Backlit, 14-Hr Battery Life, Wi-Fi 6, Win 11 Pro",
    "price": 38801.67,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/719lQuRmmNL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 50+ bought in past month - FREE delivery Wed, Dec 3Or fastest delivery Mon, Dec 1Only 14 left in stock - order soon.",
    "rating": 4.6
  },
  {
    "name": "Laptop Computer, 16GB RAM Laptop 256GB SSD, 6500Y Processor, 15.6 Inch 1080P IPS Display Laptop for School, Business, Support WiFi 5, BT 5.2",
    "price": 18011,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61X3FePQyAL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "50+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Motorola Moto G - 2025 | Unlocked | Made for US 4/128GB | 50MP Camera | Forest Gray",
    "price": 12449.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/8160OiLlJEL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "SAMSUNG Galaxy S25 Ultra, 512GB Smartphone, Unlocked Android, AI Night Mode Camera, Snapdragon 8 Elite Fast Processor, 5000mAh Battery, Built-in S Pen, 2025, US 1 Yr Warranty, Titanium Black ECOLOGO EPEAT",
    "price": 84659.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61n0lmxP5-L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Overall Pick - 2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.6
  },
  {
    "name": "Samsung Galaxy S25 Cell Phone, 256GB Smartphone, Unlocked Android, AI Night Mode Camera, Snapdragon 8 Elite Fast Processor, ProScaler Display, 4000mAh Battery, 2025, US 1 Yr Warranty, Navy ECOLOGO EPEAT",
    "price": 58666.89,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61C17Al0dhL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.6
  },
  {
    "name": "Motorola Moto G Play | 2024 | Unlocked | Made for US 4/64GB | 50MP Camera | Sapphire Blue",
    "price": 7884.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/61xk4XNRktL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 7K+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Mon, Dec 1",
    "rating": 4.2
  },
  {
    "name": "Samsung Galaxy A16 5G A Series, Unlocked Android Smartphone, Large AMOLED Display, Durable Design, Super Fast Charging, Expandable Storage, 5G Connectivity, US Version, 2025, Light Gray ECOLOGO EPEAT",
    "price": 12449.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71VV0kyOKCL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 4K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Google Pixel 9a with Gemini - Unlocked Android Smartphone with Incredible Camera and AI Photo Editing, All-Day Battery, and Powerful Security - Iris - 128 GB ECOLOGO",
    "price": 28967,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61-39gvsZWL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Motorola Moto G 5G | 2024 | Unlocked | Made for US 4/128GB | 50MP Camera | Sage Green",
    "price": 10248.84,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71Sbx9zQN3L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.2
  },
  {
    "name": "Motorola Moto G Stylus 5G | 2024 | Unlocked | Made for US 8/256GB | 50MP Camera | Caramel Latte",
    "price": 14938.34,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/61LE9-6KxdL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Samsung Galaxy A36 5G A Series, 128GB Unlocked Android Smartphone, AMOLED Display, Rugged Design, 5G Connectivity, Affordable Performance, US Version, 2025, US 1 Yr Warranty, Awesome Lavender",
    "price": 24899.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/612jJWCgFcL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.3
  },
  {
    "name": "Google Pixel 10 - Unlocked Android Smartphone - Gemini AI Assistant - Advanced Triple Rear Camera, Fast-Charging 24+ Hour Battery, and 6.3&quot; Actua Display - Obsidian - 128 GB (2025 Model) ECOLOGO",
    "price": 49717,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61SR9daEx9L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "Apple iPhone 14 (Renewed), 128GB, Blue - Unlocked",
    "price": 25447.8,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/51twnyEBC8L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "4K+ bought in past month - FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2",
    "rating": 4.1
  },
  {
    "name": "Google Pixel 9a with Gemini - Unlocked Android Smartphone with Incredible Camera and AI Photo Editing, All-Day Battery, and Powerful Security - Peony - 128 GB ECOLOGO",
    "price": 28967,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61IgWXs5BRL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Google Pixel 10 Pro - Unlocked Android Smartphone - Gemini AI Assistant, Triple Rear Camera System, Fast-Charging 24+ Hour Battery, and 6.3&quot; Super Actua Display - Moonstone - 128 GB (2025 Model) ECOLOGO",
    "price": 62167,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61OxyUOWVKL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "OnePlus 13,16GB RAM + 512GB Storage,Dual-SIM,Unlocked Android Smartphone, Snapdragon 8 Elite, 80W SUPERVOOC Fast Charging and 50W AIRVOOC Charging, Advanced Hasselblad Camera, 2025, Midnight Ocean",
    "price": 66399.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71nKK2+IoYL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.6
  },
  {
    "name": "Motorola razr | 2024 | Unlocked | Made for US 8/256GB | 50MP Camera | Beach Sand",
    "price": 33199.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/61sMPPbqbLL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.2
  },
  {
    "name": "Samsung Galaxy S22 Smartphone, Factory Unlocked Android Cell Phone, 128GB, 8K Camera &amp; Video, Brightest Display, Long Battery Life, Fast 4nm Processor, US Version, Phantom Black (Renewed)",
    "price": 14027,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61M4ndNetDL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Tue, Dec 2",
    "rating": 3.9
  },
  {
    "name": "Google Pixel 9 Pro XL - Unlocked Android Smartphone with Gemini, Triple Rear Camera System, 24-Hour Battery, and 6.8&quot; Super Actua Display - Hazel - 128 GB ECOLOGO",
    "price": 58017,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/712n8i9spML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Samsung Galaxy A11 SM-A115A 32GB Single-Sim Android Smartphone - Black (Renewed) (Black, GSM Unlocked)",
    "price": 5748.58,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/41vLKi5F+WL._AC_UY500_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4
  },
  {
    "name": "Hercules DJControl Mix – Bluetooth Wireless DJ Controller for Smartphones (iOS and Android) – dJay app – 2 Decks, White",
    "price": 9047,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61fUl+0knvL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Google Pixel 7 5G, US Version, 128GB, Obsidian - Unlocked (Renewed)",
    "price": 16517,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/61GaroZ9M6L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Tue, Dec 2",
    "rating": 4
  },
  {
    "name": "Samsung Galaxy A21 GSM Unlocked Android Cell Phone, US Version Smartphone, 32GB Storage, Long-Lasting Battery, 6.5” Infinity Display, Quad Camera, Black (Renewed)",
    "price": 6639.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81Hfn5ibXHL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Wed, Dec 3Only 8 left in stock - order soon.",
    "rating": 3.9
  },
  {
    "name": "SAMSUNG Galaxy S22 128 GB Green (Renewed)",
    "price": 15745.1,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/71c5rhsUkxL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2Only 1 left in stock - order soon.",
    "rating": 4
  },
  {
    "name": "TCL 60 XE NXTPAPER 5G Cell Phone, AT&amp;T, T-Mobile &amp; Verizon Unlocked Android Smartphone, 8GB+128GB, 6.8&quot; 120Hz Paper-Like Display, AI Features, 5010mAh Battery, Advanced Camera System, Space Blue",
    "price": 14109.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81IrxvqffWL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.1
  },
  {
    "name": "OSCAL Marine 2 Rugged Phone (2025),11000mAh Rugged Smartphone, NFC, 24GB +256GB/ 2TB TF, Android 15 Phone, 90HZ,18W, 16+8MP, Gemini AI Gaming Phones, IP69K Protection,6.56&quot;HD, Dual SIM/1TF Slots,Black",
    "price": 13279.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81Ffa9RpCzL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 50+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.7
  },
  {
    "name": "OUKITEL G1 Rugged Smartphone Unlocked - 24+256GB/1TB Android 14 Rugged Cellphones, 6.52” HD Display IP68/IP69K 10600mAh Battery 48MP Rear Camera Waterproof Phone, Fingerprint/Dual Sim/NFC 2025",
    "price": 12449.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/919aLPXSUyL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "50+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.9
  },
  {
    "name": "Nothing Phone (3) Cell Phone, 2025 New 5G Unlocked Phones 256GB, Android 15, Snapdragon 8s Gen4, AI Mobile Phones with Four 50MP Cameras &amp; AMOLED Display, 5150mAh, Glyph Interface, Smartphone Black",
    "price": 53037,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61YbN9tT88L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "SAMSUNG Galaxy A16 4G Dual SIM (128GB, 2025) 6.7&quot; 90Hz AMOLED, Splash Resistant, 8Core, 50MP Camera (Factory Unlocked International Model for GSM, Global) A165M/DS (25W Fast Charger Bundle, Black)",
    "price": 11034.02,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/51PEgOzPKLL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Samsung Galaxy Z Fold7 Cell Phone, 512GB AI Smartphone, Unlocked Android, AI Photo Edits, Large Screen, Long Battery Life, 2025, US 1 Yr Manufacturer Warranty, Silver Shadow",
    "price": 142759.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71Q2nfOzmmL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "OUKITEL C61 Pro Android 15 Phone - 6.88&quot; HD+ Screen Cell Phone Unlocked, 24GB+256GB/SD 1TB, 5150mAh Battery Smartphone, 13MP Camera, 90HZ Refresh Rate, NFC/Face ID/Fingerprint, Supports T-Mobile,Grey",
    "price": 13279.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71sVndUz-KL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "SAMSUNG Galaxy S22 Ultra 5G, US Version, 256GB, Burgundy - Unlocked (Renewed)",
    "price": 27389.17,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/71jZ5DXKPiL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Tue, Dec 2",
    "rating": 3.7
  },
  {
    "name": "Tracfone, Motorola Moto g 5G 2024, 128GB, Prepaid Smartphone, Gray, 50MP Camera, Locked",
    "price": 6474,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71y7mfjjN1L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Wed, Dec 3",
    "rating": 4.2
  },
  {
    "name": "T-Mobile Revvl 7 Pro 5G Unlocked Smartphone, 256GB, Azurite Blue",
    "price": 10623.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/51Aux7GAksL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.7
  },
  {
    "name": "Google Pixel 10 Pro Fold - Unlocked Android Smartphone - Gemini AI Assistant - Advanced Triple Rear Camera System - 24+ Hour Battery - Foldable Display - Moonstone - 512 GB (2025 Model) ECOLOGO",
    "price": 134377,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61AS5ldoPDL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "16PROMA X Unlocked Smartphone 6.9&quot; HD Screen 6+256GB Smartphone with 128G Memory Card New System 6800mAh Long Battery Dual SIM/Fingerprint Lock/Face ID/GPS (Black)",
    "price": 14773.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71XdfYBbRgL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 3.9
  },
  {
    "name": "DOOGEE Fire 3 Android 15 Rugged Phone Unlocked,8350mAh Battery,12GB+64GB/2TB,Octa Core Rugged Smartphone,5.5&quot; IPS HD+ Display,13MP+8MP,IP68 Waterproof Cell Phone,Face Unlock,NFC/T-Mobile",
    "price": 10248.01,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81R0Tgq0S1L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 50+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PMOnly 18 left in stock - order soon.",
    "rating": 4.4
  },
  {
    "name": "Samsung Galaxy Z Flip7 Cell Phone, 256GB AI Smartphone, Unlocked Android, high-res 50 MP Camera, Powerful Processor, Long Battery Life, 2025, US 1 Yr Manufacturer Warranty, Blue Shadow",
    "price": 74699.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61t-h3yf0CL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 200+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "OUKITEL WP53 Pro Rugged Phone Unlocked Android 15-24GB+256GB Rugged Smartphone with Camping Light, 11000mAh Battery 128dB Louder Speaker, 6.52&quot; HD+ Phone, 50MP Main Camera Waterproof Cell Phone NFC",
    "price": 15769.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81C-fKo2dvL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "NUU N30 Cell Phone Unlocked for T-Mobile, Mint, Metro, Qlink, Tello 6GB/128GB, Teen Phone, Dual SIM 4G, Octa-Core 6.7&quot; 90Hz HD+, Any Parental APP, Unlocked Android Phones, Purple, 1 Year US Warranty",
    "price": 8299.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81GlWcSuzOL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.3
  },
  {
    "name": "Unlocked Phone S24 Ultra Android Phone 8-core 8GB+256GB Cell Phone 7 inch HD Screen Mobile Phone 108MP+48MP Camera 6800 mAh Battery 5G Dual SIM (Titanium Black)",
    "price": 12615.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61S81Ki-WwL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.1
  },
  {
    "name": "DOOGEE Note 58 Android 16 Unlocked Phones, 32GB+128GB/2TB Expand Cell Phone, 6.6&#x27;&#x27;HD+90Hz Dispaly, 6250mah Battery, 4G Dual Sim Unlocked Smartphone, Widevine L1/NFC/OTG/Face Unlock",
    "price": 9459.51,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71948vg6qZL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "TCL Smartphone | 5G UW | 4GB/128GB | 4500 mAh Full Day Battery Life | Gray Smartphone for Verizon (TCL 30V 5G Verizon) (Renewed)",
    "price": 3651.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/31iNmbcpyoL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Wed, Dec 3Only 1 left in stock - order soon.",
    "rating": 3.8
  },
  {
    "name": "SAMSUNG Galaxy S22+ Plus 5G, US Version, 256GB, Pink Gold - Unlocked (Renewed)",
    "price": 18689.94,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/71KlNn88nLL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2Only 1 left in stock - order soon.",
    "rating": 4.3
  },
  {
    "name": "UMIDIGI G9A Unlocked Phones, Android 14 Go Cell Phone, 8GB+64GB/TF 1TB Expend Octa-Core, 4G Dual SIM Card, 3.5mm Headphone Jack 6.75&quot; HD+Display Phones, AI Face Unlock Android Phone,5000mAh,GPS",
    "price": 6224.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/712dYk3yBEL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4
  },
  {
    "name": "X3a 2025 New 4G GSM Unlocked Phones, 6.0” Cell Phone, 2GB RAM Android Phone, 16GB Smartphone 8MP Dual SIM Face Unlock Black",
    "price": 4897,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61xq1QcjnqL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.4
  },
  {
    "name": "S25U Unlocked Phones,8GB+256GB Cell Phone,Android 14.0 Smartphone,7.2-inch HD Screen,6800 mAh Battery,Dual SIM,Dual Standby,5G Phone.(Black)",
    "price": 14939.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/616nwAFNPIL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Sun, Dec 7Or fastest delivery Tomorrow, Nov 30Only 18 left in stock - order soon.",
    "rating": 5
  },
  {
    "name": "Motorola Moto G15 4G LTE (XT2521-2) 4+256GB Dual Sim | GSM Unlocked | International Model | for T-Mobile, Metro PCS, Mint &amp; Tello - (Gray)",
    "price": 11080.5,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/61NoOEt28mL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Fri, Dec 5",
    "rating": 4.2
  },
  {
    "name": "Blackview Fort 1 Rugged Phone Android 15, 18GB+256GB 2TB Expand 10000mAh Battery Rugged Smartphone Unlocked, Gemini AI 6.56 Inch 90Hz, 4G T-Mobile Dual SIM IP69K Waterproof, Fingerprint/NFC/OTG/GPS ClimatePartner certified",
    "price": 14939.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81G1qH6i59L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "50+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Samsung Galaxy A53 5G A Series Cell Phone, Factory Unlocked Android Smartphone, 128GB, 6.5” FHD Super AMOLED Screen, Long Battery Life, US Version, Black (Renewed)",
    "price": 13386.24,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61uAwNHHgaL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Wed, Dec 3",
    "rating": 3.8
  },
  {
    "name": "DOOGEE S200 Rugged Smartphone 5G Unlocked, 32GB+256GB Android 14 Rugged Phone with 1.32&quot; Rear Screen, 10100mAh Battery, 100MP+20MP Night Vision Camera, 6.72&quot;, 120Hz, NFC, 5G Dual SIM, ATT, Verizon",
    "price": 27596.67,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71KtN+WK+5L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4
  },
  {
    "name": "8849 Tank 2 Pro Rugged Smartphone Unlocked, 24+512GB/1TB Android 14 Rugged Cell Phone with Projector, 6.79’’ 4G Waterproof Mobile Phones 23800mAh, Fingerprint/Dual Sim/OTG/GPS/Face ID",
    "price": 31746.67,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71BOkn2sodL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 50+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.1
  },
  {
    "name": "Samsung Galaxy XCover7 Pro 5G and Wi-Fi 6E | Rugged (IP68 Rated) Unlocked (Verizon, AT&amp;T, T-Mobile, US Cellular) | Dual Sim (1 Nano + 1 eSIM) |128 GB | US Version (2025 Model) | Black (SM-G766UZKFN14)",
    "price": 47890.17,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/61xBB4F7DQL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.8
  },
  {
    "name": "DOOGEE Blade GT AI 5G Rugged Phone Unlocked,LED Light Effect,6nm D7050 CPU,32GB+256GB/2TB,10.5mm Ultra-Thin Android 14 Rugged Smartphone,6.72&quot; FHD+120Hz,48MP,5500mAh+18W,NFC/Face ID/Fingerprint/WiFi6",
    "price": 26061.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71m9pOn9gYL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.7
  },
  {
    "name": "Ulefone Note 19 Unlocked Phones, 6.56&quot; HD+ Display, Android 14, 8-Core 6GB+64GB, 5000mAh Battery, 3-Card Slots, Dual 4G Unlocked Smartphones, 8MP+5MP Camera, GPS/Face Recognition - Black",
    "price": 5601.67,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81wDIzPmxNL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "50+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 3.9
  },
  {
    "name": "4G mini Smartphone Unlocked for Kids, 4.0 inch HD Display, 3GB RAM+32GB ROM,Dual SIM Dual Camera,Android 10.0,WiFi,Bluetooth,GPS Pocket (Green)",
    "price": 4564.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61smkpWzKsL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "FUJIFILM Instax Mini Link 2 Smartphone Printer Bundle 2025 - Space Blue",
    "price": 6635.85,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81UwnLdI4QL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.3
  },
  {
    "name": "8849 Tank 3 Pro Rugged Smartphone Unlocked, Android 14 Waterproof Rugged Cell Phone with Projector, 6.79&quot; 23800mAh 5G Mobile Phones 32GB RAM 512GB ROM, Dual SIM/Camping Light/2TB Expand/OTG/GPS",
    "price": 39590.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71HaVVWZgRL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 3.9
  },
  {
    "name": "XIAOMI Redmi A5 4G LTE (for Tmobile Tello &amp; Global) (64GB + 3GB) 32MP Ai Dual Camera 6.88&quot; Model 25028RN03L Dual Sim (Midnight Black)",
    "price": 6930.5,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/51qU8st5hhL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PMOnly 13 left in stock - order soon.",
    "rating": 4.7
  },
  {
    "name": "14PROMA X Unlocked Cell Phone,Long Battery Life 6.82&quot; HD Screen Unlocked Phones,Android14 16+512GB Smartphone with 128G Memory Card,Dual SIM/Fingerprint Lock/Face ID/GPS (Blue)",
    "price": 13196.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71eVarkRdlL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3
  },
  {
    "name": "DOOGEE Note56 Plus Unlocked Android 16 Cell Phone, 48GB + 256GB/2TB TF Expand, 6.56&quot; HD+ 90Hz Display, 6150mAh Battery, 50MP+8MP AI Camera, NFC/OTG/Side Fingerprint, 4G Dual SIM Unlocked Smartphone",
    "price": 12283.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/719xKxWAPcL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - New on Amazon in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.9
  },
  {
    "name": "KOKODI Kids Smart Phone Toys, Birthday Gifts Idea Dinosaur Toys for 3 4 5 6 7 8 Year Old Boys, Touchscreen HD Digital Dual Video Camera, Preschool Learning Toy for Kids 3-5 Travel Trip Activity (Blue)",
    "price": 2246.81,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/5161GbqTokL._AC_UY500_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "OUKITEL C61 Unlocked Cell Phone 2025- Android 15, 6.88&quot; Display Smartphone, 16GB+128GB/1TB, 5150mAh Battery Phone, 13MP Camera, 4G Dual Sim Mobile Phones, Fingerprint/Face Unlock/GPS/BT5.0, Blue",
    "price": 9129.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/813yElrtchL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30Only 16 left in stock - order soon.",
    "rating": 3.9
  },
  {
    "name": "DOOGEE V40 Pro 5G Rugged Phone, 4nm D7300 CPU, 36GB RAM+512GB ROM Android Rugged Smartphone, 6.78&quot; FHD+120Hz Screen, Rugged Cell Phone with 1.47&quot; Rear Screen, 200MP AI Camera, NFC/WiFi 6",
    "price": 41788.84,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61ifltlQ06L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "Blackview BV4800 Pro Rugged Phone,Android 14 Phone 8GB+128GB 2TB Expand, 6.56&quot; 5180mAh Smartphone, 4G T-Mobile Dual SIM Rugged Smartphone Unlocked, Cellphone IP69K Waterproof, 3 Card Slots/Face ID ClimatePartner certified",
    "price": 13279.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/719oU2dlrBL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "CWOWDEFU Android 14 Unlocked Phone, 6.8&#x27;&#x27;Android Smartphone,12 GB RAM with 128 GB ROM,Dual SIM 4G,Octa-Core, Face/Fingerprint Recognition/NFC/OTG/GPS,Support Global Frequency Bands(White)",
    "price": 6639.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61bhlEtigML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.7
  },
  {
    "name": "Samsung Galaxy S22+ Smartphone, Factory Unlocked Android Cell Phone, 256GB, 8K Camera &amp; Video, Brightest Display, Long Battery Life, Fast 4nm Processor, US Version, Phantom White (Renewed)",
    "price": 18835.19,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/51xekry3J5L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2Only 1 left in stock - order soon.",
    "rating": 4.4
  },
  {
    "name": "AliveCor KardiaMobile 6-Lead Personal EKG Monitor – Six Views of The Heart – Detects AFib and Irregular Arrhythmias – Instant Results in 30 Seconds – Works with Most Smartphones",
    "price": 8217,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/410OrFGmnAL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Samsung Galaxy A42 5G, Factory Unlocked Smartphone, Android Cell Phone, Multi-Lens Camera, Long-Lasting Battery, US Version, 128GB, Gray (Renewed)",
    "price": 10022.25,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/91tNntkBzCL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 3.9
  },
  {
    "name": "Android Smartphones For Dummies",
    "price": 1332.15,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81earV35kqL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Mon, Dec 8Or fastest delivery Wed, Dec 3Only 2 left in stock - order soon.",
    "rating": 4
  },
  {
    "name": "OUKITEL G5 Rugged Smartphone Unlocked - 16GB+64GB (1TB TF) Rugged Android Phone with Camping Light, 6300mAh Battery, 6.0&quot; HD Screen Cell Phone, 13MP Main Camera, Face ID/GPS, Supports T-Mobile, Black",
    "price": 11619.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81oDPa3zHKL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "X1 2025 New 4G LTE GSM Unlocked Cell Phone 6.5” HD+ Screen Mobile Phones 2GB RAM Android 10 Smart Phone 16MP Smartphone Dual SIM (for T-Mobile Only USA Market) Face Unlock (Gold)",
    "price": 5725.34,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/618UGRAvwtL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "50+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 3.6
  },
  {
    "name": "8849 Tank 4 Pro Rugged Smartphone 5G, IP68 Waterproof Android 14 Mobile Cell Phones Unlocked with Projector, 32GB+512GB, 6.73’’ AMOLED Screen, 11600mAh(120W)/1200LM Camping Light/GPS/OTG",
    "price": 57269.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71mqrmKt-TL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 3.9
  },
  {
    "name": "Tracfone, Samsung Galaxy A15 5G, 128GB, Prepaid Smartphone, Black, 50MP Main Camera, Locked",
    "price": 11288.83,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71ynX-Eiq0L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.2
  },
  {
    "name": "8849 Tank 4 Rugged Smartphone Unlocked, 5G Android 14 Mobile Phones with 100 Lumens Projector, 6.78’’ AMOLED Screen Waterproof Rugged Phone 512GB, 24GB RAM/1200LM Camping Light/OTG/11600mAh(120W)/GPS",
    "price": 43989.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71wv70EbEqL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 5
  },
  {
    "name": "Ulefone Armor X16 Pro 5G Rugged Smartphone, 16GB+256GB MTK Dimensity 6300 Android 15, 64MP+25MP Main Camera, 10360mAh, 6.56&quot; 120Hz Corning Gorilla Screen, IP68/69K Waterproof, Widevine L1 - Sand Dune",
    "price": 19047.67,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81m5QOfdiZL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Blackview Shark 6 Unlocked Android Phones 5G (2025), Android 15 Cell Phone Unlocked, 6.88&quot; 120Hz Display, 12GB+128GB/2TB, 16MP+8MP AI Camera, 5000mAh/18W,Fingerprint/Face ID,Dual SIM/GPS/OTG/NFC,Black ClimatePartner certified",
    "price": 10789.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71IQkM1wKML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "DOOGEE S118 Pro (2025) Rugged Phone 5G,10800mAh(33W) 24GB+512GB/2TB Rugged Smartphone Unlocked,DDR5,108MP+20MP Night Vision,6.6&#x27;&#x27;FHD+120Hz Cell Phone,Dual SIM/Dual Unlock/NFC/GPS/OTG/WiFi 6",
    "price": 26019.67,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81D6RyzDLkL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Save 22% - FREE delivery Sun, Dec 7Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.1
  },
  {
    "name": "Ulefone Armor X13 Rugged Smartphone, 50MP+24MP Night Vision Camera, Octa-core 12GB RAM 64GB ROM, 6.52 inch Screen, 6320mAh Battery, Android 14 OS, Global Dual 4G, NFC/OTG/GPS/IP68/IP69K, Orange",
    "price": 10581.67,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81oB0HN1+ML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Sun, Dec 7Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "Tracfone, Samsung Galaxy A25 5G, 128GB, Prepaid Smartphone, Black, 50MP Main Camera, Locked",
    "price": 18177,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61KLj+okvjL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "Ulefone Armor X12 Rugged Smartphone, Waterproof Phones Unlocked, Octa-core Android 13, 6GB+32GB, Dual SIM Global 4G LTE, 4860mAh Battery, Face Recognition, Bluetooth, NFC, Compass - Black",
    "price": 7759.67,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/7199NLlggrL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.1
  },
  {
    "name": "Samsung Galaxy Tab A9+ Tablet 11” 64GB Android Tablet, Big Screen, Quad Speakers, Upgraded Chipset, Multi Window Display, Slim, Light, Durable Design, US Version, 2024, Graphite",
    "price": 11619.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61d46oYQgdL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Overall Pick - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Samsung Galaxy Tab A9+ Plus 11” 64GB Android Tablet, Big Screen, Quad Speakers, Upgraded Chipset, Multi Window Display, Slim, Light, Durable, Kids Friendly Design, US Version, 2024, Silver",
    "price": 11619.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61h+qeD-qfL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "Amazon Fire HD 8 tablet (newest model), 8” HD Display, 3GB memory, 32GB, designed for portable entertainment, Black",
    "price": 4564.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/717z5zjuBWL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Amazon Fire HD 10 Kids Pro tablet (newest model) ages 6-12. Bright 10.1&quot; HD screen, includes ad-free content, robust parental controls, 13-hr battery and slim case for older kids, 32 GB, Nebula",
    "price": 8714.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71y1G0zFcbL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Tue, Dec 2",
    "rating": 4.6
  },
  {
    "name": "Samsung Galaxy Tab A9+ Plus 11” 128GB Android Tablet, Big Screen, Quad Speakers, Upgraded Chipset, Multi Window Display, Slim, Light, Durable, Kids Friendly Design, US Version, 2024, Graphite",
    "price": 16517,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61d46oYQgdL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "Apple iPad 11-inch: A16 chip, 11-inch Model, Liquid Retina Display, 128GB, Wi-Fi 6, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Blue EPEAT",
    "price": 28552,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61aPY8odPSL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month",
    "rating": 4.8
  },
  {
    "name": "Tablet 10.1 inch, Android 15 Tablet with Case, 24GB RAM + 64GB ROM 1 TB Expandable, 1280x800 HD IPS Touch Screen, 8H Battery, WiFi 6, BT 5.4, Dual Camera (Blue)",
    "price": 4730.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71DRrQyt3EL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 200+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 5
  },
  {
    "name": "Android 15 Tablet 10 inch, 2025 Tablet with Keyboard, 24GB+256GB+2TB Expand, 2-in-1 Tablets with 8-Core, 5G WiFi, 8000mAh, BT5.0, GMS Certified, with Mouse, Case, Stylus, Split Screen(Black case)",
    "price": 9129.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/81B0lAGrRXL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.9
  },
  {
    "name": "Lenovo Idea Tab - College Tablet - 11″ 2.5K IPS Touchscreen Display - 90Hz - MediaTek Dimensity 6300-4 GB Memory - 128 GB Storage - Integrated Arm Mali-G57 MC2 Tab Pen and Folio Case",
    "price": 13279.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61-7FkUAw-L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 5
  },
  {
    "name": "Amazon Fire HD 8 tablet (newest model), 8” HD Display, 3GB memory, 32GB, designed for portable entertainment, Emerald",
    "price": 4564.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71ltogOU0mL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Amazon Fire HD 10 Kids Pro tablet (newest model) ages 6-12 | Bright 10.1&quot; HD screen | Slim case for older kids, ad-free content, parental controls, 13-hr battery, 32 GB, Mint Recycled Content Certification for Electrical and Electronic Equipment",
    "price": 8714.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71lyJXGvImL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "Lenovo Tab One - Lightweight Tablet - up to 12.5 Hours of YouTube Streaming - 8.7&quot; HD Display - 4 GB Memory - 64 GB Storage - MediaTek Helio G85 - Includes Folio Case",
    "price": 7469.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/713r2sAaC+L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.2
  },
  {
    "name": "Amazon Fire 7 Kids tablet (newest model) ages 3-7. Top-selling 7&quot; kids tablet on Amazon. Includes 6 months of ad-free and exclusive content, easy parental controls, 10-hr battery, 16 GB, Purple",
    "price": 3734.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71999D1LPYL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Dec 9 - 18Or fastest delivery Dec 9 - 14",
    "rating": 4.4
  },
  {
    "name": "Apple iPad Air 11-inch with M3 chip Built for Apple Intelligence, Liquid Retina Display, 256GB, 12MP Front/Back Camera, Wi-Fi 6E, Touch ID, All-Day Battery Life — Space Gray EPEAT",
    "price": 45649.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/710GQJJHx2L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "5K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.8
  },
  {
    "name": "Android 14 Tablet 7 inch Tablets with Case, 8GB RAM 32GB ROM 1TB Expand, Quad-Core Processor Tablet PC, 1024 x 600 IPS Screen, Dual Camera, 3000mAh Battery, Bluetooth, WiFi, GMS, Widevine L1, Navy",
    "price": 3568.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61loA8z3vAL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.7
  },
  {
    "name": "SAMSUNG Galaxy Tab S10 FE 128GB WiFi Android Tablet, Large Display, Long Battery Life, Exynos 1580 Processor, IP68 Water-Resistant, 90 Hz Refresh, S Pen for Note-Taking, US Version, Blue",
    "price": 28053.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61uMtwyF2eL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.6
  },
  {
    "name": "Android 15 Tablet,11 Inch Tablets with Octa Core Processor, 12GB RAM 128GB ROM 1TB Expand, Widevine L1, 8000mAh Battery, 2.4/5Ghz Dual WiFi/GPS/FM, 5/8MP Cameras, Case Included, Black",
    "price": 7469.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/713nv0hM2KL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "11&quot; Tablet, 2025 Android 16 with Octa-core Processor, 8GB RAM+128GB ROM(1TB Expandtion), 7000mAh Battery, HD IPS Large tableta,WiFi 6&amp;BT5.0, Support GMS (Case not Included)",
    "price": 6721.34,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61mGlB8-kML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "COOPERS Tablet 10 inch, Android 15 Tablet, 32GB ROM 1TB Expand Computer Tablets, Quad Core Processor 6000mAh Battery, 1280x800 IPS Touch Screen, 2+8MP Dual HD Camera, Bluetooth WiFi Tablets PC",
    "price": 4149.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/619LZNjQAGL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.7
  },
  {
    "name": "Lenovo Idea Tab Pro with Google Gemini - Student Tablet - 12.7” 3K LCD Display - 8 GB Memory - 128 GB Storage - MediaTek Dimensity 8300 - Includes Pen and Folio Case",
    "price": 23239.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71bDdiCbWmL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Amazon Fire HD 8 Kids Pro tablet (newest model), ages 6-12. Bright 8&quot; HD screen, includes ad-free content, parental controls, 13-hr battery, slim case for older kids, 32GB, Discovery",
    "price": 6224.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71uNK2212vL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 4K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.6
  },
  {
    "name": "10 inch Android Tablet: Octa-Core, 7000mAh, with Stand Case, IPS HD Display, Wi-Fi 6, OTG, Metal Body – Fast &amp; Portable Tablet for Work &amp; Entertainment, 2-Year Protection, 8GB RAM 64GB, Android 15",
    "price": 5518.67,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71u6PKi9NML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4
  },
  {
    "name": "Google Pixel Tablet - Android Tablet with 11-Inch Screen and Extra-Long Battery Life - Porcelain - 8 GB RAM - 128 GB",
    "price": 26228,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/81JV1TrIGlL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Mon, Dec 1Only 12 left in stock - order soon.",
    "rating": 4.5
  },
  {
    "name": "Tablet,10.1&quot; Android Tablet with Octa-core Processor 24GB RAM 128GB ROM HD IPS Touchscreen 8H Battery, Wi-Fi 6, BT 5.0, Dual Camera, Android 15 Tablets 2025",
    "price": 5755.22,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71PbimKAYbL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4
  },
  {
    "name": "Amazon Fire HD 10 Kids tablet (newest model) ages 3-7 | Bright 10.1&quot; HD screen with included ad-free and exclusive content, robust parental controls, 13-hr battery, 32 GB, Pink Recycled Content Certification for Electrical and Electronic Equipment",
    "price": 8714.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71RH9DZonKL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.6
  },
  {
    "name": "weelikeit Tablet 10 inch, Android 14 Tablets with Octa-Core Processor 12GB(6+6) RAM 128GB ROM, 1200x1920 FHD Screen, 5G WiFi, 5MP+13MP Dual Camera, Bluetooth 5.0, 7000mAh Battery (Gray)",
    "price": 3983.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/710DXmctHhL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 50+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.1
  },
  {
    "name": "Android Tablet 10 Inch, Android 15 Tablets 2025 for Adults, Octa-Core, 12GB RAM,128GB Storage(2TB Expandable), Large Touch Screen Tablet with 10H Battery Life,WiFi &amp; Bluetooth 5.0,Gray Blue",
    "price": 7468.34,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71fHohoCXXL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "Android 15 Tablet, 12GB+64GB+1TB Expand, 10 Tablet Productivity Bundle with Keyboard Case, Stylus Pen, Octa-core CPU, Dual Camera, WiFi6, 6000mAh Battery+18W Fast Charge, Support Face Unlock (Black)",
    "price": 6639.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71w6jWkd0+L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Lenovo Tab Plus - 2024 - Premium Entertainment Tablet - 8 JBL® Speakers - 11.5&quot; 2K LCD Touch Display - 8GB Memory - 128GB Storage - MediaTek™ Helio G99 - Folio Case Included - Luna Grey ENERGY STAR",
    "price": 16184.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71e4cAPBQDL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "TCL NXTPAPER 11 Gen 2 Android Tablet, 11&quot; Drawing Pad &amp; Digital Notebook, Stylus &amp; Flip Case Included, NXTPAPER 4.0 Display, Android 15, AI Tools, 6+6GB RAM, 64GB Storage, 8000mAh Battery, Gray",
    "price": 12449.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/712AJHEddbL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "BYYBUO Tablet 10.1 inch Android 14 Tablets,6GB RAM+64GB ROM Quad-Core Processor 5000mAh Battery, 1280x800 IPS HD Touchscreen 5MP+8MP Camera, Bluetooth,WiFi (Grey)",
    "price": 4147.51,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71CZ14Ul0dL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.9
  },
  {
    "name": "Samsung Galaxy Tab S10 Lite, 8GB RAM, 256GB, 2TB Expand, Long Battery Life, 10.9” LCD, S Pen for Note-Taking, Exynos 1380, Circle to Search, AI Tools, Gray",
    "price": 26559.17,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/61jwusQUP2L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.6
  },
  {
    "name": "Android Tablet 10 Inch, 2025 Android 15 Tablet for Kids Adults, 20GB RAM 64GB Storage 1TB Expandable, Dual Cameras 8MP 2MP, 6000mAh Dual Speakers WiFi 6",
    "price": 4865.46,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71HlGyJUNzL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Android 15 Tablet 30GB RAM 128GB ROM 1TB Expand, 10.1 Inch Tablets with Keyboard Mouse, Octa-Core, 8000mAh, HD IPS Display, 5G WiFi BT 5.0 GPS, Widevine L1, Gemini AI, Dual Camera - Blue",
    "price": 8299.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/81wQTBp1KCL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 200+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.8
  },
  {
    "name": "2025 Android 15 tablet with keyboard, 26GB+256GB+2TB Expand, 10 inch 2-in-1 Tablets with 8-Core, 5G WiFi, 8000mAh, BT5.0, 5MP+13MP, GMS, GPS, Widevine L1, Tablet PC with Mouse, Case, Stylus (Black)",
    "price": 8299.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/81QNX6YLDsL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "New on Amazon in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.1
  },
  {
    "name": "2025 Tablet 10 inch Android 15 Tablets 30GB RAM 128GB ROM 1TB Expand, 8000mAh Octa-Core Tablet with Drop-proof Case, Gemini AI, HD IPS Display, GPS, 5G WIFI, Split-screen, Widevine L1 -Metal Black",
    "price": 8299.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/8121JOqU8zL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "400+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.7
  },
  {
    "name": "2025 Latest Upgraded Android 15 Tablet 10 Inch, 24GB+128GB+1TB Expand, WiFi 6 BT 5.4, Type-C Fast Charging, Dual Camera, Widevine L1 HD IPS Screen with Keyboard",
    "price": 7468.34,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71ry5cweyqL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Tablet 10 Inch, 2025 Android 15 Tablets, 18GB+128GB, 1TB Expand, Widevine L1 Compatible Octa-Core Tablet with WiFi 6, 6000mAh Battery, Dual Camera(5MP+8MP)",
    "price": 5396.66,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71I-KU+TiML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "400+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Lenovo Idea Tab - College Tablet - 11″ 2.5K IPS Touchscreen Display - 90Hz - MediaTek Dimensity 6300-8 GB Memory - 256 GB Storage - Integrated Arm Mali-G57 MC2 Tab Pen and Folio Case",
    "price": 14939.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/714VRmqcVmL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Dec 19, 2025 - Jan 20, 2026Or fastest delivery Dec 19, 2025 - Jan 17, 2026",
    "rating": 4.6
  },
  {
    "name": "Apple iPad mini (A17 Pro): Apple Intelligence, 8.3-inch Liquid Retina Display, 128GB, Wi-Fi 6E, 12MP Front/12MP Back Camera, Touch ID, All-Day Battery Life — Space Gray EPEAT",
    "price": 33117,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61Tix2-t7iL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "5K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.7
  },
  {
    "name": "Lenovo Idea Tab Plus - Lightweight Tablet - 12.1″ 2.5K IPS Touchscreen Display - 90Hz - MediaTek Dimensity 6400-8GB Memory - 128GB Storage - Integrated Arm Mali-G57 MC2 Tab Pen &amp; Folio Case",
    "price": 21995,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/6102lbnuXsL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Dec 12 - 24Or fastest delivery Dec 12 - 21",
    "rating": 5
  },
  {
    "name": "Android 15 Tablet, 10 Inch 18GB RAM+128GB ROM/ 2TB Expandable Tablet, 2.0GHz Quad-core Processor, 1280*800 HD Touch Screen, 5G WiFi6 BT 5.0, 2 in 1 Tablets with Keyboard Case Mouse Stylus Pink",
    "price": 6057.34,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/715D-p8dTNL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4
  },
  {
    "name": "Apple iPad Pro 11-Inch (M4): Built for Apple Intelligence, Ultra Retina XDR Display, 256GB, 12MP Front/Back Camera, LiDAR Scanner, Wi-Fi 6E + 5G Cellular, All-Day Battery Life — Space Black EPEAT",
    "price": 82917,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61qMPUTzI0L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Save 17% - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.7
  },
  {
    "name": "Like-New Amazon Fire HD 10 tablet (newest model) built for relaxation, 10.1&quot; vibrant Full HD screen, octa-core processor, 3 GB RAM, 32 GB, Black",
    "price": 5228.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/5160oIUsG8L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow 10 AM - 3 PM",
    "rating": 4.4
  },
  {
    "name": "Tablet, 2025 Android 15 Tablet with Gemini AI, 10.1 Inch FHD Display, 30GB RAM 64GB ROM /1TB TF, 6000mAh Battery, Octa-Core 2.0GHz, Widevine L1, 2 in 1 Tablets with Keyboard Mouse(Gold)",
    "price": 7469.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/81SWjCR1y5L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 5
  },
  {
    "name": "10 inch Tablet Android 15 Tablet PC, 10.1&quot; Android Tablets DDR4 8GB RAM(5GB Expand) 32GB ROM 2MP+8MP Dual Camera 5G WiFi-6 BT Support 1TB Expand 10 IN IPS 6000mAh Battery Powerful Performance Tablets",
    "price": 4147.51,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/71yriKbiVYL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.7
  },
  {
    "name": "Apple iPad (Renewed), 10.2-Inch, Wi-Fi, 32GB, Space Gray",
    "price": 9545,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/81IjVvOXGdL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Tue, Dec 9",
    "rating": 4.2
  },
  {
    "name": "Beats Studio Pro - Premium Wireless Over-Ear Headphones- Up to 40-Hour Battery Life, Active Noise Cancelling, USB-C Lossless Audio, Apple &amp; Android Compatible - Amazon Exclusive Sand Gray",
    "price": 12445.85,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61c8vBJoCmL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Overall Pick - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Beats Studio Pro - Premium Wireless Over-Ear Headphones- Up to 40-Hour Battery Life, Active Noise Cancelling, USB-C Lossless Audio, Apple &amp; Android Compatible - Black",
    "price": 14105.85,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61u-OaDSfQL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Bose QuietComfort Headphones - Wireless Bluetooth Headphones, Active Over Ear Noise Cancelling and Mic, USB-C Charging, Deep Bass, Up to 24 Hours of Playtime, Twilight Blue - Limited Edition Color",
    "price": 16517,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/51tItfLj8xL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "Bose QuietComfort Headphones - Wireless Bluetooth Headphones, Active Over Ear Noise Cancelling and Mic, USB-C Charging, Deep Bass, Up to 24 Hours of Playtime, Sandstone",
    "price": 16517,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61C5t1ltM5L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Tue, Dec 2",
    "rating": 4.5
  },
  {
    "name": "Sony WH-CH720N Noise Canceling Wireless Headphones Bluetooth Over The Ear Headset with Microphone and Alexa Built-in, Black New",
    "price": 7304,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/51rpbVmi9XL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "Sony WH-CH720N Noise Canceling Wireless Headphones Bluetooth Over The Ear Headset with Microphone and Alexa Built-in, White New",
    "price": 7304,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/41tp0JPPlmL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 8K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Sony WH-CH520 Wireless Headphones Bluetooth On-Ear Headset with Microphone, Blue New",
    "price": 3154,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/41JACWT-wWL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Beats Solo 4 - Wireless On-Ear Bluetooth Headphones, Up to 50-Hour Battery Life, Ultra-Lightweight Comfort, Powerful and Balanced Sound, Apple &amp; Android Compatible - Matte Black",
    "price": 10785.85,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/515FE+S4yLL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "JBL Tune 520BT - Wireless On-Ear Headphones, Up to 57H Battery Life and Speed Charge, Lightweight, Comfortable and Foldable Design, Hands-Free Calls with Voice Aware (Black)",
    "price": 2485.85,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61hOoghkbRL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.6
  },
  {
    "name": "JBL Tune 720BT - Wireless Over-Ear Headphones with JBL Pure Bass Sound, Bluetooth 5.3, Up to 76H Battery Life and Speed Charge, Lightweight, Comfortable and Foldable Design (Black)",
    "price": 3730.85,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61EL2AKKcBL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Fri, Dec 5Or fastest delivery Tue, Dec 2",
    "rating": 4.5
  },
  {
    "name": "Soundcore by Anker Q20i Hybrid Active Noise Cancelling Headphones, Wireless Over-Ear Bluetooth, 40H Long ANC Playtime, Hi-Res Audio, Big Bass, Customize via an App, Transparency Mode TCO Certified",
    "price": 3153.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/610NdWdTLiL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.6
  },
  {
    "name": "JBL Tune 770NC - Adaptive Noise Cancelling with Smart Ambient Wireless Over-Ear Headphones, Bluetooth 5.3, Up to 70H Battery Life with Speed Charge, Lightweight, Comfortable &amp; Foldable Design (Black)",
    "price": 6635.85,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/51V1bf76cML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "Soundcore by Anker Q20i Hybrid Active Noise Cancelling Headphones, Wireless Over-Ear Bluetooth, 40H Long ANC Playtime, Hi-Res Audio, Big Bass, Customize via an App, Transparency Mode (White) TCO Certified",
    "price": 3153.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/51QSktkLy1L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "SteelSeries Arctis Nova 1 Multi-System Gaming Headset — Hi-Fi Drivers — 360° Spatial Audio — Comfort Design — Durable — Ultra Lightweight — Noise-Cancelling Mic — PC, PS5/PS4, Switch, Xbox - Black",
    "price": 3236.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71pY4rbIg0L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "5K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.2
  },
  {
    "name": "Apple AirPods 4 Wireless Earbuds, Bluetooth Headphones, with Active Noise Cancellation, Adaptive Audio, Transparency Mode, Personalized Spatial Audio, USB-C Charging Case, Wireless Charging, H2 Chip",
    "price": 11619.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61iBtxCUabL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "Apple AirPods Max Wireless Over-Ear Headphones, Pro-Level Active Noise Cancellation, Transparency Mode, Personalized Spatial Audio, USB-C Charging, Bluetooth Headphones for iPhone - Midnight",
    "price": 33199.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/715izx6g41L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.6
  },
  {
    "name": "Turtle Beach Recon 200 Gen 2 Powered Gaming Headset - Xbox Series X, Xbox Series S &amp; Xbox One, PS5, PS4, Mobile &amp; PC with 3.5mm - Bass Boost, Memory Foam, Black",
    "price": 2489.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71HLVO3K5OS._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 8K+ bought in past month - FREE delivery Dec 21, 2025 - Jan 24, 2026 on $35 of items shipped by AmazonOr fastest delivery Dec 20, 2025 - Jan 22, 2026",
    "rating": 4.4
  },
  {
    "name": "Logitech G733 Lightspeed Wireless Gaming Headset, Suspension Headband, Lightsync RGB, Blue VO!CE Mic, PRO-G Audio – Black, Gaming Headset Wireless, PC, PS5, PS4, Switch Compatible",
    "price": 6639.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71xNjrzG69L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 9K+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Tue, Dec 2",
    "rating": 4.3
  },
  {
    "name": "Razer BlackShark V2 X Gaming Headset: 7.1 Surround Sound - 50mm Drivers - Memory Foam Cushion - For PC, PS4, PS5, Switch - 3.5mm Audio Jack - Black ECOLOGO",
    "price": 2738.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/51FRJHB7XOL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Sony WH-1000XM5 Premium Noise Canceling Headphones, Auto NC Optimizer, 30-Hour Battery, Alexa Voice Control, Midnight Blue",
    "price": 20584,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61eeHPRFQ9L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Sony ZX Series Wired On-Ear Headphones, White MDR-ZX110",
    "price": 1078.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/41gNMpuXoqS._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Beats Flex Wireless Earbuds - Apple W1 Headphone Chip, Magnetic Earphones, Class 1 Bluetooth, 12 Hours of Listening Time, Built-in Microphone - Black",
    "price": 2490.83,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61rFK7dfbUL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.2
  },
  {
    "name": "Razer Kraken V3 X Wired USB Gaming Headset: Lightweight Build - Triforce 40mm Drivers - HyperClear Cardioid Mic - 7.1 Surround Sound - Chroma RGB Lighting - Black",
    "price": 3318.34,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71NxwEjlU1L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Wireless Gaming Headsets for PC, PS5, PS4, Switch, Mac, 2.4GHz Wireless Gaming Headphone with ENC Noise Canceling Microphone, Bluetooth 5.4, Cool Lighting, 50H Battery, 50mm Drivers",
    "price": 2489.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71m4FajgttL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "6K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Turtle Beach Recon 50 PlayStation Gaming Headset - PS5, PS4, Xbox Series X, Xbox Series S, Xbox One, Mobile &amp; PC with 3.5mm - Removable Mic, 40mm Speakers",
    "price": 2314.04,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71Exf0FTTjL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Logitech G435 LIGHTSPEED and Bluetooth Wireless Gaming Headset - Lightweight over-ear headphones, built-in mics, 18h battery, compatible with Dolby Atmos, PC, Mobile - Black",
    "price": 3485.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81bQEkMevBL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "4K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.2
  },
  {
    "name": "Sony WH-CH520 Wireless Headphones Bluetooth On-Ear Headset with Microphone and up to 50 Hours Battery Life with Quick Charging, Pink",
    "price": 3154,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61QmoIufSAL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 6K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "JLab JBuds Lux ANC Wireless Headphones, Mauve, Hybrid Active Noise Cancelling, Customizable Sound, Spatial Audio Compatible, Premium Over-Ear Bluetooth Headset",
    "price": 3319.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61m+EOraO8L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.6
  },
  {
    "name": "Wmcaps Bluetooth Beanie with a Light, Unisex USB Rechargeable 4 LED Fashlight Hat with Cordless Headphones, Unique Christmas Birthday Gifts for Men Him Husband Teen Black",
    "price": 1008.45,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61u5koKwGYL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Save 36% - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "JBL Tune 670NC - Adaptive Noise Cancelling with Smart Ambient Wireless On-Ear Headphones, Up to 70H Battery Life with Speed Charge, Lightweight, Comfortable and Foldable Design (Black)",
    "price": 4560.85,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61xF1EFr0GL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Bowers &amp; Wilkins Limited Edition Px8 Over-Ear Bluetooth Headphones, Advanced Active Noise Cancellation Wireless Headphones, Luxurious Materials, 30-Hr Battery Life, 15-Min Quick Charging, Tan",
    "price": 41085,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61keweBcgiL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PMOnly 16 left in stock - order soon.",
    "rating": 4.2
  },
  {
    "name": "Soundcore Anker Life Q20 Hybrid Active Noise Cancelling Headphones, Wireless Over Ear Bluetooth Headphones, 60H Playtime, Hi-Res Audio, Deep Bass, Foam Ear Cups, Travel, Office, USB-C Charging TCO Certified",
    "price": 3485.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61OHplw85eL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "4K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "BERIBES Bluetooth Headphones Over Ear, 65H Playtime and 6 EQ Music Modes Wireless Headphones with Microphone, HiFi Stereo Foldable Lightweight Headset, Deep Bass for Home Office Cellphone PC Ect.",
    "price": 1495.66,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71sBygGN7TL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "HyperX Cloud II - Gaming Headset, 7.1 Surround Sound, Memory Foam Ear Pads, Durable Aluminum Frame, Detachable Microphone, Works with PC, PS5, PS4, Xbox Series X|S, Xbox One – Red",
    "price": 3942.5,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71ltsViEA8L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "JBL Vibe Beam - True Wireless JBL Deep Bass Sound Earbuds, Bluetooth 5.2, Water &amp; Dust Resistant, Hands-free call with VoiceAware, Up to 32 hours of battery life (White)",
    "price": 2485.85,
    "Category": "Audio",
    "imageUrl": "https://m.media-amazon.com/images/I/51Y8jzQuHGL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Sun, Dec 7 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "HyperX Cloud Stinger 2 – Gaming Headset, DTS Headphone:X Spatial Audio, Lightweight Over-Ear Headset with mic, Swivel-to-Mute Function, 50mm Drivers, PC Compatible, Black",
    "price": 2488.34,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61gKp5mi0-L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "4K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Logitech G432 Wired Gaming Headset, 7.1 Surround Sound, DTS Headphone:X 2.0, Flip-to-Mute Mic, PC (Leatherette) Black/Blue",
    "price": 3237,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/617JUeoI2LL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.2
  },
  {
    "name": "Sony WH-1000XM6 The Best Noise Canceling Wireless Headphones, HD NC Processor QN3, 12 Microphones, Adaptive NC Optimizer, Mastered by Engineers, Studio-Quality, 30-Hour Battery, Midnight Blue",
    "price": 33034,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61fTCXPhbdL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Logitech H390 Wired Headphones with Mic, USB-A Headset with Microphone for PC, Noise Cancelling Microphone for Video Meetings, Music, Gaming - Black",
    "price": 1576.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/6144+3nBNhL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Audio-Technica ATH-GL3BK Closed-Back Gaming Headset, Black",
    "price": 5770.16,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71mhO5mp0kL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30Only 10 left in stock (more on the way).",
    "rating": 3.9
  },
  {
    "name": "Sony MDRZ1R Signature, Hi-Res Headphone, Black",
    "price": 146744,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/61UMCuo0b2L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2Only 3 left in stock - order soon.",
    "rating": 4.4
  },
  {
    "name": "Audio-Technica ATH-GDL3WH Open-Back Gaming Headset, White",
    "price": 8217,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71ffANWck6L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Tue, Dec 2Only 12 left in stock - order soon.",
    "rating": 3.8
  },
  {
    "name": "Razer Kraken Kitty V3 X Wired Gaming Headset: Kitty Ears - HyperClear Cardioid Mic - 40 mm Drivers - 7.1 Surround Sound - Comfy Ear Cushions - Cross-Platform via 3.5mm PC, PS5, Xbox, Switch 2 - Pink ECOLOGO",
    "price": 4979.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61q7dqyoSBL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "SHOKZ New OpenRun Pro 2- Bone Conduction Headphones, Open-Ear Bluetooth Wireless Sport Earphones for Running, Workouts - Sweat Resistant, Secure Comfortable Fit -Deep Bass, Smart Mic, Reflective Strip ClimeCo Certified",
    "price": 10370.85,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/417fmeqXikL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - $6.99 delivery Dec 4 - 9",
    "rating": 4.4
  },
  {
    "name": "Beats Powerbeats Pro 2 - Wireless Noise Cancelling Workout Earbuds with Secure- Fit Earhooks, Up to 45-Hour Battery with Charging Case, Sweat &amp; Water Resistant, Heart Rate Monitoring - Jet Black",
    "price": 16595.85,
    "Category": "Audio",
    "imageUrl": "https://m.media-amazon.com/images/I/51HOUQVBlsL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.1
  },
  {
    "name": "Soundcore Q30 by Anker, Hybrid Active Noise Cancelling Headphones, Multiple Modes, Hi-Res Audio, Custom EQ via App, 50H Playtime, Comfortable Fit, Bluetooth, Multipoint Connection TCO Certified",
    "price": 4149.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/514RLTa36cL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 8K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Razer BlackShark V2 HyperSpeed Wireless Gaming Headset: 2.4GHz, Bluetooth or USB - THX Spatial Audio - Titanium 50mm Drivers - 70 Hr Battery - for Xbox Series X, Series S, PS5, PC, Switch 2 - Black",
    "price": 4979.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71fmQEoF1fL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 5K+ bought in past month - FREE delivery Fri, Dec 12",
    "rating": 4
  },
  {
    "name": "HyperX Cloud III – Wired Gaming Headset, PC, PS5, Xbox Series X|S, Angled 53mm Drivers, DTS Spatial Audio, Memory Foam, Durable Frame, Ultra-Clear 10mm Mic, USB-C, USB-A, 3.5mm – Black/Red",
    "price": 5726.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71pz2njkNRL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "6K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Apple Watch SE 3 [GPS 40mm] Smartwatch with Starlight Aluminum Case with Starlight Sport Band - S/M. Fitness and Sleep Trackers, Heart Rate Monitor, Always-On Display, Water Resistant",
    "price": 16517,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61xkvg-RStL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.8
  },
  {
    "name": "SAMSUNG Galaxy Watch 7 40mm Bluetooth AI Smartwatch w/Energy Score, Wellness Tips, Heart Rate Tracking, Sleep Monitor, Fitness Tracker, 2024, Cream [US Version, 1Yr Manufacturer Warranty]",
    "price": 10789.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/71SZNup1qrL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Dec 8 - 22Or fastest delivery Dec 10 - 19",
    "rating": 4.5
  },
  {
    "name": "Garmin vívoactive 5, Health and Fitness GPS Smartwatch, AMOLED Display, Up to 11 Days of Battery, Ivory",
    "price": 15354.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/610Jl4dUB7L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Overall Pick - 10K+ bought in past month - FREE delivery Dec 6 - 12Or fastest delivery Dec 4 - 9",
    "rating": 4.4
  },
  {
    "name": "Fitbit Versa 4 Fitness Smartwatch with Daily Readiness, GPS, 24/7 Heart Rate, 40+ Exercise Modes, Sleep Tracking and more, Black/Graphite, One Size (S &amp; L Bands Included)",
    "price": 9955.85,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61CZSoSnVPL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "Smart Watch with Alexa Built-in, 1.83&quot; HD Touchscreen Fitness Tracker with Bluetooth Calling, Fitness Watch with Heart Rate/Sleep Monitor, 120+ Sports Modes, IP68 Waterproof Smartwatch for Android iOS",
    "price": 2489.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/71HDuiYf7cL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 5
  },
  {
    "name": "Smart Watch for Men Women, 2.01&quot; AMOLED Curved Display Smart Watch, Bluetooth Call, 100+ Sport Modes, Fitness Tracker with 24/7 Heart Rate/Sleep Monitor, IP68 Waterproof Smartwatch for Android iOS",
    "price": 2987.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61vC4-cO94L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.9
  },
  {
    "name": "Garmin Venu® Sq 2 GPS Smartwatch, All-Day Health Monitoring, Long-Lasting Battery Life, AMOLED Display, Slate and Shadow Gray",
    "price": 12449.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61qvPURDxsL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Fitbit Versa 4 Fitness Smartwatch with Daily Readiness, GPS, 24/7 Heart Rate, 40+ Exercise Modes, Sleep Tracking and more, Waterfall Blue/Platinum, One Size (S &amp; L Bands Included)",
    "price": 9955.85,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61OEuoqFqYL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 8K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Samsung Galaxy Watch 8 (2025) 44mm Bluetooth Smartwatch, Cushion Design, Fitness Tracker, Sleep Coaching, Running Coach, Energy Score, Heart Rate Tracking, Graphite [US Version, 2 Yr Warranty]",
    "price": 23239.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/616KEp7qQvL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "Apple Watch Series 7 (GPS + Cellular, 41mm) Starlight Aluminum Case with Starlight Sport Band, Regular (Renewed)",
    "price": 14877.75,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/51478LBC2rL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Tue, Dec 2Or fastest delivery Mon, Dec 1Only 10 left in stock - order soon.",
    "rating": 4
  },
  {
    "name": "Garmin Forerunner 165, Running Smartwatch, Colorful AMOLED Display, Training Metrics and Recovery Insights, Black",
    "price": 16599.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61m+fKy7wzL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "6K+ bought in past month - FREE delivery Mon, Dec 1Only 1 left in stock - order soon.",
    "rating": 4.7
  },
  {
    "name": "Garmin Instinct® E 45mm, Rugged Outdoor GPS Smartwatch, 24/7 Health Monitoring, Wrist-Based Heart Rate, Up to 16 Days of Battery Life, Charcoal",
    "price": 16599.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61r6NWBWKXL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Dec 18, 2025 - Jan 17, 2026Or fastest delivery Dec 18, 2025 - Jan 16, 2026",
    "rating": 4.5
  },
  {
    "name": "Smart Watch for Men Women, 1.85&quot; HD Fitness Tracker with Bluetooth Calls, 120+ Sport Modes Fitness Watch, Fitness Tracker 24/7 Heart Rate/Sleep Monitor, IP68 Waterproof, Smartwatch for Android/iPhone",
    "price": 2074.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/617yyHEF+AL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Save 88% - 1K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.9
  },
  {
    "name": "Google Pixel Watch 4 (41mm) - Android Smartwatch with Heart Rate and Sleep Tracking - 30-Hour Battery - Fitness Tracking - Google AI - Matte Black Aluminum Case - Obsidian Active Band - Wi-Fi",
    "price": 24899.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61EkR87Dp+L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Garmin vívoactive® 6, Health and Fitness GPS Smartwatch, AMOLED Display, Up to 11 Days of Battery, Slate with Black Band",
    "price": 20749.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/611jnYHa1OL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Amazfit Active 2 Sport Smart Watch Fitness Tracker for Android and iPhone, 44mm, 10 Day Battery, Water Resistant, GPS Maps, Sleep Monitor, 160+ Workout Modes, 400 Face Styles, Silicone Strap, Free App",
    "price": 6639.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71mpuO4LqeL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Smart Watch for Men Women, 1.83&quot; HD Touchscreen Fitness Watch with Bluetooth Call&amp;Message Notifications, 110+Sport Modes, 24/7 Heart Rate/Sleep Monitor, IP68 Waterproof Fitness Tracker for Android iOS",
    "price": 1659.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/71NBNLzSmtL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - New on Amazon in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 4.9
  },
  {
    "name": "Smart Watches for Women Men, 1.39&quot; HD IPS Touchscreen Smartwatch with 120 Sports Modes, Heart Rate/Sleep Monitor, IP67 Waterproof, Bluetooth Call &amp; Music Control for iPhone/Android (Black)",
    "price": 1990.34,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71fJ1wZK-HL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "New on Amazon in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 3.5
  },
  {
    "name": "Google Pixel Watch - Android Smartwatch with Fitbit Activity Tracking - Heart Rate Tracking - Polished Silver Stainless Steel case with Chalk Active band - WiFi",
    "price": 13944,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61nvNXwEVrL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30Only 8 left in stock - order soon.",
    "rating": 4.1
  },
  {
    "name": "Amazfit Bip 6 Smart Watch 46mm, 14 Day Battery, 1.97&quot; AMOLED Display, GPS &amp; Free Maps, AI, Bluetooth Call &amp; Text, Health, Fitness &amp; Sleep Tracker, 140+ Workout Modes, 5 ATM Water-Resistance, Blush",
    "price": 5394.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61Z2UcRVdiL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Dec 9 - 14Or fastest delivery Dec 9 - 11",
    "rating": 4.4
  },
  {
    "name": "Smart Watches for Women Men, 1.83&quot; HD Smartwatch with 120 Sports Modes, IP67 Waterproof, Bluetooth Call, Music Control, Heart Rate and Sleep Monitor (Black)",
    "price": 1691.54,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/71KCTbUVyNL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - New on Amazon in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.9
  },
  {
    "name": "Samsung Galaxy Watch 5 Pro 45mm Smartwatch with GPS, LTE, Sleep Coaching, and Fast Charger - (Renewed)",
    "price": 5917.07,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/613RLBA2goL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.3
  },
  {
    "name": "Garmin Vivoactive 3 GPS Smartwatch with Built-in Sports Apps - Black/Silver (Renewed)",
    "price": 11619.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/51woqQNvviL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Tue, Dec 2Only 3 left in stock - order soon.",
    "rating": 4.5
  },
  {
    "name": "Smart Watch, 2025 New Smartwatch for Men Women with Bluetooth Call, 1.96&quot; Fitness Watch with 110+ Sport Modes/Heart Rate/Sleep Monitor/Pedometer, IP68 Waterproof Fitness Tracker for Android iOS, Black",
    "price": 1078.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/71x+AWG3o2L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 200+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 4.6
  },
  {
    "name": "Motorola Moto Watch 120 - Premium Bluetooth Smartwatch with AMOLED Display, 10-Day Battery, Heart Rate &amp; SpO2 Tracking, Fitness &amp; Health Monitoring, Compatible with Android and iPhone - Phantom Black",
    "price": 6557,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71ZUibeqWJL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Save 16% - 400+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Apple Watch Series 6 (GPS, 40mm) - Gold Aluminum Case with Pink Sand Sport Band (Renewed)",
    "price": 10702.85,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/71aLryIN+ZL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Dec 12 - 20Or fastest delivery Dec 12 - 17",
    "rating": 4.1
  },
  {
    "name": "Garmin Forerunner 55, GPS Running Watch with Daily Suggested Workouts, Up to 2 Weeks of Battery Life, Black - 010-02562-00",
    "price": 12449.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/518z0My1ZlS._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 8K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Garmin fēnix® 8 – 51 mm, AMOLED, Sapphire, Premium Multisport GPS Smartwatch, Long-Lasting Battery Life, Dive-Rated, Built-in LED Flashlight, Titanium with Spark Orange/Graphite Band",
    "price": 78849.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61we9NlBYlL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "300+ bought in past month - FREE delivery Mon, Dec 1Only 2 left in stock - order soon.",
    "rating": 4.6
  },
  {
    "name": "Smart Watch for Women, Answer/Make Call, 1.32&#x27;&#x27; AMOLED Ultra-Clear Screen Fitness Tracker with Heart Rate/Sleep/SpO2 Monitor, Smartwatch for iPhone/Samsung/Android, 110+ Sport Modes, 3ATM Waterproof ClimatePartner certified",
    "price": 3306.72,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71zBoAewXiL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 4K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Motorola Moto Watch 70 - Health and Fitness Bluetooth Smartwatch for Every Day Wear, Advanced Health Features, Up to 10 Days Battery Life - Compatible with Android and iOS, Phantom Black",
    "price": 4980,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61COE-pmQyL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "50+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30Only 5 left in stock - order soon.",
    "rating": 3.9
  },
  {
    "name": "Samsung Galaxy Watch Ultra (2025) 47mm LTE Smartwatch, Titanium Casing, Advanced Sleep Coaching, Running Coach, Energy Score, Heart Rate Tracking, GPS, Titanium Silver [US Version, 2 Yr Warranty]",
    "price": 45649.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/81y-adFpTML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "Smart Watch for Women Men Fitness: Smart Watch for iPhone&amp;Android Bluetooth Call with SpO2 Sleep Heart Rate Monitor,IP68,Fitness Tracker with 120+Sport,Reloj Inteligente 30 Day+Battery Life, 2 Bands",
    "price": 3319.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/81iQj9e3JKL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 4K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Apple Watch Series 5 (GPS, 40MM) - Space Gray Aluminum Case with Black Sport Band (Renewed)",
    "price": 8710.85,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/71mbZF8PT1L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2",
    "rating": 4.1
  },
  {
    "name": "Smart Watch for Women Men Android &amp; iPhone [2 Bands, 44mm case], Alexa Built-in, 1.83&#x27;&#x27; Smartwatch Make/Answer Call, HR SpO2 Sleep Stress Monitor Fitness Tracker, IP68 Waterproof Step Counter Watch",
    "price": 2115.67,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71W-MhC+VWL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 300+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 5
  },
  {
    "name": "Fitpolo Smart Watch for Women,1.3&quot; AMOLED Touchscreen Fitness Tracker, Make/Answer Calls, Heart Rate SpO2 Monitor, IP68 Waterproof, Sleep &amp; Activity Tracking Smartwatch for Android Phones iPhone ClimeCo Certified",
    "price": 5809.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71aaIj1kKSL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "Apple Watch Series 7 (GPS, 45mm) Midnight Aluminum Case with Midnight Sport Band (Renewed)",
    "price": 11951.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/51I1QoWjX3L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2Only 20 left in stock - order soon.",
    "rating": 4.1
  },
  {
    "name": "XIAOMI Redmi Watch 5 Active Midnight Black",
    "price": 2739,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61iOQG77hxL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery on $35 of items shipped by AmazonOnly 1 left in stock - order soon.",
    "rating": 4.4
  },
  {
    "name": "Apple Watch Series 9 [GPS + Cellular 41mm] Smartwatch with Silver Stainless Steel Case with Storm Blue Sport Band S/M. Fitness Tracker, Blood Oxygen &amp; ECG Apps, Always-On Retina Display",
    "price": 55125.28,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/616diPRG1AL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.8
  },
  {
    "name": "LIGE 1.43&quot; AMOLED Smart Watch for Men with Flashlight, Bluetooth Calling, 100+ Sport Modes, 530mAh, IP68 Waterproof Fitness Tracker for Workout, iOS Android Compatible, Black Steel Camouflage Silicone",
    "price": 6639.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/812JrRaNVXL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Tue, Dec 2",
    "rating": 4.7
  },
  {
    "name": "Google Pixel Watch 3 (45mm) 2024 Model - Android Smartwatch, Heart Rate Tracking, Fitbit Advanced Running, Fitness Insights, 24-Hour Battery - Polished Silver Aluminum Case - Porcelain Band - LTE",
    "price": 20747.51,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61HCdYMr9UL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Smart Watch for Men Women(Answer/Make Calls), 1.95&quot;HD 2025 New Smartwatches with Heart Rate/Sleep Monitor/Pedometer, Fitness Tracker 113+ Sport Mode IP68 Waterproof Running Watch for Android iOS",
    "price": 1078.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/61bgDD-tR+L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "Apple Watch Series 6 (GPS, 44mm) - Silver Aluminum Case with White Sport Band (Renewed)",
    "price": 10382.47,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/718or3AzwfL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Tue, Dec 9Only 16 left in stock - order soon.",
    "rating": 4.2
  },
  {
    "name": "Fempoin Smart Watch, Smartwatch for Men Women with 24 Sport Modes, IP68 Waterproof Fitness Tracker with 24/7 Heart Rate/Sleep/SpO2 Monitor, Step Tracker, Pedometer, Activity Tracker for Android iOS",
    "price": 1078.17,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/51rTiJeZsFL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "300+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 4.8
  },
  {
    "name": "Apple Watch Ultra 2 [GPS + Cellular 49mm] Smartwatch with Rugged Titanium Case &amp; Orange Ocean Band One Size. Fitness Tracker, Precision GPS, Action Button, Extra-Long Battery Life",
    "price": 49717,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/711EpHofmlL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 400+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Mon, Dec 1",
    "rating": 4.7
  },
  {
    "name": "Blackview 2025 Smart Watch (Answer/Make Calls), Fitness Watch for Men and Women with Heart Rate/SpO2/Sleep Monitor/2 Straps, 100+ Sports Modes, IP68 Waterproof Activity Tracker for Android/iPhone",
    "price": 1513.09,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71vWFgbofYL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Dec 6 - 11 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Apple Watch Series 6 (GPS, 40mm) - Blue Aluminum Case with Deep Navy Sport Band (Renewed)",
    "price": 9047,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/71-Zph8eMBL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Wed, Dec 3Or fastest delivery Tue, Dec 2",
    "rating": 4
  },
  {
    "name": "Apple Watch SE (GPS + Cellular, 40mm) - Gold Aluminum Case with Pink Sand Sport Band (Renewed)",
    "price": 12542.13,
    "Category": "Wearable",
    "imageUrl": "https://m.media-amazon.com/images/I/617iJDEDBFL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Tue, Dec 9Only 1 left in stock - order soon.",
    "rating": 4.1
  },
  {
    "name": "Digital Camera, FHD 1080P Digital Point and Shoot Camera with 16X Zoom Anti Shake, Compact Small Camera for Boys Girls Kids",
    "price": 3153.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/61JavBEclHL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Overall Pick - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.1
  },
  {
    "name": "Canon EOS R100 Mirrorless Camera RF-S18-45mm F4.5-6.3 is STM Lens Kit, 24.1 Megapixel CMOS (APS-C) Sensor, 4K Video, RF Mount, Black",
    "price": 41417,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71edZl9AfcL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Tue, Dec 2Only 8 left in stock - order soon.",
    "rating": 4.5
  },
  {
    "name": "8K Digital Cameras for Photography Autofocus 88MP WiFi Professional 16X Digital Zoom Photography Camera with Dual-Lens for YouTube with Lens Hood, Touch Screen, 2 Batteries &amp; Charging Stand",
    "price": 10248.84,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71SpwPAcHHL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 4K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "8K Digital Cameras for Photography with WiFi,Autofocus 88MP Vlogging Camera for YouTube with Dual-Lens,16X Digital Zoom Point and Shoot Camera,3.2&#x27;&#x27;Touch Screen, Anti-Shake,2 Batteries &amp;Charging Stand",
    "price": 10249.67,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71y5zbgLljL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - New on Amazon in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.9
  },
  {
    "name": "4K Digital Camera for Photography Autofocus, 2025 Latest 48MP Vlogging Camera for YouTube with SD Card, 2 Batteries, 3&quot; 180°Flip Screen Compact Travel Camera for Teens with 16X Zoom, Anti-Shake,Black",
    "price": 4729.34,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/81wJLmTFKUL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 7K+ bought in past month - FREE delivery Dec 4 - 7Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "KODAK PIXPRO Friendly Zoom FZ45-BK 16MP Digital Camera with 4X Optical Zoom 27mm Wide Angle and 2.7&quot; LCD Screen (Black)",
    "price": 9959.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/81gAqtMl3AL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "7K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.2
  },
  {
    "name": "Sony Alpha 7 IV Full-frame Mirrorless Interchangeable Lens Camera with 28-70mm Zoom Lens Kit",
    "price": 182434,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/81jlDvZPMnL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Mon, Dec 1",
    "rating": 4.6
  },
  {
    "name": "2025 New Digital Camera, 56MP FHD 1080P for Kids with 16x Digital Zoom Anti Shake, Face Detect, Smile Capture, 32GB TF Card, Battery, Lanyard, a Great Gift for Boys &amp; Girls（Black）",
    "price": 2364.67,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/91I+A6S-vkL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 4.7
  },
  {
    "name": "Yatao Digital Camera with WiFi, 64MP Photography and 4K 5K Vlogging Camera Kit for YouTube, Front and Rear Dual Camera for Convenient Selfie, Equipped with 64GB Micro Card",
    "price": 4978.34,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71nP+oinAPL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.1
  },
  {
    "name": "Digital Camera for Photography, 4K Vlogging Camera for YouTube 3&quot; 180° Flip Screen 18X Digital Zoom Compact Cameras with 32GB TF Card &amp; 2 Batteries, Pink",
    "price": 4729.34,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71CK7H-MAJL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4
  },
  {
    "name": "Sony ZV-1F Vlog Camera for Content Creators and Vloggers Black",
    "price": 41334,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/716gp4ChszL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Tue, Dec 2Or fastest delivery Mon, Dec 1",
    "rating": 4.5
  },
  {
    "name": "KODAK PIXPRO AZ405-BK 20MP Digital Camera 40X Optical Zoom 24mm Wide Angle Lens Optical Image Stabilization 1080P Full HD Video 3&quot; LCD Vlogging Camera (Black)",
    "price": 16595.85,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/81C9A0E+8TL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Wed, Dec 3",
    "rating": 4
  },
  {
    "name": "FUJIFILM Instax Mini 12 Holiday Bundle 2025 - Lilac Purple",
    "price": 7963.85,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/71msMzScxxL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 6K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.7
  },
  {
    "name": "Digital Camera 4K for Photography Vlogging: 56MP Cameras with Mode Dial for Video - 16X Zoom Photo Camera Gifts for Teens Ages 8-16 - 180°Flip Screen Compact Cámara - Point and Shoot Digital Cameras",
    "price": 5809.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/8168l5eVTnL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.9
  },
  {
    "name": "5K Digital Camera for Photography, 80MP 3.5&quot;+2&quot; Dual Screen for Self-Framing 18X Zoom Autofocus Vlogging Camera for YouTube/Content Creators/Travel, Includes 64GB Card + 2 Batteries &amp; Flash, LIYTIFOR",
    "price": 8299.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71kf+fDrSRL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - New on Amazon in past month - FREE delivery Dec 4 - 7Or fastest delivery Fri, Dec 5",
    "rating": 4.9
  },
  {
    "name": "Canon EOS Rebel T7 DSLR Camera with 18-55mm Lens | Built-in Wi-Fi | 24.1 MP CMOS Sensor | DIGIC 4+ Image Processor and Full HD Videos",
    "price": 43907,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/714hINuPoBL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Tue, Dec 2",
    "rating": 4.6
  },
  {
    "name": "Digital Camera, 5K 80MP 3.5&quot;+2&quot; Dual Screen Cameras for Photography Autofocus, 18X Digital Zoom Vlogging Camera for YouTube, Travel, Beginners, Include 64GB Card and 2 Batteries",
    "price": 5809.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/81S5-2esFaL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 5
  },
  {
    "name": "Digital Camera for Kids, FHD 1080P 56MP Autofocus Point and Shoot with 16X Zoom, 32GB TF Card, Battery, Flash, Face Detect, Anti Shake, Compact Travel Cameras for Boys Girls Teens Kids Gift（Black）",
    "price": 4149.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/91tNkGckOpL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "New on Amazon in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 5
  },
  {
    "name": "Nikon Z6 III | Full-Frame mirrorless Stills/Video Camera with 6K/60p Internal RAW Recording | Nikon USA Model",
    "price": 174046.85,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71Ac0SzZt9L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Mon, Dec 1Only 4 left in stock - order soon.",
    "rating": 4.6
  },
  {
    "name": "KODAK PIXPRO WPZ2 Rugged Waterproof Shockproof Dustproof WiFi Digital Camera 16MP 4X Optical Zoom 1080P Full HD Video Vlogging Camera 2.7&quot; LCD (Blue)",
    "price": 13197,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/81UgyekfmxL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Small Digital Camera FHD 1080P, Point and Shoot Camera with 32GB SD Card, Two Batteries,16X Zoom for Kids Boys Girls, Black",
    "price": 3151.51,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/61gCTRc1S6L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 8K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.1
  },
  {
    "name": "4K Digital Camera for Photography- 56MP Autofocus Vlogging Camera with 3&quot; 180° Flip Screen, 16X Zoom, Flash- Digital Point and Shoot Camera for Travel &amp; Home- Portable Gift for Teens &amp; Beginners",
    "price": 9129.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71E7nZQ4XqL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 5
  },
  {
    "name": "Yatao Digital Camera with WiFi, 4K 5K 64MP Photography Camera Kit for YouTube, Front and Rear Dual Camera for Convenient Selfie, Equipped with 64GB Micro Card, Wide &amp; Macro Lens, Card Reader",
    "price": 9128.34,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/81UZOZGiRaL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.2
  },
  {
    "name": "Google Nest Cam Outdoor or Indoor, Battery - 2nd Generation - 1 Pack",
    "price": 9959.17,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/31750hI5MLL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.1
  },
  {
    "name": "TP-Link Tapo 1080P Indoor Security Camera for Baby Monitor, Dog Camera w/Motion Detection, 2-Way Audio Siren, Night Vision, Cloud &amp; SD Card Storage, Works w/Alexa &amp; Google Home (Tapo C100)",
    "price": 1326.34,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/61gJcez9unL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Blink Mini - Compact indoor plug-in smart security camera, 1080p HD video, night vision, motion detection, two-way audio, easy set up, Works with Alexa – 2 cameras (White)",
    "price": 1658.34,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/31k0hI-y8pL._AC_UY500_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 8K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "4K Digital Camera for Photography, 64MP Vlogging Camera for YouTube with 3&quot; 180° Flip Screen, 18X Digital Zoom Point and Shoot Camara with 32GB Micro SD Card for Beginner (Black)",
    "price": 4730.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71LaQQPOhXL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.1
  },
  {
    "name": "SONY Cinema Line FX30 Super 35 Camera",
    "price": 149234,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/91GQ19hfgYL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "300+ bought in past month - FREE delivery Mon, Dec 1Only 7 left in stock - order soon.",
    "rating": 4.7
  },
  {
    "name": "WYZE Cam v4 (Latest Model), 2.5K AI Security Camera, Indoor/Outdoor Cameras for Home Security, Baby Monitor &amp; Pet Camera, Vibrant Color Night Vision, No Subscription Required, Free Expert Help",
    "price": 1658.34,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/61meTi8SRlL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "4K Digital Camera for Photography 64MP WiFi Vlogging Camera for YouTube Autofocus 3&quot; 180° Flip Screen 16X Zoom Compact Travel Cameras with Anti-Shake, SD Card, 2 Batteries &amp; Battery Charger",
    "price": 4979.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71fFWp-ltlL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.9
  },
  {
    "name": "Digital Camera,Autofocus 4K Vlogging Camera for Photography with 32GB Card,48MP Portable Compact Point and Shoot Digital Camera for Teens Adult Beginner with 16X Zoom,Anti-Shake,2 Batteries(White)",
    "price": 3900.17,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/71OnD2sjxlL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 4K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "Sony a7 III (ILCEM3K/B) Full-frame Mirrorless Interchangeable-Lens Camera with 28-70mm Lens with 3-Inch LCD, Black",
    "price": 140934,
    "Category": "Camera",
    "imageUrl": "https://m.media-amazon.com/images/I/517CEyCXIHL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "100+ bought in past month - FREE delivery Mon, Dec 1",
    "rating": 4.6
  },
  {
    "name": "PlayStation®5 Digital Edition (slim)",
    "price": 33117,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/51fM0CKG+HL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Overall Pick - 20K+ bought in past month - FREE delivery Dec 7 - 14Or fastest delivery Dec 6 - 11",
    "rating": 4.7
  },
  {
    "name": "Xbox Series X - Gaming Console - 1TB SSD - Includes Wireless Controller - 4K Gaming - 120FPS - Carbon Black",
    "price": 53784,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61WV2vIMfFL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.8
  },
  {
    "name": "Xbox Series S - All Digital Gaming Console - 1TB SSD - Includes Wireless Controller - 120FPS - Robot White",
    "price": 35524,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61ZbpSrtepL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.7
  },
  {
    "name": "Nex Playground - The Active Play System for Kids &amp; Families Where Indoor Physical Activity Meets Interactive Family Fun and is Great for Gaming Nights, Parties and Playdates",
    "price": 16517,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61Pg7ofgYHL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 100K+ bought in past month - FREE delivery Dec 5 - 10Or fastest delivery Dec 5 - 7",
    "rating": 4.7
  },
  {
    "name": "2026 Upgraded Retro Gaming Console Stick, Classic Video Games Stick with 4K HDMI, Built-in 23 Emulators, 20000+ Games - Plug &amp; Play TV Video Gaming Stick with Upgrade Dual 2.4G Wireless Controllers",
    "price": 4647.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/81VAK29a4GL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4
  },
  {
    "name": "2025 NEW Upgrade Retro Gaming Console Pro, Vide Game Consoles with 4K HDMI, Built-in 20000+ Games &amp; 23 Emulators, Plug and Play Video Gaming Consoles with Upgrade Dual 2.4G Wireless Controllers (64G)",
    "price": 3151.51,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/81MxpubtBjL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 4K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4
  },
  {
    "name": "PlayStation Portal Remote Player 5",
    "price": 14856.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61S0ZRxKJFL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Nintendo Switch™ with Neon Blue and Neon Red Joy‑Con™",
    "price": 27306.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71wpE+ZIehL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "8K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Wed, Dec 3",
    "rating": 4.7
  },
  {
    "name": "PlayStation VR2 Horizon Call of The Mountain™ Bundle (PSVR2)",
    "price": 24817,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61jPxZuLTzL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "Kinhank Super Console X2 pro with 100000+Games Retro Game Console,Video Game Console with EmuELEC 4.5/Android 9.0 in 1, 2.4G+5G and BT 5.0,Compatible with 65+ Emulators,2 Controllers",
    "price": 7801.17,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/71R4K3s1LrL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Save 25% - 50+ bought in past month - FREE delivery Dec 5 - 8Or fastest delivery Fri, Dec 5",
    "rating": 5
  },
  {
    "name": "BACKBONE One Mobile Gaming Controller for iPhone 14 &amp; Older (Lightning) 2nd Gen, Phone Controller, Play Xbox, PlayStation, PC, App Games &amp; More (With 3 Months of Apple Arcade Access)",
    "price": 4979.17,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71j7Tl+PYhL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Handheld Game for Kids -Preloaded 220 Retro Video Games, Portable Gaming Player with Rechargeable Battery 3.0&quot; LCD Screen, Mini Arcade Electronic Toy Gifts for Boys Girls (Blue)",
    "price": 3152.34,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71ULfEFQV9L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "30K+ bought in past month - $6.99 delivery Dec 4 - 9Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "2026 Retro Gaming Console, 20K+ Classic Games, 23 Emulators, 4K HDMI Game Stick with Upgraded Dual 2.4G Wireless Controllers 64GB, Plug-and-Play Video Game Console for TV (White)",
    "price": 2489.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71OOgaOMxiL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "4K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 3.5
  },
  {
    "name": "Cronus Zen Controller Emulator for Xbox, PlayStation, Nintendo and PC (CM00053)",
    "price": 9129.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61XXyElQiEL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.9
  },
  {
    "name": "ASUS ROG Xbox Ally – 7” 1080p 120Hz Touchscreen Gaming Handheld, 3-month Xbox Game Pass Premium included, AMD Ryzen Z2 A, 16GB RAM, 512GB SSD, White",
    "price": 49292.87,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61gZGeavWGL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Xbox One Console 500GB - Matte Black (Renewed)",
    "price": 14026.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61p71dTg3oL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "400+ bought in past month - FREE delivery Dec 10 - 14Or fastest delivery Dec 10 - 11",
    "rating": 3.6
  },
  {
    "name": "AR Motion Gaming Console - Plug &amp; Play Video Game System for Kids &amp; Families. Great for Indoor Physical Play, Interactive Family Fun, Game Nights, Playtime and Playdates",
    "price": 5742.77,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71oYzy6zXWL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  },
  {
    "name": "Logitech G733 Lightspeed Wireless Gaming Headset, Suspension Headband, Lightsync RGB, Blue VO!CE Mic, PRO-G Audio – Black, Gaming Headset Wireless, PC, PS5, PS4, Switch Compatible",
    "price": 6639.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71xNjrzG69L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 9K+ bought in past month - FREE delivery Sun, Dec 7Or fastest delivery Tue, Dec 2",
    "rating": 4.3
  },
  {
    "name": "Wireless Retro Game Console, Retro Gaming Console with Built-in 9 Emulators, 25100+Games, 4K HDMI Output, Dual 2.4GHz Wireless Controller, Plug and Play Video Game Console (Black)",
    "price": 2488.34,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/81WU5h+UZdL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - New on Amazon in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Logitech G920 Driving Force Racing Wheel and Floor Pedals, Real Force Feedback, Stainless Steel Paddle Shifters, Leather Steering Wheel Cover for Xbox Series X|S, Xbox One, PC, Mac - Black",
    "price": 16599.17,
    "Category": "Apple",
    "imageUrl": "https://m.media-amazon.com/images/I/611TWGHXWyL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 6K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "HyperX Cloud II - Gaming Headset, 7.1 Surround Sound, Memory Foam Ear Pads, Durable Aluminum Frame, Detachable Microphone, Works with PC, PS5, PS4, Xbox Series X|S, Xbox One – Red",
    "price": 3942.5,
    "Category": "Smartphone",
    "imageUrl": "https://m.media-amazon.com/images/I/71ltsViEA8L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "R36MAX Handheld Game Console, Retro Gaming Console with 4000mAh Battery 4.0”IPS Screen, Open Source Linux System, with 64GB TF Card Portable Video Gaming Console, Transparent Blue",
    "price": 6638.34,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71f1TRwcUaL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 5
  },
  {
    "name": "Lenovo Legion Go S - 2025 - Mobile Gaming Console - AMD Radeon graphics - 8&quot; PureSight IPS Display - 120Hz - AMD Ryzen™ Z2 Go - 16GB Memory - 512GB Storage - Glacier White - Free PC Game Pass",
    "price": 48139.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71axrw7z6WL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 400+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Mon, Dec 1",
    "rating": 4.1
  },
  {
    "name": "2025 Retro Gaming Console Pro 4K HDMI with 20,000+ Built-in Classic Video Games, Retro Game Stick with 23 Emulators Plug &amp; Play TV Video Gaming Stick with 64GB Memory",
    "price": 2994.64,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/81JH1cSLiPL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4
  },
  {
    "name": "My Arcade Atari Game Station Pro: Retro Video Game Console with 200+ Games, Wireless Joysticks, RGB LED Lights, Atari 2600/5200/7800 and More",
    "price": 8199.57,
    "Category": "Electronics",
    "imageUrl": "https://m.media-amazon.com/images/I/71BsGaR3TxL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 3.8
  },
  {
    "name": "R36T Retro Gaming Console, 3.5&#x27;&#x27; IPS Screen CRT-Inspired, Handheld Game Console with 18000+ Classic Games Supports WiFi Networked Fighting and OTG, 3500mAh Battery, with Portable Case(Black 64GB)",
    "price": 3940.01,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61oM5+j6JVL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 600+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Seagate Game Drive for PlayStation® Consoles 5 TB External Hard Drive - USB 3.2 Gen 1, Officially-License (STLV5000100)",
    "price": 10789.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/51ZzJAD0dXL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Retro Gaming Console, Portable Video Game Console with 3.0 inch IPS Screen and Preloaded 400 Classic Video Games, Mini Retro Handheld Game Console (Green)",
    "price": 1592.77,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71XZr1NNKnL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 50+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "Retro Gaming Console Pro with 40,000+ Built-in Classic Video Games, Retro Game Stick with 38 Emulators, Video Gaming Stick HDMI Output, Plug &amp; Play TV (64G)",
    "price": 3153.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71bALrxDtyL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "200+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 5
  },
  {
    "name": "Xbox Wireless Gaming Controller (2025) – Shock Blue – Play on Xbox, Windows, Android, iOS, FireTV Sticks, Smart TVs, VR Headsets",
    "price": 3983.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61NlIRlKo5L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "Nintendo Wii Console, White Premium Bundle (Renewed)",
    "price": 9934.27,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61OI1MNjZZL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Dec 7 - 14Or fastest delivery Dec 6 - 11",
    "rating": 3.7
  },
  {
    "name": "Sony PlayStation 4 Slim Limited Edition 1TB Gaming Console (Renewed)",
    "price": 17424.19,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71NaMlQ3WpL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "400+ bought in past month - FREE delivery Dec 4 - 8Or fastest delivery Dec 2 - 4Only 12 left in stock - order soon.",
    "rating": 4.2
  },
  {
    "name": "Logitech MK270 Wireless Keyboard and Mouse Combo for Windows, 2.4 GHz, 8 Multimedia Keys, PC, Laptop, Wireless Keyboard Compact Mouse Combo - Black Carbon Neutral Certified by SCS Global Services",
    "price": 1576.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61+aByx2jML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Overall Pick - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Mon, Dec 1",
    "rating": 4.4
  },
  {
    "name": "Amazon Basics Wired QWERTY Keyboard, Full-Sized, Black",
    "price": 829.17,
    "Category": "Accessories",
    "imageUrl": "https://m.media-amazon.com/images/I/71ehwfAM4-L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Logitech K400 Plus Wireless Touch TV Keyboard With Easy Media Control and Built-in Touchpad, HTPC Keyboard for PC-connected TV, Windows, Android, ChromeOS, Laptop, Tablet - Black",
    "price": 1991.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51yjnWJ5urL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Logitech G213 Prodigy Gaming Keyboard, LIGHTSYNC RGB Backlit Keys - Black",
    "price": 3319.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71y+Sl+qWwL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Logitech G413 SE Full-Size Mechanical Gaming Keyboard - Backlit Keyboard with Tactile Mechanical Switches, Anti-Ghosting, Compatible with Windows, macOS - Black Aluminum",
    "price": 4149.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61thTSgqWOL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.6
  },
  {
    "name": "Logitech K120 Wired Keyboard for Windows, Plug and Play, Full-Size, Spill-Resistant, Curved Space Bar, Compatible with PC, Laptop - Black",
    "price": 995.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61j3wQheLXL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Mon, Dec 1",
    "rating": 4.6
  },
  {
    "name": "SteelSeries Apex 3 TKL RGB Gaming Keyboard – Tenkeyless Compact Form Factor - 8-Zone RGB Illumination – IP32 Water &amp; Dust Resistant – Whisper Quiet Gaming Switch – Gaming Grade Anti-Ghosting,Black",
    "price": 2655.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71UnL+fUeWL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.6
  },
  {
    "name": "Logitech MK270 Wireless Keyboard and Mouse Combo for Windows, 2.4 GHz, 8 Multimedia Keys, PC, Laptop, Wireless Keyboard Compact Mouse Combo - Rose",
    "price": 1659.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61mtdhRTYmL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "8K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "EPOMAKER X Aula F75 MAX Wireless Mechanical Keyboard with TFT Screen and Knob, Gasket Gaming Keyboard in 75% Layout, Hot Swappable, RGB Backlight, for PC/Mac/Linux (Black Gradient)",
    "price": 4821.47,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61yPM8dmZKL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.7
  },
  {
    "name": "TECKNET Gaming Keyboard, USB Wired Computer Keyboard, 15-Zone RGB Illumination, IP32 Water Resistance, 25 Anti-ghosting Keys, All-Metal Panel (Whisper Quiet Gaming Switch)",
    "price": 1659.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/714WvRlURgL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "65% Gaming Keyboard, Wired Backlit Mini Keyboard, Ultra-Compact Anti-Ghosting No-Conflict 68 Keys Membrane Gaming Wired Keyboard for PC Laptop Windows Gamer",
    "price": 1126.31,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61RM1rMoceL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "AULA S99 Gaming Keyboard, Wireless Computer Keyboards, Tri-Mode Bluetooth/2.4GHz/USB-C Custom Creamy Keyboard with Number Pad, RGB Backlit Media Knob Cute Programmable Keyboard for PC Gamer - Green",
    "price": 2323.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61r9aziJGFL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Logitech MK345 Wireless Keyboard and Mouse Combo with Palm Rest, 2.4 GHz USB Receiver, Compatible with PC, Laptop, Black",
    "price": 2323.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61uieMl7JBL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tue, Dec 2",
    "rating": 4.4
  },
  {
    "name": "AULA 99 Key Keyboard, Wireless Gaming Keyboard Bluetooth Computer Keyboards Creamy Cute with Number Pad RGB Backlit Tri-Mode BT/2.4GHz/USB-C - Pink",
    "price": 2323.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61VrVSiIRGL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "CORSAIR K70 RGB PRO Mechanical Wired Gaming Keyboard – Cherry MX Red Linear Switches, SOCD, PBT Double-Shot Keycaps, 8000Hz Hyper-Polling, NKRO, Anti-Ghosting, Tournament Switch, QWERTY NA – Black",
    "price": 14935.85,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71GIaV46CvL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Tue, Dec 9Only 2 left in stock - order soon.",
    "rating": 4.5
  },
  {
    "name": "Redragon Mechanical Gaming Keyboard Wired, 11 Programmable Backlit Modes, Hot-Swappable Red Switch, Anti-Ghosting, Double-Shot PBT Keycaps, Light Up Keyboard for PC Mac",
    "price": 1991.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71Bk2A2WmOL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "Womier S-K80 75% Keyboard with Color Multimedia Display Mechanical Gaming Keyboard Creamy Sound, Wired Hot Swappable Gasket Mount RGB Custom Key board, Pre-lubed Stabilizer for Mac/Win, Black Kanagawa",
    "price": 3684.37,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71duf0rTDqL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.7
  },
  {
    "name": "Logitech Pebble Keys 2 K380s, Multi-Device Bluetooth Wireless Keyboard with Customizable Shortcuts, Slim and Portable, Easy-Switch for Windows, macOS, iPadOS, Android, Chrome OS - Tonal Graphite Carbon Neutral Certified by SCS Global Services",
    "price": 2405.34,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61whrA5i6YL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 4K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.5
  },
  {
    "name": "Logitech MK335 Quiet Wireless Keyboard and Mouse Combo - Black/Silver Keyboard and Mouse Combo Wireless, Ambidextrous",
    "price": 2489.17,
    "Category": "Accessories",
    "imageUrl": "https://m.media-amazon.com/images/I/5110JBRA1-L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 7K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Logitech K585 Multi-Device Slim Wireless Keyboard, Built-in Cradle for Device; for Laptop, Tablet, Desktop, Smartphone, Win/Mac, Bluetooth/Receiver, Compact, Easy Switch, 24 Month Battery - Rose",
    "price": 2489.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61-YFJgEt5L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "AULA F75 Pro Wireless Mechanical Keyboard,75% Hot Swappable Custom Keyboard with Knob,RGB Backlit,Pre-lubed Reaper Switches,Side Printed PBT Keycaps,2.4GHz/USB-C/BT5.0 Mechanical Gaming Keyboards",
    "price": 5311.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61MC8BK0w0L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 5K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.7
  },
  {
    "name": "Logitech MK120 Wired Keyboard and Mouse Combo for Windows, Optical Wired Mouse, Full-Size, USB, Compatible with PC, Laptop - Black",
    "price": 1323.85,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/717IbQpOStL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "7K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Mon, Dec 1",
    "rating": 4.5
  },
  {
    "name": "Razer Ornata V3 Gaming Keyboard: Low Profile Keys - Mecha Membrane Switches - UV Coated Keycaps - Backlit Media Keys - 10 Zone RGB Lighting - Spill Resistant - Magnetic Wrist Wrest - Snap Tap",
    "price": 4564.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71YW8+KhOwL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Wireless Keyboard and Mouse Combo, Full Size Silent Ergonomic Keyboard and Mouse, Long Battery Life, Optical Mouse, 2.4G Lag-Free Cordless Mice Keyboard for Computer, Mac, Laptop, PC, Windows ClimatePartner certified",
    "price": 1576.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61CaBkGgWfL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 5K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "AULA F99 Wireless Mechanical Keyboard,Tri-Mode BT5.0/2.4GHz/USB-C Hot Swappable Custom Keyboard,Pre-lubed Linear Switches,RGB Backlit Computer Gaming Keyboards for PC/Tablet/PS/Xbox",
    "price": 5311.17,
    "Category": "Tablet",
    "imageUrl": "https://m.media-amazon.com/images/I/61dle1FTC9L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "Logitech Signature K650 Comfort Full-Size Wireless Keyboard with Wrist Rest, BLE Bluetooth or Logi Bolt USB Receiver, Deep-Cushioned Keys, Numpad, Compatible with Most OS/PC/Window/Mac - Graphite",
    "price": 3818,
    "Category": "Apple",
    "imageUrl": "https://m.media-amazon.com/images/I/61X1TbsLQWL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 2K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Logitech K250 Bluetooth Keyboard with Numpad, Easy Connectivity, Compact Wireless Keyboard Made with Recycled Plastic, Spill-Resistant, Comfortable Keys - Windows/MacOS - Graphite",
    "price": 1825.17,
    "Category": "Accessories",
    "imageUrl": "https://m.media-amazon.com/images/I/615dhrb9+ZL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "2K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Rii RK100+ Multiple Color Rainbow LED Backlit Large Size USB Wired Mechanical Feeling Multimedia PC Gaming Keyboard,Office Keyboard for Working or Primer Gaming,Office Device",
    "price": 1056.59,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61jhVTLFAEL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 4.4
  },
  {
    "name": "Logitech K270 Wireless Keyboard for Windows, 2.4 GHz Wireless, Full-Size, Number Pad, 8 Multimedia Keys, 2-Year Battery Life, Compatible with PC, Laptop - Rose",
    "price": 1659.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61PgTrYnQSL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Retro Wireless Keyboard with Round Keycaps, 2.4GHz Full-Size USB Cute Wireless Keyboard Mouse for Computer, Desktop, Laptop and Computer (Pink-Colorful)",
    "price": 1659.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71jwfoKEMcL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "1K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.3
  },
  {
    "name": "Razer BlackWidow V4 X Mechanical Gaming Keyboard: Yellow Switches Linear &amp; Silent - 6 Macro Keys - Chroma RGB - Doubleshot ABS Keycaps - Roller &amp; Media Keys - Snap Tap",
    "price": 8714.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71m+Xv1JKML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 500+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.1
  },
  {
    "name": "Redragon K521 Upgrade Rainbow LED Gaming Keyboard, 104 Keys Wired Mechanical Feeling Keyboard with Multimedia Keys, One-Touch Backlit, Anti-Ghosting, Compatible with PC, Mac, PS4/5, Xbox",
    "price": 1254.96,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71kp4T3JSIL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Tomorrow, Nov 30",
    "rating": 4.3
  },
  {
    "name": "Logitech G305 LIGHTSPEED Wireless Gaming Mouse, Hero 12K Sensor, 12,000 DPI, Lightweight, 6 Programmable Buttons, 250h Battery Life, On-Board Memory, PC/Mac - White",
    "price": 2323.17,
    "Category": "Apple",
    "imageUrl": "https://m.media-amazon.com/images/I/51XH51COHTL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Overall Pick - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.6
  },
  {
    "name": "acer Wireless Mouse for Laptop, 2.4GHz Computer Mouse 3 Adjustable DPI Office Cordless USB Mice with USBA Receiver, 6 Buttons, 1600 DPI, Medium to Large Sized Hands Compatible with PC, Laptop, Desktop Recycled Claim Standard 100",
    "price": 786.84,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61nRnf8NMnL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "Razer Basilisk V3 Customizable Ergonomic Gaming Mouse: Fastest Gaming Mouse Switch - Chroma RGB Lighting - 26K DPI Optical Sensor - 11 Programmable Buttons - HyperScroll Tilt Wheel - Classic Black ECOLOGO",
    "price": 2443.52,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61AcT0ZuO3L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.6
  },
  {
    "name": "Logitech M196 Bluetooth Wireless Mouse, Compact and Portable Mouse for Laptops, Tablets and More, 12-Month Battery, Smooth Tracking, Compatible with PC and Mac, Windows and macOS - Rose Carbon Neutral Certified by SCS Global Services",
    "price": 829.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51pHCXgJOWL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "HP X3000 G3 Wireless Mouse - Black, 15-Month Battery, Side Grips for Control, Travel-Friendly, Blue LED, Powerful 1600 DPI Optical Sensor, Compatible with Wins PC/Laptop, Mac, Chromebook (683N7AA)",
    "price": 912.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/610qzHRTFOL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.6
  },
  {
    "name": "Logitech M330 SILENT Wireless Mouse, 2.4GHz with USB Receiver, Optical Tracking, Quiet &amp; Lightweight, Long Battery Life, for PC, Mac, Laptop, Chromebook - Black Carbon Neutral Certified by SCS Global Services",
    "price": 1078.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61qm452yy-L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Logitech M185 Wireless Mouse, 2.4GHz with USB Mini Receiver, 12-Month Battery Life, 1000 DPI Optical Tracking, Ambidextrous PC/Mac/Laptop - Swift Grey Carbon Neutral Certified by SCS Global Services",
    "price": 1161.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51WN5aXZWIL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Razer Basilisk V3 X HyperSpeed Customizable Wireless Gaming Mouse: Mechanical Switches Gen-2-5G Advanced 18K Optical Sensor - Chroma RGB 9 Programmable Controls 535 Hr Battery Classic Black ECOLOGO",
    "price": 3153.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/71jvxQ6NoqL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 8K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Overnight 7 AM - 11 AM",
    "rating": 4.4
  },
  {
    "name": "Logitech Signature M550 L Full Size Wireless Mouse - for Large Sized Hands, 2-Year Battery, Silent Clicks, Bluetooth, Multi-Device Compatibility - Black Carbon Neutral Certified by SCS Global Services",
    "price": 1493.17,
    "Category": "Accessories",
    "imageUrl": "https://m.media-amazon.com/images/I/61tRmwwYBzL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.6
  },
  {
    "name": "Wireless Bluetooth Mouse, Rechargeable, LED, Silent, Ultra-thin Design (Bluetooth 5.2 and 2.4GHz USB Receiver) | Portable Computer Mouse for Laptops, iPads, MacBooks and Apple Devices (Black)",
    "price": 472.27,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61167CbmCKL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 7K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Logitech G305 LIGHTSPEED Wireless Gaming Mouse, Hero 12K Sensor, 12,000 DPI, Lightweight, 6 Programmable Buttons, 250h Battery Life, On-Board Memory, PC/Mac - Black",
    "price": 2198.67,
    "Category": "Apple",
    "imageUrl": "https://m.media-amazon.com/images/I/51sg9BLSMTL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "Redragon M810 Pro Wireless Gaming Mouse, 10000 DPI Wired/Wireless Gamer Mouse w/Rapid Fire Key, 8 Macro Buttons, 45-Hour Reliable Power Capacity and RGB Backlit for PC/Mac/Laptop",
    "price": 1904.02,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51UCF1KOnKL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Logitech M240 Silent Bluetooth Mouse, Wireless, Compact, Portable, Smooth Tracking, 18-Month Battery, for Windows, macOS, ChromeOS, Compatible with PC, Mac, Laptop, Tablets - Graphite Carbon Neutral Certified by SCS Global Services",
    "price": 1078.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51+zmcWK3cL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Sun, Dec 7 on $35 of items shipped by AmazonOr fastest delivery Mon, Dec 1",
    "rating": 4.5
  },
  {
    "name": "VssoPlor Wireless Mouse, 2.4G Slim Portable Computer Laptop Mouse with Nano Receiver Quiet Silent Optical Mice for Notebook, PC, Laptop, Computer-Black and Gold ClimatePartner certified",
    "price": 662.34,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51dsuumz6HL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "TECKNET Wireless Mouse, 2.4G Ergonomic Optical Mouse, Computer Mouse for Laptop, PC, Computer, Chromebook, Notebook, 6 Buttons, 24 Months Battery Life, 2600 DPI, 5 Adjustment Levels",
    "price": 829.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71tqvuHgIlL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Razer DeathAdder Essential Gaming Mouse: 6400 DPI Optical Sensor - 5 Programmable Buttons - Mechanical Switches - Rubber Side Grips - Classic Black ECOLOGO",
    "price": 1409.34,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/8189uwDnMkL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "7K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "TECKNET Wireless Mouse for Laptop, 2.4G Quiet Computer Mouse with USB Receiver, 4 Buttons Portable Cordless Mice for Chromebook, Laptop, PC, Mac, 800/1200/1600 DPI - Mint Green",
    "price": 829.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51O9gRjCnDL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "4K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "Logitech M510 Wireless Mouse, Mouse for Laptop and PC with USB Unifying Receiver, Programmable Buttons - Graphite",
    "price": 2323.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61xgpXecLML._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "Logitech MX Anywhere 2S Bluetooth Edition Compact Wireless Mouse, No USB Receiver - Use On Any Surface, Hyper-Fast Scrolling, Rechargeable, Control Up to 3 Apple Mac and Windows Computers and Laptops",
    "price": 3153.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51qC-qTRLCL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.5
  },
  {
    "name": "Logitech B100 Wired Mouse for Computer and Laptop, USB Corded Mouse, Right or Left Hand Use - Black",
    "price": 663.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61hzuoXwjqL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "8K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "Razer Viper V3 HyperSpeed Wireless Esports Gaming Mouse: 82g Lightweight - Up to 280 Hr Battery - 30K DPI Optical Sensor - Gen-2 Mechanical Switches - 8 Programmable Controls - Classic Black ECOLOGO",
    "price": 3568.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61LI6E0sJwL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Today 5 PM - 10 PM",
    "rating": 4.4
  },
  {
    "name": "Logitech M240 Silent Bluetooth Mouse, Wireless, Compact, Portable, Smooth Tracking, 18-Month Battery, for Windows, macOS, ChromeOS, Compatible with PC, Mac, Laptop, Tablets - Off White Carbon Neutral Certified by SCS Global Services",
    "price": 1078.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/515OAgXUF9L._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.5
  },
  {
    "name": "Amazon Basics 3-Button USB Wired Mouse with Scrolling and Tracking - Standard, Black",
    "price": 596.77,
    "Category": "Accessories",
    "imageUrl": "https://m.media-amazon.com/images/I/61Mzk2NljxL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "10K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "TECKNET Bluetooth Mouse, 2-in-1(BT 5.0/3.0+2.4Ghz) 4000DPI Wireless Mice with USB Connect Available for Laptop Computer, Portable PC Mouse Bluetooth for Mac (USB-A+BT Wireless Connect, Black)",
    "price": 1078.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/51dNOwNGEEL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.4
  },
  {
    "name": "TECKNET Wireless Mouse (BT5.0/3.0 &amp; 2.4G) Rechargeable 4800 DPI Silent USB A &amp; Bluetooth Mouse 6 Buttons, Wide Compatibility - Grey",
    "price": 1024.22,
    "Category": "Accessories",
    "imageUrl": "https://m.media-amazon.com/images/I/61MoSPeCRuL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 5K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "Anker 2.4G Wireless Vertical Ergonomic Optical Mouse for Work, Multi-Device Connectivity, 800/1200 /1600 DPI, 5 Buttons for Laptop, Desktop, PC, MacBook - Black ECOLOGO",
    "price": 1659.17,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61vw-G9fvQL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 6K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.2
  },
  {
    "name": "Rii Wireless Mouse, 2.4G Portable Computer Mice for PC, Laptop, Windows,Office Included Wireless USB dongle (Black)",
    "price": 480.57,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/71OUy8F48ZL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "7K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.3
  },
  {
    "name": "Corsair Scimitar Elite Wireless SE MMO PC Gaming Mouse – 33,000 DPI, 16 Programmable Buttons, Key Slider, Elgato Virtual Stream Deck, 1,000Hz Polling, Up to 150-Hour Battery – Gunmetal",
    "price": 6224.17,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61UHfqT0pHL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 1K+ bought in past month - FREE delivery Thu, Dec 4Or fastest delivery Tomorrow, Nov 30",
    "rating": 4.1
  },
  {
    "name": "Redragon M612 Predator RGB Gaming Mouse, 8000 DPI Wired Optical Mouse with 11 Programmable Buttons &amp; 5 Backlit Modes, Software Supports DIY Keybinds Rapid Fire Button ClimeCo Certified",
    "price": 1181.92,
    "Category": "Gaming",
    "imageUrl": "https://m.media-amazon.com/images/I/61vF4LdktpL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 6K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 2 PM - 6 PM",
    "rating": 4.6
  },
  {
    "name": "Mighty Mouse: The New Adventures - The Complete Series",
    "price": 1933.9,
    "Category": "Accessories",
    "imageUrl": "https://m.media-amazon.com/images/I/71A+mTCZuHL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "FREE delivery Dec 16 - 22 on $35 of items shipped by AmazonOr fastest delivery Dec 16 - 19",
    "rating": 4.6
  },
  {
    "name": "Wireless Bluetooth Mouse Rechargeable Laptop Mice with LED Lights Silent Slim Use(BT5.2 and 2.4G Portable USB) Dual Mode Computer Mouse for Laptop/iPad/Tablet/Apple/Computer/Mac (Black)",
    "price": 550.29,
    "Category": "Laptop",
    "imageUrl": "https://m.media-amazon.com/images/I/61qG31mjnrL._AC_UY654_FMwebp_QL65_.jpg",
    "description": "Cyber Monday Deal - 3K+ bought in past month - FREE delivery Thu, Dec 4 on $35 of items shipped by AmazonOr fastest delivery Today 5 PM - 10 PM",
    "rating": 4.2
  }
];




function generateTags(product) {
  const tags = new Set();

  if (product.Category) {
    tags.add(product.Category.toLowerCase());
  }

  const nameWords = product.name.toLowerCase().split(/[\s\-\(\)\/,]+/).filter(w => w.length > 2);
  nameWords.forEach(w => tags.add(w));

  const description = (product.description || "").toLowerCase();

  if (description.includes("wireless") || product.name.toLowerCase().includes("wireless")) tags.add("wireless");
  if (description.includes("bluetooth") || product.name.toLowerCase().includes("bluetooth")) tags.add("bluetooth");
  if (description.includes("gaming") || product.name.toLowerCase().includes("gaming")) tags.add("gaming");

  return Array.from(tags).slice(0, 10);
}

const productsWithTags = products.map(p => ({
  ...p,
  tags: generateTags(p)
}));

const bcrypt = require('bcrypt');

async function ensureSellers() {
  const sellers = [
    { name: 'Seller One', email: 'seller1@example.com', phone: '9000000001', password: 'sellerpass1' },
    { name: 'Seller Two', email: 'seller2@example.com', phone: '9000000002', password: 'sellerpass2' },
    { name: 'Seller Three', email: 'seller3@example.com', phone: '9000000003', password: 'sellerpass3' }
  ];

  const sellerIds = [];
  for (const s of sellers) {
    const hashed = await bcrypt.hash(s.password, 10);
    const user = await prisma.users.upsert({
      where: { email: s.email },
      update: {},
      create: {
        name: s.name,
        email: s.email,
        phone: s.phone,
        password: hashed,
        accountType: 'SELLER'
      }
    });
    sellerIds.push(user.id);

    await prisma.address.create({
      data: {
        userId: user.id,
        fullName: s.name,
        phone: s.phone,
        streetLine1: `${s.name} Store, 123 Business Street`,
        streetLine2: 'Suite 100',
        city: 'Mumbai',
        state: 'Maharashtra',
        postalCode: '400001',
        country: 'India',
        isDefault: true
      }
    });
  }

  return sellerIds;
}

async function ensureCustomers() {
  /* 
    Ensure Admin User Exists
    Login: admin@easecart.com
    Pass: admin123
  */
  const adminPass = await bcrypt.hash('admin123', 10);
  await prisma.users.upsert({
    where: { email: 'admin@easecart.com' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@easecart.com',
      phone: '9999999999',
      password: adminPass,
      accountType: 'ADMIN'
    }
  });
  console.log("Admin user ensured: admin@easecart.com / admin123");

  const customers = [
    { name: 'Customer One', email: 'customer1@example.com', phone: '8000000001', password: 'customerpass1' },
    { name: 'Customer Two', email: 'customer2@example.com', phone: '8000000002', password: 'customerpass2' },
    { name: 'Customer Three', email: 'customer3@example.com', phone: '8000000003', password: 'customerpass3' },
    { name: 'Customer Four', email: 'customer4@example.com', phone: '8000000004', password: 'customerpass4' },
    { name: 'Customer Five', email: 'customer5@example.com', phone: '8000000005', password: 'customerpass5' }
  ];

  const customerIds = [];
  for (const c of customers) {
    const hashed = await bcrypt.hash(c.password, 10);
    const user = await prisma.users.upsert({
      where: { email: c.email },
      update: {},
      create: {
        name: c.name,
        email: c.email,
        phone: c.phone,
        password: hashed,
        accountType: 'CUSTOMER'
      }
    });
    customerIds.push(user.id);

    // Add address for customer
    await prisma.address.create({
      data: {
        userId: user.id,
        fullName: c.name,
        phone: c.phone,
        streetLine1: `${c.name}, 456 Residential Lane`,
        streetLine2: 'Apt 201',
        city: 'Bangalore',
        state: 'Karnataka',
        postalCode: '560001',
        country: 'India',
        isDefault: true
      }
    });
  }

  return customerIds;
}

async function seed() {
  try {
    console.log("Seeding products with INR prices and tags...");
    await prisma.$connect();

    await prisma.products.deleteMany({});
    console.log("Cleared existing products");

    const sellerIds = await ensureSellers();
    console.log(`Created ${sellerIds.length} sellers with addresses`);

    const customerIds = await ensureCustomers();
    console.log(`Created ${customerIds.length} customers with addresses`);

    const productsWithSellers = productsWithTags.map((p, i) => ({
      ...p,
      sellerId: sellerIds[i % sellerIds.length]
    }));

    const chunkSize = 200;
    for (let i = 0; i < productsWithSellers.length; i += chunkSize) {
      const chunk = productsWithSellers.slice(i, i + chunkSize);
      await prisma.products.createMany({ data: chunk });
      console.log(`Inserted products ${i + 1} - ${Math.min(i + chunkSize, productsWithSellers.length)}`);
    }

    console.log("Products seeded successfully with INR prices");
  } catch (err) {
    console.error("Error while seeding:", err);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
