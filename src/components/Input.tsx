import {FieldInputProps, FormikProps} from 'formik';
import {rest, set} from 'lodash';
import React from 'react';
import {StyleSheet, TextInputProps} from 'react-native';
import {Text, TextInput, View} from 'react-native';

interface IProps extends TextInputProps {
  field: FieldInputProps<any>;
  form: FormikProps<any>;
}

class Input extends React.Component<IProps> {
  render() {
    const {field, form, ...set} = this.props;
    return (
      <View>
        <TextInput
          style={styles.textInput}
          {...rest}
          onChangeText={form.handleChange(field.name)}
          onBlur={form.handleBlur(field.name)}
          value={form.values[field.name]}
        />
        <View>
          <Text style={styles.error}>{form.errors[field.name]}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  textInput: {
    height: 44,
    backgroundColor: 'white',
    borderColor: '#ccc',
    marginTop: 40,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
  },
  error: {
    position: 'absolute',
    color: 'red',
    marginTop: 5,
    marginLeft: 20,
    fontSize: 14,
  },
});

export default Input;
