import React, { useState, useMemo } from "react";
import { VectorMap } from "@react-jvectormap/core";
import inMill from "./indiaMap.json";
import { usMill } from "@react-jvectormap/unitedstates";
import { useTheme } from "../../context/ThemeContext";

const Map = (props) => {
  const { theme } = useTheme();
  const [code, setCode] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  const colorScale = [
    "#D2D2D2",
    "#B7B7B7",
    "#A0A0A0",
    "#878787",
    "#6D6D6D",
    "#A9C4FF",
    "#78A2FF",
    "#5C8FFF",
    "#407BFF",
  ];

  // Dynamically select map based on country prop
  const map = useMemo(() => {
    const country = props.country?.toLowerCase();
    if (country === "india") return inMill;
    if (country === "usa") return usMill;
    return null;
  }, [props.country]);

  return (
    <div
      className={`relative w-full h-[300px] md:h-[400px] lg:h-[500px] ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Tooltip */}
      {isHovering && map && (
        <div className="absolute top-2 left-1/3 -translate-x-1/2 z-10 w-[160px] min-h-[40px] bg-gray-200 text-black text-sm rounded border border-white px-3 py-2 shadow">
          <p>Place: {code}</p>
          <p>vaccination Count: {props.graphData?.[code] ?? "N/A"}</p>
        </div>
      )}
      {/* Vector Map */}
      <div className="w-full h-full">
        {map ? (
          <VectorMap
            key={`${props.country?.toLowerCase()}-${theme}-${JSON.stringify(props.graphData)}`} // force re-render on map change
            map={map}
            containerStyle={{ width: "100%", height: "100%" }}
            backgroundColor={theme === "dark" ? "#1f2937" : "#ffffff"}
            defaultColor="blue"
            onRegionTipShow={(_, __, regionCode) => {
              setCode(regionCode);
            }}
            series={{
              regions: [
                {
                  scale: colorScale,
                  values: props.graphData,
                  min: props.minvalue,
                  max: props.maxvalue,
                },
              ],
            }}
          />
        ) : (
          <div className="text-center text-sm text-gray-500 pt-10">
            No map available for "{props.country}"
          </div>
        )}
      </div>
    </div>
  );
};

export default Map;
