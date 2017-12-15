import React, { Component } from 'react';
import {
	PanResponder,
	StyleSheet,
	View,
	processColor,
} from 'react-native';

var CIRCLE_SIZE = 80;

export default class PanResponderDemo extends Component {

	componentWillMount() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
			onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
			onPanResponderGrant: this._handlePanResponderGrant,
			onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: this._handlePanResponderEnd,
			onPanResponderTerminate: this._handlePanResponderEnd,
		});
		this._previousLeft = 20;
		this._previousTop = 84;
		this._circleStyles = {
			style: {
				left: this._previousLeft,
				top: this._previousTop,
				backgroundColor: 'green',
			}
		};
	}

	componentDidMount() {
		this._updateNativeStyles();
	}

	render() {
		return (
			<View
				style={styles.container}>
				<View
					ref={(circle) => {
						this.circle = circle;
					}}
					style={styles.circle}
					{...this._panResponder.panHandlers}
				/>
			</View>
		);
	}

	_highlight = () => {
		this._circleStyles.style.backgroundColor = 'blue';
		this._updateNativeStyles();
	}

	_unHighlight = () => {
		this._circleStyles.style.backgroundColor = 'green';
		this._updateNativeStyles();
	}

	_updateNativeStyles = () => {
		this.circle && this.circle.setNativeProps(this._circleStyles);
	}


	_handleStartShouldSetPanResponder = (e, gestureState) => {
		return true;
	}

	_handleMoveShouldSetPanResponder = (e, gestureState) => {
		return true;
	}

	_handlePanResponderGrant = (e, gestureState) => {
		this._highlight();
	}
	_handlePanResponderMove = (e, gestureState) => {
		this._circleStyles.style.left = this._previousLeft + gestureState.dx;
		this._circleStyles.style.top = this._previousTop + gestureState.dy;
		console.log('gestureState', gestureState.dx);
		this._updateNativeStyles();
	}
	_handlePanResponderEnd = (e, gestureState) => {
		this._unHighlight();
		this._previousLeft += gestureState.dx;
		this._previousTop += gestureState.dy;
	}
}
var styles = StyleSheet.create({
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE / 2,
		position: 'absolute',
		left: 0,
		top: 0,
	},
	container: {
		flex: 1,
		paddingTop: 64,
		backgroundColor: '#f61',
	},
});