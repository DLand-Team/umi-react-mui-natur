import { Button } from '@mui/material';
import { inject } from 'umi';
import yayJpg from '../assets/yay.jpg';


const injector = inject('count');

function HomePage({ count }: typeof injector.type) {
  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>

      <p>
        <img src={yayJpg} width="388" />
      </p>
      count: {count.state.value}
      <Button variant="contained" onClick={count.actions.inc}>+</Button>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
    </div>
  );
}

export default injector(HomePage);

