import { Response, Request } from 'express'
import { prisma } from '../lib/api'

export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const search = req.query.search?.toString()
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    })

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: 'Error retireving products' })
  }
}

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, price, stockQuantity, productId } = req.body

    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        stockQuantity,
      },
    })

    res.status(201).json(product)
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' })
  }
}
