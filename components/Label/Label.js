// Label.js

'use strict';

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Text,View} from 'react-native';

import Theme from 'teaset/themes/Theme';

export default class Label extends Component {

  static propTypes = {
    ...Text.propTypes,
    type: PropTypes.oneOf(['default', 'title', 'detail', 'danger']),
    size: PropTypes.oneOf(['xl', 'lg', 'md', 'sm', 'xs']),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    withRedDot: PropTypes.bool,
  };

  static defaultProps = {
    ...Text.defaultProps,
    type: 'default',
    size: 'md',
    numberOfLines: 1,
    withRedDot: false
  };

  buildProps() {
    let {type, size, style, text, children, withRedDot, redDotContainerStyle, redDotStyle, ...others} = this.props;

    let color, fontSize;
    switch (size) {
      case 'xl': fontSize = Theme.labelFontSizeXL; break;
      case 'lg': fontSize = Theme.labelFontSizeLG; break;
      case 'sm': fontSize = Theme.labelFontSizeSM; break;
      case 'xs': fontSize = Theme.labelFontSizeXS; break;
      default: fontSize = Theme.labelFontSizeMD;
    }
    switch (type) {
      case 'title':
        color = Theme.labelTextTitleColor;
        fontSize = Math.round(fontSize * Theme.labelTitleScale);
        break;
      case 'detail':
        color = Theme.labelTextDetailColor;
        fontSize = Math.round(fontSize * Theme.labelDetailScale);
        break;
      case 'danger':
        color = Theme.labelTextDangerColor;
        fontSize = Math.round(fontSize * Theme.labelDangerScale);
        break;
      default:
        color = Theme.labelTextColor;
    }
    style = [{
      backgroundColor: 'rgba(0, 0, 0, 0)',
      color: color,
      fontSize: fontSize,
      overflow: 'hidden',
    }].concat(style);

    redDotContainerStyle=[{
      height: 6,
      width: 6,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: -4,
      top: 0,
    }].concat(redDotContainerStyle)

    redDotStyle=[{
      height: 5,
      width: 5,
      borderRadius: 2.5,
      backgroundColor: '#F44336',
    }].concat(redDotStyle)

    if (text || text === '' || text === 0) children = text;

    return {type, size, style, text, children, withRedDot, redDotContainerStyle, redDotStyle, ...others};
  }

  render() {
    let props = this.buildProps();
    return (
      props.withRedDot ?
      <View>
        <Text {...props} style={[props.style,{alignSelf:'center',flexGrow:0,flexShrink:0}]}/>
        <View style={props.redDotContainerStyle}>
          <View style={props.redDotStyle} />
        </View>
      </View> :
      <Text {...props} />
    );
  }
}
