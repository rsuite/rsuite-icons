### Base

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
