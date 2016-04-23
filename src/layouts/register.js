/**
 * Created by jason on 4/15/16.
 */
import React,{
	View,
	StyleSheet,
	Component,
	Text,
	TouchableHighlight,
	Navigator,
	AlertIOS
} from "react-native"

import t from 'tcomb-form-native'
import Spinner from 'react-native-loading-spinner-overlay'
import fetch from 'isomorphic-fetch'

var Form = t.form.Form

const User = t.struct({
	name: t.String,
	username: t.String,
	password: t.String,
})

const options = {
	//background: 'red'
	auto: 'placeholders',
	fields: {
		username: {
			label: '用户名',
			placeholder: '请输入用户名',
			error: '用户名未填写',
			autoFocus: true
		},
		password: {
			label: '密码',
			placeholder: '请输入密码',
			error: '密码未填写',
			password: true,
		},
		name: {
			label: '昵称',
			placeholder: '请填写昵称',
			error: '昵称未填写',
		}

	}
}


class register extends Component {

	// 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
	    progressing: false
    };
  }

	registerBtnOnPress = () => {

		const {actions} = this.props
		let value = this.refs.form.getValue()
		let postData = JSON.parse(JSON.stringify(value))

		if (value) {
			actions.register({
				...postData,
				resolved: () => {

					actions.login({
						...postData,
						resolved: () => {
							AlertIOS.alert(
								'注册成功',
								'您已经成功注册并登录',
								[
									{text: '确定', onPress: () => 	this.props.navigator.popToTop()
									},
								]
							)
						}
					})


				},
				rejected: () => {
					AlertIOS.alert(
						'注册失败',
						'注册失败,请检查...',
						[
							{text: '确定', onPress: () => 	console.log('注册失败')
							},
						]
					)
				}
			})
		}
	}
	loginBtnOnPress = () => {
		this.props.navigator.pop()
	}

	renderForm = () => {
		return(
			<View style={styles.container}>
				<Form
					ref="form"
					type={User}
					options={options}
					style={styles.form}
				/>
				<TouchableHighlight
					style={styles.button}
					onPress={this.registerBtnOnPress}
					underlayColor='#99d9f4'>
					<Text style={styles.buttonText}>
						注册
					</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={styles.button}
					onPress={this.loginBtnOnPress}
					underlayColor='#99d9f4'
				>
					<Text style={styles.buttonText}>已有账号?登录</Text>
				</TouchableHighlight>
			</View>
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
		justifyContent: 'center',
		marginTop: 2,
		padding: 20,
		backgroundColor: '#ffffff',
		flex: 1
	},
	button: {
		height: 36,
		backgroundColor: '#48bbec',
		borderColor: '#48bbec',
		borderWidth: 1,
		borderRadius: 8,
		marginTop: 10,
		alignSelf: 'stretch',
		justifyContent:'center'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	title: {
		fontSize: 40,
		alignSelf: 'center',
		marginBottom: 20
	}
})

export const LayoutComponent = register
export function mapStateToProps(state) {
	return {

	}
}

