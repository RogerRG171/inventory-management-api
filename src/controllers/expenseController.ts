import { Request, Response } from 'express'
import { prisma } from '../lib/api'

export const getExpensesByCategory = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const expensesByCategoryRaw = await prisma.expensesByCategory.findMany({
      orderBy: {
        date: 'desc',
      },
    })

    const expenseByCategorySummary = expensesByCategoryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }))

    res.json(expenseByCategorySummary)
  } catch (error) {
    res.status(500).json({ messahe: 'Error retrieving expenses by category.' })
  }
}
