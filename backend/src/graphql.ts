import { APIGatewayEvent } from "aws-lambda";
import { ApolloServer, gql } from "apollo-server-lambda";
import uuidv4 from "uuid/v4";
import { updateItem, getItem, scanItems } from "./dynamodb";

const typeDefs = gql`
    type Widget {
        widgetId: String!
        name: String!
        thumbsup: Int
        thumbsdown: Int
    }
    type Query {
        hello: String
        widget(widgetId: String!): Widget
        allWidget: [Widget]
    }

    type Mutation {
        saveWidget(name: String!, widgetId: String): Widget
        widgetVote(widgetId: String!, thumbsup: Boolean, thumbsdown: Boolean): Widget
    }
`;

const resolvers = {
    Query: {
        hello: () => "hello world",

        widget: async (_: any, { widgetId }: { widgetId: string }) => {
            const result = await getItem({ Key: { widgetId } });
            if (!result.Item) {
                return {}; 
            }
            return {
                ...result.Item,
                name: result.Item.widgetName
            };
        },

        allWidget: async () => {
            const result = await scanItems({});

            console.log(result.Items);
            if (!result.Items) {
                return [];
            }
            return result.Items.map(widget => ({
                ...widget, 
                name: widget.widgetName 
            }));
        }

    },
    Mutation: {
        saveWidget: async ( _: any, { name, widgetId }: { name: string, widgetId?: string } ) => {
            if (!widgetId) {
                widgetId = uuidv4();
            }

            const result = await updateItem({
                TableName: process.env.DYNAMODB_TABLE!,
                Key: { widgetId },
                UpdateExpression: "SET widgetName = :name, thumbsup = :thumbsup, thumbsdown = :thumbsdown",
                ExpressionAttributeValues: {
                    ":name": name,
                    ":thumbsup": 0,
                    ":thumbsdown": 0
                },
                ReturnValues: "ALL_NEW"
            });
            console.log(result);
            return {
                name,
                widgetId: widgetId,
                thumbsup: 0,
                thumbsdown: 0
            };
        },

        widgetVote: async ( _: any, 
            { 
                widgetId, 
                thumbsup = false, 
                thumbsdown = false
            } : { widgetId: string, thumbsup?: boolean, thumbsdown?: boolean }
        ) => {
            const { Attributes } = await updateItem({
                TableName: process.env.DYNAMODB_TABLE!,
                Key: { widgetId },
                UpdateExpression: 
                    "SET thumbsup = thumbsup + :thumbsup, thumbsdown = thumbsdown + :thumbsdown",
                ExpressionAttributeValues: {
                    ":thumbsup": thumbsup ? 1 : 0,
                    ":thumbsdown": thumbsdown ? 1 : 0
                },
                ReturnValues: "ALL_NEW"
            });

            return {
                ...Attributes, 
                name: Attributes && Attributes.widgetName
            };
        },

    }
}

export const server = new ApolloServer({
    typeDefs,
    resolvers
});

export const handler = server.createHandler({
    cors: {
        origin: "*",
        credentials: true
    }
});
