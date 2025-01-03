import React from 'react';
import { TabView, SceneMap } from 'react-native-tab-view';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import FirstRoute from './profiletab/FirstRoute';
import SecondRoute from './profiletab/SecondRoute';

export default class Profile extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
  };

  // Tạo hàm renderScene để truyền `navigation`
  renderScene = ({ route }: { route: any }) => {
    const { navigation } = this.props; // Lấy navigation từ prop

    switch (route.key) {
      case 'first':
        return <FirstRoute navigation={navigation} />; // Truyền navigation vào FirstRoute
      case 'second':
        return <SecondRoute navigation={navigation} />; // Truyền navigation vào SecondRoute nếu cần
      default:
        return null;
    }
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={this.renderScene} // Sử dụng renderScene thay vì SceneMap
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
  },
  scene: {
    flex: 1,
  },
});
