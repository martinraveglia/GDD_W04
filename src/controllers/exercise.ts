import { Request, Response } from 'express';
import { Op, Sequelize } from 'sequelize';

import { Exercises } from '../constants/exercises';
import { Categorias } from '../models/Categorias';
import { Ciudades } from '../models/Ciudades';
import { CiudadesProductos } from '../models/CiudadesProductos';
import { CiudadesProductosVentas } from '../models/CiudadesProductosVentas';
import { Compras } from '../models/Compras';
import { MetodosPago } from '../models/MetodosPago';
import { MetodosPagoVenta } from '../models/MetodosPagoVenta';
import { Productos } from '../models/Productos';
import { Proveedores } from '../models/Proveedores';
import { ProveedoresProductos } from '../models/ProveedoresProductos';
import { ProveedoresProductosCompras } from '../models/ProveedoresProductosCompras';
import { Provincias } from '../models/Provincias';
import { Sucursales } from '../models/Sucursales';
import { Ventas } from '../models/Ventas';

const now = new Date();
const oneMonthInterval = {
  [Op.between]: [new Date().setMonth(now.getMonth() - 2), now],
};

// Obtener una lista con la razón social de todos los proveedores en la provincia de Santa Fe

export const exercise01 = async (req: Request, res: Response) => {
  try {
    const proveedoresSantaFe = await Proveedores.findAll({
      include: {
        model: Ciudades,
        attributes: ['idProvincia'],
        required: true,
        include: [{ model: Provincias, attributes: ['Name'], where: { Name: 'Santa Fe' } }],
      },
    });

    return res.status(200).json({ description: Exercises.n1, result: proveedoresSantaFe });
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) return res.status(400).json(error.message);
    return res.status(400).json(String(error));
  }
};

// Obtener la cantidad de sucursales que hay en la ciudad de Rosario

export const exercise02 = async (req: Request, res: Response) => {
  try {
    const countSucursalesRosario = await Sucursales.count({
      include: {
        model: Ciudades,
        attributes: ['Name'],
        required: true,
        where: { Name: 'Rosario' },
      },
    });

    return res.status(200).json({ description: Exercises.n2, result: countSucursalesRosario });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
    return res.status(400).json(String(error));
  }
};

// Consultar la cantidad de ventas que se abonaron con tarjeta de crédito el último mes
export const exercise03 = async (req: Request, res: Response) => {
  try {
    const countVentasCredito = await Ventas.count({
      include: {
        model: MetodosPagoVenta,
        attributes: ['idMetodoPago'],
        required: true,
        include: [{ model: MetodosPago, attributes: ['Metodo'], where: { Metodo: 'Credito' } }],
      },
      where: {
        timeStamp: oneMonthInterval,
      },
    });

    return res.status(200).json({ description: Exercises.n3, result: countVentasCredito });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
    return res.status(400).json(String(error));
  }
};

// Consultar cuál fue el producto más vendido el último mes

export const exercise04 = async (req: Request, res: Response) => {
  try {
    const productoMasVendido = await Ventas.findAll({
      attributes: [
        [Sequelize.fn('sum', Sequelize.col('CiudadesProductosVentas.Cantidad')), 'Total'],
      ],
      raw: true,
      subQuery: false,
      include: {
        model: CiudadesProductosVentas,
        attributes: [],
        required: true,
        include: [
          {
            model: CiudadesProductos,
            attributes: [],
            required: true,
            include: [
              {
                model: Productos,
                required: true,
              },
            ],
          },
        ],
      },
      group: 'CiudadesProductosVentas.CiudadesProducto.Producto.id',
      order: [['Total', 'DESC']],
      limit: 1,
      where: { timeStamp: oneMonthInterval },
    });

    return res.status(200).json({ description: Exercises.n4, result: productoMasVendido });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
    return res.status(400).json(String(error));
  }
};

// Consultar los ingresos totales del último mes

const getIngresosTotales = async () => {
  const ingresosTotalesDesagregados = await Ventas.findAll({
    attributes: [
      [
        Sequelize.fn('sum', Sequelize.literal('CiudadesProductosVentas.Cantidad * Precio')),
        'Total',
      ],
    ],
    raw: true,
    subQuery: false,
    include: {
      model: CiudadesProductosVentas,
      attributes: [],
      required: true,
      include: [
        {
          model: CiudadesProductos,
          attributes: [],
          required: true,
          include: [
            {
              model: Productos,
              required: true,
            },
          ],
        },
      ],
    },
    group: 'CiudadesProductosVentas.CiudadesProducto.Producto.id',
    where: { timeStamp: oneMonthInterval },
  });

  const ingresosTotales = ingresosTotalesDesagregados.reduce(
    (ingresoTotal, ingreso: any) => (ingresoTotal += Number(ingreso.Total)),
    0,
  );
  return ingresosTotales;
};

export const exercise05 = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ description: Exercises.n5, result: await getIngresosTotales() });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
    return res.status(400).json(String(error));
  }
};

// Consultar los ingresos por categoría del último mes

export const exercise06 = async (req: Request, res: Response) => {
  try {
    const ingresosPorCategoria = await Ventas.findAll({
      attributes: [
        [
          Sequelize.fn(
            'sum',
            Sequelize.literal(
              'CiudadesProductosVentas.Cantidad * `CiudadesProductosVentas->CiudadesProducto`.`Precio`',
            ),
          ),
          'Total',
        ],
        [
          Sequelize.col('CiudadesProductosVentas.CiudadesProducto.Producto.Categoria.Descripcion'),
          'Categoria',
        ],
      ],
      raw: true,
      subQuery: false,
      include: {
        model: CiudadesProductosVentas,
        attributes: [],
        required: true,
        include: [
          {
            model: CiudadesProductos,
            attributes: [],
            required: true,
            include: [
              {
                model: Productos,
                required: true,
                attributes: [],
                include: [{ model: Categorias, attributes: [], required: true }],
              },
            ],
          },
        ],
      },
      group: 'CiudadesProductosVentas.CiudadesProducto.Producto.Categoria.id',
      where: { timeStamp: oneMonthInterval },
    });

    return res.status(200).json({ description: Exercises.n6, result: ingresosPorCategoria });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
    return res.status(400).json(String(error));
  }
};

// Consultar los gastos a proveedores del último mes

const getEgresosTotales = async () => {
  const egresosTotalesDesagregados = await Compras.findAll({
    attributes: [
      [
        Sequelize.fn('sum', Sequelize.literal('ProveedoresProductosCompras.Cantidad * Precio')),
        'Total',
      ],
    ],
    raw: true,
    subQuery: false,
    include: {
      model: ProveedoresProductosCompras,
      attributes: [],
      required: true,
      include: [
        {
          model: ProveedoresProductos,
          attributes: [],
          required: true,
        },
      ],
    },
    group: 'ProveedoresProductosCompras.ProveedoresProducto.idProducto',
    where: { time: oneMonthInterval },
  });

  const egresosTotales = egresosTotalesDesagregados.reduce(
    (ingresoTotal, ingreso: any) => (ingresoTotal += Number(ingreso.Total)),
    0,
  );

  return egresosTotales;
};

export const exercise07 = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ description: Exercises.n7, result: await getEgresosTotales() });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
    return res.status(400).json(String(error));
  }
};

// Obtener el flujo de caja del mes considerando solo como ingreso a las ventas y como egreso a los proveedores

export const exercise08 = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      description: Exercises.n8,
      result: (await getIngresosTotales()) - (await getEgresosTotales()),
    });
  } catch (error) {
    if (error instanceof Error) return res.status(400).json(error.message);
    return res.status(400).json(String(error));
  }
};
