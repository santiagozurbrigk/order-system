export const menuData = {
  hamburguesas: [
    {
      id: 1,
      name: "Clásica Ala-Burguer",
      description: "Hamburguesa tradicional con carne de res, lechuga, tomate, cebolla y nuestra salsa especial",
      price: 1200,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      category: "hamburguesas"
    },
    {
      id: 2,
      name: "Doble Carne",
      description: "Doble porción de carne de res, queso cheddar, lechuga, tomate y salsa BBQ",
      price: 1800,
      image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop",
      category: "hamburguesas"
    },
    {
      id: 3,
      name: "Pollo Crispy",
      description: "Pechuga de pollo empanizada, lechuga, tomate, mayonesa y salsa de ajo",
      price: 1400,
      image: "https://images.unsplash.com/photo-1606755962773-d324e9f8b6b1?w=400&h=300&fit=crop",
      category: "hamburguesas"
    },
    {
      id: 4,
      name: "Vegetariana",
      description: "Medallón de quinoa y vegetales, lechuga, tomate, cebolla morada y salsa tahini",
      price: 1300,
      image: "https://images.unsplash.com/photo-1525059696034-4967a729002e?w=400&h=300&fit=crop",
      category: "hamburguesas"
    },
    {
      id: 5,
      name: "Bacon Deluxe",
      description: "Carne de res, queso cheddar, bacon crujiente, lechuga, tomate y salsa especial",
      price: 1600,
      image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop",
      category: "hamburguesas"
    },
    {
      id: 6,
      name: "Picante Mexicana",
      description: "Carne de res, jalapeños, queso pepper jack, lechuga, tomate y salsa picante",
      price: 1500,
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400&h=300&fit=crop",
      category: "hamburguesas"
    }
  ],
  combos: [
    {
      id: 7,
      name: "Combo Clásico",
      description: "Hamburguesa Clásica + Papas fritas + Bebida",
      price: 1800,
      image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop",
      category: "combos"
    },
    {
      id: 8,
      name: "Combo Doble",
      description: "Hamburguesa Doble Carne + Papas fritas + Bebida",
      price: 2400,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      category: "combos"
    },
    {
      id: 9,
      name: "Combo Familiar",
      description: "2 Hamburguesas Clásicas + 2 Papas fritas + 2 Bebidas",
      price: 3200,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      category: "combos"
    }
  ],
  promociones: [
    {
      id: 10,
      name: "Martes de Hamburguesa",
      description: "Cualquier hamburguesa con 20% de descuento",
      price: 960,
      originalPrice: 1200,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
      category: "promociones"
    },
    {
      id: 11,
      name: "Combo del Día",
      description: "Combo Clásico con precio especial",
      price: 1500,
      originalPrice: 1800,
      image: "https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400&h=300&fit=crop",
      category: "promociones"
    }
  ]
};

export const getAllProducts = () => {
  return [
    ...menuData.hamburguesas,
    ...menuData.combos,
    ...menuData.promociones
  ];
};
