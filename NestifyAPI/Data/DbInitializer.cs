using NestifyAPI.Entities;

namespace NestifyAPI.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext storeContext)
        {
            if (storeContext.Products.Any()) return;
            var products = new List<Product>
            {
                new Product
                {
                    Id = 1,
                    Name = "Modern Sectional Sofa",
                    Description = "This modern sectional sofa is perfect for any contemporary living room. It features a sleek design and comfortable cushions.",
                    Price = 1299.99m,
                    PictureUrl = "/images/products/sectional_sofa_id_1.jpg",
                    Brand = "ABC Furniture",
                    Type = "Sofas & sectionals",
                    QuantityInStock = 10
                },
                new Product
                {
                    Id = 2,
                    Name = "Leather Recliner Sofa",
                    Description = "Relax in style with this luxurious leather recliner sofa. It features power reclining and adjustable headrests for ultimate comfort.",
                    Price = 1599.99m,
                    PictureUrl = "/images/products/reclined_sofa_id_2.jpg",
                    Brand = "XYZ Furniture",
                    Type = "Sofas & sectionals",
                    QuantityInStock = 8
                },
                new Product
                {
                    Id = 3,
                    Name = "Mid-Century Modern Sofa",
                    Description = "This mid-century modern sofa adds a touch of retro charm to any living space. It features clean lines and a button-tufted back.",
                    Price = 899.99m,
                    PictureUrl = "/images/products/mid-century-sofa_id-3.jpg",
                    Brand = "DEF Furniture",
                    Type = "Sofas & sectionals",
                    QuantityInStock = 15
                },
                new Product
                {
                    Id = 4,
                    Name = "Fabric Recliner Sofa",
                    Description = "This cozy fabric recliner sofa is perfect for movie nights and lazy Sundays. It features soft cushions and reclining seats.",
                    Price = 1199.99m,
                    PictureUrl = "/images/products/fabric_reclined_sofa_id_4.jpg",
                    Brand = "ABC Furniture",
                    Type = "Sofas & sectionals",
                    QuantityInStock = 12
                },
                new Product
                {
                    Id = 5,
                    Name = "L-Shaped Sectional Sofa",
                    Description = "This spacious L-shaped sectional sofa is perfect for entertaining guests. It features plush cushions and a chaise lounge.",
                    Price = 1799.99m,
                    PictureUrl = "/images/products/L-shaped-Sofa_id_5.jpg",
                    Brand = "XYZ Furniture",
                    Type = "Sofas & sectionals",
                    QuantityInStock = 6
                },
                new Product
                {
                    Id = 6,
                    Name = "Modern Glass Dining Table",
                    Description = "This modern glass dining table adds a touch of elegance to any dining room. It features a tempered glass top and sleek metal legs.",
                    Price = 799.99m,
                    PictureUrl = "/images/products/dining-table-glass-id_ 6.jpg",
                    Brand = "ABC Furniture",
                    Type = "Dining Sets",
                    QuantityInStock = 7
                },
                 new Product
                {
                    Id = 7,
                    Name = "Rustic Wood Dining Set",
                    Description = "This rustic wood dining set is perfect for family dinners and gatherings. It features a solid wood table and matching chairs.",
                    Price = 1499.99m,
                    PictureUrl = "/images/products/dining-table-in-brown-reclaimed-wood-id_7.jpg",
                    Brand = "XYZ Furniture",
                    Type = "Dining Sets",
                    QuantityInStock = 4
                },
                new Product
                {
                    Id = 8,
                    Name = "Extendable Dining Table",
                    Description = "This extendable dining table is perfect for hosting large dinner parties. It features a classic design and a hidden leaf extension.",
                    Price = 999.99m,
                    PictureUrl = "/images/products/extendable_dining_table_id_8.jpg",
                    Brand = "DEF Furniture",
                    Type = "Dining Sets",
                    QuantityInStock = 9
                },
                new Product
                {
                    Id = 9,
                    Name = "Contemporary Dining Chairs",
                    Description = "These contemporary dining chairs add a pop of color to any dining room. They feature a curved backrest and comfortable seat.",
                    Price = 249.99m,
                    PictureUrl = "/images/products/contemporary_dining_chairs_id_9.jpg",
                    Brand = "ABC Furniture",
                    Type = "Dining Sets",
                    QuantityInStock = 20
                },
                new Product
                {
                    Id = 10,
                    Name = "Industrial Style Dining Set",
                    Description = "This industrial style dining set is perfect for a modern loft or open-concept living space. It features a metal table and matching chairs.",
                    Price = 1199.99m,
                    PictureUrl = "/images/products/industrial_style_dining_set_id_10.jpg",
                    Brand = "XYZ Furniture",
                    Type = "Dining Sets",
                    QuantityInStock = 5
                },
                 new Product
                {
                    Id = 11,
                    Name = "King Size Platform Bed",
                    Description = "This king size platform bed is perfect for a modern bedroom. It features a low profile design and a padded headboard.",
                    Price = 999.99m,
                    PictureUrl = "/images/products/king_size_platform_bed_id_11.jpeg",
                    Brand = "ABC Furniture",
                    Type = "Bedroom Furniture",
                    QuantityInStock = 6
                },
                new Product
                {
                    Id = 12,
                    Name = "Mid-Century Dresser",
                    Description = "This mid-century modern dresser adds a touch of retro charm to any bedroom. It features clean lines and ample storage space.",
                    Price = 799.99m,
                    PictureUrl = "/images/products/mid-century-modern-dresser-id_12.jpg",
                    Brand = "XYZ Furniture",
                    Type = "Bedroom Furniture",
                    QuantityInStock = 8
                },
                 new Product
                {
                    Id = 13,
                    Name = "Queen Size Storage Bed",
                    Description = "This queen size storage bed is perfect for a small bedroom. It features built-in drawers and a tufted headboard for added comfort.",
                    Price = 1299.99m,
                    PictureUrl = "/images/products/king_size_storage_bed_id_13.jpg",
                    Brand = "DEF Furniture",
                    Type = "Bedroom Furniture",
                    QuantityInStock = 4
               },
                new Product
                {
                    Id = 14,
                    Name = "Upholstered Accent Chair",
                    Description = "This upholstered accent chair is perfect for a cozy reading nook or bedroom corner. It features a comfortable seat and elegant design.",
                    Price = 299.99m,
                    PictureUrl = "/images/products/upholstered-accent-chair_id_14.jpg",
                    Brand = "ABC Furniture",
                    Type = "Bedroom Furniture",
                    QuantityInStock = 12
                },
                new Product
                {
                    Id = 15,
                    Name = "Rustic Nightstand",
                    Description = "This rustic nightstand adds a touch of charm to any bedroom. It features a solid wood construction and a pull-out drawer.",
                    Price = 199.99m,
                    PictureUrl = "/images/products/rustic-nightstand_id_15.webp",
                    Brand = "XYZ Furniture",
                    Type = "Bedroom Furniture",
                    QuantityInStock = 10
                },
                new Product
                {
                    Id = 16,
                    Name = "Executive Desk",
                    Description = "This executive desk is perfect for a home office or study. It features a large work surface and ample storage space.",
                    Price = 1299.99m,
                    PictureUrl = "/images/products/executive_desk_id_16.jpg",
                    Brand = "ABC Furniture",
                    Type = "Home Office Furniture",
                    QuantityInStock = 3
                },
                new Product
                {
                    Id = 17,
                    Name = "Ergonomic Office Chair",
                    Description = "This ergonomic office chair is designed for comfort and productivity. It features adjustable height and lumbar support.",
                    Price = 499.99m,
                    PictureUrl = "/images/products/ergonomic-office-chair_id_17.jpg",
                    Brand = "XYZ Furniture",
                    Type = "Home Office Furniture",
                    QuantityInStock = 8
                },
                new Product
                {
                    Id = 18,
                    Name = "Bookshelf",
                    Description = "This bookshelf is perfect for organizing your home office or personal library. It features multiple shelves and a sturdy construction.",
                    Price = 399.99m,
                    PictureUrl = "/images/products/modern_bookshelf_id_18.jpg",
                    Brand = "DEF Furniture",
                    Type = "Home Office Furniture",
                    QuantityInStock = 6
                },
                new Product
                {
                    Id = 19,
                    Name = "L-Shaped Desk",
                    Description = "This L-shaped desk is perfect for a home office or small business. It features a spacious work surface and a modern design.",
                    Price = 899.99m,
                    PictureUrl = "/images/products/L-shaped-desk_id_19.jpeg",
                    Brand = "ABC Furniture",
                    Type = "Home Office Furniture",
                    QuantityInStock = 5
                },
                new Product
                {
                    Id = 20,
                    Name = "Task Lamp",
                    Description = "This task lamp is perfect for late-night work sessions or reading. It features adjustable brightness and a modern design.",
                    Price = 99.99m,
                    PictureUrl = "/images/products/task_lamp_id_20.png",
                    Brand = "XYZ Furniture",
                    Type = "Home Office Furniture",
                    QuantityInStock = 15
                },
              new Product
                {
                    Id = 21,
                    Name = "Wicker Patio Set",
                    Description = "This wicker patio set is perfect for outdoor entertaining. It features a table and chairs with weather-resistant cushions.",
                    Price = 1299.99m,
                    PictureUrl = "/images/products/wicker_patio_set_id_21.jpeg",
                    Brand = "ABC Furniture",
                    Type = "Outdoor Furniture",
                    QuantityInStock = 2
                },
                new Product
                {
                    Id = 22,
                    Name = "Hammock",
                    Description = "This hammock is perfect for relaxing on a lazy afternoon. It features a sturdy construction and comfortable design.",
                    Price = 299.99m,
                    PictureUrl = "/images/products/modern-hammock_id_22.jpg",
                    Brand = "DEF Furniture",
                    Type = "Outdoor Furniture",
                    QuantityInStock = 6
                },
                new Product
                {
                    Id = 23,
                    Name = "Adirondack Chair",
                    Description = "This Adirondack chair is perfect for enjoying the great outdoors. It features a classic design and comfortable seat.",
                    Price = 199.99m,
                    PictureUrl = "/images/products/adirondack-chair_id_23.jpeg",
                    Brand = "XYZ Furniture",
                    Type = "Outdoor Furniture",
                    QuantityInStock = 8
                },
                new Product
                {
                    Id = 24,
                    Name = "Outdoor Dining Set",
                    Description = "This outdoor dining set is perfect for hosting family and friends. It features a table and chairs with weather-resistant cushions.",
                    Price = 899.99m,
                    PictureUrl = "/images/products/outdoor_dining_set_id_24.jpg",
                    Brand = "ABC Furniture",
                    Type = "Outdoor Furniture",
                    QuantityInStock = 3
                },
                new Product
                {
                    Id = 25,
                    Name = "Patio Umbrella",
                    Description = "This patio umbrella is perfect for shading your outdoor space. It features a durable construction and adjustable height.",
                    Price = 149.99m,
                    PictureUrl = "/images/products/patio_umbrella_id_25.webp",
                    Brand = "XYZ Furniture",
                    Type = "Outdoor Furniture",
                    QuantityInStock = 10
                }
            };

            foreach (var product in products)
            {
                storeContext.Products.Add(product);
            }
            storeContext.SaveChanges();
        }
    }
}
