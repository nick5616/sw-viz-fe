import "./App.css";
import React from "react";
import { Graphic } from "./components/Graphic";
import { LinearLineGraph } from "./components/LinearLineGraph";
import { LogarithmicLineGraph } from "./components/LogarithmicLineGraph";
import { StarWardTextCrawl } from "./components/StarWarsTextCrawl";

function App() {
    const [costData, setCostData] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [shouldContinue, setShouldContinue] = React.useState(false);

    React.useEffect(() => {
        if (costData.length === 0) {
            fetch("http://localhost:3000/cost/")
                .then((res) => res.json())
                .then((val) => {
                    console.log("val", val);
                    setCostData(val);
                    setIsLoading(false);
                });
        }
    }, [costData.length]);

    let linearChartData = costData.map((starshipData, index) => {
        return { x: `${index + 1}`, y: starshipData.cost };
    });

    let logarithmicChartData = costData.map((starshipData, index) => {
        return { x: `${index + 1}`, y: Math.log10(starshipData.cost) };
    });

    const linearData = [
        { id: "Cost", color: "hsl(230, 70%, 50%)", data: linearChartData },
    ];
    const logarithmicData = [
        {
            id: "Magnitude",
            color: "hsl(180, 70%, 50%)",
            data: logarithmicChartData,
        },
    ];

    console.log("dataWrapper", linearData);
    return (
        <div className="App">
            {shouldContinue ? (
                <div>
                    <h1
                        style={{
                            color: "#080808",
                            WebkitTextStrokeWidth: "2px",
                            WebkitTextStrokeColor: " #ffe81f",
                            fontSize: "25pt",
                            fontFamily: "'Pathway Gothic One', sans-serif",
                        }}
                    >
                        Total Cost of Starships Across Each Star Wars Film (1-6)
                    </h1>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                        }}
                    >
                        <Graphic
                            graph={
                                <LinearLineGraph
                                    data={linearData}
                                ></LinearLineGraph>
                            }
                            heading="Linear Distribution"
                            description={
                                <div>
                                    The total costs of starships in film one{" "}
                                    <i>tower</i> over ever other film. The rest
                                    of the costs appear to be a flat, despite
                                    differing from one-another immensely. By
                                    itself, the Death Star accounts for{" "}
                                    <i>99.998%</i> of the total starship cost in
                                    film one. <b>Spoilers</b>: The Death Star is
                                    not found in any of the other films
                                </div>
                            }
                        />
                        <Graphic
                            graph={
                                <LogarithmicLineGraph data={logarithmicData} />
                            }
                            heading="Logarithmic Distribution"
                            description={
                                <div>
                                    You can think of the numbers on the y-axis
                                    as the <i>number of zeroes</i> for the{" "}
                                    <i>total cost of all starships</i> in each
                                    film. With the exception of the first and
                                    sixth film, the total cost of starships
                                    across films has decreased
                                </div>
                            }
                        />
                    </div>
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        height: "100vh",
                    }}
                >
                    <StarWardTextCrawl text="fart"></StarWardTextCrawl>
                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "flex-end",
                            marginRight: "20px",
                            height: "10vh",
                            position: "absolute",
                            bottom: 0,
                        }}
                    >
                        {isLoading ? (
                            <div
                                style={{
                                    display: "flex",
                                    gap: "20px",
                                    alignItems: "center",
                                    background: "rgba(08, 08, 08, 0.5)",
                                    padding: "10px",
                                    borderRadius: "10px",
                                }}
                            >
                                <div style={{ color: "#e9e9e9" }}>Loading</div>
                                <div class="loader"></div>
                            </div>
                        ) : (
                            <div
                                onClick={() => {
                                    setShouldContinue(true);
                                }}
                                style={{
                                    color: "#e9e9e9",
                                    border: "1px solid #e9e9e9",
                                    padding: "10px",
                                    borderRadius: "10px",
                                    background: "rgba(08, 08, 08, 0.5)",
                                }}
                            >
                                Continue
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
