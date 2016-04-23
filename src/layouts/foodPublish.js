/**
 * Created by jason on 4/22/16.
 */
import React,{
	Component,
	View,
	PropType,
	StyleSheet,
	TouchableHighlight,
	Text,
	ScrollView,
	Dimensions,
	Image,
	NativeModules
} from 'react-native'

const {width, height}  = Dimensions.get('window')

import t from 'tcomb-form-native'
import Spinner from 'react-native-loading-spinner-overlay'
import fetch from 'isomorphic-fetch'
var ImagePickerManager = require('NativeModules').ImagePickerManager
var Form = t.form.Form



import Icon from 'react-native-vector-icons/Ionicons'


const ZeroToOne = t.refinement(t.Number, function (n) {
	return n > 0 && n <= 1;
})

const Positive = t.refinement(t.Number, function (n) {
	return n > 0;
})


const Food = t.struct({
	name: t.String,
	price: Positive,
	description: t.maybe(t.String),
	address: t.String,
	discount: ZeroToOne,
	is_recommended: t.Boolean,
	is_hot: t.Boolean,
	is_breakfast: t.Boolean,
	is_lunch: t.Boolean,
	is_dinner: t.Boolean,


})

const options = {
	//background: 'red'
	auto: 'placeholders',
	fields: {
		name: {
			label: '菜名',
			placeholder: '请输入菜名',
			error: '菜名未填写',
			autoFocus: true
		},
		price: {
			label: '单价',
			placeholder: '请输入单价',
			error: '单价必须为整数',
		},
		description: {
			label: '详情',
			placeholder: '请输入该菜肴的详情'
		},
		discount: {
			label: "折扣",
			placeholder: "折扣为0~1之间的数值",
			error: '折扣必须在0~1之间'
		},
		is_recommended: {
			label: '是否是推荐菜肴'
		},
		is_hot: {
			label: '是否是热门菜肴'
		},
		is_breakfast: {
			label: '是否属于早餐'
		},
		is_lunch: {
			label: '是否属于午餐'
		},
		is_dinner: {
			label: '是否属于晚餐'
		},
		address: {
			label: '地址',
			placeholder: '请填入详细地址'
		}

	}
}

const imagePickerOptions = {
	title: '选择菜肴图像', // specify null or empty string to remove the title
	cancelButtonTitle: '取消',
	takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
	chooseFromLibraryButtonTitle: '从图库中选择', // specify null or empty string to remove this button
	cameraType: 'back', // 'front' or 'back'
	mediaType: 'photo', // 'photo' or 'video'
	videoQuality: 'high', // 'low', 'medium', or 'high'
	durationLimit: 10, // video recording max time in seconds
	maxWidth: 100, // photos only
	maxHeight: 100, // photos only
	quality: 1, // 0 to 1, photos only
	allowsEditing: true, // Built in functionality to resize/reposition the image after selection
};


class foodPublish extends Component {

	// 构造
	constructor(props) {
		super(props);
		// 初始状态
		this.state = {
			progressing: false,
			avatarSource: undefined,
		};
	}

	onPress = () => {


		const {actions} = this.props

		const {avatarSource} = this.state
		let value = this.refs.form.getValue()

		if (!avatarSource) {
			AlertIOS.alert(
				'警告',
				'请选择菜品的图片',
				[
					{text: '确定', onPress: () => console.log('确定按钮点击')},
				]
			)
		}


		if (value && avatarSource) {

			const postBody = JSON.stringify(value)

			actions.publishFood(postBody,{
				source: avatarSource.uri
			})

			this.props.navigator.popToTop()

			actions.getFoods()

		}
			// this.setState({progressing:true})
	}

	_renderPhoto = () => {
		if (this.state.avatarSource) {
			return <TouchableHighlight style={{alignSelf: 'center',marginBottom: 10}} onPress={this._addPhotoClick} underlayColor="#99d9f4"><Image source={this.state.avatarSource} style={styles.image} ></Image></TouchableHighlight>
		}

		return <TouchableHighlight style={styles.button} onPress={this._addPhotoClick} underlayColor="#99d9f4"><Text style={styles.buttonText}>
			请先选择图片
		</Text></TouchableHighlight>
	}

	_addPhotoClick = () => {
		ImagePickerManager.showImagePicker(imagePickerOptions, (response) => {
			//console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			}
			else if (response.error) {
				console.log('ImagePickerManager Error: ', response.error);
			}
			else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			}
			else {
				// You can display the image using either data:
				const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

				// uri (on iOS)
				//const source = {uri: response.uri.replace('file://', ''), isStatic: true};
				// uri (on android)
				//const source = {uri: response.uri, isStatic: true};

				this.setState({
					avatarSource: source,
				});
			}
		});
	}

	renderForm = () => {
		return(
			<ScrollView
				ref="_scrollView"
				style={styles.container}
				automaticallyAdjustContentInsets

			>
				{this._renderPhoto()}
				<Form
					ref="form"
					type={Food}
					options={options}
				/>

				<TouchableHighlight
					style={styles.button}
					onPress={this.onPress}
					underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>
						 发布
					</Text>
				</TouchableHighlight>
			</ScrollView>
		)
	}

	renderProgress = () => {
		return (
			<View style={{flex: 1}}>
				<Spinner visible={this.state.progressing} />
			</View>
		)
	}


	render(){
		return (
			<View>
				{this.renderForm()}
				{this.renderProgress()}
			</View>
		)
	}
}

var styles = StyleSheet.create({
	container: {
		padding: 20,
		backgroundColor: '#ffffff',
		height: height - 64
	},
	button: {
		height: 36,
		backgroundColor: '#48bbec',
		borderColor: '#48bbec',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent:'center'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	image: {
		width: 200,
		height: 200,
		alignSelf: 'center',
	}
})

export const LayoutComponent = foodPublish
export function mapStateToProps(state){
	return {

	}
}