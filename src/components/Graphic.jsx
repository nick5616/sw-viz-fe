import React from "react";

export function Graphic({ heading, graph, description }) {
    return (
        <div
            style={{
                margin: "10px",
                gap: "10px",
            }}
        >
            <h2 style={{ color: "#ffe81f", marginBottom: "0px" }}>{heading}</h2>
            <div
                style={{
                    height: "600px",
                }}
            >
                {graph}
            </div>
            <div
                style={{
                    background: "rgb(46,103,248)",
                    background:
                        "linear-gradient(45deg, rgba(46,103,248,1) 18%, rgba(235,33,46,1) 80%)",
                    margin: "10px 40px",
                    borderRadius: "10px",
                }}
            >
                <div
                    style={{
                        background: "rgba(08, 08, 08, .5)",
                        color: "#e9e9e9",
                        padding: "10px",

                        borderRadius: "10px",
                    }}
                >
                    <div style={{ textAlign: "justify", padding: "10px" }}>
                        {description}
                    </div>
                </div>
            </div>
        </div>
    );
}
