import React, { useMemo } from 'react'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api'
import BoxHeader from '@/components/BoxHeader';
import { Line,LineChart,XAxis,YAxis,ResponsiveContainer,CartesianGrid,Tooltip,Legend } from 'recharts';
import { useTheme } from '@mui/material';
const Row2=(()=> {
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { palette } = useTheme();
  // console.log("🚀 ~ Row2 ~ data :", data)
  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(({ month, expenses,operationalExpenses}) => {
        return {
          name: month.substring(0, 3),
          "Operational Expenses":operationalExpenses,
          "Non Operational Expenses":(expenses-operationalExpenses).toFixed(2)
        };
      })
    );
  }, [operationalData]);
  console.log(operationalData)
  return (
      <>
         <DashboardBox gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          subtitle="Top line: Revenue, Bottom line: Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="Non Operational Expenses"
              stroke={palette.tertiary[500]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e"></DashboardBox>
      <DashboardBox gridArea="f"></DashboardBox>
          
      </>
  )
})

export default Row2