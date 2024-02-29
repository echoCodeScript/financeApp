import React, { useMemo } from "react";
import DashboardBox from "@/components/DashboardBox";
import {
  useGetKpisQuery,
  useGetProductsQuery,
  useGetTransactionsQuery,
} from "@/state/api";
import BoxHeader from "@/components/BoxHeader";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { useTheme } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { Cell, Pie, PieChart } from "recharts";
type Props = {};

const Row3 = (props: Props) => {
  const { data: kpiData } = useGetKpisQuery();
  console.log("🚀 ~ Row3 ~ kpiData:", kpiData);

  const { data: transactionData } = useGetTransactionsQuery();
  const { data: productData } = useGetProductsQuery();
  const pieChartData = useMemo(() => {
    if (kpiData) {
      const totalExpenses = kpiData[0].totalExpenses;
      return Object.entries(kpiData[0].expensesByCategory).map(
        ([key, value]) => {
          return [
            {
              name: key,
              value: value,
            },
            {
              name: `${key} of Total`,
              value: totalExpenses - value,
            },
          ];
        }
      );
    }
  }, [kpiData]);
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[500]];
  const productColumns = [
    {
      field: "_id",
      header: "id",
      //to take the full width
      flex: 1,
    },
    {
      field: "expense",
      header: "Expense",
      flex: 0.5,
      //GridCellparams is the type for params
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "price",
      header: "Price",
      flex: 0.5,
      //GridCellparams is the type for params
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
  ];
  const transactionColumns = [
    {
      field: "_id",
      header: "id",
      //to take the full width
      flex: 1,
    },
    {
      field: "buyer",
      header: "Buyer",
      flex: 0.67,
    },
    {
      field: "amount",
      header: "Amount",
      flex: 0.5,
      //GridCellparams is the type for params
      renderCell: (params: GridCellParams) => `$${params.value}`,
    },
    {
      field: "productIds",
      header: "Count",
      flex: 0.1,
      //GridCellparams is the type for params
      renderCell: (params: GridCellParams) =>
        (params.value as Array<String>).length,
    },
  ];
  return (
    <>
      <DashboardBox gridArea="g">
        <BoxHeader
          title="List of Products"
          sideText={`${productData?.length} products`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            //we are modifying the default class properties of DataGrid so that
            //same effected in child
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              //some times we need to put !important so that it overrides properly
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="h">
        <BoxHeader
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1em"
          p="0 0.5rem"
          height="80%"
          sx={{
            //we are modifying the default class properties of DataGrid so that
            //same effected in child
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              //some times we need to put !important so that it overrides properly
              borderBottom: `1px solid ${palette.grey[800]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />
        </Box>
      </DashboardBox>
      <DashboardBox gridArea="i">
        <BoxHeader
          title="Expense Breakdown by Category"
          sideText="+4%"
        ></BoxHeader>
        <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
          {pieChartData?.map((data, i) => (
            <Box key={`${data[0].name}-${i}`}>
              <PieChart width={110} height={100}>
                <Pie
                  stroke="none"
                  data={data}
                  innerRadius={18}
                  outerRadius={35}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
              </PieChart>
              <Typography variant="h5">{data[0].name}</Typography>
            </Box>
          ))}
        </FlexBetween>
      </DashboardBox>
      <DashboardBox gridArea="j">
        <BoxHeader
          title="Overall Summary and Explanation Data"
          sideText="+15%"
        />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={palette.primary[800]}
          borderRadius="1rem"
        >
        <Box
          height="15px"
          bgcolor={palette.primary[500]}
          borderRadius="1rem"
          width="40%"
          />
          
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
      </DashboardBox>
    </>
  );
};

export default Row3;
