import {
    getHotSingerListRequest,
    getSingerListRequest
} from '../../../api/request';
import {
    CHANGE_SINGER_LIST,
    CHANGE_PAGE_COUNT,
    CHANGE_ENTER_LOADING,
    CHANGE_PULLUP_LOADING,
    CHANGE_PULLDOWN_LOADING
} from './constants';
import {
    fromJS
} from 'immutable';

const changeSingerList = (data) => ({
    type: CHANGE_SINGER_LIST,
    data: fromJS(data)
});

export const changeEnterLoading = (data) => ({
    type: CHANGE_ENTER_LOADING,
    data
});

export const changePullUpLoading = (data) => ({
    type: CHANGE_PULLUP_LOADING,
    data
})

export const changePullDownLoading = (data) => ({
    type: CHANGE_PULLDOWN_LOADING,
    data
})

export const getHotSingerList = () => {
    return (dispath) => {
        getHotSingerListRequest(0).then(res => {
            const data = res.artists;
            dispath(changeSingerList(data));
            dispath(changeEnterLoading(false));
            dispath(changePullDownLoading(false));
        }).catch(() => {
            console.log('error')
        })
    }
}

export const refreshMoreHotSingerList = () => {
    return (dispath, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getHotSingerListRequest(pageCount).then((res) => {
            const data = [...singerList, ...res.artists];
            dispath(changeSingerList(data));
            dispath(changePullDownLoading(false));
        }).catch(() => {
            console.log('error')
        })
    }
}

export const getSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        getSingerListRequest(category, alpha, 0).then(res => {
            const data = res.artists;
            dispath(changeSingerList(data));
            dispatch(changeEnterLoading(false));
            dispatch(changePullDownLoading(false));
        }).catch(() => {
            console.log('error')
        })
    }
}

export const refreshMorseSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount']);
        const singerList = getState().getIn(['singers', 'singerList']).toJS();
        getSingerListRequest(category, alpah, pageCount).then(res => {
            const data = [...singerList, ...res.artists];
            dispatch(changeSingerList(data))
            dispatch(changePullDownLoading(false))
        }).catch(() => {
            console.log(err)
        })
    }
}