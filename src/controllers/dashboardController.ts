import { Request, Response } from 'express'
import { prisma } from '../lib/api'

export const getDashboardMetrics = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: 'desc',
      },
    })
    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    })
    const purchaseSummary = await prisma.purchasesSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    })
    const expensesSummary = await prisma.expensesSummary.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
    })
    const expensesByCategorySummaryRaw =
      await prisma.expensesByCategory.findMany({
        take: 5,
        orderBy: {
          date: 'desc',
        },
      })
    const expensesByCategory = expensesByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }))

    res.status(200).json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expensesSummary,
      expensesByCategory,
    })
  } catch (error) {
    res.status(500).json({ message: 'Error retriving dashboard metrics' })
  }
}
