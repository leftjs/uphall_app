/**
 * Created by jason on 4/16/16.
 */

import React, {
	View,
	Text,
	Component,
	StyleSheet,
	ScrollView
} from 'react-native'

import SwipeableViews from '../../node_modules/react-swipeable-views/lib/index.native.animated.js'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import connectComponent from './../utils/connectComponent'
import * as FoodList from './../components/home/foodList'

var ConnectedFoodList = connectComponent(FoodList)

import fetch from 'isomorphic-fetch'


import autoPlay from '../../node_modules/react-swipeable-views/lib/autoPlay'
const AutoPalySwipeableViews = autoPlay(SwipeableViews)

import Pagination from './../components/pagination/pagination'


class home extends Component{

	componentWillMount() {

		const {actions} = this.props
		actions.getFoods()

	}

	// 构造
	  constructor(props) {
	    super(props);
	    // 初始状态
	    this.state = {
		    index: 0,
	    };
	  }

	handleChangeIndex = (index) => {
		this.setState({
			index
		})
	}


	render(){
		const {navigator} = this.props

		return (
			<View
				style={styles.container}
			>
				<View>
					<AutoPalySwipeableViews
						index={this.state.index}
						style={styles.slideContainer}
						onChangeIndex={this.handleChangeIndex}
						resistance={true}
						interval={3000}
					>

						<View style={[styles.slide, styles.slide1]}>
							<Text style={styles.text}>
								广告1
							</Text>
						</View>
						<View style={[styles.slide, styles.slide2]}>
							<Text style={styles.text}>
								广告2
							</Text>
						</View>
						<View style={[styles.slide, styles.slide3]}>
							<Text style={styles.text}>
								广告3
							</Text>
						</View>
					</AutoPalySwipeableViews>
					<Pagination
						dots={3}
						index={this.state.index}
						onChangeIndex={this.handleChangeIndex}
					/>
				</View>
				<ScrollableTabView
					tabBarUnderlineColor="green"
					tabBarActiveTextColor="green"
				>
					<ConnectedFoodList tabLabel="全部" tag="all" navigator={navigator}></ConnectedFoodList>
					<ConnectedFoodList tabLabel="推荐" tag="recommended" navigator={navigator}></ConnectedFoodList>
					<ConnectedFoodList tabLabel="热销" tag="hot" navigator={navigator}></ConnectedFoodList>
					<ConnectedFoodList tabLabel="折扣" tag="discount" navigator={navigator}></ConnectedFoodList>
					<ConnectedFoodList tabLabel="早餐" tag="breakfast" navigator={navigator}></ConnectedFoodList>
					<ConnectedFoodList tabLabel="午餐" tag="lunch" navigator={navigator}></ConnectedFoodList>
					<ConnectedFoodList tabLabel="晚餐" tag="dinner" navigator={navigator}></ConnectedFoodList>
				</ScrollableTabView>
			</View>

		)
	}
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		//backgroundColor: 'black',
	},
	slideContainer: {
		height: 100,
	},
	slide: {
		padding: 15,
		height: 100,
	},
	slide1: {
		backgroundColor: '#FEA900',
	},
	slide2: {
		backgroundColor: '#B3DC4A',
	},
	slide3: {
		backgroundColor: '#6AC0FF',
	},
	text: {
		color: '#fff',
		fontSize: 16,
	},
})



export const LayoutComponent = home
export function mapStateToProps(state) {
	return {

	}
}