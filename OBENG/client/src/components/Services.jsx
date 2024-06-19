
import { useLoaderData } from "react-router-dom";

const DisplayArray = () => {
  const bengkel = useLoaderData();
    return (
      <div>
        {bengkel.services.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </div>
    );
  };

  export default DisplayArray