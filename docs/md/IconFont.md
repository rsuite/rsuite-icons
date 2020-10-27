### Icon Font

<!--start-code-->

```js
const Icon = createIconFont({
  scriptUrl: '//at.alicdn.com/t/font_2120285_ve2eozz092d.js'
});

const Test = () => {
  return (
    <div>
      <Icon icon="rs-upload" />
      <Icon icon="rs-upload" style={{ fontSize: 50 }} />
      <Icon icon="rs-upload" style={{ color: 'red' }} />
      <Icon icon="rs-cog" spin />
      <Icon icon="rs-spinner" pulse />
      <Icon icon="rs-upload" rotate={90} />
      <Icon icon="rs-upload" flip="horizontal" />
      <Icon icon="rs-upload" flip="vertical" />
      <Icon
        icon="rs-upload"
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
