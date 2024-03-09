"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import colors from "@/assets/colors";

export default function App({ products }) {
   //
   ChartJS.register(ArcElement, Tooltip, Legend);
   const labels = products.map((product) => product.name);
   const data = products.map((product) => product.quantity);

   const backgroundColor = labels.map((label, i) => colors[i]);
   const borderColor = labels.map((label, i) =>
      colors[i].replace("0.2", "0.7")
   );
   // console.log(backgroundColor, borderColor);s
   const datas = {
      labels,
      backgroundColor,
      datasets: [
         {
            label: "investment",
            data: data,
            backgroundColor,
            borderColor,
            borderWidth: 1,
         },
      ],
   };

   return <Pie data={datas} />;
}
