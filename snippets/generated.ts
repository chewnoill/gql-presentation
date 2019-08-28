type Maybe<T> = T | null
export type Scalars = {
    ID: string
    String: string
    Boolean: boolean
    Int: number
    Float: number
}

export type Query = {
    user?: Maybe<User>
}

export type QueryUserArgs = {
    input?: Maybe<UserInput>
}

export type User = {
    firstName: Scalars['String']
    lastName: Scalars['String']
    age: Scalars['Int']
}

export type UserInput = {
    id: Scalars['ID']
}

import { GraphQLResolveInfo } from 'graphql'

export type ResolverFn<
    TResult,
    TParent,
    TContext,
    TArgs
> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<
    TResult,
    TParent,
    TContext,
    TArgs
> = {
    fragment: string
    resolve: ResolverFn<
        TResult,
        TParent,
        TContext,
        TArgs
    >
}

export type Resolver<
    TResult,
    TParent = {},
    TContext = {},
    TArgs = {}
> =
    | ResolverFn<
          TResult,
          TParent,
          TContext,
          TArgs
      >
    | StitchingResolver<
          TResult,
          TParent,
          TContext,
          TArgs
      >

export type SubscriptionSubscribeFn<
    TResult,
    TParent,
    TContext,
    TArgs
> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) =>
    | AsyncIterator<TResult>
    | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<
    TResult,
    TParent,
    TContext,
    TArgs
> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<
    TResult,
    TParent,
    TContext,
    TArgs
> {
    subscribe: SubscriptionSubscribeFn<
        TResult,
        TParent,
        TContext,
        TArgs
    >
    resolve?: SubscriptionResolveFn<
        TResult,
        TParent,
        TContext,
        TArgs
    >
}

export type SubscriptionResolver<
    TResult,
    TParent = {},
    TContext = {},
    TArgs = {}
> =
    | ((
          ...args: any[]
      ) => SubscriptionResolverObject<
          TResult,
          TParent,
          TContext,
          TArgs
      >)
    | SubscriptionResolverObject<
          TResult,
          TParent,
          TContext,
          TArgs
      >

export type TypeResolveFn<
    TTypes,
    TParent = {},
    TContext = {}
> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {}
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export type QueryResolvers<
    Context = any,
    ParentType = Query
> = {
    user?: Resolver<
        Maybe<User>,
        ParentType,
        Context,
        QueryUserArgs
    >
}

export type UserResolvers<
    Context = any,
    ParentType = User
> = {
    firstName?: Resolver<
        Scalars['String'],
        ParentType,
        Context
    >
    lastName?: Resolver<
        Scalars['String'],
        ParentType,
        Context
    >
    age?: Resolver<
        Scalars['Int'],
        ParentType,
        Context
    >
}

export type Resolvers<Context = any> = {
    Query?: QueryResolvers<Context>
    User?: UserResolvers<Context>
}

/**
 * @deprecated
 */
export type IResolvers<Context = any> = Resolvers<
    Context
>
