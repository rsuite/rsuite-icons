### Base

#### Usage

```
import Charts from '@rsuite/icons/legacy/Charts';
import Admin from '@rsuite/icons/Admin';
```

### Example

<!--start-code-->

```js
// import Charts from '@rsuite/icons/legacy/Charts'

const Test = () => {
  return (
    <div>
      <Charts />
      <Charts style={{ fontSize: 50 }} />
      <Charts style={{ color: 'red' }} />
      <Cog spin />
      <Spinner pulse />
      <Shield rotate={90} />
      <Shield flip="horizontal" />
      <Shield flip="vertical" />
      <Charts
        onClick={() => {
          console.log(111);
        }}
      />
    </div>
  );
};

ReactDOM.render(<Test />);
```

<!--end-code-->

#### Props

| Property | Type`(default)`                | Description                              |
| -------- | ------------------------------ | ---------------------------------------- |
| fill     | string                         | Svg component fill color                 |
| spin     | boolean                        | Dynamic rotation icon                    |
| pulse    | boolean                        | Use pulse to have it rotate with 8 steps |
| rotate   | number                         | Rotate the icon                          |
| flip     | 'horizontal' &#124; 'vertical' | Flip the icon                            |
| style    | CSSProperties                  | The computed style of the `svg` element  |
