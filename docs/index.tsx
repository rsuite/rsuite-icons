import * as React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Button } from 'rsuite';
import Examples from './Examples';
import './less/index.less';

function App() {
  return (
    <Grid>
      <h1>rsuite-table</h1>
      <p>A React table component</p>
      <p>
        <a href="https://github.com/rsuite/rsuite-table">https://github.com/rsuite/rsuite-table</a>
      </p>
      <hr />
      <Examples
        dependencies={{
          Button
        }}
        list={[
          {
            title: 'Props',
            content: require('./md/Props.md')
          }
        ]}
      />
    </Grid>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
