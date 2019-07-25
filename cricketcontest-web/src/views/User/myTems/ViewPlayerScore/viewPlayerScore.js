import React from 'react';
import { Modal } from 'antd';
import { Table } from "reactstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as  matchPlayerScoreAction from '../../../../action/matchPlayerScore';
import '../../style.css';
class viewplayerscore extends React.Component {
  componentWillMount = () => {
    this.getTournamentMatch();
  }

  getTournamentMatch() {
    this.props.action.matchPlayerScore.getTournamentMatchPlayerScore(0, 100, "id", "desc");
  }

  render() {
    let data = [], playerscore = [];
    if (this.props.binddata.length !== 0) {
      let run = 0, six = 0, wicket = 0, stumping = 0, four = 0, Catch = 0, points = 0;
      this.props.matchPlayerScores.map((d, key) => {
        if (d.playerId === this.props.binddata.playerId && this.props.binddata.tournamentId === d.tournamentId) {
          run += d.run;
          six += d.six;
          four += d.four;
          wicket += d.wicket;
          stumping += d.stumping;
          Catch += d.catch;
          points += d.score;
          var dd = <div key={key}>
            <Table >
              <tbody>
                <tr>
                  <th className="textAlian">Runs</th>
                  <th>{run}</th>
                </tr>
                <tr textAlign="center">
                  <th className="textAlian">six</th>
                  <td>{six}</td>
                </tr>
                <tr>
                  <th className="textAlian"  >Four</th>
                  <td>{four}</td>
                </tr>
                <tr>
                  <th className="textAlian">wicket</th>
                  <td>{wicket}</td>
                </tr>
                <tr>
                  <th className="textAlian">Stumping</th>
                  <td>{stumping}</td>
                </tr>
                <tr>
                  <th className="textAlian">catch</th>
                  <td>{Catch}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th className="textAlian">Point</th>
                  <td>{points}</td>
                </tr>
              </tfoot>
            </Table>
          </div>
          if (!playerscore.includes(d.playerId)) {
            playerscore.push(d.playerId);
          }

          data[d.playerId] = dd;

        }
        return null;
      })
    }
    let count = 0
    if (data) {
      for (let index = 0; index < data.length; index++) {
        if (data[index] === undefined) {
          count = count + 1
        }
      }
    }
    return (<div >
      <Modal
        title="Show Points"
        visible={this.props.visible}
        onCancel={this.props.onCancel}>
        {(data) ? count !== data.length ? data : <p className="noscorefound">Match Remaining</p> : ""}
      </Modal>
    </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    matchPlayerScores: state.MatchPlayerScore.tournamentMatchPlayerScore,
  }
};
const mapDispatchToProps = dispatch => ({
  action: {
    matchPlayerScore: bindActionCreators(matchPlayerScoreAction, dispatch),
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(viewplayerscore);
