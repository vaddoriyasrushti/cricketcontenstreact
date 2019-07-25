import React, { Component } from 'react';
import { Table, Container, Button } from 'reactstrap';
import { PanelHeader } from "components";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Collapse, Button as AntButton, Modal as AntModal } from 'antd';
import 'antd/dist/antd.css';
import '../view.css';
import AddTournamentPoint from './AddTounamnetPoint/addTournamentPoint';
import * as tournamentPointAction from '../../action/tournamentPoint';

class tournamentPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      visible: false,
      offset: 0,
      perPageRecord: 5,
      orderByName: "id",
      orderBy: "desc",
      pointData: {}
    };
    this.toggle = this.toggle.bind(this);
    this.togglePoints = this.togglePoints.bind(this);
    this.perPage = this.perPage.bind(this);
    this.changeRecord = this.changeRecord.bind(this);
    this.getPoints = this.getPoints.bind(this);
    this.renderPointModal = this.renderPointModal.bind(this);
  }

  componentDidMount() {
    this.props.action.TournamentPoint.getTournamentPointScore(this.state.offset, this.state.perPageRecord, this.state.orderByName, this.state.orderBy);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  togglePoints() {
    this.setState({
      visible: !this.state.visible
    });
    this.setState({ pointData: {} });
  }

  perPage = (event) => {
    const perPage = parseInt(event.target.value, 10);
    this.setState({ perPageRecord: perPage })
    this.props.action.TournamentPoint.getTournamentPointScore(this.state.offset, perPage, this.state.orderByName, this.state.orderBy);
  }

  changeRecord = (event) => {
    let prevNext = event.target.value;
    let offset = 0;
    if (prevNext === "next") {
      this.setState({ offset: this.state.offset + 5 })
      if (this.state.offset === 0) {
        this.setState({ offset: this.state.perPageRecord })
        offset = this.state.perPageRecord
      } else {
        offset = this.state.offset + this.state.perPageRecord
      }
    }
    else if (prevNext === "prev") {
      this.setState({ offset: this.state.offset - this.state.perPageRecord })
      offset = this.state.offset - this.state.perPageRecord
    }
    this.props.action.TournamentPoint.getTournamentPointScore(offset, this.state.perPageRecord, this.state.orderByName, this.state.orderBy);
  }

  getPoints(tournamentPoint) {
    this.togglePoints();
    this.setState({ pointData: tournamentPoint });
  }

  renderPointModal() {
    let pointJson = "";
    if (this.state.pointData.pointJson) {
      pointJson = this.state.pointData.pointJson;
    }

    let runsPoints = null, runsArr = [];
    if (pointJson.Runs) {
      runsArr.push(Object.values(pointJson.Runs));
      runsPoints = runsArr[0].map((run, i) => {
        return (
          <tr key={i} className='header-center'>
            <td>{run.from + " - " + run.to}</td>
            <td>{run.point}</td>
          </tr>
        )
      })
    }

    let sixPoints = null, sixArr = [];
    if (pointJson.Six) {
      sixArr.push(Object.values(pointJson.Six));
      sixPoints = sixArr[0].map((six, i) => {
        return (
          <tr key={i} className='header-center'>
            <td>{six.from + " - " + six.to}</td>
            <td>{six.point}</td>
          </tr>
        )
      })
    }

    let fourPoints = null, fourArr = [];
    if (pointJson.Four) {
      fourArr.push(Object.values(pointJson.Four));
      fourPoints = fourArr[0].map((four, i) => {
        return (
          <tr key={i} className='header-center'>
            <td>{four.from + " - " + four.to}</td>
            <td>{four.point}</td>
          </tr>
        )
      })
    }

    let wicketPoints = null, wicketArr = [];
    if (pointJson.Wicket) {
      wicketArr.push(Object.values(pointJson.Wicket));
      wicketPoints = wicketArr[0].map((wicket, i) => {
        return (
          <tr key={i} className='header-center'>
            <td>{wicket.from + " - " + wicket.to}</td>
            <td>{wicket.point}</td>
          </tr>
        )
      })
    }

    let stumpingPoints = null, stumpingArr = [];
    if (pointJson.Stumping) {
      stumpingArr.push(Object.values(pointJson.Stumping));
      stumpingPoints = stumpingArr[0].map((stumping, i) => {
        return (
          <tr key={i} className='header-center'>
            <td>{stumping.from + " - " + stumping.to}</td>
            <td>{stumping.point}</td>
          </tr>
        )
      })
    }

    let catchPoints = null, catchArr = [];
    if (pointJson.Catch) {
      catchArr.push(Object.values(pointJson.Catch));
      catchPoints = catchArr[0].map((catches, i) => {
        return (
          <tr key={i} className='header-center'>
            <td>{catches.from + " - " + catches.to}</td>
            <td>{catches.point}</td>
          </tr>
        )
      })
    }

    return (
      <Container>
        <AntModal
          title={this.state.pointData.Tournament
            ? this.state.pointData.Tournament.tournamentName
            : "Tournamnet"}
          visible={this.state.visible}
          onCancel={this.togglePoints}
          footer={<AntButton type="primary" onClick={this.togglePoints}>Ok</AntButton>}>
          {
            (this.state.pointData)
              ? <Collapse key="points" accordion>
                <Collapse.Panel header="Runs" key="Runs">
                  <Table hover>
                    <thead>
                      <tr className='header-center'>
                        <th>Range</th>
                        <th>Point</th>
                      </tr>
                    </thead>
                    <tbody>{runsPoints}</tbody>
                  </Table>
                </Collapse.Panel>

                <Collapse.Panel header="Six" key="Six">
                  <Table hover>
                    <thead>
                      <tr className='header-center'>
                        <th>Range</th>
                        <th>Point</th>
                      </tr>
                    </thead>
                    <tbody>{sixPoints}</tbody>
                  </Table>
                </Collapse.Panel>

                <Collapse.Panel header="Four" key="Four">
                  <Table hover>
                    <thead>
                      <tr className='header-center'>
                        <th>Range</th>
                        <th>Point</th>
                      </tr>
                    </thead>
                    <tbody>{fourPoints}</tbody>
                  </Table>
                </Collapse.Panel>

                <Collapse.Panel header="Wicket" key="Wicket">
                  <Table hover>
                    <thead>
                      <tr className='header-center'>
                        <th>Range</th>
                        <th>Point</th>
                      </tr>
                    </thead>
                    <tbody>{wicketPoints}</tbody>
                  </Table>
                </Collapse.Panel>

                <Collapse.Panel header="Stumping" key="Stumping">
                  <Table hover>
                    <thead>
                      <tr className='header-center'>
                        <th>Range</th>
                        <th>Point</th>
                      </tr>
                    </thead>
                    <tbody>{stumpingPoints}</tbody>
                  </Table>
                </Collapse.Panel>

                <Collapse.Panel header="Catch" key="Catch">
                  <Table hover>
                    <thead>
                      <tr className='header-center'>
                        <th>Range</th>
                        <th>Point</th>
                      </tr>
                    </thead>
                    <tbody>{catchPoints}</tbody>
                  </Table>
                </Collapse.Panel>

              </Collapse>
              : "No Data"
          }
        </AntModal>
      </Container>
    );
  }

  render() {
    let total = 0;
    let tournamentPoints = "";
    if (this.props.TournamentPoint) {
      tournamentPoints = this.props.TournamentPoint.map((tournamentPoint, i) => {
        total = i + 1;
        return (
          <tr key={tournamentPoint.id} className='header-center'>
            <td>{total}</td>
            <td>{tournamentPoint.Tournament.tournamentName}</td>
            <td><Button color="info" onClick={() => this.getPoints(tournamentPoint)}>Points</Button></td>
          </tr>
        )
      })
    }

    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">

          <AddTournamentPoint isOpen={this.state.modal} toggle={this.toggle}></AddTournamentPoint>
          {this.renderPointModal()}
          <div className='headerdiv'>
              <div className='addbtn mb15'>
                    <Button color="info" onClick={this.toggle} >Add</Button>                           
              </div>
          </div>

          <Table hover>
            <thead className="thead-dark">
              <tr className='header-center'>
                <th>#</th>
                <th>Tournament Name</th>
                <th>Tournament Point</th>
              </tr>
            </thead>
            <tbody>
              {this.props.TournamentPoint.length === 0
                ? <tr className='header-center'><td></td><td>No Data</td><td></td></tr>
                : tournamentPoints}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  TournamentPoint: state.TournamentPoint.get_points
})

const mapDispatchToProps = dispatch => ({
  action: {
    TournamentPoint: bindActionCreators(tournamentPointAction, dispatch)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(tournamentPoint);
