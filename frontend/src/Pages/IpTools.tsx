import { useDocumentTitle } from '@mantine/hooks';
import { useQuery } from '@tanstack/react-query';
import { useForm } from '@mantine/form';
import { TextInput, NativeSelect, Button, Flex } from '@mantine/core';
import apiFields from '../constants/apiFields';

export function IpTools() {
  useDocumentTitle("CH's Tech Test - IP Tools");

  // map apiFields to options in the form { label: 'City', value: 'city' }
  const fields_options = Object.keys(apiFields).map((key) => {
    return { label: apiFields[key as keyof typeof apiFields], value: key };
  })

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { ipAddress: '', field: 'regionName' },
    validate: {
      ipAddress: (value) => {
        if (!value) {
          return 'IP Address is required';
        }
        if(!/((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}/.test(value)) {
          return 'Invalid IP Address';
        }
      }
    }
  });

  const { error, isLoading, refetch } = useQuery({
    queryKey: ['myIpResult'],
    // don't run on component mount
    enabled: false,
    queryFn: async () => {
      const response = await fetch('http://ip-api.com/json');
      const data = await response.json();
      form.setValues({ ipAddress: data.query });
      return data;
    }
  });

  const { data: ipData, error: ipError, isLoading: ipIsLoading, refetch: ipRefetch } = useQuery({
    queryKey: ['ipResult'],
    // don't run on component mount
    enabled: false,
    queryFn: async () => {
      const response = await fetch(`http://ip-api.com/json/${form.getValues().ipAddress}`);
      const data = await response.json();
      form.setValues({ ipAddress: data.query });
      return data;
    }
  });

  const findMyIp = () => {
    refetch();
  };

  const submitForm = (values: any, event: any) => {
    form.setValues(values);
    ipRefetch();
  }

  // to handle error
  if (error || ipError) {
    console.log(error);
    return <div className="error">Error: error fetching.</div>
  }

  let fieldResult = null;
  if (ipData) {
    fieldResult = ipData[form.getValues().field];
  }

  return (
    <div style={{width: "50%", margin: "24px auto"}}>
      <div>
        <h3>IP Tools</h3>
      </div>
      <form onSubmit={form.onSubmit(submitForm)}>
        <div style={{width: "50%", margin: "24px auto"}}>
          <TextInput
            label="IP Address"
            placeholder="127.0.0.1, no place like home"
            key={form.key('ipAddress')}
            {...form.getInputProps('ipAddress')}
            />
        </div>

        <div style={{width: "50%", margin: "24px auto"}}>
          <NativeSelect
            label="Result Field"
            data={fields_options}
            key={form.key('field')}
            {...form.getInputProps('field')}
            onChange={(event) => {
              form.setValues({ field: event.currentTarget.value });
              if (form.getValues().ipAddress) {
                ipRefetch();
              }
            }}
          />
        </div>

        <div style={{width: "50%", margin: "24px auto"}}>
          <Flex
            mih={50}
            gap="md"
            justify="flex-end"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Button type="submit">
              Submit
            </Button>
            <Button type="button" onClick={findMyIp} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Find My IP'}
            </Button>
          </Flex>
        </div>
      </form>

      <div style={{width: "50%", margin: "24px auto"}}>
        {/* <pre>
          {JSON.stringify(form.getValues(), null, 2)}
        </pre> */}
        {ipIsLoading && fieldResult
          ? (<h2>Loading...</h2>)
          : (<div>{fieldResult}</div>)}
      </div>
    </div>
  );
}
