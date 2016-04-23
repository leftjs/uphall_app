/**
 * Created by jason on 4/19/16.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import actions from '../actions';


const options = {
	withRef: true
};


export default function connectComponent({ mapStateToProps, mapDispatchToProps, mergeProps, LayoutComponent }) {
	return connect(
		mapStateToProps || function (state) {
			return {};
		},
		mapDispatchToProps || function (dispatch) {
			return {
				actions: bindActionCreators(actions, dispatch)
			}
		},
		mergeProps,
		options
	)(LayoutComponent);
}
