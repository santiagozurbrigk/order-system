# Ala-Burguer - Portal de Pedidos Online

## Descripción
Portal web completo para una hamburguesería que incluye tanto el área pública para clientes como el panel de administración para gestión de pedidos y menú.

## Características

### Portal del Cliente (Público)
- **Página Principal**: Menú completo con hamburguesas, combos y promociones (sin navbar)
- **Carrito de Compras**: Gestión de productos seleccionados con cantidades
- **Checkout**: Formulario simple para datos del cliente (sin registro)
- **Resumen de Pedido**: Confirmación y detalles del pedido realizado
- **Navegación**: Solo botón flotante de carrito, sin navbar ni navegación visible

### Panel de Administración
- **Login**: Autenticación para administradores
- **Dashboard**: Gestión de pedidos entrantes con estados
- **Gestión del Menú**: CRUD completo de productos

## Tecnologías Utilizadas
- **React 19** con Vite
- **React Router DOM** para navegación
- **Tailwind CSS 4** para estilos
- **Paleta de colores tierra/marrón** personalizada

## Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── FloatingCartButton.jsx
│   ├── Navigation.jsx
│   ├── ProductCard.jsx
│   └── ...
├── pages/              # Páginas principales
│   ├── Home.jsx
│   ├── Cart.jsx
│   ├── Checkout.jsx
│   ├── OrderSummary.jsx
│   └── admin/          # Páginas de administración
│       ├── Login.jsx
│       ├── Dashboard.jsx
│       └── MenuManagement.jsx
├── data/               # Datos estáticos
│   └── menu.js
└── App.jsx            # Componente principal con rutas
```

## Paleta de Colores
- **#7f5539** - Marrón oscuro (texto principal)
- **#b08968** - Marrón medio (texto secundario, bordes)
- **#ddb892** - Marrón claro (botones, elementos interactivos)
- **#e6ccb2** - Beige claro (fondos de elementos)
- **#ede0d4** - Beige muy claro (fondo principal)

## Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Ejecutar en modo desarrollo:**
   ```bash
   npm run dev
   ```

3. **Construir para producción:**
   ```bash
   npm run build
   ```

## Rutas Disponibles

### Cliente
- `/` - Página principal con menú
- `/cart` - Carrito de compras
- `/checkout` - Formulario de checkout
- `/order-summary` - Resumen del pedido

### Administración
- `/admin/login` - Login de administrador
- `/admin/dashboard` - Dashboard de pedidos
- `/admin/menu` - Gestión del menú

## Funcionalidades Implementadas

### Portal del Cliente
- ✅ Sin navbar ni navegación visible (solo botón flotante de carrito)
- ✅ Menú completo con categorías
- ✅ Carrito de compras con gestión de cantidades
- ✅ Checkout con validación de formularios
- ✅ Resumen de pedido con confirmación
- ✅ Diseño responsive (mobile-first)
- ✅ Paleta de colores tierra/marrón
- ✅ Panel de administración completamente separado

### Panel de Administración
- ✅ Login con validación
- ✅ Dashboard con gestión de estados de pedidos
- ✅ Filtros por estado de pedido
- ✅ Gestión completa del menú (CRUD)
- ✅ Formularios de productos con validación
- ✅ Navegación entre secciones

## Próximos Pasos
- Integración con backend/API
- Autenticación real
- Base de datos para pedidos y productos
- Notificaciones en tiempo real
- Sistema de pagos
- Gestión de usuarios

## Credenciales de Prueba (Admin)
- **Email:** admin@alaburguer.com
- **Contraseña:** admin123

## Notas de Desarrollo
- El proyecto está estructurado para fácil integración con backend
- Los componentes están preparados para recibir datos de API
- La navegación está configurada con React Router
- Los estilos usan Tailwind CSS con colores personalizados
- El diseño es completamente responsive y mobile-first
- **Portal del cliente sin navbar**: Solo botón flotante de carrito
- **Panel de administración separado**: Accesible solo por enlace directo `/admin/login`