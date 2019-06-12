import { APIGatewayEvent } from "aws-lambda";
import { ApolloServer, gql } from "apollo-server-lambda";

import AWS from "aws-sdk";
import uuidv4 from "uuid/v4";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const typeDefs = gql`
    type Query {
        hello: String
    }
    type Widget {
        widgetId: String!
        name: String!
        thumbsup: Int
        thumbsdown: Int
    }

    type Mutation {
        saveWidget(name: String!): Widget
    }
`;

const resolvers = {
    Query: {
        hello: () => "hello world"
    },
    Mutation: {
        saveWidget: async ( _: any, { name }: { name: string }) => {
            const widgetId = uuidv4();

            const result = await new Promise((resolve, reject) => {
                dynamoDB.update ({
                    TableName: process.env.DYNAMODB_TABLE!,
                    Key: { widgetId },
                    UpdateExpression: "SET widgetId = :widgetId, widgetName = :name",
                    ExpressionAttributeValues: {
                        ":widgetId": widgetId,
                        ":widgetName": name
                    }
                }, (err, result) => {
                    if (err) {
                        console.error(err);
                        reject(err)
                    } else {
                        resolve(result);
                    }
                });
            });
            console.log(result);
            return {
                name,
                widgetId: widgetId,
                thumbsup: 0,
                thumbsdown: 0
            };
        }
    }
}

export const server = new ApolloServer({
    typeDefs,
    resolvers
});

export const handler = server.createHandler();
