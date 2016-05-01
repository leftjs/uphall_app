/**
 * Created by jason on 4/16/16.
 */

import React, {
	View,
	Text,
	Component,
	StyleSheet,
	Image,
	TouchableHighlight,
	AlertIOS,
	Linking,
	Dimensions,
	ScrollView
} from 'react-native'

const {width, height} = Dimensions.get('window')

import Icon from 'react-native-vector-icons/Ionicons'
import * as login from './login'
import connectComponent from '../utils/connectComponent'
var ImagePickerManager = require('NativeModules').ImagePickerManager


const imagePickerOptions = {
	title: '选择头像', // specify null or empty string to remove the title
	cancelButtonTitle: '取消',
	takePhotoButtonTitle: '拍照', // specify null or empty string to remove this button
	chooseFromLibraryButtonTitle: '从图库中选择', // specify null or empty string to remove this button
	cameraType: 'back', // 'front' or 'back'
	mediaType: 'photo', // 'photo' or 'video'
	videoQuality: 'high', // 'low', 'medium', or 'high'
	durationLimit: 10, // video recording max time in seconds
	maxWidth: 400, // photos only
	maxHeight: 400, // photos only
	quality: 1, // 0 to 1, photos only
	allowsEditing: true, // Built in functionality to resize/reposition the image after selection
};

export default class mine extends Component{




	render(){
		return (
			<View style={styles.container}>
				{this._renderAvatar()}
				{this._renderName()}
				<View style={{width,height: 1, backgroundColor:"lightgray", marginTop: 10}}></View>
				{this._renderAbout()}
			</View>

		)
	}


	_renderAbout = () => {
		return (
			<ScrollView contentInset={{	top: 20,left: 0}} contentOffset={{
			x: 0,
			y: -20
			}}style={{marginBottom: 64 + 48}}>
				<Text style={{textAlign:'center',fontSize: 20}}>项目介绍</Text>
				<Text style={styles.about}>        项目基于Facebook React Native构建,一款模拟大学食堂订餐、菜肴分享的简易APP,仅供毕设使用,项目开源,Github地址:</Text>
				<TouchableHighlight underlayColor="transparent" onPress={this._linkingClick}><Text style={[{textDecorationLine:'underline', color: 'green'},styles.about]}>{`https://github.com/leftjs/uphall_app`}</Text></TouchableHighlight>
				<Text style={styles.about}>欢迎star&fork&PR&issue~~~~~</Text>
			</ScrollView>
		)
	}

	_renderAvatar = () => {
		if(this.props.user.avatar_uri) {
			return (<TouchableHighlight underlayColor="#99d9f4" onPress={this._LoginBtnClick} style={styles.buttonImage}><Image style={styles.avatar} source={{uri: this.props.user.avatar_uri}}></Image></TouchableHighlight>
			)
		}

		return (
			<TouchableHighlight underlayColor="#99d9f4" onPress={this._LoginBtnClick} style={styles.buttonImage}><Image style={styles.avatar} source={{uri: 'http://ww3.sinaimg.cn/mw690/71ae9b51gw1f34ggm06a9j20cs0cs74t.jpg'}}></Image></TouchableHighlight>

		)
	}
	_renderName = () => {
		if (this.props.user.name) {
			return (
				<View>
					<Text style={styles.name}>{this.props.user.name}</Text>
					<Icon.Button name="ios-camera-outline" backgroundColor="#99d9f4" onPress={this._uploadAvatarClick}>
						上传头像
					</Icon.Button>
				</View>

			)
		}
		return (
			<Text style={styles.name}>未登录</Text>
		)
	}

	_linkingClick = () => {
		Linking.openURL("https://github.com/leftjs/uphall_app")
	}


	_uploadAvatarClick = () => {

		const { actions, user } = this.props

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
				actions.uploadAvatar({
					id: user._id,
					source: source.uri,
					resolved: () => {
						actions.login({
							username: user.username,
							password: user.re_password,
							resolved: () => {
								AlertIOS.alert(
									'头像上传成功',
									'您已成功上传头像',
									[
										{text: '确定', onPress: () => 	console.log("头像成功上传")
										},
									]
								)
							},
							rejected: () => {
								AlertIOS.alert(
									'头像上传失败',
									'头像上传失败,请检查',
									[
										{text: '确定', onPress: () => 	console.log("头像上传失败")
										},
									]
								)
							}
						})
					},
					rejected: () => {
						AlertIOS.alert(
							'头像上传失败',
							'头像上传失败,请检查',
							[
								{text: '确定', onPress: () => 	console.log("头像上传失败")
								},
							]
						)
					}
				})
			}
		});
	}
	_LoginBtnClick = () => {
		this.props.navigator.push({
			component: connectComponent(login),
			title: '登录'
		})
	}
}

const avatarWH = 150

const styles = StyleSheet.create({
	buttonImage: {
		alignSelf: 'center',
		marginTop: 20,
		width: avatarWH,
		height: avatarWH,
		borderRadius: avatarWH / 2
	},
	container: {
		flex: 1,
		alignItems: 'center'
	},
	name: {
		alignSelf: 'center',
		marginTop: 15,
		fontSize: 22,
		marginBottom: 5
	},
	avatar: {
		alignSelf: 'center',
		width: avatarWH,
		height: avatarWH,
		borderRadius: avatarWH / 2,
		borderWidth: 3,
		borderColor: 'lightgreen'
	},
	loginButton: {
		marginTop: 30,
		alignSelf: 'center',
		backgroundColor:'green',
		padding: 5,
		borderRadius: 5
	},
	about: {
		textAlign: 'left',
		padding: 20,
		paddingBottom: 0,
		paddingTop: 10,
		fontSize: 17
	}
})


export const LayoutComponent = mine
export function mapStateToProps(state) {
	return {
		user: state.user
	}
}