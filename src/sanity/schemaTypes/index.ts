import { type SchemaTypeDefinition } from 'sanity'
import foodSchema from './foods'
import chefSchema from './chefs'
import product from './product'
import User from './user'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [foodSchema,chefSchema,product,User],
}
