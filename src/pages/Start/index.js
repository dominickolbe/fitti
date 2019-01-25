import React, { Component } from 'react';
import dayjs from 'dayjs';
import { withAuth, withFirebase } from '../../components/Firebase';
import { Button, Input, Table, Header } from 'semantic-ui-react'

class Start extends Component {
  state = {
    value: '',
    weights: [],
  }

  async componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const weights = await this.props.firebase.getCollection('weights');
    this.setState({ weights });
  }

  onClick = async () => {
    const weight = this.state.value.replace(',', '.');

    await this.props.firebase.addWeight({
      time: dayjs().format(),
      value: weight,
    });

    this.loadData();
  }

  render() {
    const { user } = this.props;
    const { weights } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Header
              as="h1"
              style={{ marginBottom: '25px' }}
            >
              Hello {user.displayName}
            </Header>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Weight</Table.HeaderCell>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {weights.map((item, key) => (
                  <Table.Row key={key}>
                    <Table.Cell>
                      {item.value} kg
                    </Table.Cell>
                    <Table.Cell>
                      {dayjs(item.time).format('YYYY-MM-DD HH:mm')}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>

              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell>
                    <Input
                      onChange={e => this.setState({ value: e.target.value })}
                      style={{ width: '100%' }}
                    />
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                  <Button
                    onClick={this.onClick}
                    primary
                    style={{ width: '100%' }}
                  >
                    Add new weight
                  </Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>

            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default withAuth(withFirebase(Start));
