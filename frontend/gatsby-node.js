/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

path = require("path");

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({ actions }) => {
    actions.setWebpackConfig({
        node: {
            fs: "empty"
        }
    });
}

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return new Promise(async resolve => {
        const result = await graphql(`
            query {
                widgetsapi {
                    allWidget {
                        widgetId
                    }
                }
            }
        `);

        // for each widget, create a thumbs up and thumbs down page
        result.data.widgetsapi.allWidget.forEach(({ widgetId }) => {
            ["thumbsup", "thumbsdown"].forEach(voteType => {
                createPage({
                    path: `/${widgetId}/${voteType}`,
                    component: path.resolve("./src/pages/vote.js"),
                    context: {
                        voteType: voteType
                    },
                });
            });
            
        });

        resolve();
    });
}