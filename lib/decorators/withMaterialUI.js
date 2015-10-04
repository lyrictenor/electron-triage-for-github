import React, { PropTypes } from 'react';// eslint-disable-line no-unused-vars
import { Styles } from 'material-ui';
const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;

export default function withMaterialUI(ComposedComponent) {
  class MaterialUI {
    getChildContext() {
      return {
        muiTheme: ThemeManager.getMuiTheme(DefaultRawTheme),
      };
    }

    render() {
      const { context, ...other } = this.props;// eslint-disable-line no-unused-vars
      return <ComposedComponent {...other} />;
    }
  }

  /*
   For more details: https://github.com/callemall/material-ui#usage
   Pass material-ui theme through child context
   We are doing this here so we don't have to do it anywhere else.
   */
  MaterialUI.childContextTypes = {
    muiTheme: PropTypes.object,
  };

  MaterialUI.propTypes = {
    context: PropTypes.object,
  };

  return MaterialUI;
}
