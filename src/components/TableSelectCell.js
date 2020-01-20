import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import clsx from 'clsx';

const defaultSelectCellStyles = theme => ({
  root: {},
  fixedHeader: {
    position: 'sticky',
    top: '0px',
    left: '0px',
    zIndex: 100,
  },
  fixedHeaderCommon: {
    position: 'sticky',
    zIndex: 100,
    backgroundColor: theme.palette.background.paper,
  },
  fixedHeaderXAxis: {
    left: '0px',
  },
  fixedHeaderYAxis: {
    top: '0px',
  },
  icon: {
    cursor: 'pointer',
    transition: 'transform 0.25s',
  },
  expanded: {
    transform: 'rotate(90deg)',
  },
  hide: {
    visibility: 'hidden',
  },
  headerCell: {
    zIndex: 110,
    backgroundColor: theme.palette.background.paper,
  },
  expandDisabled: {},
  checkboxDisabled: {
    '& span': {
			backgroundColor: '#ddd'
		}
  },
  checkboxIcon: {
    borderRadius: 1,
		width: 18,
		height: 18,
		border: '2px solid #BEBEBE'
  },
  checkboxCheckedIcon: {
    backgroundColor: '#000000',
		backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
		border: '2px solid #000000',
		'&:before': {
		  display: 'block',
		  width: 18,
		  height: 18,
		  backgroundImage:
			"url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='2 3 15 15'%3E%3Cpath" +
			" fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
			"1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
		  content: '""',
		},
		'input:hover ~ &': {
		  backgroundColor: '#106ba3',
		},
  },
});

class TableSelectCell extends React.Component {
  static propTypes = {
    /** Select cell checked on/off */
    checked: PropTypes.bool.isRequired,
    /** Select cell part of fixed header */
    fixedHeader: PropTypes.bool,
    /** Select cell part of fixed header */
    fixedHeaderOptions: PropTypes.shape({
      xAxis: PropTypes.bool,
      yAxis: PropTypes.bool,
    }),
    /** Callback to trigger cell update */
    onChange: PropTypes.func,
    /** Extend the style applied to components */
    classes: PropTypes.object,
    /** Is expandable option enabled */
    expandableOn: PropTypes.bool,
    /** Adds extra class, `expandDisabled` when the row is not expandable. */
    hideExpandButton: PropTypes.bool,
    /** Is selectable option enabled */
    selectableOn: PropTypes.string,
    /** Select cell disabled on/off */
  };

  static defaultProps = {
    isHeaderCell: false,
    isRowExpanded: false,
    expandableOn: false,
    selectableOn: 'none',
  };

  render() {
    const {
      classes,
      fixedHeader,
      fixedHeaderOptions,
      isHeaderCell,
      expandableOn,
      selectableOn,
      isRowExpanded,
      onExpand,
      isRowSelectable,
      selectableRowsHeader,
      hideExpandButton,
      ...otherProps
    } = this.props;
    let fixedHeaderClasses;

    if (!expandableOn && selectableOn === 'none') return false;

    // DEPRECATED, make sure to replace defaults with new options when removing
    if (fixedHeader) fixedHeaderClasses = classes.fixedHeader;

    if (fixedHeaderOptions) {
      fixedHeaderClasses = classes.fixedHeaderCommon;
      if (fixedHeaderOptions.xAxis) fixedHeaderClasses += ` ${classes.fixedHeaderXAxis}`;
      if (fixedHeaderOptions.yAxis) fixedHeaderClasses += ` ${classes.fixedHeaderYAxis}`;
    }

    const cellClass = classNames({
      [classes.root]: true,
      [fixedHeaderClasses]: true,
      [classes.headerCell]: isHeaderCell,
    });

    const buttonClass = classNames({
      [classes.expandDisabled]: hideExpandButton,
    });

    const iconClass = classNames({
      [classes.icon]: true,
      [classes.hide]: isHeaderCell,
      [classes.expanded]: isRowExpanded,
    });

    const renderCheckBox = () => {
      if (isHeaderCell && (selectableOn !== 'multiple' || selectableRowsHeader === false)) {
        // only display the header checkbox for multiple selection.
        return null;
      }
      return (
        <Checkbox
          classes={{
            disabled: classes.checkboxDisabled
          }}
          disableRipple
					icon={<span className={classes.checkboxIcon} />}
					checkedIcon={<span className={clsx(classes.checkboxIcon, classes.checkboxCheckedIcon)} />}
          color="primary"
          disabled={!isRowSelectable}
          {...otherProps}
        />
      );
    };

    return (
      <TableCell className={cellClass} padding="checkbox">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {expandableOn && (
            <IconButton onClick={onExpand} disabled={isHeaderCell} className={buttonClass}>
              <KeyboardArrowRight id="expandable-button" className={iconClass} />
            </IconButton>
          )}
          {selectableOn !== 'none' && renderCheckBox()}
        </div>
      </TableCell>
    );
  }
}

export default withStyles(defaultSelectCellStyles, { name: 'MUIDataTableSelectCell' })(TableSelectCell);
