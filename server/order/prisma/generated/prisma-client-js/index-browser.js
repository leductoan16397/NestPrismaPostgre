
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 3.6.0
 * Query Engine version: dc520b92b1ebb2d28dc3161f9f82e875bd35d727
 */
Prisma.prismaVersion = {
  client: "3.6.0",
  engine: "dc520b92b1ebb2d28dc3161f9f82e875bd35d727"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = () => (val) => val

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = 'DbNull'
Prisma.JsonNull = 'JsonNull'
Prisma.AnyNull = 'AnyNull'

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.UserScalarFieldEnum = makeEnum({
  id: 'id',
  fullName: 'fullName',
  email: 'email',
  password: 'password',
  role: 'role',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
});

exports.Prisma.RefreshTokenScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  refreshToken: 'refreshToken',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
});

exports.Prisma.OrderScalarFieldEnum = makeEnum({
  id: 'id',
  userId: 'userId',
  address: 'address',
  totalPrice: 'totalPrice',
  status: 'status',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt'
});

exports.Prisma.ProductOrderScalarFieldEnum = makeEnum({
  id: 'id',
  name: 'name',
  image: 'image',
  price: 'price',
  count: 'count',
  orderId: 'orderId'
});

exports.Prisma.ProductScalarFieldEnum = makeEnum({
  id: 'id',
  updatedAt: 'updatedAt',
  createdAt: 'createdAt',
  name: 'name',
  image: 'image',
  price: 'price'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.QueryMode = makeEnum({
  default: 'default',
  insensitive: 'insensitive'
});
exports.Role = makeEnum({
  USER: 'USER',
  ADMIN: 'ADMIN'
});

exports.OrderStatus = makeEnum({
  CREATED: 'CREATED',
  CANCELED: 'CANCELED',
  CONFIRMED: 'CONFIRMED',
  DELIVERED: 'DELIVERED'
});

exports.Prisma.ModelName = makeEnum({
  User: 'User',
  RefreshToken: 'RefreshToken',
  Order: 'Order',
  ProductOrder: 'ProductOrder',
  Product: 'Product'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
