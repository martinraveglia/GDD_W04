import { Categorias } from './Categorias';
import { Ciudades } from './Ciudades';
import { CiudadesProductos } from './CiudadesProductos';
import { CiudadesProductosVentas } from './CiudadesProductosVentas';
import { Compras } from './Compras';
import { Cuotas } from './Cuotas';
import { Descuentos } from './Descuentos';
import { Empleados } from './Empleados';
import { MetodosPago } from './MetodosPago';
import { MetodosPagoCompra } from './MetodosPagoCompra';
import { MetodosPagoVenta } from './MetodosPagoVenta';
import { Productos } from './Productos';
import { Proveedores } from './Proveedores';
import { ProveedoresProductos } from './ProveedoresProductos';
import { ProveedoresProductosCompras } from './ProveedoresProductosCompras';
import { Provincias } from './Provincias';
import { Sucursales } from './Sucursales';
import { SucursalesProductos } from './SucursalesProductos';
import { Turnos } from './Turnos';
import { Ventas } from './Ventas';

export const configAssociations = () => {
  // Tabla Ciudades
  Provincias.hasMany(Ciudades, { foreignKey: 'idProvincia' });
  Ciudades.belongsTo(Provincias, { foreignKey: 'idProvincia' });

  // Tabla CiudadesProductos
  Productos.hasMany(CiudadesProductos, { foreignKey: 'idProductos' });
  Ciudades.hasMany(CiudadesProductos, { foreignKey: 'idCiudad' });
  CiudadesProductos.belongsTo(Ciudades, { foreignKey: 'idCiudad' });
  CiudadesProductos.belongsTo(Productos, { foreignKey: 'idProductos' });

  // Tabla CiudadesProductosVentas
  Ventas.hasMany(CiudadesProductosVentas, { foreignKey: 'idVenta' });
  CiudadesProductos.hasMany(CiudadesProductosVentas, { foreignKey: 'idCiudadesProductos' });
  CiudadesProductosVentas.belongsTo(CiudadesProductos, { foreignKey: 'idCiudadesProductos' });
  CiudadesProductosVentas.belongsTo(Ventas, { foreignKey: 'idVenta' });

  // Tabla Compras
  Sucursales.hasMany(Compras, { foreignKey: 'idSucursal' });
  MetodosPagoCompra.hasMany(Compras, { foreignKey: 'idMetodoPagoCompra' });
  Compras.belongsTo(Sucursales, { foreignKey: 'idSucursal' });
  Compras.belongsTo(MetodosPagoCompra, { foreignKey: 'idMetodoPagoCompra' });

  // Tabla Empleados
  Sucursales.hasMany(Empleados, { foreignKey: 'idSucursal' });
  Turnos.hasMany(Empleados, { foreignKey: 'idTurno' });
  Empleados.belongsTo(Sucursales, { foreignKey: 'idSucursal' });
  Empleados.belongsTo(Turnos, { foreignKey: 'idTurno' });

  // Tabla MetodosPagoCompra
  MetodosPago.hasMany(MetodosPagoCompra, { foreignKey: 'idMetodoPago' });
  Descuentos.hasMany(MetodosPagoCompra, { foreignKey: 'idDescuento' });
  Cuotas.hasMany(MetodosPagoCompra, { foreignKey: 'idCuotas' });
  MetodosPagoCompra.belongsTo(MetodosPago, { foreignKey: 'idMetodoPago' });
  MetodosPagoCompra.belongsTo(Descuentos, { foreignKey: 'idDescuento' });
  MetodosPagoCompra.belongsTo(Cuotas, { foreignKey: 'idCuotas' });

  // Tabla MetodosPagoVenta
  MetodosPago.hasMany(MetodosPagoVenta, { foreignKey: 'idMetodoPago' });
  Descuentos.hasMany(MetodosPagoVenta, { foreignKey: 'idDescuento' });
  Cuotas.hasMany(MetodosPagoVenta, { foreignKey: 'idCuotas' });
  MetodosPagoVenta.belongsTo(MetodosPago, { foreignKey: 'idMetodoPago' });
  MetodosPagoVenta.belongsTo(Descuentos, { foreignKey: 'idDescuento' });
  MetodosPagoVenta.belongsTo(Cuotas, { foreignKey: 'idCuotas' });

  // Tabla Productos
  Categorias.hasMany(Productos, { foreignKey: 'idCategoria' });
  Productos.belongsTo(Categorias, { foreignKey: 'idCategoria' });

  // Tabla Proveedores
  Ciudades.hasMany(Proveedores, { foreignKey: 'idCiudad' });
  Proveedores.belongsTo(Ciudades, { foreignKey: 'idCiudad' });

  // Tabla ProveedoresProductos
  Proveedores.hasMany(ProveedoresProductos, { foreignKey: 'idProveedor' });
  Productos.hasMany(ProveedoresProductos, { foreignKey: 'idProducto' });
  ProveedoresProductos.belongsTo(Proveedores, { foreignKey: 'idProveedor' });
  ProveedoresProductos.belongsTo(Productos, { foreignKey: 'idProducto' });

  // Tabla ProveedoresProductosCompras
  ProveedoresProductos.hasMany(ProveedoresProductosCompras, {
    foreignKey: 'idProveedoresProductos',
  });
  Compras.hasMany(ProveedoresProductosCompras, { foreignKey: 'idCompra' });
  ProveedoresProductosCompras.belongsTo(Compras, { foreignKey: 'idCompra' });
  ProveedoresProductosCompras.belongsTo(ProveedoresProductos, {
    foreignKey: 'idProveedoresProductos',
  });

  // Tabla Sucursales
  Ciudades.hasMany(Sucursales, { foreignKey: 'idCiudad' });
  Sucursales.belongsTo(Ciudades, { foreignKey: 'idCiudad' });

  // Tabla SucursalesProductos
  Sucursales.hasMany(SucursalesProductos, { foreignKey: 'idSucursal' });
  Productos.hasMany(SucursalesProductos, { foreignKey: 'idProducto' });
  SucursalesProductos.belongsTo(Sucursales, { foreignKey: 'idSucursal' });
  SucursalesProductos.belongsTo(Productos, { foreignKey: 'idProducto' });

  // Tabla Ventas
  Sucursales.hasMany(Ventas, { foreignKey: 'idSucursal' });
  MetodosPagoVenta.hasMany(Ventas, { foreignKey: 'idMetodoPagoVenta' });
  Ventas.belongsTo(Sucursales, { foreignKey: 'idSucursal' });
  Ventas.belongsTo(MetodosPagoVenta, { foreignKey: 'idMetodoPagoVenta' });
};
