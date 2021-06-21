import Touchable from '@/components/Touchable';
import {Formik} from 'formik';
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {ScrollView, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../models';

interface Values {
  account: string;
  password: string;
}

const initialValues: Values = {
  account: '',
  password: '',
};

const mapStateToProps = ({loading}: RootState) => {
  return {
    loading: loading.effects['account/login'],
  };
};

const connector = connect(mapStateToProps);

type ModelState = ConnectedProps<typeof connector>;

interface Iprops extends ModelState {}

class Login extends React.Component<Iprops> {
  onSubmit = (values: Values) => {
    const {dispatch} = this.props;
    dispatch({
      type: 'account/login',
      payload: values,
    });
  };

  render() {
    return (
      //keyboardShouldPersistTaps="handled" 切换多个输入框时,保持键盘处于唤醒状态
      /**
       * initialValues:表单初始值
       * onSubmit:表单提交函数,通过这个函数可获取所有输入组件的值
       * values:表单传入的值
       * handleChange:表单发生变化之后执行的函数
       * handleBlur:表单输入项失去焦点之后之执行这个方法触发表单
       * handleSubmit:触发<Formik>组件中的onSubmit()函数
       */
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>听书</Text>
        <Formik initialValues={initialValues} onSubmit={this.onSubmit}>
          {({values, handleChange, handleBlur, handleSubmit}) => {
            return (
              <View style={styles.bottomContainer}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('account')}
                  onBlur={handleBlur('account')}
                  value={values.account}
                />
                <TextInput
                  style={styles.textInput}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={true}
                />
                <Touchable style={styles.loginTextBtn} onPress={handleSubmit}>
                  <Text style={styles.loginText}>登录</Text>
                </Touchable>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    fontSize: 66,
    color: '#f04112',
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 40,
  },
  bottomContainer: {
    alignItems: 'center',
    padding: 16,
  },
  textInput: {
    width: '100%',
    height: 44,
    backgroundColor: 'white',
    borderColor: '#ccc',
    marginBottom: 16,
    marginHorizontal: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },

  loginTextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    width: 88,
    height: 44,
  },
  loginText: {
    fontSize: 32,
    color: '#fea79d',
    fontWeight: 'bold',
  },
});

export default connector(Login);
