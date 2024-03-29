import * as React from 'react';
import { Row, Col, Nav } from 'rsuite';
import CodeView from 'react-code-view';
import IconList from './IconList';

const CustomCodeView = ({ ...props }) => (
  <Col md={10}>
    <CodeView {...props} />
  </Col>
);

interface ItemType {
  title: React.ReactNode;
  content?: React.ReactNode;
}

interface ExamplesProps {
  dependencies?: any;
  list?: ItemType[];
}

interface ExamplesState {
  index: number;
}

class Examples extends React.Component<ExamplesProps, ExamplesState> {
  constructor(props) {
    super(props);
    this.state = {
      index: 0
    };
  }
  render() {
    const { list, dependencies } = this.props;
    const { index } = this.state;
    return (
      <div>
        <Row>
          <Col md={2}>
            <Nav>
              {list.map((item, i) => {
                return (
                  <Nav.Item
                    key={i}
                    onClick={() => {
                      this.setState({ index: i });
                    }}
                  >
                    {item.title}
                  </Nav.Item>
                );
              })}
            </Nav>
          </Col>
          {index !== list.length - 1 ? (
            <CustomCodeView key={index} dependencies={dependencies}>
              {list[index].content}
            </CustomCodeView>
          ) : (
            <Col md={10}>
              <IconList />
            </Col>
          )}
        </Row>
      </div>
    );
  }
}

export default Examples;
