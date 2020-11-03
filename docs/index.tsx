import * as React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Button } from 'rsuite';
import Examples from './Examples';
import './less/index.less';
import Charts from '../src/icons/legacy/Charts';
import Spinner from '../src/icons/legacy/Spinner';
import Cog from '../src/icons/legacy/Cog';
import Shield from '../src/icons/legacy/Shield';
import { Icon, createIconFont } from '../src';

function App() {
  return (
    <Grid>
      <h1>@rsuite/icons</h1>
      <p>All icons of rsuite</p>
      <hr />
      <Examples
        dependencies={{
          Button,
          Charts,
          Spinner,
          Cog,
          Shield,
          createIconFont,
          Icon
        }}
        list={[
          {
            title: 'Base',
            content: require('./md/Base.md')
          },
          {
            title: 'Icon Font',
            content: require('./md/IconFont.md')
          },
          {
            title: 'Custom Icon',
            content: require('./md/CustomIcon.md')
          },
          {
            title: 'Icon List'
          }
        ]}
      />
    </Grid>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));
