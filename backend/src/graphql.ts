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
                    }
            });
            console.log(result);
            return {
                name,
                widgetId: widgetId,
                thumbsup: 0,
                thumbsdown: 0
            };
        },

    }
}

export const server = new ApolloServer({
    typeDefs,
    resolvers
});

export const handler = server.createHandler();
