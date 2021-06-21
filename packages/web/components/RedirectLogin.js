import {useHistory} from 'react';


function Home() {
  const history = useHistory();
  
  const handleRoute = () =>{ 
    history.push("/about");
  }
  
  return (                     
          <Button
            onClick={handleRoute}>
              About
          </Button>
  );
}
export default Home;