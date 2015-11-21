import React, { PropTypes } from 'react';// eslint-disable-line no-unused-vars
import { Styles } from 'material-ui';
const {
  ThemeManager,
  LightRawTheme,
} = Styles;
const theme = ThemeManager.getMuiTheme(LightRawTheme);

export default function withMaterialUI(ComposedComponent) {
  class MaterialUI {
    getChildContext() {
      return {
        muiTheme: theme,
      };
    }

    render() {
      const { context, ...other } = this.props;// eslint-disable-line no-unused-vars, no-redeclare
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
