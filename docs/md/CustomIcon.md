### Custom Icon

#### Usage

```
import { Icon } from '@rsuite/icons';
```

<!--start-code-->

```js
const HeartSvg = props => (
  <svg {...props} width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);
const PeopleFoldSvg = props => (
  <svg {...props} width="1em" height="1em" viewBox="0 0 40 40">
    <g fill="none" fillRule="evenodd">
      <path
        fill="#34C3FF"
        d="M10 36H4a4 4 0 01-4-4V6a4 4 0 014-4h11.394a3 3 0 012.497 1.336L21 9h14a4 4 0 014 4v23H10z"
        opacity={0.2}
      />
      <circle cx={27} cy={23} r={3} fill="#34C3FF" stroke="#34C3FF" strokeWidth={2} />
      <path
        fill="#80DDFF"
        d="M15 38a1 1 0 01-1-1v-3.5c0-1.607 1.02-3.214 2.696-4.001a3.5 3.5 0 113.608.001c1.676.786 2.696 2.393 2.696 4V37a1 1 0 01-1 1zm17 0a1 1 0 01-1-1v-3.5c0-1.607 1.02-3.214 2.696-4.001a3.5 3.5 0 113.608.001c1.676.786 2.696 2.393 2.696 4V37a1 1 0 01-1 1z"
      />
      <path
        fill="#34C3FF"
        stroke="#34C3FF"
        strokeWidth={2}
        d="M27 27l.257.007c1.279.064 2.43.61 3.279 1.457A4.984 4.984 0 0132 32h0v6H22v-6c0-1.38.56-2.63 1.464-3.536A4.984 4.984 0 0127 27h0z"
      />
    </g>
  </svg>
);

const Test = () => {
  return (
    <div>
      <Icon as={HeartSvg} style={{ color: 'hotpink' }} />
      <Icon as={PeopleFoldSvg} style={{ fontSize: 40 }} />
    </div>
  );
};

ReactDOM.render(<Test />);
```

<!--end-code-->

#### Props

| Property | Type`(default)`                 | Description                                  |
| -------- | ------------------------------- | -------------------------------------------- |
| as       | React.ElementType &#124; string | Reusable a custom element for this component |
| fill     | string                          | Svg component fill color                     |
| spin     | boolean                         | Dynamic rotation icon                        |
| pulse    | boolean                         | Use pulse to have it rotate with 8 steps     |
| rotate   | number                          | Rotate the icon                              |
| flip     | 'horizontal' &#124; 'vertical'  | Flip the icon                                |
| style    | CSSProperties                   | The computed style of the `svg` element      |
