import React from 'react';
import { connect } from 'react-redux';

function Rank() {
  return (
    <div className="Rank">
      Rank
    </div>
  );
}

const mapStateToProps = (state) => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRankListDataDispatch () {
      dispatch(getRankList());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank));
