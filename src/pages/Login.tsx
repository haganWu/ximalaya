import Touchable from '@/components/Touchable';
import {Field, Formik} from 'formik';
import React from 'react';
import {StyleSheet, TextInput, View, ScrollView, Text} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '../models';
import * as Yup from 'yup';
import Input from '@/components/Input';

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

const validationSchema = Yup.object().shape({
  account: Yup.string().trim().required('请输入您的账号'),
  password: Yup.string().trim().required('请输入密码'),
});

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
       * validationSchema:自定义校验规则
       */
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.logo}>听书</Text>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={this.onSubmit}>
          {({handleSubmit}) => {
            return (
              <View>
                <Field
                  name="account"
                  placeholder="请输入账号"
                  component={Input}
                />
                <Field
                  name="password"
                  placeholder="请输入密码"
                  component={Input}
                  secureTextEntry
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
    marginTop: 40,
  },

  loginTextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    marginHorizontal: 30,
    borderColor: '#fea79d',
  },
  loginText: {
    fontSize: 32,
    color: '#fea79d',
    fontWeight: 'bold',
  },
});

export default connector(Login);
