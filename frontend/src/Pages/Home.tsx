import { useDocumentTitle } from '@mantine/hooks';


export function Home() {
  useDocumentTitle("CH's Tech Test - Home");


  return (
    <>
      <h3>Home</h3>
      <p>Hell0! And welcome to Chris Henry's tech assessment!</p>
      <p>A few things about this project:</p>
      <p style={{textAlign: "left", width: "75%"}}>
        <ul>
          <li>Running docker-compose up should bring up the entire project. In general, I believe this is the bar for local development.</li>
          <li>I used FastAPI for the backend, which is a new framework for me. I found it quick and easy to get up and running.</li>
          <li>For the frontend, I was undertaking a project to find a new component & form library. I settled on Mantine. So far, it seems lightweight and usable.</li>
          <li>Needless to say, the visuals used need work. Design is important, but time didn't allow for anything more than spacing.</li>
          <li>The geolocation fields could be expanded to the <a href="https://ip-api.com/docs/api:json">full set provided</a></li>
          <li>It'd be nice to pick multiple fields and see all of them. ie normal use cases would be: Find Lat/Long. Find City/State/Country</li>
          <li>The brief implied results should appear onChange of the field picker. However, I found this awkward, since onChange doesn't fire if the desired field is initially selected. Instead, I opted for a submit button.</li>
          <li>The Primary page has a bug where the dropdown does not persist it's selection. This is because there's no value passed to the NativeSelect.</li>
        </ul>
      </p>
    </>
  )
}
