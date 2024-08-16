import fs from 'fs'
import path from 'path'
import { prisma } from './../src/lib/api'

async function deleteAllData(orderedFileNames: string[]) {
  const modelNames = orderedFileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName))
    return modelName.charAt(0).toUpperCase() + modelName.slice(1)
  })

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma]
    if (model) {
      await model.deleteMany({})
      console.log(`deleted ${modelName}`)
    } else {
      console.error(`Model ${modelName} not found`)
    }
  }
}

async function main() {
  const dataDirectory = path.join(__dirname, 'seedData')

  const orderedFileNames = [
    'products.json',
    'users.json',
    'expenses.json',
    'expensesSummary.json',
    'sales.json',
    'salesSummary.json',
    'purchases.json',
    'purchasesSummary.json',
    'expensesByCategory.json',
  ]

  await deleteAllData(orderedFileNames)

  for (const fileName of orderedFileNames) {
    const filePath = path.join(dataDirectory, fileName)
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    const modelName = path.basename(fileName, path.extname(fileName))
    const model: any = prisma[modelName as keyof typeof prisma]

    if (!model) {
      console.error(`Model ${modelName} not found`)
      continue
    }

    for (const data of jsonData) {
      await model.create({ data })
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`)
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
