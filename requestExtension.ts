export { }

declare global {
  namespace Express {
    export interface Request {
      tenantId?: number
    }
  }
}
// declare module 'express-serve-static-core' {
//   interface Request {
//     tenantId?: number
//   }
// }