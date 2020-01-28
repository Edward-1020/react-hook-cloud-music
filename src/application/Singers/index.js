import React from 'react';
import Horizen from '../../baseUI/horizenItem';
import { categoryTypes, alphaTypes } from '../../api/config';
import {
  NavContainer,
  ListContainer,
  List,
  ListItem
} from './style';
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  refreshMorseSingerList,
  changePullDownLoading,
  changePullUpLoading,
  refreshMoreHotSingerList
} from './store/actionCreators';
import Scroll from '../../baseUI/scroll/index';
import {connect} from 'react-redux';
import { CHANGE_ALPHA, CHANGE_CATEGORY } from './data';

function Singers() {
  let [category, setCategory] = useState('');
  let [alpha, setAlpha] = useState('');
  const {data, dispatch} = useContext(CategoryDataContext);
  const {category, alpha} = data.toJS();

  let handleUpdateAlpah = (val) => {
    dispatch({type: CHANGE_ALPHA, data: val});
    updateDispatch(category, val);
  }

  let handleUpadteCategory = (val) => {
    dispatch({type: CHANGE_CATEGORY, data: val});
    updateDispatch(val, alpha);
  }

  return (
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类（默认热门）："}
        handleClick={(val) => handleUpadteCategory(val)}
        oldVal={category}
        >
      </Horizen>
      <Horizen 
        list={alphaTypes} 
        title={"首字母："}
        handleClick={(val) => handleUpdateAlpah(val)}>
      </Horizen>
      <ListContainer>
        <Scroll>
          { renderSingerList() }
        </Scroll>
      </ListContainer>
    </NavContainer>
  );
}

const mapStateToProps = (state) => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
});

const mapDispatchToProps = (dispatch) => {
  return {
    getHotSingerDispatch () {
      dispatch(getHotSingerList());
    },
    updateDispatch(category, alpha) {
      dispatch(changePageCount(0));
      dispatch(changeEnterLoading(true));
      dispatch(getSingerList(category, alpha));
    },
    pullUpRefreshDispatch(category, alpha, hot, count) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(count + 1));
      if (hot) {
        dispatch(refreshMorseSingerList());
      } else {
        dispatch(refreshMoreHotSingerList(category, alpha));
      }
    },
    pullDownRefreshDispatch (category, alpha) {
      dispatch(changePullDownLoading(true));
      dispatch(changePageCount(0))
      if (category === '' && alpha = '') {
        dispatch(getHotSingerList());
      } else {
        dispatch(getSingerList(category, alpha));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers));
