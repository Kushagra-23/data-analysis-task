import { Children, useEffect, useState } from "react";
import { Table } from "@mantine/core";
import data from "../../mock-data/data.json";

export const Table2 = () => {
  const [cropStats, setCropStats] = useState<
    Array<{
      CropName: string;
      AverageYield: number;
      AverageCultivationArea: number;
    }>
  >([]);

  useEffect(() => {
    const calculateCropStatistics = () => {
      // Object to store total yield, total area, and count for each crop
      const cropMap: {
        [key: string]: { totalYield: number; totalArea: number; count: number };
      } = {};

      data.forEach((data) => {
        const year = parseInt(data.Year.split(",")[1]); // Extracting the year

         // Check if the year is within the specified range
        if (year >= 1950 && year <= 2020) {
          const cropName = data["Crop Name"];
          const yieldValue =
            +data["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] || 0; // Convert to number using '+'
          const areaValue =
            +data["Area Under Cultivation (UOM:Ha(Hectares))"] || 0; // Convert to number using '+'

          // Initialize cropMap entry if it doesn't exist
          if (!cropMap[cropName]) {
            cropMap[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
          }

          // Accumulate total yield, total area, and count for each crop
          cropMap[cropName].totalYield += yieldValue;
          cropMap[cropName].totalArea += areaValue;
          cropMap[cropName].count++;
        }
      });

      const cropStatsArray = Object.keys(cropMap).map((cropName) => {
        const averageYield =
          cropMap[cropName].totalYield / cropMap[cropName].count;
        const averageArea =
          cropMap[cropName].totalArea / cropMap[cropName].count;

        return {
          CropName: cropName,
          AverageYield: parseFloat(averageYield.toFixed(3)), // Round to 3 decimal places
          AverageCultivationArea: parseFloat(averageArea.toFixed(3)), // Round to 3 decimal places
        };
      });

      // Set the calculated crop statistics to state
      setCropStats(cropStatsArray);
    };

    // Set the calculated crop statistics to state
    calculateCropStatistics();
  }, []);

  return (
    <Table withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Average Yield of the Crop between 1950-2020</Table.Th>
          <Table.Th>
            Average Cultivation Area of the Crop between 1950-2020
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {Children.toArray(
          cropStats.map((element) => (
            <Table.Tr>
              <Table.Td>{element.CropName}</Table.Td>
              <Table.Td>{element.AverageYield}</Table.Td>
              <Table.Td>{element.AverageCultivationArea}</Table.Td>
            </Table.Tr>
          ))
        )}
      </Table.Tbody>
    </Table>
  );
};
