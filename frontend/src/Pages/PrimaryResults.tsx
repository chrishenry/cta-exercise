import { useState } from 'react';
import { useDocumentTitle } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { Grid } from '@mantine/core';
import { NativeSelect } from '@mantine/core';

import STATES from '../constants/states';

export function PrimaryResults() {
  useDocumentTitle("CH's Tech Test - Primary Results");
  const [state, setState] = useState("Overall");

  const { data, isLoading, error } = useQuery({
    queryKey: ['primaryResults', state],
    queryFn: async () => {
      console.log('fetching data: ', state);

      let stateParam = '';
      if (state !== "Overall") {
        stateParam = `/${encodeURI(state)}`;
      }

      const response = await fetch(`http://localhost:81/winners${stateParam}`);

      return response.json();
    }
  });

  // Show a loading message while data is fetching
  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  // to handle error
  if (error) {
    console.log(error);
    return <div className="error">Error: error fetching.</div>
  }

  // console.log(data);

  return (
    <div>
      <h3>Primary Winners</h3>

      <div style={{width: "50%", margin: "24px auto"}}>
        <NativeSelect
          label="State"
          description="Pick a state, or overall"
          data={STATES}
          onChange={(event) => setState(event.currentTarget.value)}
        />
      </div>

      {(!isLoading) && (
        <Grid>
          <Grid.Col span={6}>Democrats:</Grid.Col>
          <Grid.Col span={6}>{data.Democrats}</Grid.Col>
          <Grid.Col span={6}>Republicans</Grid.Col>
          <Grid.Col span={6}>{data.Republicans}</Grid.Col>
        </Grid>
      )}
    </div>
  );
}
