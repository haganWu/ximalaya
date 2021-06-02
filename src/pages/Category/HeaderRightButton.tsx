import {RootState} from '@/models/index';
import React from 'react';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = ({category}: RootState) => {
  return {
    isEdit: category.isEdit,
  };
};

const connector = connect(mapStateToProps);

type MadelState = ConnectedProps<typeof connector>;

interface Iprops extends MadelState {
  onSubmit: () => void;
}

class HeaderRightButton extends React.Component<Iprops> {
  render() {
    const {onSubmit, isEdit} = this.props;
    return (
      <HeaderButtons>
        <Item title={isEdit ? '完成' : '编辑'} onPress={onSubmit} />
      </HeaderButtons>
    );
  }
}
export default connector(HeaderRightButton);
