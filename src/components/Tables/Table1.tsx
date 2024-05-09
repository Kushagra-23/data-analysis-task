import { Children, useEffect, useState } from "react";
import { Table } from "@mantine/core";
import data from "../../mock-data/data.json";

interface YearlyProduction {
  year: string;
  maxProduction: { crop: string, production: number };
  minProduction: { crop: string, production: number };
}

const result: Record<string, YearlyProduction> = {};

export const Table1 = () => {

  const [rowsData, setRowsData] = useState<YearlyProduction[]>([]);

  useEffect(() => {
    data.forEach(obj => {
      const year = obj.Year.split(", ")[1]; // Extract year from the date
      const production = typeof obj["Crop Production (UOM:t(Tonnes))"] === 'string' ?
        parseFloat(obj["Crop Production (UOM:t(Tonnes))"]) :
        obj["Crop Production (UOM:t(Tonnes))"] || 0; // Parse production value as a float or set it to 0 if it's not a string

      // If the year doesn't exist in result object, initialize it
      if (!result[year]) {
        result[year] = {
          year: year,
          maxProduction: { crop: '', production: -Infinity },
          minProduction: { crop: '', production: Infinity }
        };
      }

      // Update max production crop if the current production is greater
      if (production > result[year].maxProduction.production) {
        result[year].maxProduction = { crop: obj["Crop Name"], production: production };
      }

      // Update min production crop if the current production is lesser
      if (production < result[year].minProduction.production) {
        result[year].minProduction = { crop: obj["Crop Name"], production: production };
      }
    });

    // Convert result object to an array and set it to the state
    const resultArray = Object.values(result);

    setRowsData(resultArray);
  }, [])

  return (
    <Table withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Year</Table.Th>
          <Table.Th>Crop with Maximum Production in that Year</Table.Th>
          <Table.Th>Crop with Minimum Production in that Year</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{Children.toArray(rowsData.map((element) => (
        <Table.Tr>
          <Table.Td>{element.year}</Table.Td>
          <Table.Td>{element.maxProduction.crop}</Table.Td>
          <Table.Td>{element.minProduction.crop}</Table.Td>
        </Table.Tr>
      )))}</Table.Tbody>
    </Table>
  )
};
