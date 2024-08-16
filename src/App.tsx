import { useState, useEffect } from "react";
import { getData, getParamTitle } from "./utils";
import { YearInterval } from "./components/YearInterval";
import { PrecipitationPlot } from "./components/PrecipitationPlot";
import { TemperaturePlot } from "./components/TemperaturePlot";
import RadioButton from "./components/RadioButton";
import type { ItemData } from "./types";

type Parameter = "temperature" | "precipitation";

function App() {
  const [temperature, setTemperature] = useState<ItemData[]>([]);
  const [precipitation, setPrecipitation] = useState<ItemData[]>([]);
  const [period, setPeriod] = useState<[string, string]>(["1905", "1908"]);
  const [parameter, setParameter] = useState<Parameter>("temperature");
  const [data, setData] = useState<ItemData[]>([]);
  const [plotTitle, setPlotTitle] = useState<string>("");

  useEffect(() => {
    (async () => {
      setTemperature(await getData<ItemData>("../data/temperature.json"));
      setPrecipitation(await getData<ItemData>("../data/precipitation.json"));
    })();
  }, []);

  useEffect(() => {
    let paramData: ItemData[];
    let title: string;

    if (parameter === "temperature") {
      paramData = temperature;
        title = getParamTitle("Температура", period);
    } else {
      paramData = precipitation;
      title = getParamTitle("Осадки", period);
    }

    const filteredData = paramData.filter((item) => {
      const year = item.t.split("-")[0];
      return year >= period[0] && year <= period[1];
    });

    setData(filteredData);
    setPlotTitle(title);
  }, [parameter, temperature, precipitation, period]);

  return (
    <div className="grid-container">
      <header className="item-title">
        <h1>Архив метеослужбы</h1>
      </header>
      <aside className="item-params">
        <RadioButton
          id="precipitation"
          name="parameter"
          value="precipitation"
          checked={parameter === "precipitation"}
          label="Осадки"
          onChange={(event) => setParameter(event.target.value as Parameter)}
        />
        <RadioButton
          id="temperature"
          name="parameter"
          value="temperature"
          checked={parameter === "temperature"}
          label="Температура"
          onChange={(event) => setParameter(event.target.value as Parameter)}
        />
        <YearInterval
          startYear={period[0]}
          endYear={period[1]}
          onChange={({ start, end }) => {
            setPeriod([start, end]);
          }}
        />
      </aside>

      <div className="item-content">
        {data.length !== 0 && parameter === "precipitation" && (
          <PrecipitationPlot title={plotTitle} data={data} />
        )}
        {data.length !== 0 && parameter === "temperature" && (
          <TemperaturePlot title={plotTitle} data={data} />
        )}
      </div>
    </div>
  );
}

export default App;
