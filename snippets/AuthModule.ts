import { SchemaDirectiveVisitor } from 'graphql-tools'

const authenticated = (func: any) => (
 root: any,
 args: any,
 context: any,
 info: any
) => {
 if (!context.user) {
  throw new Error('Unauthorized')
 }
 return func(root, args, context, info)
}

class AuthDirective extends SchemaDirectiveVisitor {
 public visitFieldDefinition(field: any) {
  field.resolve = authenticated(field.resolve)
 }
}

export const AuthModule = new GraphQLModule({
 name: 'auth',
 context: ({ req }) => ({
  user: authorize(req.headers.Authorization)
 }),
 schemaDirectives: {
  auth: AuthDirective
 },
 typeDefs: [
  gql`
   directive @auth on FIELD_DEFINITION

   type Query {
    me: User @auth
   }
  `
 ],
 providers: [UserProvider]
})
