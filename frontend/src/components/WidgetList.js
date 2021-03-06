import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const WidgetList = () => {
    const { widgetsapi } = useStaticQuery(
        graphql`
            query {
                widgetsapi {
                    allWidget {
                        name
                        widgetId
                        thumbsup
                        thumbsdown
                    }
                }
            }
        `
    );
    console.log(widgetsapi);
    return (
        <ul>
            {widgetsapi.allWidget.map(widget => <li key={widget.widgetId}>{widget.name}</li>)}
        </ul>
    );
}

export default WidgetList;